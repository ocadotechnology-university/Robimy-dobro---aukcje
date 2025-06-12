import React, {useEffect, useRef, useState} from "react";
import {Card, Grid2, LinearProgress} from "@mui/material";
import {CardStyle} from "./AuctionCard.styles";
import ImageSection from "./ImageSection";
import UpdateImageSection from "./UpdateComponents/UpdateImageSection";
import {ContentSection} from "./ContentSection";
import UpdateContentSection from "./UpdateComponents/UpdateContentSection";
import {transformDateFormatToFormDate, transformDateToDateFormat} from "../../AddPage/Services/DateTransformer";
import {RichTextEditorRef} from "mui-tiptap";
import {useUpdateAuction} from "../../../hooks/useUpdateAuction";
import {useUpdatePublicId} from "../../../hooks/useUpdatePublicId";
import {AuctionDto} from "../../AddPage/AuctionDto";
import imageCompression from "browser-image-compression";
import {useNavigate} from "react-router-dom";
import {usePostImages} from "../../../hooks/usePostImage";
import {Snackbar, Alert} from '@mui/material';
import Stack from "@mui/material/Stack";
import {useAuth} from "../../../hooks/AuthProvider";

type Props = {
    id: string;
    publicId: string;
    title: string;
    date: string;
    city: string | null;
    description: string;
    status: string;
    hasBids: boolean;
    supplierEmail: string;
    supplier: string;
    winner: string;
    price: string;
    fileId: string;
    isFollowed: boolean;
    slackUrl: string;
    wantsToBeModerator: boolean;
    editingAuctionId: string | null;
    setEditingAuctionId: (value: string | null) => void;
    onDeleteClick: (id: string) => void;
    isDeleting?: boolean;
    isUpdating: boolean;
    setOpenDialog: (value: boolean) => void;
    setOneIsUpdating: (value: boolean) => void;
    newUpdatingAuction: boolean;
    setNewUpdatingAuction: (value: boolean) => void;
    setBackupEditingAuctionId: (value: string | null) => void;
    publicIdList: string[];
};

