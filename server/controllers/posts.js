import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = User.findById(userId);

        // Creates New Post
        const newPost = new Post({
            userId, 
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
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
        res.status.json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        
        // Unlikes Post
        if (isLiked) {
            post.likes.delete(userId);
        }

        // Likes Post
        else {
            post.likes.set(userId, true);
        }

        // Updates Post
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost);

    } catch (err) {
        ress.status(404).json({ message: err.message });
    }
}
