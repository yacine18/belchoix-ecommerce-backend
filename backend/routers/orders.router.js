import express from express;
import { isAuth } from '../utils.js'
import Order from '../models/Order.model.js'

const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
})

orderRouter.post('/', isAuth, async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.send(400).send({ message: 'Cart is Empty!' })
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        })

        const createdOrder = await order.save();
        res.status(201).send({ message: 'Order Created!', order: createdOrder })
    }
})