export const getCroppedImage = async (imageSrc: string, croppedAreaPixels: any): Promise<Blob> => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Cannot load image"));
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Error with canvas context");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
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