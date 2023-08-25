import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

//使用dotenv來讀取環境變數 .env檔案 這裡的config是dotenv的一個方法
dotenv.config();

//使用mongoose來連接MongoDB 這裡的connect是mongoose的一個方法
//process.env.MONGODB_URI是從.env檔案中讀取的
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB 連接成功');
  })
  .catch((error) => {
    console.log('MongoDB 連接失敗');
    console.log(error);
  });

const app = express();

//locoal
// app.get('/api/products/', (req, res) => {
//   res.send(data.products);
// });
// app.get('/api/products/slug/:slug', (req, res) => {
//   const product = data.products.find((x) => x.slug === req.params.slug);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// });

// app.get('/api/products/:id', (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// });

// 使用環境變數
// 如果沒有設定環境變數，就使用預設的 5000
// 如果有設定環境變數，就使用設定的 port

//test

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`後端伺服器 啟動於 http:/localhost:${port}`);
});