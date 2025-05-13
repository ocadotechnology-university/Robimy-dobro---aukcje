import React, {useEffect, useRef, useState} from "react";
import {Card, Grid2} from "@mui/material";
import {CardStyle} from "./AuctionCard.styles";
import ImageSection from "./ImageSection";
import UpdateImageSection from "./UpdateComponents/UpdateImageSection";
import ContentSection from "./ContentSection";
import UpdateContentSection from "./UpdateComponents/UpdateContentSection";
import {UUID} from "node:crypto";
import {transformDateFormatToFormDate, transformDateToDateFormat} from "../../AddPage/Services/DateTransformer";
import {RichTextEditorRef} from "mui-tiptap";
import {useUpdateAuction} from "../../../hooks/useUpdateAuction";
import {AuctionDto} from "../../AddPage/AuctionDto";
import imageCompression from "browser-image-compression";
import {useNavigate} from "react-router-dom";
import {usePostImages} from "../../../hooks/usePostImage";

type Props = {
    id: UUID;
    title: string;
    date: string;
    city: string | null;
    description: string;
    status: string;
    hasBids: boolean;
    supplier: string;
    winner: string;
    price: string;
    fileId: string;
    isFollowed: boolean;
    slackUrl: string;
};

const AuctionCard = (props: Props) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedDate, setUpdatedDate] = useState(props.date);
    const [updatedCity, setUpdatedCity] = useState(props.city);
    const [updatedDescription, setUpdatedDescription] = useState(props.description);
    const [updatedPrice, setUpdatedPrice] = useState(props.price);
    const [wantsToBeModerator, setWantsToBeModerator] = useState(false);
    const transformedDate = transformDateFormatToFormDate(updatedDate);
    const descriptionRteRef = useRef<RichTextEditorRef>(null);
    const [updateFileId, setUpdateFileId] = useState(props.fileId);
    const [croppedImage, setCroppedImage] = useState<any | null>(null);
    const {mutate, isSuccess, isError} = useUpdateAuction();
    const navigate = useNavigate();
    const { mutate: postImage, isSuccess: isImageSuccess, isError: isImageError } = usePostImages();

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 730,
        useWebWorker: true,
    };

    useEffect(() => {
        if (!updatedDate) {
            setWantsToBeModerator(false);
        } else {
            setWantsToBeModerator(true);
        }
    }, [updatedDate]);

    const handleUpdate = async () => {
        let correctedUpdatedCity: string | undefined;
        let compressedCroppedImage = null;

        if (updatedCity !== null) {
            correctedUpdatedCity = updatedCity;
        } else {
            correctedUpdatedCity = undefined;
        }

        try {
            if (croppedImage) {
                console.log("croppedImageTest", croppedImage);
                compressedCroppedImage = await imageCompression(croppedImage, options);
            } else {
                compressedCroppedImage = croppedImage;
            }

            postImage(compressedCroppedImage, {
                onSuccess: (fileId: string) => {
                    setIsUpdating(false);
                    const updateAuction: AuctionDto = {
                        wantsToBeModerator: wantsToBeModerator,
                        title: updatedTitle,
                        description: descriptionRteRef.current?.editor?.getHTML(),
                        fileId: fileId,
                        auctionDate: transformDateToDateFormat(updatedDate),
                        city: correctedUpdatedCity,
                        startingPrice: parseFloat(updatedPrice) || undefined
                    };

                    mutate({
                        auctionId: props.id,
                        updateAuction: updateAuction
                    }, {
                        onSuccess: () => {
                            alert("Pomyślnie edytowano aukcję");
                            navigate("/auctions");
                        },
                        onError: () => {
                            alert("Błąd podczas edytowania aukcji");
                        }
                    });
                }
            });

        } catch (error) {
            console.error("Błąd kompresji zdjęcia", error);
        }
    };

    return (
        <Card variant="outlined" sx={CardStyle}>
            {!isUpdating ? (
                <Grid2 container spacing={2}>
                    <ImageSection fileId={props.fileId}/>
                    <ContentSection {...props} setIsUpdating={setIsUpdating} />
                </Grid2>
            ) : (
                <Grid2 container spacing={5} marginLeft={3}>
                    <UpdateImageSection fileId={props.fileId} setFileId={setUpdateFileId} setCroppedImage={setCroppedImage}/>
                    <UpdateContentSection id={props.id} title={updatedTitle} setTitle={setUpdatedTitle} date={transformedDate}
                                          setDate={setUpdatedDate} city={updatedCity} setCity={setUpdatedCity} description={updatedDescription}
                                          descriptionRteRef={descriptionRteRef} price={updatedPrice} setPrice={setUpdatedPrice}
                                          handleUpdate={handleUpdate}/>
                </Grid2>
            )
            }

        </Card>
    );
};

export default AuctionCard;