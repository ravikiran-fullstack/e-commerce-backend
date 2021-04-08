import express from 'express';
import cors from 'cors';

import productsData from './data.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('server is ready');
})

app.get('/api/products', (req, res) => {
    res.send(productsData.products);
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})