import React, {useEffect, useState} from "react";
import {Box, Stack, Typography} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TitleTextField from "../../../common/TitleTextField";
import PriceTextField from "../../../common/PriceTextField";
import ControlledCheckbox from "../../../common/ControlledCheckbox";
import CitySelectField from "../../../common/CitySelectField";
import DateSelectField from "../../../common/DateSelectedField";
import {transformDateFormatToFormDate} from "../../../AddPage/Services/DateTransformer";
import Divider from '@mui/material/Divider';

type Props = {
    title: string;
    setTitle: (value: string) => void;
    date: string;
    setDate: (value: string) => void;
    city: string | null;
    setCity: (value: string | null) => void;
    price: string;
    setPrice: (value: string) => void;
    wantsToBeModerator: boolean;
    setWantsToBeModerator: (value: boolean) => void;
};

const AuctionHeader = ({title, setTitle, date, setDate, city, setCity, price, setPrice, wantsToBeModerator, setWantsToBeModerator}: Props) => {
    const normalizedCity = city ?? "";
    const [pickupOnlyInCity, setPickupOnlyInCity] = useState(Boolean(city));

    useEffect(() => {
        setPickupOnlyInCity(Boolean(city));
    }, [city]);

    const handleCityPickup = (value: boolean) => {
        setPickupOnlyInCity(value);
        if (!value) {
            setCity("");
        } else setCity("Wrocław");
    };

    const handleDatePickup = (value: boolean) => {
        setWantsToBeModerator(value);
        if (!value) setDate("");
    };

    return (
        <Stack width="100%" justifyContent="space-between" direction="row" alignItems="flex-start" marginTop={1}>
            <Stack width="60%" flexDirection="column" alignItems="flex-start" gap={3}>
                <TitleTextField title={title} setTitle={setTitle}/>

                <Stack width="100%" flexDirection="column" alignItems="flex-start" marginLeft={1} gap={1.5}>
                    <ControlledCheckbox
                        checked={wantsToBeModerator}
                        onChange={handleDatePickup}
                        label="Chcę być moderatorem"
                    />
                    <Divider component="div" sx={{width: '100%'}}/>

                    <ControlledCheckbox
                        checked={pickupOnlyInCity}
                        onChange={handleCityPickup}
                        label="Odbiór jest możliwy tylko w wybranym mieście"
                    />
                </Stack>
            </Stack>
            <Stack width="30%" flexDirection="column" alignItems="center" gap={2}>
                <PriceTextField price={price} setPrice={setPrice}/>

                <DateSelectField
                    selectedDate={date}
                    setSelectedDate={setDate}
                    disabled={!wantsToBeModerator}
                    options={["21 listopada", "22 listopada", "23 listopada"]}
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
