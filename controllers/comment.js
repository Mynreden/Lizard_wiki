import Comment from "../models/CommentModel.js";
 
export const getCommentsByLizard = async (req, res) => {
    try {
        const {lizardId} = req.params;
        const comments = await Comment.find({lizardId})
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const createComment = async (req, res) => {
    try {
        console.log(req)
        const {lizardId} = req.params;
        const {description} = req.body;
        const user = JSON.parse(req.body.user);
            
        const newComment = new Comment({ // creting User object
            username: user.username,
            userPicturePath: user.picturePath,
            userId: user._id,
            lizardId,
            description,
            picturePath: null,
        });
        const savedComment = await newComment.save();
        res.status(200).json({comment: savedComment})
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


export const likeComment = async (req, res) => {
    try {
        const {commentId} = req.params;
        const {userId} = req.body;
            
        const comment = await Comment.findById(commentId);
        const isLiked = comment.likes.get(userId);
        if (isLiked) {
            comment.likes.delete(userId);
        } else {
            comment.likes.set(userId, true);
        }
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            {likes: comment.likes},
            {new: true}) // it needs to return updated object
        res.status(200).json({comment: updatedComment})
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
