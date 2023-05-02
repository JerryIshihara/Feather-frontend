import axios from "axios";

export type CommentObject = {
	commentId: string;
	userId: string;
	comment: string;
	createdAt: string;
};

type CommentData = {
	comment_key: number;
	aws_key: number;
	user_id: string;
	comment: string;
	created_at: string;
};


const testComments : CommentObject[] = [
    {
        commentId: "test Michel Michel 1",
        userId: "Michel Michel 1",
        comment: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam lectus vitae ex.",
        createdAt: "2020-05-14T04:00:00Z"
    },
    {
        commentId: "test Michel Michel 2",
        userId: "Michel Michel 2",
        comment: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam lectus vitae ex.",
        createdAt: "2020-05-14T04:00:00Z"
    },
    {
        commentId: "test Michel Michel 3",
        userId: "Michel Michel 3",
        comment: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdum tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus, efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam lectus vitae ex.",
        createdAt: "2020-05-14T04:00:00Z"
    },
  ];
  

export const getVideoComments = async (videoId: string | null) => {
    //TODO: get all comments for a video
    // return testComments;
    let videoComments:CommentObject[] = [];
    return await fetch("http://localhost:8000/api/videoComments?aws_key=" + videoId)
    .then(response => response.json())
    .then(data => {
        videoComments = data.comments.map((commentData:CommentData) => 
            ({
                commentId: '' + commentData.comment_key,
                userId: '' + commentData.user_id,
                comment: commentData.comment,
                createdAt: commentData.created_at,
            })
        );
        return videoComments;
    })
    .catch(error => {
        console.error(error);
        return videoComments;
    });
};


export const addVideoComment = async (videoId: string | undefined, comment: string) => {
    // await fetch('/api/videoComments/', {
    await fetch('http://localhost:8000/api/videoComments/', {
        method: "POST",
        body: JSON.stringify({
            aws_key: videoId,
            user_id: "michael_wang_1",
            comment: comment,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .catch(error => {
        console.error(error);
    });
};


export const deleteVideoComment = (videoId: string| undefined, commentId: string) => {
    //TODO: delete specific comment
};
