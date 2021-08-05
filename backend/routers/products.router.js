import express from 'express';
import multer from 'multer';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.model.js';

const productRouter = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
})

const upload = multer({ storage });

// get all products
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const name = req.query.name || ''
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};

    const products = await Product.find({
        ...nameFilter,
    });

    if (products) {
        res.send(products);
    } else {
        res.status(404).send({ message: 'No Products Found!' });
    }
}))

// create new product
productRouter.post('/', upload.single('image'), expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.file.path,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        description: req.body.description
    })

    const createdProduct = await product.save();
    res.send({ message: 'Product Created!', product: createdProduct })
}))

// get product by id
productRouter.get('/:id', expressAsyncHandler( async (req, res) => {

    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'No Products Found!' });
    }

}));




export default productRouter;