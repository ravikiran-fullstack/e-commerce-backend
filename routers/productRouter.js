import express from "express";
import expresAsynHanler from "express-async-handler";

import Product from "../models/productModel.js";
import data from "../data.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expresAsynHanler(async (req, res) => {
    const allProducts = await Product.find({});
    return res.send(allProducts);
  })
);

productRouter.get(
  "/seed",
  expresAsynHanler(async (req, res) => {
    console.log("saving all products to mongodb cluster");
    //await Product.remove();
    const createdProducts = await Product.insertMany(data.products);
    return res.send({ products: createdProducts });
  })
);

productRouter.get(
  "/:id",
  expresAsynHanler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.productId = product._id;
    if (product) {
      return res.send(product);
    } else {
      return res.status(404).send({ message: "No product found" });
    }
  })
);

export default productRouter;
