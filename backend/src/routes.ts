import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROUTES USER --

// Create User
router.post("/users", new CreateUserController().handle);

// User Login
router.post("/session", new AuthUserController().handle);

// User Details
router.get("/me", isAuthenticated, new DetailUserController().handle);

// -- ROUTES CATEGORY --

// Create Category
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

// List Categories
router.get("/category", isAuthenticated, new ListCategoryController().handle);

// -- ROUTER PRODUCT --

// Create Product
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

// List Products where category

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

// --- ROUTES ORDER --

// Create Order
router.post("/order", isAuthenticated, new CreateOrderController().handle);

// Delete Order
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);

// Add Item Order

router.post("/order/add", isAuthenticated, new AddItemController().handle);

// Remove Item Order

router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveItemController().handle
);

export { router };
