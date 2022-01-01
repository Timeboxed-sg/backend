import {Sequelize} from 'sequelize';
import nconf from 'nconf'

const dbConfig = nconf.get('postgres')


const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const db = {
    sequelize,
    Sequelize,
  };

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db
