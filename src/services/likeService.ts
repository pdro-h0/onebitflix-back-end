import { Like } from "../models"

export const likeService = {
  create: async (userId: number, courseId: number) => {
    const like = await Like.create({
      userId: userId,
      courseId: courseId
    })

    return like
  },
  isLiked: async (userId: number, courseId: number) => {
    const like = await Like.findOne({
      where: {
        userId: userId,
        courseId: courseId
      }
    })
    return like !== null ? true : false
  }
}