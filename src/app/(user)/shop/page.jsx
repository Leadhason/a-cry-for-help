import { Suspense } from 'react'
import { getAllProducts } from './getProducts'
import ShopPageClient from './ShopPageClient'

export default async function ShopPage({ searchParams }) {
  const { products, totalCount } = await getAllProducts()
  const currentPage = Number(searchParams.page) || 1

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPageClient 
        initialProducts={products} 
        totalCount={totalCount} 
        initialPage={currentPage}
      />
    </Suspense>
  )
}