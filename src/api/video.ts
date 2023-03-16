import axios from "axios";

export const getVideos = () => {
	return axios({
		method: "GET",
		url: `${process.env.REACT_APP_API_URL}`,
	});
};

export const uploadVideo = async (file: any, key: string, contentType: string) => {
	const res = await axios({
		method: "GET",
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

export const uploadThumbnail = async (file: Blob, key: string, contentType: string) => {
	const res = await axios({
		method: "GET",
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

export const postVideoObject = (props: { username: string; videoKey: string; thumbnailKey: string; title: string; description: string }) => {
	const item = {
		username: { S: props.username },
		videoKey: { S: props.videoKey },
		thumbnailKey: { S: props.thumbnailKey },
		title: { S: props.title },
		description: { S: props.description },
	};
	return _postToDynamodb("VideoObjects", item);
};

const _postToDynamodb = (tablename: string, item: object) => {
	return axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/dynamodb`,
		data: { tablename, item },
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
	});
};
