const router = require('express').Router();
const UserController = require('../controllers/userController');
const requireUser = require('../middleWares/requireUser')

router.post('/follow',requireUser,UserController.followerorunfollow);
router.get('/getPost',requireUser,UserController.getpostController);
router.get("/getMyPost",requireUser,UserController.getMyPost)
router.get('/getUserPosts', requireUser, UserController.getUserPosts);
router.delete('/', requireUser, UserController.deleteMyProfile);
router.get('/getMyInfo', requireUser, UserController.getMyInfo);

router.put('/', requireUser, UserController.updateUserProfile);
router.post('/getUserProfile', requireUser, UserController.getUserProfile);
module.exports = router;