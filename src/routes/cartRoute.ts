import exprees from 'express';
import { getActiveCartForUser } from '../services/cartService';
import validateJWT, { AuthenticatedRequest } from '../middlewares/validateJWT';
const router = exprees.Router();


router.get('/',validateJWT, async (request:AuthenticatedRequest, response) => {
    const userId = request.user._id;
    const cart = await getActiveCartForUser({userId});
    response.status(cart.statuscode || 500).send(cart.data);
}
);




export default router;