"use strict";
import nodemailer from "nodemailer";
const smtpEndpoint = "email-smtp.us-east-2.amazonaws.com";
const port = 587;
const senderAddress = "Relentlessstrength Order<ordermaster@relentlessstrength.in>";

import ordermail from './orderTemplate';
//var ccAddresses = "cc-recipient0@example.com,cc-recipient1@example.com";
//var bccAddresses = "bcc-recipient@example.com";

const smtpUsername="TEST";
const smtpPassword = "TEST";

// The subject line of the email
//var subject = "Your order is confirmed.";

// The email body for recipients with non-HTML email clients.
//var body_text = `Your order is confirmed`;

// The body of the email for recipients whose email clients support HTML content.
//var body_html = `tesst`;

// The message tags that you want to apply to the email.
var tag0 = "key0=value0";
//var tag1 = "key1=value1";

async function sendOrderMail(toAddresses: string,
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
  if (wasSuccessful) {
    text = "Your order from relentlessstrength.in was successfull";
    subject = ordermail.createOrderSuccessfull(orderNo);
    body = ordermail.createOrderSuccessfullEmailBody({
      orderNo,
      purchaseItemNo,
      purchaseItemCost,
      shippingCost,
      tax,
      total,
      wasSuccessful
  })
  } else {
    text = "Your order from relentlessstrength.in was unsuccessfull";
    subject = ordermail.createOrderUnSuccessfull(orderNo);
    body = ordermail.createOrderUnSuccessfullEmailBody({
      orderNo,
      purchaseItemNo,
      purchaseItemCost,
      shippingCost,
      tax,
      total,
      wasSuccessful
  })
  }
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

  console.log("Message sent! Message ID: ", info.messageId);
}

export default {
    sendOrderMail
};