import React, {useState} from "react";
import {RichTextEditorRef} from "mui-tiptap";
import {useNavigate} from "react-router-dom";
import {usePostImages} from "../../hooks/usePostImage";
import {usePostAuction} from "../../hooks/usePostAuction";
import imageCompression from "browser-image-compression";
import {AuctionDto} from "./AuctionDto";
import {transformDateToDateFormat} from "./Services/DateTransformer";
import Stack from "@mui/material/Stack";
import {FormButtonsWrapperStyle} from "./AddPage.styles";
import OutlinedActionButton from "../common/OutlinedActionButton";
import Alert from "@mui/material/Alert";
import PrimaryActionButton from "../common/PrimaryActionButton";
import {CircularProgress, Snackbar} from "@mui/material";

interface FormButtonsSectionProps {
    croppedImage: File | Blob | null;
    isModerator: boolean;
    title: string;
    descriptionRteRef: React.RefObject<RichTextEditorRef | null>;
    selectedDate: string;
    selectedCity: string;
    price: string;
}

const FormButtonsSection = ({
                                croppedImage,
                                isModerator,
                                title,
                                price,
                                selectedCity,
                                selectedDate,
                                descriptionRteRef
                            }: FormButtonsSectionProps) => {
    const navigate = useNavigate();
    const {mutate: postImage, isSuccess: isImageSuccess, isError: isImageError} = usePostImages();
    const {mutate, isSuccess, isError} = usePostAuction();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    const [isLoading, setIsLoading] = useState(false);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 730,
        useWebWorker: true,
    };

    const handleSubmit = async () => {
        let compressedCroppedImage = null;
        setIsLoading(true);

        try {
            if (croppedImage) {
                const fileFromBlob = new File([croppedImage], `cropped-${Date.now()}.jpg`, {type: croppedImage.type});
                compressedCroppedImage = await imageCompression(fileFromBlob, options);
            } else {
                compressedCroppedImage = croppedImage;
            }

            postImage(compressedCroppedImage, {
                onSuccess: (fileId: string) => {
                    const newAuction: AuctionDto = {
                        wantsToBeModerator: isModerator,
                        title: title || undefined,
                        description: descriptionRteRef.current?.editor?.getHTML() || undefined,
                        fileId: fileId || undefined,
                        auctionDate: transformDateToDateFormat(selectedDate) || undefined,
                        city: selectedCity || undefined,
                        startingPrice: parseFloat(price) || undefined
                    };

                    mutate(newAuction, {
                        onSuccess: () => {
                            setSuccessMessage("Pomyślnie dodano aukcję");
                            setSnackbarMessage("Pomyślnie dodano aukcję");
                            setSnackbarSeverity("success");
                            setSnackbarOpen(true);
                            setIsLoading(false);
                            navigate("/auctions");
                        },
                        onError: () => {
                            setErrorMessage("Błąd podczas dodawania aukcji");
                            setSnackbarMessage("Błąd podczas dodawania aukcji");
                            setSnackbarSeverity("error");
                            setSnackbarOpen(true);
                            setIsLoading(false);
                        }
                    });
                },
                onError: () => {
                    setErrorMessage("Błąd podczas dodawania zdjęcia");
                    setIsLoading(false);
                }
            });

        } catch (error) {
            console.error("Błąd kompresji zdjęcia", error);
            setIsLoading(false);
        }
    }

    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={FormButtonsWrapperStyle}>
                <OutlinedActionButton
                    label="Wróć"
                    onClick={() => navigate(-1)}
                />

                {isSuccess && <Alert severity="success">{successMessage}</Alert>}
                {isError && <Alert severity="error">{errorMessage}</Alert>}

                <PrimaryActionButton
                    label="Dodaj"
                    onClick={handleSubmit}
                />
            </Stack>

            {isLoading && (
                <Stack justifyContent="center" alignItems="center" marginTop={3}>
                    <CircularProgress color={"primary"}/>
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
        </>
    );
};

export default FormButtonsSection;