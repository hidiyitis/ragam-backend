import { successResponse } from "../../utils/response.js";
import ProductService from "./product-service.js";

class KriyaController {
    async getListProduct(req, res) {
        const {search, limit, page} =req.query;
        const payload = {
            search, limit, page
        }
        const result = await ProductService.getListProduct(payload);
        return successResponse(res, result.data, "Get Products Successful", result.pagination);
    }
    async getProductByID(req, res) {
        const {id} =req.params;
        const payload = {
            id
        }
        const result = await ProductService.getProductById(payload);
        return successResponse(res, result, "Get Products Successful");
    }
}

export default new KriyaController();