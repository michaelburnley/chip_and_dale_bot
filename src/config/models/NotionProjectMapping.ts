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
    project: {
        type: DataTypes.ENUM('nightshift', 'youtube'),
        defaultValue: 'nightshift',
    },
};

const options = {
    tableName: `notion_project_mapping`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
    instanceMethods: {},
    hooks: {},
    modelName: 'ProjectMapping',
    freezeTableName: true,
    // classMethods: {},
}

const associations = () => {
    sequelize.models.ProjectMapping.belongsTo(sequelize.models.NotionDB, {
        foreignKey: 'notion_id'
    });
}

export {
    definition,
    options,
    associations,
}