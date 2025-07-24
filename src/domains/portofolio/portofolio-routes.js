import BaseRoutes from "../../base_classes/base-routes.js";
import PortofolioController from "./portofolio-controller.js";

import tryCatch from "../../utils/tryCatcher.js";
import { upload } from "./portofolio-helper.js";

class PortofolioRoutes extends BaseRoutes {
    routes() {
        this.router.get("/:uid", [
            tryCatch(PortofolioController.getProductByID)
        ]);
        this.router.post("/:uid", [
            upload.single('image'),
            tryCatch(PortofolioController.createPortofolio)
        ]);
    }
}

export default new PortofolioRoutes().router;