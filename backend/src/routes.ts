import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// -- ROTAS USER --

// Create User
router.post("/users", new CreateUserController().handle);

// User Login
router.post("/session", new AuthUserController().handle);

// User Details
router.get("/me", isAuthenticated, new DetailUserController().handle);

export { router };
