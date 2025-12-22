import { CartFab, useCartEnabled } from '@graphcommerce/magento-cart'
import { magentoMenuToNavigation } from '@graphcommerce/magento-category'
import { CmsBlock } from '@graphcommerce/magento-cms'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { SearchFab, SearchField } from '@graphcommerce/magento-search'
import {
  StoreSwitcherButton,
  StoreSwitcherMenuFabSecondaryItem,
} from '@graphcommerce/magento-store'
import { WishlistFab, WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import type { LayoutDefaultProps } from '@graphcommerce/next-ui'
import {
  DarkLightModeMenuSecondaryItem,
  DesktopNavActions,
  DesktopNavBar,
  DesktopNavItem,
  iconChevronDown,
  iconCustomerService,
  iconHeart,
  iconSearch,
  iconShoppingBag,
  IconSvg,
  LayoutDefault,
  MenuFabSecondaryItem,
  MobileTopRight,
  NavigationFab,
  NavigationOverlay,
  NavigationProvider,
  useMemoDeep,
  useNavigationSelection,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Badge, Box, Divider, Fab, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { productListRenderer } from '../ProductListItems/productListRenderer'
import { Footer } from './Footer'
import type { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, cmsBlocks, ...uiProps } = props

  const selection = useNavigationSelection()
  const router = useRouter()

  const cartEnabled = useCartEnabled()

  const footerBlock = cmsBlocks?.items?.find((item) => item?.identifier === 'footer_links_block')

  return (
    <>
      <NavigationProvider
        selection={selection}
        items={useMemoDeep(
          () => [
            { id: 'home', name: <Trans>Home</Trans>, href: '/' },
            {
              id: 'manual-item-one',
              href: `/${menu?.items?.[0]?.children?.[0]?.url_path}`,
              name: menu?.items?.[0]?.children?.[0]?.name ?? '',
            },
            {
              id: 'manual-item-two',
              href: `/${menu?.items?.[0]?.children?.[1]?.url_path}`,
              name: menu?.items?.[0]?.children?.[1]?.name ?? '',
            },
            ...magentoMenuToNavigation(menu, true),
            <Divider key='divider' sx={(theme) => ({ my: theme.spacings.xs })} />,
            <CustomerMenuFabItem
              onClick={() => selection.set(false)}
              key='account'
              guestHref='/account/signin'
              authHref='/account'
            >
              <Trans>Account</Trans>
            </CustomerMenuFabItem>,
            <MenuFabSecondaryItem
              key='service'
              icon={<IconSvg src={iconCustomerService} size='medium' />}
              href='/service'
            >
              <Trans>Customer Service</Trans>
            </MenuFabSecondaryItem>,
            <WishlistMenuFabItem
              onClick={() => selection.set(false)}
              key='wishlist'
              icon={<IconSvg src={iconHeart} size='medium' />}
            >
              <Trans>Wishlist</Trans>
            </WishlistMenuFabItem>,
            <DarkLightModeMenuSecondaryItem key='darkmode' />,
            <StoreSwitcherMenuFabSecondaryItem key='store-switcher' />,
          ],
          [menu, selection],
        )}
      >
        <NavigationOverlay
          stretchColumns={false}
          variantSm='left'
          sizeSm='full'
          justifySm='start'
          itemWidthSm='70vw'
          variantMd='left'
          sizeMd='full'
          justifyMd='start'
          itemWidthMd='230px'
          mouseEvent='hover'
          itemPadding='md'
        />
      </NavigationProvider>

      <LayoutDefault
        {...uiProps}
        noSticky={router.asPath.split('?')[0] === '/'}
        header={
          <>
            {/* Header wrapper: transparent, logo left, actions right */}
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
              {/* Logo on the left */}
              <Logo />

              {/* Spacer pushes actions to the right */}
              <Box sx={{ flexGrow: 1 }} />

              {/* Desktop actions: Search | Cart | Menu (three dots) */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: { xs: 2, md: 4 } }}>
                {/* Desktop search as small circular icon */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <IconButton
                    href='/search'
                    color='inherit'
                    aria-label={t`Search`}
                    sx={{ width: 44, height: 44, bgcolor: 'rgba(255,255,255,0.95)', boxShadow: 2 }}
                  >
                    <IconSvg src={iconSearch} />
                  </IconButton>
                </Box>

                {/* Cart as circular white FAB (desktop) */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  {cartEnabled && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CartFab
                        BadgeProps={{ color: 'secondary' }}
                        sx={{
                          width: 44,
                          height: 44,
                          minWidth: 44,
                          bgcolor: 'rgba(255,255,255,0.95)',
                          boxShadow: 2,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          p: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& svg': { margin: 0 },
                        }}
                      />
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <IconButton
                    onClick={() => selection.set([])}
                    color='inherit'
                    aria-label={t`Menu`}
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: 'rgba(255,255,255,0.95)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                      boxShadow: 1,
                    }}
                  >
                    <Box sx={{ display: 'grid', gap: '4px' }}>
                      <Box
                        component='span'
                        sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'text.primary' }}
                      />
                      <Box
                        component='span'
                        sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'text.primary' }}
                      />
                      <Box
                        component='span'
                        sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'text.primary' }}
                      />
                    </Box>
                  </IconButton>
                </Box>
              </Box>

              {/* Mobile top right (keeps an accessible search and menu) */}
              <MobileTopRight
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  alignItems: 'center',
                  gap: 1.25,
                  position: 'absolute',
                  top: 16,
                  right: 12,
                  zIndex: 20,
                }}
              >
                {/* Small search icon */}
                <IconButton
                  href='/search'
                  color='inherit'
                  aria-label={t`Search`}
                  sx={{ bgcolor: 'rgba(255,255,255,0.7)', width: 36, height: 36 }}
                >
                  <IconSvg src={iconSearch} />
                </IconButton>

                {/* Cart: use CartFab for accurate quantity badge, scaled down */}
                {cartEnabled && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CartFab
                      BadgeProps={{ color: 'secondary' }}
                      sx={{
                        width: 36,
                        height: 36,
                        minWidth: 36,
                        bgcolor: 'rgba(255,255,255,0.95)',
                        boxShadow: 2,
                        ml: 0,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        p: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& svg': { margin: 0 },
                      }}
                    />
                  </Box>
                )}

                {/* Menu: three vertical dots inside a translucent circle */}
                <IconButton
                  onClick={() => selection.set([])}
                  color='inherit'
                  aria-label={t`Menu`}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.95)',
                    width: 36,
                    height: 36,
                    ml: 0,
                    boxShadow: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ display: 'grid', gap: '3px' }}>
                    <Box
                      component='span'
                      sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.primary' }}
                    />
                    <Box
                      component='span'
                      sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.primary' }}
                    />
                    <Box
                      component='span'
                      sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.primary' }}
                    />
                  </Box>
                </IconButton>
              </MobileTopRight>
            </Box>
          </>
        }
        // footer={
        //   <Footer
        //     socialLinks={
        //       footerBlock ? (
        //         <CmsBlock cmsBlock={footerBlock} productListRenderer={productListRenderer} />
        //       ) : (
        //         <div />
        //       )
        //     }
        //   />
        // }
        menuFab={<NavigationFab onClick={() => selection.set([])} />}
      >
        {children}
      </LayoutDefault>
    </>
  )
}
