export default {
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Product Name',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Product Description',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'image',
            title: 'Product Image',
            type: 'image',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        },
    ],
};