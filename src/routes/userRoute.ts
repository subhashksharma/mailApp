import express, { Request, Response } from "express";
import { body } from "express-validator";

//import { RoutesInput } from '../types/dataTypes';
import UserController from '../Controllers/User.controller';


const router = express.Router();

router.post('/api/user', async (req, res) =>
{
    console.log(' I am here ')
    const user = await UserController.CreateUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
      
    return res.send({ user });
});



export { router as userRoute };