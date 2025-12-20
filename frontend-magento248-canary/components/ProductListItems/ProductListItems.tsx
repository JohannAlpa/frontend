import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { ProductListItemsBase } from '@graphcommerce/magento-product'
import { useMemo } from 'react'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'>

export function ProductListItems(props: ProductListItemsProps) {
  const { items, ...rest } = props

  // Filter out test products in production
  const filteredItems = useMemo(() => {
    if (process.env.NODE_ENV === 'production' && items) {
      return items.filter((item) => {
        if (!item?.name) return true
        return !item.name.toLowerCase().includes('(test)')
      })
    }
    return items
  }, [items])

  return <ProductListItemsBase renderers={productListRenderer} items={filteredItems} {...rest} />
}
