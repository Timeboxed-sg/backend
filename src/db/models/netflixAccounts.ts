import { DataTypes, Model, Optional } from 'sequelize'
import db from '.'

interface NetflixAccountAttributes {
    id: Number,
    username: String,
    password: String,
    description: String,
    totalAllowedUsers: Number,
    usersRemaining: Number,
    priority: Number,
    isActive: Boolean,
}

interface NetflixAccountCreationAttribute extends Optional<NetflixAccountAttributes, 'id'> {

}

interface NetflixAccountInstance extends Model<NetflixAccountAttributes, NetflixAccountCreationAttribute>, 
    NetflixAccountAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }

const NetflixAccount = db.sequelize.define<NetflixAccountInstance>('NetflixAccount', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
        unique: true,
    },
    username: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    password: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    description: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
    totalAllowedUsers: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
    usersRemaining: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    priority: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

})

export default NetflixAccount