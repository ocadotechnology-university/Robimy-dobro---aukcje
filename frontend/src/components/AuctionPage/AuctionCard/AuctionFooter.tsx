import React, {useRef, useState} from "react";
import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {SiSlack} from "react-icons/si";
import AuctionStatus from "./AuctionStatus";
import {AuctionCardFooterGrid, IconBox} from "./AuctionCard.styles";
import {useFollowAuction} from "../../../hooks/useFollowAuction";
import {useUnfollowAuction} from "../../../hooks/useUnfollowAuction";

const SlackIcon = SiSlack as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

type Props = {
    id: string
    status: string,
    supplier: string,
    winner: string,
    isFollowed: boolean,
    slackUrl: string
};

const AuctionFooter = ({status, supplier, winner, isFollowed, slackUrl, id}: Props) => {
    const [followed, setFollowed] = useState(isFollowed);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const {mutate: followAuction} = useFollowAuction();
    const {mutate: unfollowAuction} = useUnfollowAuction();

    const toggleFollow = () => {
        const nextFollowed = !followed;
        setFollowed(nextFollowed);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            const action = nextFollowed ? followAuction : unfollowAuction;
            action(id, {
                onError: () => {
                    setFollowed(!nextFollowed);
                }
            });
        }, 300);
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
                        <FavoriteIcon fontSize="large" color="primary"/>
                    ) : (
                        <FavoriteBorderIcon fontSize="large" color="primary"/>
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
