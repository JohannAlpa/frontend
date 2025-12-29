import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { CartFab, useCartEnabled } from '@graphcommerce/magento-cart'
import type { MenuQueryFragment } from '@graphcommerce/magento-category'
import { ProductListDocument } from '@graphcommerce/magento-product'
import type { ProductListQuery } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  iconSearch,
  IconSvg,
  ItemScroller,
  LayoutHeader,
  LayoutTitle,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Box, Button, Card, CardContent, Container, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation, Logo, ProductListItems } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type ImportMetaGraphCommerce = { graphCommerce?: { breadcrumbs?: boolean } }

type Props = ProductListQuery & MenuQueryFragment & {}
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { products, menu } = props
  const cartEnabled = useCartEnabled()

  // Get first 10 products for featured section
  const featuredProducts = products?.items?.slice(0, 10) || []

  // Get categories from menu - check different possible structures
  const categories =
    menu?.items?.filter((item) => item?.name && item?.url_path) ||
    menu?.items?.[0]?.children?.filter((item) => item?.name && item?.url_path) ||
    []

  // Add fallback categories for testing if no categories are found
  const displayCategories =
    categories.length > 0
      ? categories
      : [
          { uid: 'fallback-1', name: 'Jewelry', url_path: 'jewelry' },
          { uid: 'fallback-2', name: 'Diamond', url_path: 'jewelry/diamond' },
          { uid: 'fallback-3', name: 'Necklace', url_path: 'jewelry/necklace' },
        ]

  const categoryShowcase = [
    {
      label: 'RING',
      href: '/jewelry/ring',
      img: 'https://bridgetkennedy.com.au/wp-content/uploads/2022/10/palawan-pebble-gold-stacking-ring-1.jpg',
    },
    {
      label: 'NECKLACE',
      href: '/jewelry/necklace',
      img: 'https://www.bohemelifecollection.com.au/cdn/shop/files/IMG_5663.jpg?v=1745366265&width=1100',
    },
    {
      label: 'BRACELET',
      href: '/jewelry/bracelet',
      img: 'https://amamiph.com/cdn/shop/files/PulserasGoldIvatanBandBraceletBangle3_1080x.jpg?v=1699347820',
    },
  ]

  const heroSections = [
    {
      id: 'hero-1',
      images: [
        'https://contents.pep.ph/images2/images2/2021/10/05/marian-1-243872777-945708906157738-3347880015739014444-n-1-1633435574.jpg',
        'https://contents.pep.ph/images2/images2/2021/10/05/marian-4-239688354-4434677733259939-9129188469966105250-n-1633435574.jpg',
        'https://contents.pep.ph/images2/images2/2021/10/05/marian-2-243200201-836825773700659-7837655080037561564-n-1-1633435574.jpg',
      ],
      intervalMs: 5000,
      titleTop: null,
      titleBottom: null,
      buttonLabel: null,
      buttonHref: '#',
    },
    {
      id: 'hero-2',
      images: [
        'https://i.redd.it/sinampal-na-naman-tayo-ng-kagandahan-and-freshness-ng-the-v0-aa2p24dr974f1.jpg?width=1284&format=pjpg&auto=webp&s=7288735aea4b74038650a6b65fa331dfc7e6c228',
      ],
      intervalMs: 8000,
      titleTop: 'NEW JEWELRY',
      titleBottom: 'Collection',
      buttonLabel: 'View All',
      buttonHref: '/jewelry',
    },
    {
      id: 'hero-3',
      images: [
        'https://mega-asia.com/wp-content/uploads/2024/02/Snapinsta.app_346636681_566285232156498_1246653172557689534_n_1080.jpg',
      ],
      intervalMs: 8000,
      titleTop: 'PRE-LOVED',
      titleBottom: 'Collection',
      buttonLabel: 'View All',
      buttonHref: '/jewelry',
    },
  ]

  return (
    <>
      {/* Mobile header - Search | Cart | Menu icons */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center',
          width: '100%',
          gap: 2,
          p: 2,
          bgcolor: 'background.paper',
        }}
      >
        {/* Logo on the left */}
        <Logo />

        {/* Spacer pushes actions to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Mobile icons: Search | Cart | Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          {/* Small search icon */}
          <IconButton
            href='/search'
            color='inherit'
            aria-label='Search'
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
            href='/'
            color='inherit'
            aria-label='Menu'
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
        </Box>
      </Box>

      {/* Removed floating Home header to avoid duplicate sticky headers */}

      {/* Keep the ones above the PRE-LOVED collection */}
      {/* Hero 1 */}
      {/* pull hero up behind header so header visually integrates with content */}
      <FullBleedCarousel
        images={heroSections.find((s) => s.id === 'hero-1')?.images ?? []}
        intervalMs={heroSections.find((s) => s.id === 'hero-1')?.intervalMs ?? 5000}
      />

      {/* Hero 2: NEW JEWELRY Collection */}
      <FullBleedCarousel
        images={heroSections.find((s) => s.id === 'hero-2')?.images ?? []}
        intervalMs={heroSections.find((s) => s.id === 'hero-2')?.intervalMs ?? 8000}
      >
        <Box
          sx={(theme) => ({
            zIndex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            display: 'grid',
            justifyItems: 'center',
            alignContent: 'end',
            textAlign: 'center',
            color: theme.vars.palette.secondary.contrastText,
            p: { xs: theme.spacings.md, sm: theme.spacings.xl },
            pb: { xs: theme.spacings.lg, sm: theme.spacings.xxl },
          })}
        >
          <Box>
            <Typography
              component='div'
              sx={{
                fontFamily: `'Didot','GFS Didot',serif`,
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '130%',
                letterSpacing: '0.30em',
              }}
            >
              NEW JEWELRY
            </Typography>
            <Typography
              component='div'
              sx={{
                fontFamily: `'Pinyon Script',cursive`,
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '34px',
                lineHeight: '130%',
                letterSpacing: 0,
              }}
            >
              Collection
            </Typography>
          </Box>
          <Button
            href='/jewelry'
            variant='outlined'
            size='large'
            color='inherit'
            sx={(theme) => ({
              mt: 2,
              border: '2px solid rgba(255,255,255,0.95)',
              color: 'rgba(255,255,255,0.95)',
              background: 'transparent',
              px: theme.spacings.lg,
              py: '6px',
              minHeight: 40,
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1,
            })}
          >
            View All
          </Button>
        </Box>
      </FullBleedCarousel>

      {/* PRE-LOVED Collection */}
      <FullBleedCarousel
        images={heroSections.find((s) => s.id === 'hero-3')?.images ?? []}
        intervalMs={heroSections.find((s) => s.id === 'hero-3')?.intervalMs ?? 8000}
      >
        <Box
          sx={(theme) => ({
            zIndex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            display: 'grid',
            justifyItems: 'center',
            alignContent: 'end',
            textAlign: 'center',
            color: theme.vars.palette.secondary.contrastText,
            p: { xs: theme.spacings.md, sm: theme.spacings.xl },
            pb: { xs: theme.spacings.lg, sm: theme.spacings.xxl },
          })}
        >
          <Box>
            <Typography
              component='div'
              sx={{
                fontFamily: `'Didot','GFS Didot',serif`,
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '130%',
                letterSpacing: '0.51em',
              }}
            >
              PRE-LOVED
            </Typography>
            <Typography
              component='div'
              sx={{
                fontFamily: `'Pinyon Script',cursive`,
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '34px',
                lineHeight: '130%',
                letterSpacing: 0,
              }}
            >
              Collection
            </Typography>
          </Box>
          <Button
            href='/jewelry'
            variant='outlined'
            size='large'
            color='inherit'
            sx={(theme) => ({
              mt: 2,
              border: '2px solid rgba(255,255,255,0.95)',
              color: 'rgba(255,255,255,0.95)',
              background: 'transparent',
              px: theme.spacings.lg,
              py: '6px',
              minHeight: 40,
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1,
            })}
          >
            View All
          </Button>
        </Box>
      </FullBleedCarousel>

      {/* Categories Showcase (scrollable) */}
      <Container
        maxWidth={false}
        sx={(theme) => ({ mb: theme.spacings.xl, mt: theme.spacings.xl })}
      >
        <ItemScroller
          sx={(theme) => ({
            '& .ItemScroller-scroller': {
              gridAutoColumns: responsiveVal(200, 240),
              gap: theme.spacings.md,
              px: theme.page.horizontal,
            },
          })}
        >
          {categoryShowcase.map((item) => (
            <Box
              key={item.label}
              component={Link}
              href={item.href}
              sx={(theme) => ({
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                borderRadius: theme.spacing(1),
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: theme.shadows[1],
                display: 'block',
              })}
            >
              <Box
                component='img'
                src={item.img}
                alt={item.label}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  textAlign: 'center',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                }}
              >
                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#fff',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </ItemScroller>

        {/* Shop by Category header AFTER categories */}
        <Box sx={{ display: 'grid', justifyItems: 'center', gap: 1.5, mt: 3 }}>
          <Typography variant='caption' color='text.secondary' sx={{ letterSpacing: '0.12em' }}>
            SHOP BY
          </Typography>
          <Typography
            component='div'
            sx={{
              fontFamily: `'Pinyon Script',cursive`,
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '32px',
              lineHeight: '130%',
              color: '#1d3b2f',
            }}
          >
            Category
          </Typography>
          <Button
            href='/categories'
            variant='outlined'
            size='large'
            color='inherit'
            sx={(theme) => ({
              border: '2px solid #1d3b2f',
              color: '#1d3b2f',
              background: 'transparent',
              px: theme.spacings.lg,
              py: '6px',
              minHeight: 40,
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1,
            })}
          >
            View All
          </Button>
        </Box>
      </Container>

      {/* Featured Products - Vertical Layout with 2 columns */}
      {featuredProducts.length > 0 && (
        <Container maxWidth={false}>
          <ProductListItems
            items={featuredProducts}
            title='Featured Products'
            loadingEager={4}
            columns={{ xs: { count: 2 } }}
            sx={(theme) => ({
              mb: theme.spacings.xxl,
              '& .ProductListItems-grid': {
                gap: theme.spacings.md,
              },
            })}
          />
          {/* Shop By Featured Items header AFTER product list */}
          <Box sx={{ display: 'grid', justifyItems: 'center', gap: 1.5, mb: 2 }}>
            <Typography variant='caption' color='text.secondary' sx={{ letterSpacing: '0.12em' }}>
              SHOP BY
            </Typography>
            <Typography
              component='div'
              sx={{
                fontFamily: `'Pinyon Script',cursive`,
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '32px',
                lineHeight: '130%',
                color: '#1d3b2f',
              }}
            >
              Featured Items
            </Typography>
            <Button
              href='/jewelry'
              variant='outlined'
              size='large'
              color='inherit'
              sx={(theme) => ({
                border: '2px solid #1d3b2f',
                color: '#1d3b2f',
                background: 'transparent',
                px: theme.spacings.lg,
                py: '6px',
                minHeight: 40,
                borderRadius: 0,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                lineHeight: 1,
              })}
            >
              View All
            </Button>
          </Box>
        </Container>
      )}

      {/* Bottom Hero: PRE-LOVED Collection */}
      <FullBleedCarousel
        images={heroSections.find((s) => s.id === 'hero-3')?.images ?? []}
        intervalMs={heroSections.find((s) => s.id === 'hero-3')?.intervalMs ?? 8000}
      >
        <Box
          sx={(theme) => ({
            zIndex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            display: 'grid',
            justifyItems: 'center',
            alignContent: 'end',
            textAlign: 'center',
            color: theme.vars.palette.secondary.contrastText,
            p: { xs: theme.spacings.md, sm: theme.spacings.xl },
            pb: { xs: theme.spacings.lg, sm: theme.spacings.xxl },
          })}
        >
          <Box>
            <Typography
              component='div'
              sx={{
                fontFamily: `'Didot','GFS Didot',serif`,
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '130%',
                letterSpacing: '0.51em',
              }}
            >
              PRE-LOVED
            </Typography>
            <Typography
              component='div'
              sx={{
                fontFamily: `'Pinyon Script',cursive`,
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '34px',
                lineHeight: '130%',
                letterSpacing: 0,
              }}
            >
              Collection
            </Typography>
          </Box>
          <Button
            href='/jewelry'
            variant='outlined'
            size='large'
            color='inherit'
            sx={(theme) => ({
              mt: 2,
              border: '2px solid rgba(255,255,255,0.95)',
              color: 'rgba(255,255,255,0.95)',
              background: 'transparent',
              px: theme.spacings.lg,
              py: '6px',
              minHeight: 40,
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1,
            })}
          >
            View All
          </Button>
        </Box>
      </FullBleedCarousel>
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  // Fetch products for the homepage
  const products = staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 10,
      currentPage: 1,
    },
  })

  return {
    props: {
      ...(await layout).data,
      ...(await products).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}

type FullBleedCarouselProps = {
  images: string[]
  intervalMs?: number
  children?: React.ReactNode
}

function FullBleedCarousel({ images, intervalMs = 5000, children }: FullBleedCarouselProps) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs)
    return () => clearInterval(id)
  }, [images.length, intervalMs])

  return (
    <Box
      sx={{
        // full-bleed section: span full viewport width, no outer spacing
        position: 'relative',
        width: '100vw',
        left: '50%',
        right: '50%',
        ml: '-50vw',
        mr: '-50vw',
        height: 404,
        minHeight: 404,
        maxHeight: 404,
        overflow: 'hidden',
      }}
    >
      {/* overlay content */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
        }}
      >
        {children}
      </Box>
      {/* dot indicators */}
      {images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            zIndex: 2,
          }}
        >
          {images.map((_, i) => (
            <Box
              // eslint-disable-next-line jsx-a11y/interactive-supports-focus
              component='button'
              key={`dot-${i}`}
              type='button'
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                border: 'none',
                p: 0,
                cursor: 'pointer',
                backgroundColor: i === index ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
                transition: 'background-color 200ms ease',
                outline: 'none',
              }}
            />
          ))}
        </Box>
      )}
      {/* images */}
      {images.map((src, i) => (
        <Box
          key={src}
          component='img'
          src={src}
          alt={`banner-${i + 1}`}
          loading={i === index ? 'eager' : 'lazy'}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 700ms ease',
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
    </Box>
  )
}
