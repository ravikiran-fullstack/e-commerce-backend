import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils/utils.js";

const orderRouter = express.Router();

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
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

export default orderRouter;
