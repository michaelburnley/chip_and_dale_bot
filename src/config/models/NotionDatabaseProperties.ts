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
    type: {
        type: DataTypes.STRING,
    },
    prop: {
        type: DataTypes.TEXT,
    },
};

const options = {
    tableName: `notion_db_properties`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
    instanceMethods: {},
    hooks: {},
    modelName: 'NotionDBProps',
    freezeTableName: true,
    // classMethods: {},
}

const associations = () => {
    sequelize.models.NotionDBProps.belongsTo(sequelize.models.NotionDB, {
        foreignKey: 'notion_db_id'
    });
}

export {
    definition,
    options,
    associations,
}