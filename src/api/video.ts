import axios from "axios";

const _extractToken = (user: { signInUserSession: { idToken: { jwtToken: string } } }) => {
	return user.signInUserSession.idToken.jwtToken;
};

export const getVideo = (videoId: string | null) => {
	return axios({
		method: "GET",
		url: `${process.env.REACT_APP_API_URL}/videos${!!videoId ? `?video-id=${videoId}` : ""}`,
	});
};

export const uploadVideo = async (user: any, file: any, key: string, contentType: string) => {
	const res = await axios({
		method: "GET",
		headers: {
			Authorization: _extractToken(user),
		},
		url: `${process.env.REACT_APP_API_URL}/upload-url`,
		params: { bucket: "test-badminton-video-upload", key, contentType },
	});
	console.log(res.data.url);

	// const formData = new FormData();
	// formData.append("video", file);
	// formData.append("_method", "put");
	return axios({
		method: "PUT",
		url: res.data.url,
		data: file,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": file.type,
		},
	});
};

export const uploadThumbnail = async (user: any, file: Blob, key: string, contentType: string) => {
	const res = await axios({
		method: "GET",
		headers: {
			Authorization: _extractToken(user),
		},
		url: "https://gx6au8sht7.execute-api.us-east-1.amazonaws.com/dev/upload-url",
		params: { bucket: "test-badminton-video-upload", key, contentType },
	});
	console.log(res.data.url);

	// const formData = new FormData();
	// formData.append("file", file);
	// formData.append("_method", "put");
	return axios({
		method: "PUT",
		url: res.data.url,
		data: file,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": file.type,
		},
	});
};

export const postVideoObject = (
	user: any,
	item: {
		username: string;
		videoKey: string;
		thumbnailKey: string;
		title: string;
		description: string;
	}
) => {
	const VideoObject = {
		videoKey: { S: item.videoKey },
		thumbnailKey: { S: item.thumbnailKey },
		title: { S: item.title },
		description: { S: item.description },
	};
	return _postToDynamodb(_extractToken(user), "VideoObjects", VideoObject);
};

const _postToDynamodb = (token: string, tablename: string, item: object) => {
	return axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/dynamodb`,
		data: { tablename, item },
		headers: {
			Authorization: token,
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
	});
};

export const extractSkeleton = async (user: any, videoId: string) => {
	return axios({
		method: "PUT",
		headers: {
			Authorization: _extractToken(user),
		},
		url: `http://0.0.0.0:80/skeleton`,
		data: {
			"video-id": videoId,
		},
	});
};
