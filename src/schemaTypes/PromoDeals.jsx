export default {
  name: 'promodeals',
  title: 'PromoDeals',
  type: 'document',
  fields: [
      {
          name: 'name',
          title: 'Product Name',
          type: 'string',
          validation: Rule => Rule.required(),
      },
      {
          name: 'image',
          title: 'Product Image',
          type: 'image',
          validation: Rule => Rule.required(),
      },
      {
        name: 'discount',
        title: 'Discount',
        type: 'number',
        validation: Rule => Rule.required(),
    },
  ]
}