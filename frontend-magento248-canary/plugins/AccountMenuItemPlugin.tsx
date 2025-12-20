import type { AccountMenuItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

/**
 * Plugin to make iconSrc optional in AccountMenuItem This allows menu items to be used without
 * requiring an icon
 */
export function AccountMenuItem(props: PluginProps<AccountMenuItemProps>) {
  const { Prev, iconSrc, sx = [], ...rest } = props
  const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

  return (
    <Prev
      {...rest}
      iconSrc={iconSrc ?? transparentPixel}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        {
          '& .MuiButton-startIcon, & .MuiListItemIcon-root': { display: 'none' },
        },
      ]}
    />
  )
}
