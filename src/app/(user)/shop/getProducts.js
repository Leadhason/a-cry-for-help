import { client } from '../../../lib/sanityClient'

export async function getAllProducts() {
  const AllProductsQuery = `*[_type == "product" && defined(category)]{
    _id,
    name,
    description,
    image,
    price,
    slug,
    brand,
    tags,
    "categories": category[]->{
      _id,
      title
    },
  }`
  
  const totalCountQuery = `count(*[_type == "product"])`

  const [products, totalCount] = await Promise.all([
    client.fetch(AllProductsQuery),
    client.fetch(totalCountQuery)
  ])

  return { products, totalCount }
}