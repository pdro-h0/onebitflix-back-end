import { Response } from 'express'
import { likeService } from '../services/likeService'
import { AuthenticatedRequest } from '../middlewares/auth'

export const likesController = {
    // POST /likes
    save: async (req: AuthenticatedRequest, res: Response) => {
      const userId = req.user!.id
      const { courseId } = req.body
  
      try {
        const like = await likeService.create(userId, courseId)
        return res.status(201).json(like)
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message })
        }
      }
    }
  }