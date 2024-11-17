import { client } from '../../../../lib/sanityClient'
import ProductDetails from './ProductDetails'

const getProduct = async (slug) => {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    description,
    image,
    price,
    specification,
    slug,
    reviews,
  }`
  return await client.fetch(query, { slug })
}

export default async function Page({ params }) {
  const product = await getProduct(params.slug)
  return <ProductDetails product={product} />
}