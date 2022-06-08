import { Router } from 'express';
import {addColor, getColors,updateColor, deleteColor,updateColorWithVotes} from '../controllers/colors'

const colorsRouter: Router = Router();

colorsRouter.get('/colors',getColors)
colorsRouter.post('/add-color',addColor)
colorsRouter.put('/edit-color/:id',updateColor)
colorsRouter.put('/edit-color-vote/:id',updateColorWithVotes)
colorsRouter.delete('/delete-color/:id',deleteColor)

export default colorsRouter;

