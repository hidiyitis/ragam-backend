import { successResponse } from "../../utils/response.js";
import TutorialService from "./tutorial-service.js";

class TutorialController {
    async getListProduct(req, res) {
        const result = await TutorialService.getListTutorial();
        return successResponse(res, result, "Get Products Successful");
    }
}

export default new TutorialController();