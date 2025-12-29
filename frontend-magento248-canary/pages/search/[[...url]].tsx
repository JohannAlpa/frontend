import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, flushMeasurePerf, PrivateQueryMaskProvider } from '@graphcommerce/graphql'
import type { MenuQueryFragment } from '@graphcommerce/magento-category'
import type {
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import {
  extractUrlQuery,
  getFilterTypes,
  hasUserFilterActive,
  parseParams,
  ProductFiltersDocument,
  ProductListDocument,
} from '@graphcommerce/magento-product'
import type { CategorySearchQuery } from '@graphcommerce/magento-search'
import {
  categoriesApplySearchDefaults,
  CategorySearchDocument,
  productListApplySearchDefaults,
  searchDefaultsToProductListFilters,
  SearchField,
  useProductList,
} from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { productFiltersLayout, productFiltersPro } from '@graphcommerce/next-config/config'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutHeader } from '@graphcommerce/next-ui'
import { Box, IconButton, InputAdornment } from '@mui/material'
import { useRouter } from 'next/router'
import { IconSvg, iconChevronLeft, iconSearch } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import type { LayoutNavigationProps } from '../../components'
import {
  LayoutDocument,
  LayoutNavigation,
  ProductListLayoutClassic,
  ProductListLayoutDefault,
  ProductListLayoutSidebar,
} from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type SearchResultProps = MenuQueryFragment &
  ProductListQuery &
  ProductFiltersQuery &
  CategorySearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
export type GetPageStaticProps = GetStaticProps<
  LayoutNavigationProps,
  SearchResultProps,
  RouteProps
>

function SearchResultPage(props: SearchResultProps) {
  const { mask, ...productList } = useProductList(props)
  const { params, menu } = productList
  const search = params.url.split('/')[1]
  const router = useRouter()

  return (
    <>
      <PageMeta title={search ? t`Results for ‘${search}’` : t`Search`} metaRobots={['noindex']} />
      <LayoutHeader floatingMd switchPoint={0}>
        <Box
          sx={(theme) => ({
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            // On mobile make the search wrapper fixed so it doesn't scroll with the hero
            position: { xs: 'fixed', md: 'relative' },
            top: { xs: 0, md: 'auto' },
            left: 0,
            right: 0,
            height: { xs: theme.appShell.headerHeightSm, md: 'auto' },
            zIndex: theme.zIndex.appBar + 2,
            px: { xs: theme.page.horizontal },
            pointerEvents: 'all',
          })}
        >
          {/* Tall white header block on mobile (matches opaque header height) */}
          <Box
            sx={(theme) => ({
              display: { xs: 'block', md: 'none' },
              position: 'absolute',
              left: 0,
              right: 0,
              height: `calc(${theme.appShell.headerHeightSm} + 12px)`,
              background: '#FFFFFF',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              // subtle blur for content behind, but keep the header white
              backdropFilter: 'saturate(120%) blur(4px)',
              pointerEvents: 'none',
            })}
          />

          {/* Back button on mobile */}
          <IconButton
            aria-label='Back'
            onClick={() => router.back()}
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'inherit', p: 0.5, ml: 0.5 }}
          >
            <IconSvg src={iconChevronLeft} size='medium' />
          </IconButton>

          {/* Search input container (rectangular with icon) */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
            <Box
              sx={(theme) => ({
                width: '100%',
                maxWidth: '92%',
                pointerEvents: 'all',
                display: 'flex',
                // move the search box down so it sits visually lower inside the tall header
                transform: `translateY(calc(${theme.appShell.headerHeightSm} + 6px))`,
              })}
            >
              <SearchField
                size='small'
                placeholder={'Search Product'}
                startAdornment={<InputAdornment position='start' sx={{ mr: 1, color: 'text.disabled' }}><IconSvg src={iconSearch} /></InputAdornment>}
                formControl={{
                  sx: {
                    width: '100%',
                    background: '#FFFFFF',
                    borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.08)',
                    px: 1.5,
                    // taller and more square box
                    height: 64,
                    '& .MuiOutlinedInput-root': { height: 64, alignItems: 'center' },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    // hide the end adornment (clear icon) on mobile to match screenshot
                    '& .MuiOutlinedInput-root .MuiInputAdornment-root.MuiInputAdornment-positionEnd': {
                      display: { xs: 'none', md: 'flex' },
                    },
                    '& .MuiOutlinedInput-root .MuiIconButton-root': {
                      display: { xs: 'none', md: 'flex' },
                    },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Small right spacer to match left back icon width */}
          <Box sx={{ width: { xs: 40, md: 0 } }} />
        </Box>
      </LayoutHeader>

      <PrivateQueryMaskProvider mask={mask}>
        {productFiltersPro && productFiltersLayout === 'SIDEBAR' && (
          <ProductListLayoutSidebar {...productList} menu={menu} />
        )}
        {productFiltersPro && productFiltersLayout !== 'SIDEBAR' && (
          <ProductListLayoutDefault {...productList} menu={menu} />
        )}
        {!productFiltersPro && <ProductListLayoutClassic {...productList} menu={menu} />}
      </PrivateQueryMaskProvider>
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}

SearchResultPage.pageOptions = pageOptions

export default SearchResultPage

export const getServerSideProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const [searchShort = '', query = []] = extractUrlQuery(params)
  const search = searchShort.length >= 3 ? searchShort : ''

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client, true)

  const staticClient = graphqlSsrClient(context)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const productListParams = parseParams(
    search ? `search/${search}` : 'search',
    query,
    await filterTypes,
    search,
  )

  if (!productListParams) return { notFound: true }

  const filters = hasUserFilterActive(productListParams)
    ? staticClient.query({
        query: ProductFiltersDocument,
        variables: searchDefaultsToProductListFilters(
          productListApplySearchDefaults(productListParams, (await conf).data),
        ),
      })
    : undefined

  const products = staticClient.query({
    query: ProductListDocument,
    variables: productListApplySearchDefaults(productListParams, (await conf).data),
  })

  const categories = false
    ? staticClient.query({
        query: CategorySearchDocument,
        variables: categoriesApplySearchDefaults({ search }, (await conf).data),
      })
    : undefined

  const result = {
    props: {
      ...(await products).data,
      ...(await filters)?.data,
      ...(await categories)?.data,
      ...(await layout)?.data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: t`Home` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
  flushMeasurePerf()
  return result
}
