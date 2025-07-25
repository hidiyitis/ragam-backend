import BaseRoutes from "../../base_classes/base-routes.js";
import UserController from "./user-controller.js";

import tryCatch from "../../utils/tryCatcher.js";

class UserRoutes extends BaseRoutes {
    routes() {
        this.router.get("/:uid", [
            tryCatch(UserController.getProductByID)
        ]);
        this.router.post("/s", [
            tryCatch(UserController.createUser)
        ]);
    }
}

export default new UserRoutes().router;