const Post = require('../models/Post');
const User = require('../models/User');
const { sucess ,error} = require('../utils/responsWrappper');
// const {sucess} = "../utils/responseWrappper"

const createPost = async (req,res)=>{
   try{ 
    const {caption}= req.body;
    const owner =req._id;
    const user = await User.findById(req._id);

    const post = await Post.create({
        owner,

      caption
    })
    user.posts.push(post._id);
    await user.save();
    return res.json({post})
}
catch(e){
  return   res.send(error(500,e.message));

}
}
const likeandunlikePost = async(req,res)=>{
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId).populate('owner');
    if (!post) {
        return res.send(error(404, "Post not found"));
    }

    if (post.likes.includes(curUserId)) {
        const index = post.likes.indexOf(curUserId);
        post.likes.splice(index, 1);
    } else {
        post.likes.push(curUserId);
    }
    await post.save();
    return res.send(sucess(200,('post is like')))
    // return res.send(sucess(200, {post: mapPostOutput(post, req._id)}));

} catch (e) {
    return res.send(error(500, e.message));
}
}
const updatePostController = async(req,res)=>{
  try{const {postId,caption}= req.body;
  const curUserId = req._id;
  const post = await Post.findById(postId);
  if(!post){
    return res.send(error(404,'post not found'));
  }
  if(!post.owner.toString() !== curUserId){
    return res.send(error(403,'only  user can update their post'))
  }
  if(caption){
    post.caption = caption;
  }
  await post.save();
  return res.send(sucess(200,post));
  
  }catch(e){
    return res.send(error(500,e.message));
  }

}
const deletePost = async (req,res)=>{
 try{ const {postId} = req.body;
 
  const  curUserId = req._id;
  const post = await Post.findById(postId);
 const curUser = await User.findById(curUserId)
  if(!post){
    return res.send(error(404,'post not found'));
  }
  if(!post.owner.toString() !== curUserId){
    return res.send(error(403,'only  user can update their post'))
  }
  const index= curUser.posts.indexOf(postId);
  curUser.posts.splice(index,1);
  await curUser.save();
  await post.remove();
  return res.send(sucess(200,"post deleted"));
 }catch(e){
  res.send(error(500,e.message));
 }
}
module.exports={
    updatePostController,createPost,
    likeandunlikePost,
    deletePost
}