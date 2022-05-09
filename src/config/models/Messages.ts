import { DataTypes } from 'sequelize';
import config from '..';

const {
    sequelize
} = config;

const definition = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
    },
    platform: {
        type: DataTypes.ENUM(`MEDIA`, `EMOJI`, `PERFORCE`),
        allowNull: false,
    },
};

const options = {
    tableName: `messages`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
    instanceMethods: {},
    hooks: {},
    modelName: 'Message',
    freezeTableName: true,
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