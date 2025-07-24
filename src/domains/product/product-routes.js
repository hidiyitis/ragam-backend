import BaseRoutes from "../../base_classes/base-routes.js";
import ProductController from "./product-controller.js";

import tryCatch from "../../utils/tryCatcher.js";

class ProductRoutes extends BaseRoutes {
    routes() {
        this.router.get("/", [
            tryCatch(ProductController.getListProduct)
        ]);
        this.router.get("/:id", [
            tryCatch(ProductController.getProductByID)
        ]);
    }
}

export default new ProductRoutes().router;