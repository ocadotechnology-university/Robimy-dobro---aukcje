import Stack from "@mui/material/Stack";
import ControlledCheckbox from "../common/ControlledCheckbox";
import Typography from "@mui/material/Typography";
import DateToggleGroup from "../common/DateToggleGroup";
import React from "react";

type ModeratorSectionProps = {
    wantsToBeModerator: boolean;
    selectedDate: string;
    setSelectedDate: (value: string) => void;
    handleModerator: (checked: boolean) => void;
};

const ModeratorSection = ({
                              wantsToBeModerator,
                              selectedDate,
                              setSelectedDate,
                              handleModerator,
                          }: ModeratorSectionProps) => {

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <ControlledCheckbox
                checked={wantsToBeModerator}
                onChange={handleModerator}
                label="Chcę być moderatorem"
            />

            <Typography
                variant="body2"
                sx={{color: (theme) => wantsToBeModerator ? theme.palette.text.primary : theme.palette.text.disabled}}
            >
                Wybierz preferowaną datę licytacji
            </Typography>

            <DateToggleGroup
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                disabled={!wantsToBeModerator}
            />
        </Stack>
    );
};

export default ModeratorSection;