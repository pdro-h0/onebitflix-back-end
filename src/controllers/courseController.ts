import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { Course } from "../models";

export const courseController = {
    //GET /course/featured
    featured: async (req: Request, res: Response)=>{
        try {
          const featuredCourses = await courseService.getRandomFeaturedCourses()
          
          return res.json(featuredCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
              }
        }
    },

      //GET /course/newest
      newest: async(req: Request, res:Response)=>{
        try {
            const newestCourses  = await courseService.getTopTenNewest()

            return res.json(newestCourses)

          } catch (error) {
              if (error instanceof Error) {
                  return res.status(400).json({ message: error.message });
                }
          }
      },

    //GET /course/:id
    show: async (req: Request, res: Response)=>{
        const { id } = req.params

        try {
            const course = await courseService.findByIdWithEpisodes(id)

            return res.json(course)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
              }
        }
    },

}