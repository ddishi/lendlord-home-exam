const {ObjectId} = require('mongodb');
const Users = require('../lib/users');
const users = new Users();

/**
 * Gets user by id
 */
exports.getUserById = async ctx => {
    const {id} = ctx.params;
    try {
        console.log(1);
        const user = await users.findUser({_id: new ObjectId(id)});
        ctx.status = 200;
        ctx.body = user;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.message = err.message || 'Internal server error';
    }
};

/**
 * Gets all users
 */
exports.getAllUsers = async ctx => {
    try {
        const allUsers = await users.findAllUsers();
        ctx.status = 200;
        ctx.body = allUsers;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.message = err.message || 'Internal server error';
    }
};

/**
 * Creates a new user
 */
exports.createUser = async ctx => {
    try {
        const userData = ctx.request.body;

        // Remove empty strings or null values
        for (const key in userData) {
            if (userData[key] === '' || userData[key] === null) {
                delete userData[key];
            }
        }

        // const newUser = await users.createUser(ctx.request.body);
        const newUser = await users.createUser(userData);
        ctx.status = 201;
        ctx.body = newUser;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.message = err.message || 'Internal server error';
    }
};

/**
 * Updates user by id
 */
exports.updateUserById = async ctx => {
    console.log("hi")

    const { id } = ctx.params;
    try {
        const updatedUser = await users.updateUser(id, ctx.request.body);
        if (!updatedUser) {
            ctx.status = 404;
            ctx.message = 'User not found';
            return;
        }
        ctx.status = 200;
        ctx.body = updatedUser;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.message = err.message || 'Internal server error';
    }
};

/**
 * Deletes user by id
 */
exports.deleteUserById = async ctx => {
    const { id } = ctx.params;
    try {
        const deletedUser = await users.deleteUser(id);
        if (!deletedUser) {
            ctx.status = 404;
            ctx.message = 'User not found';
            return;
        }
        ctx.status = 204;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.message = err.message || 'Internal server error';
    }
};

/**
 * Get manager and their employees
 */
exports.getManagerAndEmployees = async ctx => {
    const { managerName } = ctx.params;
    try {
        const manager = await users.findUser({ firstName: managerName });
        if (!manager) {
            ctx.status = 404;
            ctx.body = { message: 'Manager not found' };
            return;
        }
        const employees = await users.findEmployeesByManager(managerName);
        ctx.status = 200;
        ctx.body = { manager, employees };
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.message = err.message || 'Internal server error';
    }
};


async function initialize() {
    await users.initialize();
}

initialize();