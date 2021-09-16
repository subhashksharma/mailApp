import express, { Request, Response } from "express";
import OrderMailController from '../Controllers/OrderMail.controller';
const router = express.Router();

router.post('/api/send/email/success/:apikey', async (req, res) =>
{
    if (process.env.API_KEY === req.params['apikey']) {
        console.log(`Sending successfull email for ${JSON.stringify(req.body)}`);
        const orderDetail = await OrderMailController.sendOrderMailSuccess(
            req.body.toAddresses,
            req.body.orderNo,
            req.body.purchaseItemNo,
            req.body.purchaseItemCost,
            req.body.shippingCost,
            req.body.tax ,
            req.body.total,
            req.body.wasSuccessful);
          
        return res.send({ orderDetail });
    } else {
        console.log(`Something is wrong, Not sending email for successfull Order => ${JSON.stringify(req.body)}`);
        return res.send({ messsage :"Something is wrong, Not sending email for successfull Order" });
    }
   
});

router.post('/api/send/email/unsuccess/:apikey', async (req, res) =>
{

    //console.log(req.params['id']);
    if (process.env.API_KEY === req.params['apikey']) {
        console.log(`Sending unsuccessfull email for => ${JSON.stringify(req.body)}`);
        const orderDetail = await OrderMailController.sendOrderMailUnSuccess(
        req.body.toAddresses,
        req.body.orderNo,
        req.body.wasSuccessful);
      
    return res.send({ orderDetail });
    } else {
        console.log(`Something is wrong, Not sending email for unsuccessfull Order => ${JSON.stringify(req.body)}`);
        return res.send({ messsage :"Something is wrong, Not sending email for unsuccessfull Order" });
    }
    
});

export { router as mailRoute };