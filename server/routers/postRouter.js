const router = require('express').Router();
const postController = require('../controllers/postsController');
const requireUser = require('../middleWares/requireUser')
router.post("/",requireUser,postController.createPost);
// router.get("/all",requireUser,postController.getAllpostController);
router.post("/like",requireUser,postController.likeandunlikePost);
router.put('/',requireUser,postController.updatePostController)
router.delete('/',requireUser,postController.deletePost);

module.exports = router;