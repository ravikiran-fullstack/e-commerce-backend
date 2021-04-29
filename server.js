import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

import mongoose from 'mongoose';
import orderRouter from './routers/orderRouter.js';
const mongoURI = `${process.env.mongoURI}`;
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const connectToMongoDb = async () => {
  try {
    const result = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(process.env.PORT || 5000, "0.0.0.0");
    console.log(`Back end server running on ${process.env.PORT}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

connectToMongoDb();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));



// app.get('/sync-test', (req, res) => {
//   throw new Error('Error from synchronous code!');
// });

// const asyncFn = () => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       rej(new Error("error occurred in async call"));
//     }, 1000);
//   });
// };

// app.get("/async-test-1", async (req, res) => {
//   await asyncFn();
//   res.json({ well: `We're not going to reach this line.` });
// });

// app.get("/async-test-2", async (req, res, next) => {
//   try {
//     await asyncFn();
//     res.json({ well: `We're not going to reach this line.` });
//   } catch (error) {
//     next(error);
//   }
// });

// app.get("/async-test-3", expresAsynHanler(async (req, res) => {
//   await asyncFn();
//   res.json({well: 'we will not reach this line'});
// }))

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.use((err, req, res, next)=> {
  res.status(500).send({message: err.message});
})