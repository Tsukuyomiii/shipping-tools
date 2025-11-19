



window.addEventListener('load', () => {
	const image = new Image();
	image.src = "Untitled.jpg"; // should test this with the gif version maybe

	const canvas = document.getElementById("cropping-canvas");
	if (!canvas) throw "couldn't find canvas";
	const ctx = canvas.getContext("2d");
	if (!ctx) throw "couldn't get canvas context";

	image.onload = () => window.createImageBitmap(image).then(bm => {
		canvas.setAttribute("width", bm.width);
		canvas.setAttribute("height", bm.height);
		console.log(`drawing bitmap of size ${bm.width}x${bm.height}`)
		ctx.drawImage(bm, 0, 0, bm.width, bm.height);

	});


});