import express from 'express';
import { createCheckoutSession, retrieveSessionStatus } from '../application/payment';
import { isAuthenticated } from './middleware/authentication_middleware';


const paymentRouter = express.Router();
paymentRouter.route('/create-checkout-session').post(createCheckoutSession);
paymentRouter.route('/session-status').get(retrieveSessionStatus);
export default paymentRouter;