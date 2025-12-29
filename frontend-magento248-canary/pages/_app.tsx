import { FramerNextPages } from '@graphcommerce/framer-next-pages'
import { GraphQLProvider } from '@graphcommerce/graphql'
import { GlobalHead } from '@graphcommerce/magento-store'
import { CssAndFramerMotionProvider, PageLoadIndicator } from '@graphcommerce/next-ui'
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { theme } from '../components/theme'
import { I18nProvider } from '../lib/i18n/I18nProvider'

export default function ThemedApp(props: AppProps) {
  const { router } = props
  const { locale = 'en' } = router

  return (
    <CssAndFramerMotionProvider {...props}>
      <I18nProvider key={locale} locale={locale}>
        <GraphQLProvider {...props}>
          <ThemeProvider theme={theme}>
            <GlobalHead />
            <CssBaseline />
            <GlobalStyles
              styles={(theme) => ({
                '.ProductListItem-title': {
                  fontSize: '16px !important',
                },
                '.ProductListPrice-finalPrice': {
                  color: `${theme.palette.text.primary} !important`,
                  fontSize: '16px !important',
                  fontWeight: 700,
                },
                '.ProductListPrice-discountPrice': {
                  color: '#929292 !important',
                  textDecoration: 'line-through',
                  fontSize: '13px !important',
                },
                '.ProductListPrice-discountPrice + .ProductListPrice-finalPrice': {
                  color: '#FF7171 !important',
                },
                // Ensure final price is default black when there is NO discount
                '.ProductListPrice-root:not(:has(.ProductListPrice-discountPrice)) .ProductListPrice-finalPrice':
                  {
                    color: `${theme.palette.text.primary} !important`,
                  },
                // Ensure product titles/prices are centered on small screens
                [theme.breakpoints.down('sm')]: {
                  '.ProductListItem-titleContainer': {
                    gridTemplateAreas: '"title" "price" "subtitle" !important',
                    gridTemplateColumns: '1fr !important',
                    justifyContent: 'center !important',
                    justifyItems: 'center !important',
                    textAlign: 'center !important',
                    paddingInline: '8px !important',
                    rowGap: '6px',
                  },
                  '.ProductListItem-title, .ProductListItem-subtitle': {
                    textAlign: 'center !important',
                    justifySelf: 'center !important',
                  },
                  '.ProductListItem-titleContainer > .ProductListPrice-root, .ProductListItem-titleContainer .ProductListPrice-root':
                    {
                      justifySelf: 'center !important',
                      textAlign: 'center !important',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    },
                },
              })}
            />
            <PageLoadIndicator />
            <FramerNextPages {...props} />
          </ThemeProvider>
        </GraphQLProvider>
      </I18nProvider>
    </CssAndFramerMotionProvider>
  )
}
