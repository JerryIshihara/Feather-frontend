import { AnyARecord } from "dns";

export const generateVideoThumbnail = (file: File): Promise<string> => {
	return new Promise(resolve => {
		const canvas = document.createElement("canvas");
		const video = document.createElement("video");

		// this is important
		video.autoplay = true;
		video.muted = true;
		video.src = URL.createObjectURL(file);

		video.onloadeddata = () => {
			let ctx = canvas.getContext("2d") as any;

			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
			video.pause();
			return resolve(canvas.toDataURL("image/png"));
		};
	});
};

/**
 * @param {File} file - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 */
export function getCroppedImg(file: File, pixelCrop: any) {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement("canvas");
		const img = document.createElement("img");

		img.src = URL.createObjectURL(file);

		img.onload = () => {
			let ctx = canvas.getContext("2d") as any;

			canvas.width = pixelCrop.width;
			canvas.height = pixelCrop.height;

			ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
			return resolve(canvas.toDataURL("image/png"));
		};

		// As Base64 string
		// const base64Image = canvas.toDataURL('image/jpeg');

		// As a blob

		// canvas.toBlob((file: any) => {
		// 	file.name = pixelCrop.id;
		// 	resolve(file);
		// }, "image/png");
	});
}
