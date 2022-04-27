import { DataTypes } from 'sequelize';

const definition = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    nameNormalized: {
        type: DataTypes.STRING,
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
    },
    creator: {
        type: DataTypes.STRING,
    },
};

const options = {
    tableName: `slack_channel`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    modelName: 'SlackChannel',
    freezeTableName: true

}

const associations = () => { }

export {
    definition,
    options,
    associations,
}