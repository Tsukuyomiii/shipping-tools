"use strict";
// Kiosk printing in Chrome allows you to print directly to the last-used printer without any user interaction, bypassing the print dialog. 
// To set it up, create a shortcut for Chrome and add the command --kiosk --kiosk-printing to the target field in the shortcut properties.
// https://stackoverflow.com/questions/20579959/silent-printing-direct-using-kiosk-mode-in-google-chrome
// "Store Label Format"
// https://supportcommunity.zebra.com/s/article/Store-label-format-and-recall-for-printing-using-ZebraDesigner-3?language=en_US
async function init_cropper() {
    // const image = new Image();
    const image = document.getElementById("img-to-edit");
    if (!(image instanceof HTMLImageElement))
        throw "could not load image";
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = "../Untitled.jpg";
    });
    const scale = image.naturalWidth / image.width;
    const canvas = document.getElementById("crop-canvas");
    if (!(canvas instanceof HTMLCanvasElement))
        throw "couldn't find canvas element";
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw "couldn't get canvas context";
    let start = { x: 0, y: 0 };
    image.addEventListener("mousedown", event => {
        event.preventDefault();
        start = { x: event.offsetX, y: event.offsetY };
    });
    image.addEventListener("mouseup", async (event) => {
        let { x: x1, y: y1 } = start;
        let { offsetX: x2, offsetY: y2 } = event;
        const width = x2 - x1;
        const height = y2 - y1;
        canvas.setAttribute("width", width.toString(10));
        canvas.setAttribute("height", height.toString(10));
        ctx.reset();
        ctx.drawImage(image, x1 * scale, y1 * scale, width * scale, height * scale, 0, 0, width, height);
        const link = document.getElementById("crop-link");
        if (link.href !== "")
            URL.revokeObjectURL(link.href);
        // do_the_iframe_thing();
        const blob = await new Promise((res, rej) => {
            canvas.toBlob(blob => {
                if (blob !== null)
                    res(blob);
                rej("[mdn] null may be passed if the image cannot be created for any reason.");
            });
        });
        link.href = URL.createObjectURL(blob);
    });
}
// async function do_the_iframe_thing() {
// 	const a = document.createElement("a");
// 	a.addEventListener("click", frame_click);
// 	const iframe = document.createElement("iframe");
// 	iframe.setAttribute("src", "");
// 	iframe.id = "printframe";
// 	// await new Promise((res, rej) => copy.onload = res)
// 	console.log('test');
// 	a.appendChild(iframe);
// 	document.body.appendChild(a);
// }
// async function frame_click(ev) {
// 	console.log(`click: ${ev}`);
// 	const canvas = document.getElementById("crop-canvas");
// 	const copy = canvas.cloneNode();
// 	// await new Promise((res, rej) => copy.onload = res)
// 	const iframe = document.getElementById("printframe");
// 	iframe.contentDocument.body.appendChild(copy);
// 	iframe.contentWindow.print();
// 	iframe.remove();
// }
window.addEventListener('load', init_cropper);
//# sourceMappingURL=main.js.map