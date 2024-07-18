const Router = require('koa-router');
const router = new Router();

const ctrl =  require('../controllers/users');

router.get('/user/:id', ctrl.getUserById);
router.get('/users', ctrl.getAllUsers);
router.post('/users', ctrl.createUser);
router.put('/users/:id', ctrl.updateUserById);
router.delete('/users/:id', ctrl.deleteUserById);
router.get('/users/manager/:managerName', ctrl.getManagerAndEmployees);



router.allowedMethods();

module.exports = router;
