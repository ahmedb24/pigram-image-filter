"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = require("express");
const filteredImage_router_1 = require("./filteredImage/routes/filteredImage.router");
const auth_router_1 = require("./users/routes/auth.router");
const router = (0, express_1.Router)();
router.use('/filteredImage', filteredImage_router_1.FilteredRouter);
router.use('/auth', auth_router_1.AuthRouter);
/**
 * Displays A Simple Message To The User
 */
router.get('/', (req, res) => {
    res.send("try GET /api/v0/filteredimage?image_url={{}}");
});
exports.IndexRouter = router;
//# sourceMappingURL=index.router.js.map