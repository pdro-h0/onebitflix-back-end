import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import { sequelize } from '../database'
import { adminJsResources } from './resources'
import { locale } from './locale'
import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authtenticationOptions } from './authentication'

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: adminJsResources,
  dashboard: dashboardOptions,
  locale: locale,
  branding: brandingOptions
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs, 
  authtenticationOptions, 
  null, 
  {
	  resave: false,
	  saveUninitialized: false
  })