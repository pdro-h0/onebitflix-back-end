import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";

export const episodeController = {
   // GET /episodes/stream
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;

    try {
      if (typeof videoUrl !== "string")
        throw new Error('"videoUrl" precisa ser do tipo "string"');

        const range = req.headers.range;

        episodeService.streamEpisodeToResponse(res, videoUrl, range)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
          }
    }
  },
};
