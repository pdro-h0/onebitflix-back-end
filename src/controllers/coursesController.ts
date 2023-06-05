import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const coursesController = {
  //GET /course/featured
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses();

      return res.json(featuredCourses);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //GET /course/newest
  newest: async (req: Request, res: Response) => {
    try {
      const newestCourses = await courseService.getTopTenNewest();

      return res.json(newestCourses);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //GET /course/search
  search: async (req: Request, res: Response) => {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      if (typeof name !== "string")
        throw new Error('o parametro "name" precisa ser do tipo "string"');

      const courses = await courseService.findByName(name, page, perPage);
      return res.json(courses);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //GET /course/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const course = await courseService.findByIdWithEpisodes(id);

      return res.json(course);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
