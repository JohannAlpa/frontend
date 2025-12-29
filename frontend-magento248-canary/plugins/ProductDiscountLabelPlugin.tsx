import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

/**
 * Plugin to remove the default discount label from product list items We're using a custom yellow
 * badge in topRight instead
 */
export function ProductDiscountLabel(
  props: PluginProps<{ price_range?: any; className?: string }>,
) {
  // Return null to hide the default black discount badge
  return null
}
