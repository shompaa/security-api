import express from "express";
import { check } from 'express-validator';
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/index.controller.js';
import { JWTValidation, Validation } from '../middlewares/index.middleware.js';

const router = express.Router();

router.get('/', JWTValidation ,getUsers );
router.get('/:id', JWTValidation ,getUser);
router.get('/search/:search', JWTValidation ,getUsers);
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty().isLength({ min: 6 }),
        Validation,
    ] ,
    addUser
);
router.put('/:id', 
    [
        JWTValidation,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        Validation
    ], 
    updateUser
);
router.delete('/:id',JWTValidation, deleteUser);

export default router;
