import React, {useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TitleTextField from "../../../common/TitleTextField";
import PriceTextField from "../../../common/PriceTextField";
import ControlledCheckbox from "../../../common/ControlledCheckbox";
import CitySelectField from "../../../common/CitySelectField";
import DateSelectField from "../../../common/DateSelectedField";
import {transformDateFormatToFormDate} from "../../../AddPage/Services/DateTransformer";

type Props = {
    title: string;
    setTitle: (value: string) => void;
    date: string;
    setDate: (value: string) => void;
    city: string | null;
    setCity: (value: string | null) => void;
    price: string;
    setPrice: (value: string) => void;
};

const AuctionHeader = ({title, setTitle, date, setDate, city, setCity, price, setPrice}: Props) => {
    const normalizedCity = city ?? "";
    const pickupOnlyInCityCheck = !(!city);
    const [pickupOnlyInCity, setPickupOnlyInCity] = useState(pickupOnlyInCityCheck);
    const wantsToBeModeratorCheck = !(!date);
    const [wantsToBeModerator, setWantsToBeModerator] = useState(wantsToBeModeratorCheck);

    const handleCityPickup = (value: boolean) => {
        setPickupOnlyInCity(value);
        if (!value) setCity("");
    };

    const handleDatePickup = (value: boolean) => {
        setWantsToBeModerator(value);
        if (!value) setDate("");
    };

    return (
        <Stack justifyContent="space-between" direction="row" alignItems="flex-start" sx={{width: "100%"}}>
            <Stack flexDirection="column" alignItems="center" gap={2}>
                <TitleTextField title={title} setTitle={setTitle}/>
                <ControlledCheckbox
                    checked={wantsToBeModerator}
                    onChange={handleDatePickup}
                    label="Chcę być moderatorem"
                />

                <DateSelectField
                    selectedDate={date}
                    setSelectedDate={setDate}
                    disabled={!wantsToBeModerator}
                    options={["21 listopada", "22 listopada", "23 listopada"]}
                />
            </Stack>
            <Stack flexDirection="column" alignItems="center" gap={2}>
                <PriceTextField price={price} setPrice={setPrice}/>
                <ControlledCheckbox
                    checked={pickupOnlyInCity}
                    onChange={handleCityPickup}
                    label="Odbiór jest możliwy tylko w wybranym mieście"
                />

                <CitySelectField
                    selectedCity={normalizedCity}
                    setSelectedCity={setCity}
                    disabled={!pickupOnlyInCity}
                    options={["Wrocław", "Kraków"]}
                />
            </Stack>
        </Stack>
    );
};

export default AuctionHeader;
