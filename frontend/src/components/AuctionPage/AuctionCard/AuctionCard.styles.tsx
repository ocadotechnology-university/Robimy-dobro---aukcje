import {Grid2, styled} from "@mui/material";
import Box from "@mui/material/Box";

export const CardStyle = {
    borderRadius: 4,
    p: 2,
};

export const ImageWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export const ImageStyle = {
    borderRadius: 2,
    height: '100%',
};

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

export const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    backdropFilter: 'blur(10px)'
};