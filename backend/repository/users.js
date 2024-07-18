const usersModel = require('../models/users');

class Users {
    async findOne(query, projection = {}) {
        const user = await usersModel.findOne(query).select(projection);
        return user;
    }

    async findAll() {
        const users = await usersModel.find({});
        return users;
    }

    async create(userData) {
        const user = await usersModel.create(userData);
        return user;
    }

    async update(id, userData) {
        const user = await usersModel.findByIdAndUpdate(id, userData, {new: true});
        return user;
    }

    async delete(id) {
        const user = await usersModel.findByIdAndDelete(id);
        return user;
    }

    async findEmployeesByManager(managerName) {
        const employees =  await usersModel.find({ manager: managerName });
        return employees;
    }
}

module.exports = Users;