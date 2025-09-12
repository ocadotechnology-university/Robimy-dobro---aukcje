import React, {useState, useRef, useMemo, useEffect} from "react";
import {Container, Stack} from "@mui/material";

import {FormContainerStyle} from './AddPage.styles';
import DescriptionEditor from "../common/DescriptionEditor/DescriptionEditor";
import {RichTextEditorRef} from "mui-tiptap";
import ImageUploadSection from "./ImageUploadSection";
import TitleSection from "./TitleSection";
import PriceSection from "./PriceSection";
import CitySection from "./CitySection";
import ModeratorSection from "./ModeratorSection";
import FormButtonsSection from "./FormButtonSection";
import {useAuctionDates} from "../../contexts/AuctionDatesContext";

const AddPage = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [pickupOnlyInCity, setPickupOnlyInCity] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [wantsToBeModerator, setWantsToBeModerator] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const rteRef = useRef<RichTextEditorRef>(null);
    const [croppedImage, setCroppedImage] = useState<File | Blob | null>(null);
    const {dates} = useAuctionDates();

    const firstDateLabel = useMemo(() => {
        if (!dates.length) return "";
        return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long" }).format(dates[0]);
    }, [dates]);

    const handlePickup = (value: boolean) => {
        setPickupOnlyInCity(value);
        if (!value) setSelectedCity('');
    };

    const handleModerator = (value: boolean) => {
        setWantsToBeModerator(value);
        setSelectedDate(value ? firstDateLabel : "");
    };

    useEffect(() => {
        if (wantsToBeModerator && !selectedDate && firstDateLabel) {
            setSelectedDate(firstDateLabel);
        }
    }, [wantsToBeModerator, selectedDate, firstDateLabel]);

    return (
        <Container maxWidth="md" sx={FormContainerStyle}>
            <Stack spacing={4}>
                <ImageUploadSection setCroppedImage={setCroppedImage}/>
                <TitleSection title={title} setTitle={setTitle}/>
                <DescriptionEditor rteRef={rteRef} initialDescription={""}/>
                <PriceSection price={price} setPrice={setPrice}/>
                <CitySection
                    pickupOnlyInCity={pickupOnlyInCity}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    handlePickup={handlePickup}
                />
                <ModeratorSection
                    wantsToBeModerator={wantsToBeModerator}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    handleModerator={handleModerator}
                />
                <FormButtonsSection croppedImage={croppedImage} isModerator={wantsToBeModerator} title={title}
                                    descriptionRteRef={rteRef} selectedDate={selectedDate}
                                    selectedCity={selectedCity} price={price}/>
            </Stack>
        </Container>
    );
}

export default AddPage;