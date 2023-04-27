import axios from "axios";

export type CommentObject = {
	commentId: string;
	userId: string;
	comment: string;
	createdAt: string;
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
  

export const getVideoComments = (videoId: string | null) => {
    //TODO: get all comments for a video
    return testComments;
};


export const addVideoComment = (videoId: string | undefined, comment: string) => {
   //TODO: add specific comment to a video
};


export const deleteVideoComment = (videoId: string, commentId: string) => {
    //TODO: delete specific comment
};
