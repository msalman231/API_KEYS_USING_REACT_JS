import {Router} from "express";
import authorize from "../middleware/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req, res) => res.send({title:'Get All subscribtions'}));

subscriptionRouter.get('/:id',(req, res) => res.send({title:'Get subscribtions details'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id',(req, res) => res.send({title:'Update subscribtions'}));

subscriptionRouter.delete('/:id',(req, res) => res.send({title:'Delete subscribtions'}));

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);

subscriptionRouter.put('/:id/cancel',(req, res) => res.send({title:'Cancel subscribtions'}));

subscriptionRouter.get('/upcoming-renewals',(req, res) => res.send({title:'Get Upcoming subscribtions'}));



export default subscriptionRouter;

