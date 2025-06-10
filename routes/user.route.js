import {Router} from 'express';
import {getUser, getUsers} from "../controller/user.controller.js";
import authorize from "../middleware/auth.middleware.js";
const userRouter = Router();

userRouter.get('/',getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({title:'Create new users'}));

userRouter.put('/:id', (req, res) => res.send({title:'Update user by Id'}));

userRouter.delete('/:id', (req, res) => res.send({title:'Delete user by ID'}));

export default userRouter;