import express, { Request, Response } from "express";
import OrderMailController from '../Controllers/OrderMail.controller';
const router = express.Router();

router.post('/api/sendOrderEmail', async (req, res) =>
{
    console.log(`I am going to send order email for ${JSON.stringify(req.body)}`);
    const orderDetail = await OrderMailController.sendOrderMail(
        req.body.toAddresses,
        req.body.orderNo,
        req.body.purchaseItemNo,
        req.body.purchaseItemCost,
        req.body.shippingCost,
        req.body.tax ,
        req.body.total,
    req.body.wasSuccessful);
      
    return res.send({ orderDetail });
});



export { router as mailRoute };