import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { courseController } from './controllers/courseController'

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', courseController.featured)
router.get('/courses/newest', courseController.newest)
router.get('/courses/search', courseController.search)
router.get('/courses/:id', courseController.show)


export { router }