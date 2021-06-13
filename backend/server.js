import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import './database.js'
import cors from 'cors';
import database from './database.js';
import userRouter from './routers/users.router.js';
import productRouter from './routers/products.router.js';



const app = express();

//Connecting DB
database()

//middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

// ROUTES //

// users router
app.use('/api/users', userRouter)



//products router
app.use('/api/products', productRouter)



const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server is running'))
