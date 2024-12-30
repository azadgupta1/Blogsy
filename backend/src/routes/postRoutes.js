import express from 'express';
import { createPost, getAllPost } from '../controllers/postController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();


router.post('/', authenticate, createPost);

router.get('/', authenticate, getAllPost);

router


export default router;