import type { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { ProductListItem } from '@graphcommerce/magento-product'
import { ProductListItemBundle } from '@graphcommerce/magento-product-bundle'
import { ProductListItemConfigurable } from '@graphcommerce/magento-product-configurable'
import { ProductListItemDownloadable } from '@graphcommerce/magento-product-downloadable'
import { ProductListItemGrouped } from '@graphcommerce/magento-product-grouped'
import { ProductListItemSimple } from '@graphcommerce/magento-product-simple'
import { ProductListItemVirtual } from '@graphcommerce/magento-product-virtual'
import { DiscountBadge } from './DiscountBadge'

export const productListRenderer: ProductListItemRenderer = {
  Skeleton: (props) => <ProductListItem {...props} aspectRatio={[1, 1]} />,
  SimpleProduct: (props) => {
    const percent = (props as any)?.price_range?.minimum_price?.discount?.percent_off
    return (
      <ProductListItemSimple
        {...props}
        aspectRatio={[1, 1]}
        topLeft={null}
        bottomLeft={null}
        topRight={<DiscountBadge percent={percent} />}
        slotProps={{
          titleAndPrice: {
            sx: (theme) => ({
              gridTemplateAreas: { xs: '"title" "price" "subtitle"', md: '"title subtitle price"' },
              justifyItems: 'center',
              textAlign: 'center',
            }),
          },
        }}
        sx={{
          backgroundColor: '#FFFFFF',
          '& .MuiCardContent-root': { textAlign: 'center' },
          '& .ProductListItem-title, & .ProductListItem-subtitle, & .ProductListItem-price, & .MuiCardContent-root':
            { textAlign: 'center' },
          '& .ProductListPrice-root': {
            flexDirection: 'column',
            alignItems: 'center',
          },
          '& .ProductListPrice-finalPrice': {
            color: 'inherit',
            fontWeight: 700,
            fontSize: '1.25rem',
          },
          '& .ProductListPrice-discountPrice': {
            order: 1,
            fontSize: '0.875rem',
            color: 'inherit',
            textDecoration: 'line-through',
          },
          '& .ProductListPrice-discountPrice + .ProductListPrice-finalPrice': {
            color: 'inherit',
          },
        }}
      />
    )
  },
  ConfigurableProduct: (props) => {
    const percent = (props as any)?.price_range?.minimum_price?.discount?.percent_off
    return (
      <ProductListItemConfigurable
        {...props}
        aspectRatio={[1, 1]}
        topLeft={null}
        bottomLeft={null}
        swatchLocations={{
          topLeft: [],
          topRight: [],
          bottomLeft: [],
          bottomRight: [],
        }}
        topRight={<DiscountBadge percent={percent} />}
        slotProps={{
          titleAndPrice: {
            sx: (theme) => ({
              gridTemplateAreas: { xs: '"title" "price" "subtitle"', md: '"title subtitle price"' },
              justifyItems: 'center',
              textAlign: 'center',
            }),
          },
        }}
        sx={{
          backgroundColor: '#FFFFFF',
          '& .MuiCardContent-root': { textAlign: 'center' },
          '& .ProductListItem-title, & .ProductListItem-subtitle, & .ProductListItem-price, & .MuiCardContent-root':
            { textAlign: 'center' },
          '& .ProductListPrice-root': {
            flexDirection: 'column',
            alignItems: 'center',
          },
          '& .ProductListPrice-finalPrice': {
            color: 'inherit',
            fontWeight: 700,
            fontSize: '1.25rem',
          },
          '& .ProductListPrice-discountPrice': {
            order: 1,
            fontSize: '0.875rem',
            color: 'inherit',
            textDecoration: 'line-through',
          },
        }}
      />
    )
  },
  BundleProduct: (props) => {
    const percent = (props as any)?.price_range?.minimum_price?.discount?.percent_off
    return (
      <ProductListItemBundle
        {...props}
        aspectRatio={[1, 1]}
        topLeft={null}
        bottomLeft={null}
        topRight={<DiscountBadge percent={percent} />}
        slotProps={{
          titleAndPrice: {
            sx: (theme) => ({
              gridTemplateAreas: { xs: '"title" "price" "subtitle"', md: '"title subtitle price"' },
              justifyItems: 'center',
              textAlign: 'center',
            }),
          },
        }}
        sx={{
          backgroundColor: '#FFFFFF',
          '& .MuiCardContent-root': { textAlign: 'center' },
          '& .ProductListItem-title, & .ProductListItem-subtitle, & .ProductListItem-price, & .MuiCardContent-root':
            { textAlign: 'center' },
          '& .ProductListPrice-root': {
            flexDirection: 'column',
            alignItems: 'center',
          },
          '& .ProductListPrice-finalPrice': {
            color: 'inherit',
            fontWeight: 700,
            fontSize: '1.25rem',
          },
          '& .ProductListPrice-discountPrice': {
            order: 1,
            fontSize: '0.875rem',
            color: 'inherit',
            textDecoration: 'line-through',
          },
        }}
      />
    )
  },
  VirtualProduct: (props) => {
    const percent = (props as any)?.price_range?.minimum_price?.discount?.percent_off
    return (
      <ProductListItemVirtual
        {...props}
        aspectRatio={[1, 1]}
        topLeft={null}
        bottomLeft={null}
        topRight={<DiscountBadge percent={percent} />}
        slotProps={{
          titleAndPrice: {
            sx: (theme) => ({
              gridTemplateAreas: { xs: '"title" "price" "subtitle"', md: '"title subtitle price"' },
              justifyItems: 'center',
              textAlign: 'center',
            }),
          },
        }}
        sx={{
          backgroundColor: '#FFFFFF',
          '& .MuiCardContent-root': { textAlign: 'center' },
          '& .ProductListItem-title, & .ProductListItem-subtitle, & .ProductListItem-price, & .MuiCardContent-root':
            { textAlign: 'center' },
          '& .ProductListPrice-root': {
            flexDirection: 'column',
            alignItems: 'center',
          },
          '& .ProductListPrice-finalPrice': {
            color: 'inherit',
            fontWeight: 700,
            fontSize: '1.25rem',
          },
          '& .ProductListPrice-discountPrice': {
            order: 1,
            fontSize: '0.875rem',
            color: 'inherit',
            textDecoration: 'line-through',
          },
        }}
      />
    )
  },
  DownloadableProduct: (props) => {
    const percent = (props as any)?.price_range?.minimum_price?.discount?.percent_off
    return (
      <ProductListItemDownloadable
        {...props}
        aspectRatio={[1, 1]}
        topLeft={null}
        bottomLeft={null}
        topRight={<DiscountBadge percent={percent} />}
        slotProps={{
          titleAndPrice: {
            sx: (theme) => ({
              gridTemplateAreas: { xs: '"title" "price" "subtitle"', md: '"title subtitle price"' },
              justifyItems: 'center',
              textAlign: 'center',
            }),
          },
        }}
        sx={{
          backgroundColor: '#FFFFFF',
          '& .MuiCardContent-root': { textAlign: 'center' },
          '& .ProductListItem-title, & .ProductListItem-subtitle, & .ProductListItem-price, & .MuiCardContent-root':
            { textAlign: 'center' },
          '& .ProductListPrice-root': {
            flexDirection: 'column',
            alignItems: 'center',
          },
          '& .ProductListPrice-finalPrice': {
            color: 'inherit',
            fontWeight: 700,
            fontSize: '1.25rem',
          },
          '& .ProductListPrice-discountPrice': {
            order: 1,
            fontSize: '0.875rem',
            color: 'inherit',
            textDecoration: 'line-through',
          },
        }}
      />
    )
  },
  GroupedProduct: (props) => {
    const percent = (props as any)?.price_range?.minimum_price?.discount?.percent_off
    return (
      <ProductListItemGrouped
        {...props}
        aspectRatio={[1, 1]}
        topLeft={null}
        bottomLeft={null}
        topRight={<DiscountBadge percent={percent} />}
        slotProps={{
          titleAndPrice: {
            sx: (theme) => ({
              gridTemplateAreas: { xs: '"title" "price" "subtitle"', md: '"title subtitle price"' },
              justifyItems: 'center',
              textAlign: 'center',
            }),
          },
        }}
        sx={{
          backgroundColor: '#FFFFFF',
          '& .MuiCardContent-root': { textAlign: 'center' },
          '& .ProductListItem-title, & .ProductListItem-subtitle, & .ProductListItem-price, & .MuiCardContent-root':
            { textAlign: 'center' },
          '& .ProductListPrice-root': {
            flexDirection: 'column',
            alignItems: 'center',
          },
          '& .ProductListPrice-finalPrice': {
            color: 'inherit',
            fontWeight: 700,
            fontSize: '1.25rem',
          },
          '& .ProductListPrice-discountPrice': {
            order: 1,
            fontSize: '0.875rem',
            color: 'inherit',
            textDecoration: 'line-through',
          },
        }}
      />
    )
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore GiftCardProduct is only available in Commerce
  GiftCardProduct: (props) => <ProductListItem {...props} aspectRatio={[1, 1]} />,
}
