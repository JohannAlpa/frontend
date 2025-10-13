import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'dart:io';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jewelry App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Jewelry Store')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const WebViewScreen()),
            );
          },
          child: const Text('Buy Jewelry'),
        ),
      ),
    );
  }
}

class WebViewScreen extends StatefulWidget {
  const WebViewScreen({super.key});

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  InAppWebViewController? webViewController;
  bool _isLoading = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Checkout'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _reloadPage(),
          ),
        ],
      ),
      body: Stack(
        children: [
          InAppWebView(
            initialUrlRequest: URLRequest(
              url: WebUri(
                'https://10.0.2.2/sso/account/authenticateUser/lastName/Last/mobileNumber/639178915221/cisNumber/149766/userId/WLT%4010001539/firstName/First/middleName/Middle/email',
              ),
            ),
            onWebViewCreated: (controller) {
              webViewController = controller;
            },
            onLoadStart: (controller, url) {
              debugPrint('Page started loading: $url');
              setState(() => _isLoading = true);
            },
            onLoadStop: (controller, url) async {
              debugPrint('Page finished loading: $url');
              setState(() => _isLoading = false);
            },
            onReceivedError: (controller, request, error) {
              debugPrint('Web error: ${error.description}');

              // Don't show cleartext errors to user in development (they're usually not critical)
              if (kDebugMode &&
                  error.description.contains('ERR_CLEARTEXT_NOT_PERMITTED')) {
                debugPrint('Ignoring cleartext error in debug mode');
                return;
              }

              if (mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Error loading page: ${error.description}'),
                    backgroundColor: Colors.red,
                  ),
                );
              }
            },
            onReceivedHttpError: (controller, request, errorResponse) {
              debugPrint('HTTP error: ${errorResponse.statusCode}');
            },
            // This is the key part - handle SSL errors in development
            onReceivedServerTrustAuthRequest: (controller, challenge) async {
              debugPrint(
                'SSL Challenge received for: ${challenge.protectionSpace.host}',
              );
              debugPrint('Protocol: ${challenge.protectionSpace.protocol}');

              // In development, proceed with self-signed certificates
              if (kDebugMode) {
                debugPrint('Proceeding with SSL challenge (debug mode)');
                return ServerTrustAuthResponse(
                  action: ServerTrustAuthResponseAction.PROCEED,
                );
              }

              // In production, you might want to be more selective
              return ServerTrustAuthResponse(
                action: ServerTrustAuthResponseAction.CANCEL,
              );
            },
            initialSettings: InAppWebViewSettings(
              javaScriptEnabled: true,
              mixedContentMode: MixedContentMode.MIXED_CONTENT_ALWAYS_ALLOW,
            ),
            onConsoleMessage: (controller, consoleMessage) {
              debugPrint(
                'WebView Console [${consoleMessage.messageLevel}]: ${consoleMessage.message}',
              );
            },
          ),
          if (_isLoading) const Center(child: CircularProgressIndicator()),
        ],
      ),
    );
  }

  void _reloadPage() {
    webViewController?.reload();
    // Clear SSL preferences if needed (Android)
    if (kDebugMode && Platform.isAndroid) {
      webViewController?.clearSslPreferences();
    }
  }
}
