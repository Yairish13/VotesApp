import { Router } from 'express';
import {addColor, getColors,updateColor, deleteColor} from '../controllers/colors'

const colorsRouter: Router = Router();

colorsRouter.get('/colors',getColors)
// colorsRouter.get('/colors/max',getMaxVotesColor)
colorsRouter.post('/add-color',addColor)
colorsRouter.put('/edit-color/:id',updateColor)
colorsRouter.delete('/delete-color/:id',deleteColor)

export default colorsRouter;

