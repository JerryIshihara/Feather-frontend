import React, { useEffect, useState } from "react";
import { Stack, Box, IconButton, Modal, TextField } from "@mui/material";
// When using TypeScript 4.x and above
import type {} from "@mui/lab/themeAugmentation";
// When using TypeScript 3.x and below
import "@mui/lab/themeAugmentation";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { generateVideoThumbnail } from "../../../utils/video";
import { postVideoObject, uploadThumbnail, uploadVideo, getVideos } from "../../../api/video";
import { useNotification } from "../../../contexts/notification";

const VideoModal = ({ file, handleClose }: { file: File | undefined; handleClose: () => void }) => {
	const notifications = useNotification();
	const [thumbnail, setThumbnail] = useState<string>();
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		if (file === undefined) return;
		generateVideoThumbnail(file).then(res => {
			console.log(res);
			if (!!res) {
				setThumbnail(res);
				setTitle(file.name);
			}
		});
	}, [file]);

	const upload = async () => {
		if (!file || !thumbnail) return;
		setLoading(true);
		const thumbnailKey = `thumbnail/${uuidv4()}.png`;
		const thumbnailResp = await fetch(thumbnail);
		const thumbnailBlob = await thumbnailResp.blob();
		const videoKey = `raw/${uuidv4()}.mp4`;
		const videoObject = {
			username: "test",
			title,
			description,
			thumbnailKey,
			videoKey,
		};

		if (!title || !description) {
			notifications.pop({ status: "error", message: "Please fill out all fields" });
		}
		Promise.all([
			uploadVideo(file, videoKey, "video/mp4"),
			uploadThumbnail(thumbnailBlob, thumbnailKey, "image/png"),
			postVideoObject(videoObject),
		])
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
				notifications.pop({ status: "success", message: "Video uploaded successfully" });
				setTimeout(() => {
					handleClose();
				}, 1000);
			});
	};

	return (
		<Modal open={!!file && !!thumbnail} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
			<Box
				sx={{
					position: "absolute" as "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 600,
					bgcolor: "background.paper",
					color: "text.primary",
					border: "none",
					boxShadow: 24,
					p: 4,
					pt: 0,
					borderRadius: 2,
				}}
			>
				<Stack direction="row" justifyContent="flex-end" sx={{ width: "100%", pt: 2, pb: 2 }} spacing={2}>
					<IconButton onClick={handleClose}>
						<Close />
					</IconButton>
				</Stack>

				<img alt="thumbnail" src={thumbnail} style={{ width: "100%", objectFit: "contain", marginBottom: 20 }} />
				<Stack direction="column" spacing={2}>
					<TextField
						id="outlined-basic"
						label="Title"
						variant="outlined"
						value={title}
						onChange={e => {
							setTitle(e.target.value);
						}}
					/>
					<TextField
						id="outlined-multiline-static"
						label="Description"
						multiline
						rows={4}
						onChange={e => {
							setDescription(e.target.value);
						}}
					/>
					<LoadingButton
						loading={loading}
						loadingIndicator="Uploading..."
						variant="contained"
						color="primary"
						onClick={() => {
							upload();
						}}
					>
						Upload
					</LoadingButton>
				</Stack>
			</Box>
		</Modal>
	);
};

export default VideoModal;
