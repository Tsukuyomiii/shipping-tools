



window.addEventListener('load', async () => {
	// const image = new Image();
	const image = document.getElementById("img-to-edit");
	image.src = "Untitled.jpg"; // should test this with the gif version maybe


	const canvas = document.getElementById("crop-canvas");
	const ctx = canvas.getContext("2d");

	let p1, p2 = null;

	const mouse_info_ele = document.getElementsByClassName("mouse-info")[0];

	const pos = mouse_info_ele.children[0];
	const s1 = mouse_info_ele.children[1];
	const s2 = mouse_info_ele.children[2];

	image.addEventListener("mousedown", ev => {
		ev.preventDefault();
		p1 = { x: ev.x, y: ev.y }
		s1.innerHTML = `${p1.x}, ${p1.y}`
	})

	image.addEventListener("mouseup", async ev => {
		p2 = { x: ev.x, y: ev.y }
		s2.innerHTML = `${p2.x}, ${p2.y}`

		if (p1 && p2) {
			const bitmap = await window.createImageBitmap(image);
			const width = p2.x - p1.x;
			const height = p2.y - p1.y;
			canvas.setAttribute("width", width);
			canvas.setAttribute("height", height);
			const ele = documnet.createElement("div");
			ele.
			ctx.reset();
			ctx.drawImage(bitmap, p1.x, p1.y, width, height, 0, 0, width, height);
		}
	})

	image.addEventListener("mousemove", ev => {
		pos.innerHTML = `${ev.x}, ${ev.y}`
	})

	// const canvas = document.getElementById("cropping-canvas");
	// if (!canvas) throw "couldn't find canvas";
	// const ctx = canvas.getContext("2d");
	// if (!ctx) throw "couldn't get canvas context";

	// image.onload = () => window.createImageBitmap(image).then(bm => {
	// 	canvas.setAttribute("width", bm.width);
	// 	canvas.setAttribute("height", bm.height);
	// 	console.log(`drawing bitmap of size ${bm.width}x${bm.height}`)
	// 	ctx.drawImage(bm, 0, 0, bm.width, bm.height);

	// });




});