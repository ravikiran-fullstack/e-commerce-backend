import express from "express";
import expressAsyncHandler from "express-async-handler";

import Razorpay from 'razorpay';

import Order from "../models/orderModel.js";
import { isAuth } from "../utils/utils.js";

const razorpay = new Razorpay({
	key_id: 'rzp_test_VKqXxTBwRHLnZd',
	key_secret: 'U5eKdMpWZFkSBPlmh8SfRXGx'
})

const orderRouter = express.Router();

orderRouter.post('/razorpay', async (req, res) => {
  const orderId = req.body.orderId;
  console.log('orderId',orderId, req.body);
	const payment_capture = 1
	const currency = 'INR'


	try {
    const order = await Order.findById(orderId);
    console.log(order);
    const options = {
      amount: order.totalPrice * 100,
      currency,
      receipt: orderId,
      payment_capture
    }

		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
      key: process.env.KEY
		})
	} catch (error) {
		console.log(error);
    return res.status(404).send({message: error})
	}
})


orderRouter.post("/", isAuth, expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    if (req.body.orderItems.length === 0) {
      return res.status(400).send({ message: "Cart is empty" });
    } else {
      
      console.log("-----------------------------");
      
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });

      const createdOrder = await order.save();
      console.log("created ", createdOrder);

      res.status(201).send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get('/all', isAuth, expressAsyncHandler(async (req, res) => {
  console.log(req.user._id);

  const allOrders = await Order.find({ user: req.user._id});
  console.log('allOrders',allOrders);
  return res.status(200).send({orders: allOrders});
}))


orderRouter.get('/:orderId', isAuth, expressAsyncHandler(async (req, res) => {
  console.log('orderId',req.params.orderId);

  try {
    const order = await Order.findById(req.params.orderId);
    return res.status(200).send({order});  
  } catch (error) {
    return res.status(404).send({message: 'Order Not Found'})
  }
  
}))


export default orderRouter;
