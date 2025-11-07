import { Sequelize } from 'sequelize';

const isProd = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	logging: false,
	dialectOptions: isProd
		? {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
		  }
		: {},
});

export default sequelize;

//import { Sequelize } from 'sequelize';

//const sequelize = new Sequelize(process.env.DATABASE_URL, {
//dialect: 'postgres',
//logging: false,
//});

//export default sequelize;
