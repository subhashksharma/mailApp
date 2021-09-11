import User,{ IUser } from '../Models/User.model';
//import mailCheck from './mailcheck';
import OrderMail from './OrderMail.controller';
interface ICreateUserInput {
    email: IUser['email'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
}

async function CreateUser({
    email,
    firstName,
    lastName
  }: ICreateUserInput): Promise<IUser> {
    return User.create({
      email,
      firstName,
      lastName
    })
      .then((data: IUser) =>
      {
        /*toAddresses: string,
    orderNo: string,
    purchaseItemNo: string,
    purchaseItemCost: string,
    shippingCost: string,
    tax: string ,
    total: string
    */
        OrderMail.sendOrderMail('snipgard@gmail.com', '12334444', '3' , '1200', '100', '50', '15000');
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
  
  export default {
    CreateUser
  };