const AuctionCard = (props: Props) => {
    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedDate, setUpdatedDate] = useState(props.date);
    const [updatedCity, setUpdatedCity] = useState(props.city);
    const [updatedDescription, setUpdatedDescription] = useState(props.description);
    const [updatedPrice, setUpdatedPrice] = useState(props.price);
    const [updateWantsToBeModerator, setUpdateWantsToBeModerator] = useState(props.wantsToBeModerator);
    const descriptionRteRef = useRef<RichTextEditorRef>(null);
    const [updateFileId, setUpdateFileId] = useState(props.fileId);
    const [croppedImage, setCroppedImage] = useState<Blob | File | null>(null);
    const {mutate, isSuccess, isError} = useUpdateAuction();
    const {mutate: mutatePublicId, isSuccess: isPublicIdSuccess, isError: isPublicIdError} = useUpdatePublicId();
    const [newPublicId, setNewPublicId] = useState<string>("");
    const navigate = useNavigate();
    const {mutate: postImage, isSuccess: isImageSuccess, isError: isImageError} = usePostImages();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    const [isLoading, setIsLoading] = useState(false);

    const {supplier} = useAuth();

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 730,
        useWebWorker: true,
    };

    useEffect(() => {
        setUpdatedDate(transformDateFormatToFormDate(props.date));
        setUpdatedTitle(props.title);
        setUpdatedCity(props.city);
        setUpdatedDescription(props.description);
        setUpdatedPrice(props.price);
        setUpdateWantsToBeModerator(props.wantsToBeModerator);
    }, [props.isUpdating]);

    useEffect(() => {
        setUpdatedDate(transformDateFormatToFormDate(updatedDate));
    }, []);

    const handleUpdate = async () => {
        let correctedUpdatedCity: string | undefined;
        let compressedCroppedImage = null;

        setIsLoading(true);

        if (updatedCity !== null) {
            correctedUpdatedCity = updatedCity;
        } else {
            correctedUpdatedCity = undefined;
        }

        try {
            if (croppedImage) {
                const fileFromBlob = new File([croppedImage], `cropped-${Date.now()}.jpg`, { type: croppedImage.type });
                compressedCroppedImage = await imageCompression(fileFromBlob, options);
            } else {
                compressedCroppedImage = croppedImage;
            }

            postImage(compressedCroppedImage, {
                onSuccess: (fileId: string) => {
                    props.setEditingAuctionId(null);
                    const updateAuction: AuctionDto = {
                        wantsToBeModerator: updateWantsToBeModerator,
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
                            setUpdatedDescription(updateAuction.description ?? "");
                            setSnackbarMessage("Pomyślnie edytowano aukcję");
                            setSnackbarSeverity("success");
                            setSnackbarOpen(true);
                            setIsLoading(false);
                            navigate("/auctions");
                            props.setEditingAuctionId(null);
                            props.setOneIsUpdating(false);
                        },
                        onError: () => {
                            setSnackbarMessage("Błąd podczas edytowania aukcji");
                            setSnackbarSeverity("error");
                            setSnackbarOpen(true);
                            setIsLoading(false);
                        }
                    });
                },
                onError: (e) => {
                    alert("Błąd podczas dodawania zdjęcia");
                    setIsLoading(false);
                }
            });

        } catch (error) {
            console.error("Błąd kompresji zdjęcia", error);
            setIsLoading(false);
        }
    };

    const handleCancellation = () => {
        setUpdatedDate(transformDateFormatToFormDate(props.date));
        setUpdatedTitle(props.title);
        setUpdatedCity(props.city);
        setUpdatedDescription(props.description);
        setUpdatedPrice(props.price);
        setUpdateWantsToBeModerator(props.wantsToBeModerator);
        props.setEditingAuctionId(null);
        props.setOneIsUpdating(false);
    }

    const handleUpdatePublicId = async () => {
        setIsLoading(true);
        const newNumberPublicId = isNaN(Number(newPublicId)) ? null : Number(newPublicId);

        mutatePublicId({
            auctionId: props.id,
            publicId: newNumberPublicId
        }, {
            onSuccess: () => {
                setSnackbarMessage("Pomyślnie edytowano ID");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setIsLoading(false);
                setNewPublicId("");
                navigate("/auctions");
            },
            onError: () => {
                setSnackbarMessage("Błąd podczas edytowania ID");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
                setIsLoading(false);
                setNewPublicId(props.publicId);
            }
        });
    };

    return (
        <Card variant="outlined"
              sx={CardStyle(props.status === "FINISHED", props.supplierEmail === supplier, props.isUpdating)}>
            {!props.isUpdating ? (
                <Grid2 container spacing={2}>
                    <ImageSection fileId={props.fileId} status={props.status}/>
                    <ContentSection {...props} setEditingAuctionId={props.setEditingAuctionId}
                                    setOpenDialog={props.setOpenDialog}
                                    setOneIsUpdating={props.setOneIsUpdating} editingAuctionId={props.editingAuctionId}
                                    setBackupEditingAuctionId={props.setBackupEditingAuctionId}
                                    onDeleteClick={props.onDeleteClick}
                                    setNewPublicId={setNewPublicId} handleUpdatePublicId={handleUpdatePublicId}
                                    publicIdList={props.publicIdList}/>

                </Grid2>
            ) : (
                <Grid2 container spacing={1}>
                    <UpdateImageSection fileId={props.fileId} setFileId={setUpdateFileId}
                                        setCroppedImage={setCroppedImage}/>
                    <UpdateContentSection id={props.id} title={updatedTitle} setTitle={setUpdatedTitle}
                                          date={updatedDate}
                                          setDate={setUpdatedDate} city={updatedCity} setCity={setUpdatedCity}
                                          description={updatedDescription}
                                          descriptionRteRef={descriptionRteRef} price={updatedPrice}
                                          setPrice={setUpdatedPrice}
                                          wantsToBeModerator={updateWantsToBeModerator}
                                          setWantsToBeModerator={setUpdateWantsToBeModerator}
                                          handleUpdate={handleUpdate} handleCancellation={handleCancellation}/>
                </Grid2>
            )
            }

            {isLoading && (
                <Stack sx={{width: "100%"}} marginTop={3}>
                    <LinearProgress color="primary"/>
                </Stack>
            )}

            {props.isDeleting && (
                <Stack sx={{width: "100%"}} marginTop={2}>
                    <LinearProgress color="primary"/>
                </Stack>
            )}

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={2000}
                key="top-center"
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default AuctionCard;