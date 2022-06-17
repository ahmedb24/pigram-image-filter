import { Request, Router, Response } from "express";
import { deleteLocalFiles, filterImageFromURL } from "../../../../util/util";

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {

});

export const FilteredRouter = router;