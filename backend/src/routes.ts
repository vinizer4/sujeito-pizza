import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

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

export { router };
