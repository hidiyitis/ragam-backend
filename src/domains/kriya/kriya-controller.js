import { successResponse } from "../../utils/response.js";
import KriyaService from "./kriya-service.js";

class KriyaController {
    async getKriya(req, res) {
        const {search, limit} =req.query
        const payload = {
            search, limit
        }
        const result = await KriyaService.getKriya(payload);
        return successResponse(res, result, "Get Kriya Successful");
    }
}

export default new KriyaController();