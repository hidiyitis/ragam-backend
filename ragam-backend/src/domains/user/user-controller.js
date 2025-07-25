import { successResponse } from "../../utils/response.js";
import UserService from "./user-service.js";

class UserController {
    async getProductByID(req, res) {
        const {uid} =req.params;
        const payload = {
            uid
        }
        const result = await UserService.getUserById(payload);
        return successResponse(res, result, "Get User Successful");
    }
    async createUser(req, res) {
        const {uid} =req.body;
        const payload = {
            uid
        }
        const result = await UserService.createUser(payload);
        return successResponse(res, result, "Create User Successful");
    }
}

export default new UserController();