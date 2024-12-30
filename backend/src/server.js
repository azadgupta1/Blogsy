import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.get('/', (req, res) =>{
    res.send("Welcome to Blogsy!");
});


app.listen(PORT, () =>{
    console.log("Server is running on port "+PORT);
});