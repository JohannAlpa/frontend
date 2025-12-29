import type { ProductListPriceProps } from '@graphcommerce/magento-product/components/ProductListPrice/ProductListPrice'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

/**
 * Plugin to style the product list price: - Red color for discounted/final price - Larger font size
 * for final price - Centered layout - Original price below in smaller text
 */
export function ProductListPrice(props: PluginProps<ProductListPriceProps>) {
  const { Prev, sx = [], ...rest } = props

  return (
    <Prev
      {...rest}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        {
          flexDirection: 'column !important' as any,
          alignItems: 'center !important' as any,
          '& .ProductListPrice-finalPrice': {
            color: '#D32F2F !important' as any,
            fontWeight: '700 !important' as any,
            fontSize: '1.25rem !important' as any,
          },
          '& .ProductListPrice-discountPrice': {
            order: '1 !important' as any,
            fontSize: '0.875rem !important' as any,
          },
        },
      ]}
    />
  )
}
