import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'onebitflix_development',
  username: 'postgres',
  password: 'oMantveMs96',
	define: {
    underscored: true
  }
})