export const getCroppedImage = async (imageSrc: string, croppedAreaPixels: any): Promise<Blob> => {
    const image = new Image();
    image.src = imageSrc;

    const image_width_px =  image.width;
    const image_height_px =  image.height;

    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Cannot load image"));
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Error with canvas context");

    canvas.width = croppedAreaPixels.width*image_width_px/100;
    canvas.height = croppedAreaPixels.height*image_height_px/100;

    ctx.drawImage(
        image,
        croppedAreaPixels.x*image_width_px/100,
        croppedAreaPixels.y*image_height_px/100,
        croppedAreaPixels.width*image_width_px/100,
        croppedAreaPixels.height*image_height_px/100,
        0,
        0,
        croppedAreaPixels.width*image_width_px/100,
        croppedAreaPixels.height*image_height_px/100
    );

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error("Cannot convert canvas to Blob"));
            }
        }, "image/png");
    });
};