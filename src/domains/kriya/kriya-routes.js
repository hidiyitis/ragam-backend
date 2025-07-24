import BaseRoutes from "../../base_classes/base-routes.js";
import KriyaController from "./kriya-controller.js";

import tryCatch from "../../utils/tryCatcher.js";

class KriyaRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            tryCatch(KriyaController.getKriya)
        ]);
    }
}

export default new KriyaRoutes().router;