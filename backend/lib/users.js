const UsersRepo = require('../repository/users');


class Users {
    async initialize() {
        this.repo = new UsersRepo();
    }

    async findUser(query, projection = {}) {
        const user = await this.repo.findOne(query);
        return user;
    }

    async findAllUsers() {
        const allUsers = await this.repo.findAll();
        return allUsers;
    }

    async createUser(userData) {
        const newUser = await this.repo.create(userData);
        return newUser;
    }

    async updateUser(id, userData) {
        const newUser = await this.repo.update(user);
        return newUser;
    }

    async deleteUser(id) {
        const user = await this.repo.delete(user);
        return user;
    }
}

module.exports = Users;