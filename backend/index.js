const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./Routes/product.routes");
const authRouter = require("./Routes/auth.routes");
const userRouter = require("./Routes/user.routes");
const cartRouter = require("./Routes/cart.routes");
const orderRouter = require("./Routes/order.routes");
const paymentRoute = require("./Routes/payment.routes");


dotenv.config();


const app = express();
const port = process.env.PORT || 3001


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use('/api/products',productRouter)
app.use('/api/',authRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)
app.use('/api/cart',cartRouter)
app.use('/api/payments', paymentRoute);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
