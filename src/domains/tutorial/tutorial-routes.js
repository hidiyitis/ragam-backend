import BaseRoutes from "../../base_classes/base-routes.js";
import TutorialController from "./tutorial-controller.js";

import tryCatch from "../../utils/tryCatcher.js";

class ProductRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            tryCatch(TutorialController.getListProduct)
        ]);
    }
}

export default new ProductRoutes().router;