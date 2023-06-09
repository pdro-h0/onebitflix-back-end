import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";
import { favoriteService } from "../services/favoriteService";

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

  // GET /courses/popular
  popular: async (req: Request, res: Response) => {
    try {
      const topTen = await courseService.getTopTenByLikes();
      return res.json(topTen);
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
  show: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId = req.params.id;

    try {
      const course = await courseService.findByIdWithEpisodes(courseId);

      if (!course)
        return res.status(404).json({ message: "Curso não encontrado" });

      const liked = await likeService.isLiked(userId, Number(courseId));
      const favorited = await favoriteService.isFavorited(
        userId,
        Number(courseId)
      );

      return res.json({ ...course.get(), favorited, liked });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
