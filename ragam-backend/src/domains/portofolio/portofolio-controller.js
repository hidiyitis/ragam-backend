import { successResponse } from "../../utils/response.js";
import PortofolioService from "./portofolio-service.js";

class PortofolioController {
    async getProductByID(req, res) {
        const {uid} =req.params;
        const payload = {
            uid
        }
        const result = await PortofolioService.getListPortofolio(payload);
        return successResponse(res, result, "Get Portofolio Successful");
    }
    async createPortofolio(req, res) {
        const {uid} =req.params;
        const payload = {
            uid,
            file: req.file
        }
        
        
        const result = await PortofolioService.createPortofolio(payload);
        return successResponse(res, result, "Create Portofolio Successful");
    }
}

export default new PortofolioController();