import * as userServices from '../services/userServices.js'
import responseUtil from '../utilities/response.js'


const loginUser = async (req, res) => {
    const response = await userServices.userLogin(req)
    if (response.status) {
        return responseUtil.successResponse(res, response.message, {
            user_detail: response.data
        })
    } else {
        return responseUtil.validationErrorResponse(res, response.message)
    }
}

export{loginUser}