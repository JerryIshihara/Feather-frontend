import React, { useEffect, useState } from "react";
import { Stack, Box, IconButton, Modal, TextField, useMediaQuery } from "@mui/material";
// When using TypeScript 4.x and above
import type {} from "@mui/lab/themeAugmentation";
// When using TypeScript 3.x and below
import "@mui/lab/themeAugmentation";
import { Close, FacebookOutlined, Share, Twitter } from "@mui/icons-material";
import { useNotification } from "../../../contexts/notification";
import { useTheme } from "@emotion/react";

const VideoModal = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
	const notification = useNotification();
	const theme = useTheme() as any;
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const handleShare = () => {
		notification.pop({ status: "success", message: "Share successful!" });
		setTimeout(() => {
			handleClose();
		}, 1500);
	};
	return (
		<Modal open={show} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
			<Box
				component="div"
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					// width: isMobile ? "80%" : "60%",
					// height: "50%",
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
				<Box component="div">
					<video
						controls
						autoPlay
						src={`${process.env.REACT_APP_CDN_URL}ai-edit/1519_1683088070.mp4`}
						style={{ height: isMobile ? "300px" : "400px", borderRadius: 8 }}
					/>
				</Box>
				<Stack direction="row" spacing={2} sx={{ mt: 5 }}>
					<IconButton onClick={handleShare}>
						<Twitter sx={{ fontSize: 35 }} />
					</IconButton>
					<IconButton onClick={handleShare}>
						<FacebookOutlined sx={{ fontSize: 35 }} />
					</IconButton>
					<IconButton onClick={handleShare}>
						<Share sx={{ fontSize: 35 }} />
					</IconButton>
				</Stack>
			</Box>
		</Modal>
	);
};

export default VideoModal;
