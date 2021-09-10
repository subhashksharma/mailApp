import User,{ IUser } from '../Models/User.model';
import mailCheck from './mailcheck';

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
        mailCheck.main('subhash.bvb@gmail.com');
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
  
  export default {
    CreateUser
  };