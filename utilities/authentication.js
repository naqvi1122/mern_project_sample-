import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import jwt_decode from 'jwt-decode'
dotenv.config()
import db from '../models/index.js'

const generateAccessToken = async (_payload, isAdmin) => {
    const payload = { id: _payload.id, isAdmin: isAdmin }
    return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

const generateAccessTokenAutoLogin = async (_payload) => {
    const payload = { id: _payload.id }
    return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '2d' }) // 60 days expiry time
}

// const generateRefreshToken = async (_payload) => {
//     const payload = {id: _payload.id}
//     const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY}s`
//     })
//     return {
//         refreshToken: token,
//         refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRY
//     }
// }

const verifyAuthToken = () => {
    return async (req, res, next) => {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(403).send({ message: 'Token not found' })
        } else {
            const tokenBody = token.slice(7)
            const decoded = jwt_decode(tokenBody)
            const u_id = decoded.payload.id
            const user = await db.User.findOne({ where: { id: u_id } })
            // console.log('req.body.is_signup', req.body)
            // if (user && !user?.is_verify_admin && !req.body.is_signup) {
            //     return res.status(403).send({message: `Votre compte n'a pas encore été vérifié. Veuillez patienter ou contacter l'administrateur`})
            // }

            if (user && user?.blocked) {
                return res.status(403).send({ message: `You are blocked. Please contact the administrator` })
            }
            jwt.verify(tokenBody, process.env.JWT_SECRET, (error) => {
                if (error) {
                    return res.status(401).send({ message: 'Access denied, token expired' })
                }
                next()
            })
        }
    }
}

const verifyAdminAuthToken = () => {
    return async (req, res, next) => {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(403).send({ message: 'Token not found' })
        } else {
            const tokenBody = token.slice(7)
            const decoded = jwt_decode(tokenBody)
            if (decoded?.payload?.isAdmin) {
                jwt.verify(tokenBody, process.env.JWT_SECRET, (error) => {
                    if (error) {
                        return res.status(401).send({ message: 'Access denied, token expired' })
                    }
                    next()
                })
            } else {
                return res.status(401).send({ message: 'Access denied, not a valid token' })
            }
        }
    }
}

const getUserIdFromToken = async (req) => {
    try {
        const token = req.header('authorization')
        const tokenBody = token.slice(7)
        const decoded = jwt_decode(tokenBody)
        const u_id = decoded.payload.id
        return u_id
    } catch (error) {
        return false
    }
}

export { generateAccessToken, verifyAuthToken, getUserIdFromToken, generateAccessTokenAutoLogin, verifyAdminAuthToken }
