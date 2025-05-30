export const fade = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0},
};

export const slideLeft = {
    hidden: {x: -100, opacity: 0},
    visible: {x: 0, opacity: 1},
};

export const slideRight = {
    hidden: {x: 100, opacity: 0},
    visible: {x: 0, opacity: 1},
};

export const zoomIn = {
    hidden: {scale: 0.8, opacity: 0},
    visible: {scale: 1, opacity: 1},
};

export const getVariant = (key: string) => {
    switch (key) {
        case "left":
            return slideLeft;
        case "right":
            return slideRight;
        case "zoom":
            return zoomIn;
        case "fade":
            return fade;
    }
};