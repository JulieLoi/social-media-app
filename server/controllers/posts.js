import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;

        // Creates New Post
        const newPost = new Post({
            userId, 
            description,
            picturePath,
            likes: {},
            comments: []
        });
        await newPost.save();

        // Returns all user posts (updated)
        const post = await Post.find();
        res.status(201).json(post);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        console.log(err.message)
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;              // Post ID
        const { userId } = req.body;

        // Get Post, Check if Post is liked by user (user ID)
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if (isLiked) {  post.likes.delete(userId); }        // Unlikes Post
        else { post.likes.set(userId, true); }              // Likes Post

        // Updates Post
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        // Returns Updated Post (Single)
        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const commentPost = async (req, res) => {
    try {

        const { id } = req.params;      // Post ID
        const { userId, userName, userPicturePath, comment } = req.body;

        // Get Post, Add comment
        const post = await Post.findById(id);
        const commentCount = post.comments.length;      // Comment Count, Acts as a Key
        post.comments.push({ 
            id: commentCount,
            userId: userId,
            userName: userName,
            userPicturePath: userPicturePath,
            comment: comment,
        });

        // Updates Post (with comment)
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { comments: post.comments },
            { new: true }
        );

        // Returns Updated Post
        res.status(200).json(updatedPost);
        
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* DELETE */
export const deletePost = async (req, res) => {
    try {

        const { id } = req.params;                      // Post ID
        const post = await Post.findByIdAndDelete(id);  // Deleted Post

        // Returns Deleted Post
        res.status(202).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

