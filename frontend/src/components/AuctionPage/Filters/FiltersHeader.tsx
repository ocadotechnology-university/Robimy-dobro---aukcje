import {Stack, Typography} from "@mui/material";
import {ClearAllTypographyStyle} from "./Filters.styles";
import React from "react";

type FiltersHeaderProps = {
    showClear: boolean;
    onClearAll: () => void;
    auctionsAmount: number;
};

const FiltersHeader = ({showClear, onClearAll, auctionsAmount}: FiltersHeaderProps) => (
    <Stack direction="column" spacing={0.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={700}>
                Filtry
            </Typography>
            <Typography color="#a0a0a0">(Aukcje: {auctionsAmount})</Typography>
        </Stack>
        <Typography
            variant="body1"
            sx={(theme) => ({
                ...ClearAllTypographyStyle(theme),
                visibility: showClear ? 'visible' : 'hidden',
            })}
            onClick={onClearAll}
        >
            Odznacz wszystkie
        </Typography>
    </Stack>
);

export default FiltersHeader;