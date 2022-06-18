import { Request, Router, Response } from "express";
import { deleteLocalFiles, filterImageFromURL } from "../../../../util/util";
import { authenticate } from "../../users/routes/auth.router";

const router: Router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
    const { image_url } = req.query;
    const { imageurl } = req.headers;

    if (!image_url && !imageurl) return res.status(400).send('Invalid Image Url');

    const url = image_url ?? imageurl;

    try {
        const image_path = await filterImageFromURL(url as string);
        res.sendFile(image_path, () => {
            image_url && deleteLocalFiles([image_path]);
        });
    } catch (error) {
        console.error(error);
        return res.status(422).send("something went wrong; try using another URL");
    }
});

export const FilteredRouter = router;