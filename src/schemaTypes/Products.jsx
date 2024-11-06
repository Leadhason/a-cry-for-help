export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Product Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
              hotspot: true,
            },
            validation: Rule => Rule.min(1).error("At least one image is required"),
        },
        {
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: Rule => Rule.required().error("Product name is required"),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
            source: 'name',
            maxLength: 96,
            },
            validation: Rule => Rule.required().error("Slug is required"),
        },
        {
            name: 'description',
            title: 'Product Description',
            type: 'text',
            validation: Rule => Rule.required().error("Product description is required"),
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().precision(2).min(0).error("Price must be a non-negative number with up to two decimal places"),
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [
                {
                type: 'reference',
                to: [{ type: 'category' }],
                },
            ],
            validation: Rule => Rule.required().error("Category is required"),
        },
        {
            name: 'stock',
            title: 'Stock Quantity',
            type: 'number',
            validation: Rule => Rule.min(0).error("Stock must be a non-negative number"),
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
            layout: 'tags',
            },
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            description: 'Date and time when the product is published',
        },
        {
            name: 'variants',
            title: 'Variants',
            type: 'array',
            of: [
            {
                type: 'object',
                fields: [
                {
                    name: 'color',
                    title: 'Color',
                    type: 'string',
                },
                {
                    name: 'size',
                    title: 'Size',
                    type: 'string',
                },
                {
                    name: 'additionalPrice',
                    title: 'Additional Price',
                    type: 'number',
                    description: 'Extra price for this variant if any',
                },
                ],
                preview: {
                select: {
                    title: 'color',
                    subtitle: 'size',
                },
                },
            },
            ],
        },
    ],
    preview: {
      select: {
        title: 'name',
        media: 'image.0',
        subtitle: 'category.name',
      },
    },
  };
  