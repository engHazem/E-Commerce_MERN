import exprees from 'express';
import { addItemToCart, getActiveCartForUser, updateItemInCart } from '../services/cartService';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import validateJWT from '../middlewares/validateJWT';
const router = exprees.Router();


router.get('/',validateJWT, async (request:AuthenticatedRequest, response) => {
    const userId = request.user._id;
    const cart = await getActiveCartForUser({userId});
    response.status(200).send(cart);
}
);

router.post('/items',validateJWT, async (request:AuthenticatedRequest, res) => {
    const userId = request.user._id;
    const {productId, quantity} = request.body;
    const response = await addItemToCart({userId,productId, quantity});
    res.status(response.statuscode || 500).send(response.data);
}
);

router.put ('/items',validateJWT, async (request:AuthenticatedRequest, response) => {
    const userId = request.user._id;
    const {productId, quantity} = request.body;
    const responseData = await updateItemInCart({userId,productId, quantity});
    response.status(responseData.statuscode || 500).send(responseData.data);
}
);

export default router;