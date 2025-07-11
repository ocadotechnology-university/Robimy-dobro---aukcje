import {Grid2, styled} from "@mui/material";
import Box from "@mui/material/Box";

export const CardStyle = (
    isFinished: boolean,
    isOwnedByUser: boolean,
    isUpdating: boolean
) => ({
    ...CardStyle,
    backgroundColor: isUpdating
        ? 'white'
        : isFinished
            ? '#d7d7d7'
            : isOwnedByUser
                ? 'primary.light'
                : 'white',
    borderRadius: 4,
    p: 2,
});

export const ImageWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export const UpdateImageWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: {md: '1px solid rgba(128,128,128,0.3)', lg: '1px solid rgba(128,128,128,0.3)'},
    paddingRight: {md: 1.8, lg: 1.8},
};

export const ImageStyle = (isFinished: boolean) => ({
    borderRadius: 2,
    // height: '100%',
    filter: isFinished ? 'grayscale(1)' : 'none',
    transition: 'filter 0.3s ease-in-out',
});

export const IconBox = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
});

export const AuctionCardFooterGrid = styled(Grid2)({
    mt: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
    gap: 1,
    width: '100%',
});