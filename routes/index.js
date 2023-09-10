
import * as userRoute from './user_route.js'
import express from 'express'

const router = express.Router()

router.use('/user', userRoute.router)

export { router }