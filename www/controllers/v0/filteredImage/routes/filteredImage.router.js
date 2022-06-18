"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteredRouter = void 0;
const express_1 = require("express");
const util_1 = require("../../../../util/util");
const auth_router_1 = require("../../users/routes/auth.router");
const router = (0, express_1.Router)();
router.get('/', auth_router_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image_url } = req.query;
    const { imageurl } = req.headers;
    if (!image_url && !imageurl)
        return res.status(400).send('Invalid Image Url');
    const url = image_url !== null && image_url !== void 0 ? image_url : imageurl;
    try {
        const image_path = yield (0, util_1.filterImageFromURL)(url);
        res.sendFile(image_path, () => {
            image_url && (0, util_1.deleteLocalFiles)([image_path]);
        });
    }
    catch (error) {
        console.error(error);
        return res.status(422).send("something went wrong; try using another URL");
    }
}));
exports.FilteredRouter = router;
//# sourceMappingURL=filteredImage.router.js.map