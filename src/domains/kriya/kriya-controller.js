import { successResponse } from "../../utils/response.js";
import KriyaService from "./kriya-service.js";

class KriyaController {
    async getKriya(req, res) {
        const {search, limit, isRare, page} =req.query
        const payload = {
            search, limit, isRare, page
        }
        const result = await KriyaService.getKriya(payload);
        return successResponse(res, result.data, "Get Kriya Successful", result.pagination);
    }

    async getKriyaById(req, res){
        const {id} = req.params
        const payload = {id};
        const result = await KriyaService.getKriyaById(payload);
        return successResponse(res, result,'Get Kriya By ID Successful');
    }
    
    async getKriyaByName(req, res){
        const {title} = req.query
        const payload = {
            title
        };
        const result = await KriyaService.getKriyaByName(payload);
        return successResponse(res, result,'Get Kriya By Title Successful');
    }
}

export default new KriyaController();