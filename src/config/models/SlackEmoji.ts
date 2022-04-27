import { DataTypes } from 'sequelize';
import config from '..';

const {
    sequelize
} = config;

const definition = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    moveText: {
        type: DataTypes.TEXT,
    },
    copyText: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    },
};

const options = {
    tableName: `slack_emoji`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
    instanceMethods: {},
    hooks: {},
    modelName: 'SlackEmoji',
    freezeTableName: true,
    // classMethods: {},
}

const associations = () => {
    sequelize.models.SlackEmoji.belongsTo(sequelize.models.SlackChannel, {
        foreignKey: 'channelId'
    });
}

export {
    definition,
    options,
    associations,
}