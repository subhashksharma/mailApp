"use strict";
import nodemailer from "nodemailer";
import ordermail from './orderTemplate';

var tag0 = "key0=value0";
//var tag1 = "key1=value1";

let smtpEndpoint = String(process.env.smtpEndpoint);
let port = Number(String(process.env.smtpPort));
let senderAddress = String(process.env.smtpSenderAddress);
let smtpUsername=process.env.smtpUsername;
let smtpPassword = process.env.smtpPassword;

async function sendOrderMailSuccess(toAddresses: string,
    orderNo: string,
    purchaseItemNo: string,
    purchaseItemCost: string,
    shippingCost: string,
    tax: string ,
    total: string,
    wasSuccessful: boolean
)
{
console.log('sending email................................................................')
console.log(`${smtpEndpoint}-${port}-${senderAddress}`);
  // Create the SMTP transport.
  let transporter = nodemailer.createTransport({
    host: smtpEndpoint,
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpUsername,
      pass: smtpPassword
    }
  });

  let subject = "";
  let body = "";
  let text = ""
    text = "Your order from relentlessstrength.in was successfull";
    subject = ordermail.createOrderSuccessfull(orderNo);
    body = ordermail.createOrderSuccessfullEmailBody({
      orderNo,
      purchaseItemNo,
      purchaseItemCost,
      shippingCost,
      tax,
      total
  })
  // Specify the fields in the email.
  let mailOptions = {
    from: senderAddress,
    to: toAddresses,
    subject: subject,
   // cc: ccAddresses,
  //  bcc: bccAddresses,
    text: text,
    html: body,
    // Custom headers for configuration set and message tags.
    headers: {
     // 'X-SES-CONFIGURATION-SET': configurationSet,
      'X-SES-MESSAGE-TAGS': tag0,
     // 'X-SES-MESSAGE-TAGS': tag1
    }
  };
  // Send the email.
  let info = await transporter.sendMail(mailOptions)
  console.log("Message sent for Successfull order! Message ID: ", info.messageId);
}


async function sendOrderMailUnSuccess(toAddresses: string,
  orderNo: string,
  wasSuccessful: boolean
)
{
console.log('sending unsuccessfull email................................................................')
console.log(`${smtpEndpoint}-${port}-${senderAddress}`);
// Create the SMTP transport.
let transporter = nodemailer.createTransport({
  host: smtpEndpoint,
  port: port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUsername,
    pass: smtpPassword
  }
});

  let subject = "";
  let body = "";
  let text = ""
  text = `Your order #${orderNo}from relentlessstrength.in was unsuccessfull`;
  subject = ordermail.createOrderUnSuccessfull(orderNo);
  body = ordermail.createOrderUnSuccessfullEmailBody(orderNo)

// Specify the fields in the email.
let mailOptions = {
  from: senderAddress,
  to: toAddresses,
  subject: subject,
 // cc: ccAddresses,
//  bcc: bccAddresses,
  text: text,
  html: body,
  // Custom headers for configuration set and message tags.
  headers: {
   // 'X-SES-CONFIGURATION-SET': configurationSet,
    'X-SES-MESSAGE-TAGS': tag0,
   // 'X-SES-MESSAGE-TAGS': tag1
  }
};
// Send the email.
let info = await transporter.sendMail(mailOptions)
console.log("Message sent for unsuccessfull order ! Message ID: ", info.messageId);
}

export default {
  sendOrderMailSuccess,
  sendOrderMailUnSuccess
};