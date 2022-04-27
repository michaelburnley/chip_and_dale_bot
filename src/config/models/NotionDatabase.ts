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
    title: {
        type: DataTypes.STRING,
    },
    parent: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    archived: {
        type: DataTypes.BOOLEAN,
    },
};

const options = {
    tableName: `notion_database`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
    instanceMethods: {},
    hooks: {},
    modelName: 'NotionDB',
    freezeTableName: true,
    // classMethods: {},
}

const associations = () => {
    // sequelize.models.SlackEmoji.belongsTo(sequelize.models.SlackChannel, {
    //     foreignKey: 'channelId'
    // });
}

export {
    definition,
    options,
    associations,
}