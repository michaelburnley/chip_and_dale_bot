import environment from "../environment";
import { Sequelize } from 'sequelize';

// @ts-ignore
const sequelize = new Sequelize(environment.db.database, environment.db.username, environment.db.password, {
    host: environment.db.host,
    dialect: environment.db.dialect,
    ssl: true,
    port: environment.db.port,
    logging: false
});

export default sequelize;