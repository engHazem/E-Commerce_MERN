import exprees from 'express';
import { addItemToCart, checkout, DeleteAllItemsInCart, DeleteItemInCart, getActiveCartForUser, updateItemInCart } from '../services/cartService';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import validateJWT from '../middlewares/validateJWT';
const router = exprees.Router();


router.get('/',validateJWT, async (request:AuthenticatedRequest, response) => {
  try{
    const userId = request.user._id;
    const cart = await getActiveCartForUser({userId,populateProduct:true});
    response.status(200).send(cart);
  }
    catch(error){
        response.status(500).send('Internal server error');
    }
}
);

router.post('/items',validateJWT, async (request:AuthenticatedRequest, res) => {
  try{
    const userId = request.user._id;
    const {productId, quantity} = request.body;
    const response = await addItemToCart({userId,productId, quantity});
    res.status(response.statuscode).send(response.data);
  }
    catch(error){
        res.status(500).send('Internal server error');
    }
}
);

router.put ('/items',validateJWT, async (request:AuthenticatedRequest, response) => {
   try{
    const userId = request.user._id;
    const {productId, quantity} = request.body;
    const responseData = await updateItemInCart({userId,productId, quantity});
    response.status(responseData.statuscode).send(responseData.data);
   }
    catch(error){
     response.status(500).send('Internal server error');
    }
}
);

router.delete('/items/:productId',validateJWT, async (request:AuthenticatedRequest, response) => {
   try{
    const userId = request.user._id;
    const {productId} = request.params;
    const responseData = await DeleteItemInCart({userId,productId});
    response.status(responseData.statuscode || 500).send(responseData.data);
   }
    catch(error){
     response.status(500).send('Internal server error');
    }
    
}
);
router.delete('/',validateJWT, async (request:AuthenticatedRequest, response) => {
   try{
    const userId = request.user._id;
    const responseData = await DeleteAllItemsInCart({userId});
    response.status(responseData.statuscode || 500).send(responseData.data);
   }
    catch(error){
     response.status(500).send('Internal server error');
    }
    
}
);
router.post('/checkout',validateJWT, async (request:AuthenticatedRequest, response) => {
  try{
    const userId = request.user._id;
    const {address} = request.body; 
    const responseData = await checkout({userId,address});
    response.status(responseData.statuscode).send(responseData.data);
  }
    catch(error){
     response.status(500).send('Internal server error');
    }
}
);

export default router;