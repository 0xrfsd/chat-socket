import express from 'express';

// controllers
import users from '../controllers/user.js';

// middlewares 
import { encodde } from '../middlewares/jwt.js';

const router = express.Router();

router
    .post('/login/:userId', encode, (req, res, next) => { });

export default router;