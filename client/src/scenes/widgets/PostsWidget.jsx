import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {

    const dispatch = useDispatch();

    // Posts State
    const [allPosts, setAllPosts] = useState([])

    // Token (Frontend State)
    const token = useSelector((state) => state.token);  

    // GET API Call (Get All Posts)
    const getPosts = async () => {

        // Get Posts in MongoDB
        const response = await fetch(`http://localhost:3001/posts`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );

        // Get Backend Response
        const data = await response.json();
        dispatch(setPosts({ posts: data }));        // Updates Frontend State
        setAllPosts(data);                          // Updates Posts Widget State (Post Data)
    }

    // GET API Call (Get All User Posts)
    const getUserPosts = async () => {

        // Get Posts in MongoDB
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setAllPosts(data);
    }

    // Loads "all posts" or "user posts" based on isProfile
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        }
        else {
            getPosts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Posts Widget
    return (
        <>
            {allPosts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                ))
            }
        </>
    )
};

export default PostsWidget;