
import Comment from "./Comment";


const Comments = ({ comments, postId, palette }) => {


    return (
        <>
            {comments.map((c) => (
                <Comment 
                    key={`${c.userId}-${postId}-${Math.random()}`}
                    comment={c} postId={postId} palette={palette} 
                />
            ))}
        </>
    )
}

export default Comments;