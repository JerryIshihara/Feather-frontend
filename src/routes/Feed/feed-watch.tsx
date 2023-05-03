import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Avatar, IconButton, TextField } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Container, Stack, Grid, Typography, Button, Paper, Divider, LinearProgress, Card, CardActionArea, CardMedia, Skeleton } from "@mui/material";
import { Send, Delete } from "@mui/icons-material";

import { getVideo } from "../../api/video";
import { type CommentObject, getVideoComments, addVideoComment, deleteVideoComment } from "../../api/comment";
import { useAuth } from "../../contexts/auth";

type VideoObject = {
	videoKey: { S: string };
	title: { S: string };
	skeletonKey?: { S: string };
	thumbnailKey: { S: string };
	"video-id": { S: string };
};

const FeedWatch = () => {
	const [params, setParams] = useSearchParams();
	const auth = useAuth() as any;
    const userName = auth.user.attributes.given_name + " " + auth.user.attributes.family_name;
	const [videoObject, setVideoObject] = useState<VideoObject>();
	const [comments, setComments] = useState<CommentObject[]>([]);
	const [addingComment, setAddingComment] = useState<boolean>();
	const [newComment, setNewComment] = useState<string>("");

	const fetchComments = () => {
		getVideoComments(params.get("v")).then((currentComments: any) => {
			if (currentComments) {
				setComments(() => [...currentComments]);
			}
		});
	};

	useEffect(() => {
		getVideo(params.get("v")).then((res: any) => {
			if (res.data.Item) {
				const v = res.data.Item;
				setVideoObject(v);
			}
		});
		fetchComments();
	}, [params]);

	const addComment = (comment: string) => {
		addVideoComment(auth.user, videoObject?.["video-id"].S, comment).then(() => fetchComments());
		setNewComment("");
		setAddingComment(false);
	};

	const deleteComment = (commentId: string) => {
		deleteVideoComment(videoObject?.["video-id"].S, commentId).then(() => fetchComments());
	};

	return (
		<Container maxWidth="lg">
			<Stack direction="column" alignItems="center" sx={{ minHeight: "64px", mb: 3 }}>
				{videoObject && (
					<video
						controls
						autoPlay
						src={`${process.env.REACT_APP_CDN_URL}${videoObject.videoKey.S}`}
						style={{ width: "100%", maxHeight: 800, borderRadius: 8 }}
					/>
				)}
			</Stack>
			<Stack direction="row" alignItems="center" sx={{ minHeight: "64px", mb: 3 }} spacing={2}>
				<Grid item xs>
					<Typography variant="h5">{videoObject?.title.S}</Typography>
				</Grid>
			</Stack>

			<h1>Comments</h1>
			<Paper style={{ padding: "20px 40px" }}>
				<Grid container wrap="nowrap" justifyContent="center" spacing={2}>
					<Grid item></Grid>
					<Grid item xs={1} justifyContent="center" alignItems="center">
						<Stack direction="row" justifyContent="flex-left" sx={{ pt: 1 }}>
							{auth.user && auth.user.attributes && <Avatar src={auth.user.attributes.picture} />}
						</Stack>
					</Grid>
					<Grid item xs onClick={() => setAddingComment(true)}>
						<ClickAwayListener onClickAway={() => setAddingComment(false)}>
							<TextField
								id="standard-basic"
								label="Add a comment"
								placeholder="Add a comment..."
								variant="standard"
								fullWidth
								value={newComment}
								onChange={e => {
									setNewComment(e.target.value);
								}}
							/>
						</ClickAwayListener>
					</Grid>
					{addingComment && (
						<Grid item xs={1}>
							<Stack direction="row" justifyContent="flex-end" sx={{ pt: 1 }}>
								<IconButton
									onClick={() => {
										addComment(newComment);
									}}
								>
									<Send />
								</IconButton>
							</Stack>
						</Grid>
					)}
				</Grid>
			</Paper>
			{comments &&
				comments.map((comment, idx) => (
					<Paper style={{ padding: "15px 40px" }} key={comment.commentId + idx}>
						<Grid container wrap="nowrap" spacing={2}>
							<Grid item></Grid>
							<Grid justifyContent="left" item xs zeroMinWidth>
								<Stack direction="row" justifyContent="flex-start" sx={{ pt: 1 }} spacing={2}>
									<Avatar alt="avatar" src={comment.avatar_url} sx={{ width: 30, height: 30 }} />
									<Typography variant="h6">{comment.userId}</Typography>
								</Stack>
								<p style={{ textAlign: "left" }}>{comment.comment + " "}</p>
								<p style={{ textAlign: "left", color: "gray" }}>{comment.createdAt}</p>
							</Grid>
                            {userName === comment.userId &&
                                <Grid item xs={1} justifyContent="right">
                                    <IconButton
                                        onClick={() => {
                                            deleteComment(comment.commentId);
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            }
						</Grid>
						{idx < comments.length - 1 && <Divider variant="fullWidth" />}
					</Paper>
				))}
		</Container>
	);
};

export default FeedWatch;
