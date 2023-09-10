
import express from 'express'
import * as userController from '../controller/userController.js'
const router = express.Router()





router.post('/register',userController.loginUser )
export {router}