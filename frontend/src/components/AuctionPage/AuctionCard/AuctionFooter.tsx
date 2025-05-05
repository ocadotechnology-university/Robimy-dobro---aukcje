import React, {useState} from "react";
import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {SiSlack} from "react-icons/si";
import AuctionStatus from "./AuctionStatus";
import {AuctionCardFooterGrid, IconBox} from "./AuctionCard.styles";

const SlackIcon = SiSlack as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

type Props = {
    status: string;
    supplier: string;
    winner: string;
    isFollowed: boolean;
    slackUrl: string;
};

const AuctionFooter = ({status, supplier, winner, isFollowed, slackUrl}: Props) => {
    const [followed, setFollowed] = useState(isFollowed);

    const toggleFollow = () => {
        setFollowed((prev) => !prev);
    };

    return (
        <AuctionCardFooterGrid container spacing={2}>
            <AuctionStatus status={status} supplier={supplier} winner={winner}/>
            <Box display="flex" flexDirection="row" alignItems="flex-end" gap={1} paddingBottom={1}>
                <SlackIcon
                    onClick={() => window.open(slackUrl, "_blank", "noopener,noreferrer")}
                    style={{fontSize: "28px", cursor: "pointer", margin: "5px"}}
                />
                <Box onClick={toggleFollow} sx={{cursor: "pointer", display: "flex", alignItems: "center"}}>
                    {followed ? (
                        <FavoriteIcon fontSize="large" color="secondary"/>
                    ) : (
                        <FavoriteBorderIcon fontSize="large" color="secondary"/>
                    )}
                </Box>
                <IconBox>
                    <IconButton size="small">
                        <EditIcon/>
                    </IconButton>
                </IconBox>
                <IconBox>
                    <IconButton size="small">
                        <DeleteIcon/>
                    </IconButton>
                </IconBox>
            </Box>
        </AuctionCardFooterGrid>
    );
};

export default AuctionFooter;
