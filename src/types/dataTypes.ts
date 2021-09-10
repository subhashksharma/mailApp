import { Application } from 'express';
 type RoutesInput = {
  app: Application;
};

 type DBInput = {
  db: string;
};


export { RoutesInput, DBInput }