import express,{Express,Request,Response} from 'express';
import colorsRouter from './routes/colors'
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(colorsRouter)
app.use(cors())

  app.use((error: any, req: Request, res: Response, next: any) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  })
  
  export default app;


