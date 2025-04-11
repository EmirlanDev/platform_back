"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const authMiddleware_1 = __importDefault(require("./../../middleware/authMiddleware"));
const passport_1 = __importDefault(require("passport"));
require("../../services/passportSetup");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.default.register);
router.post("/login", auth_controller_1.default.login);
router.post("/logout", auth_controller_1.default.logout);
router.put("/edit/:id", authMiddleware_1.default, auth_controller_1.default.editUser);
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
}), auth_controller_1.default.signWithGoogle);
exports.default = router;
