import { Request, Response, Router } from "express";
import { FilteredRouter } from "./filteredImage/routes/filteredImage.router";

const router: Router = Router();

router.use('/filteredImage', FilteredRouter);

router.get('/', (req: Request, res: Response) => {
    res.send("try GET /api/v0/filteredimage?image_url={{}}")
});

export const IndexRouter = router;