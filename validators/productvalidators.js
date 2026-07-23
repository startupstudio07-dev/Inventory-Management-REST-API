const {z} = require("zod")


const productSchema = z.object({

    name: z.string().min(1),

    price: z.coerce.number().positive(),

    stock: z.coerce.number().int().nonnegative()

});

module.exports  = productSchema ;