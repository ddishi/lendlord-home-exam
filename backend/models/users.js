const mongoose = require('mongoose');

const collectionName = 'users';
const schemaName = 'users';
const SchemaTypes = mongoose.Schema;

const schema = new mongoose.Schema(
    {
        _id: {type: SchemaTypes.ObjectId, auto: true},
        firstName: {type: String, required: true, trim: true},
        lastName: {type: String, required: true, trim: true},
        email: {type: String, required: true, trim: true},
        dateStarted: {type: Date, required: true, default: Date.now()},
        salary: {type: Number, required: true},
        role: {type: String},
        manager: {type: String,},
    },
    {strict: false, autoCreate: true, timestamps: true}
);

const model = mongoose.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;
