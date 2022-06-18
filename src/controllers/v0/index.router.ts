import { Request, Response, Router } from "express";
import { FilteredRouter } from "./filteredImage/routes/filteredImage.router";
import { AuthRouter } from "./users/routes/auth.router";

const router: Router = Router();

router.use('/filteredImage', FilteredRouter);
router.use('/auth', AuthRouter);

/**
 * Displays A Simple Message To The User
 */
router.get('/', (req: Request, res: Response) => {
    res.send("try GET /api/v0/filteredimage?image_url={{}}")
});

export const IndexRouter = router;