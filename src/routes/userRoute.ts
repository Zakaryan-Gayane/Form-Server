import { Router } from 'express';
import UserController from '../controller/userController';

const router: Router = Router();
router
    .get('/course/:course',UserController.getByCourse)
    .get('/user/:email',UserController.getByEmail)
    .post('/register', UserController.register)
export { router as UserRoute };

