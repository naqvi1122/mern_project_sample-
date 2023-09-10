import express from 'express'
import cors from 'cors'
import * as routes from './routes/index.js'
import {db} from './database/db.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/chat_app', routes.router)



app.listen(8080, () => console.log("server1 is runing on port 8080"));