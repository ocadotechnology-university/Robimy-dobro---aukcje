import {Grid, styled} from "@mui/material";

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

export const EditIconsStyle= {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
};

export const AuctionCardFooter = styled(Grid)({
    mt: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
    gap: 1,
    width: '100%',
});
