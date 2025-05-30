import React, {useRef} from "react";
import {RichTextEditorRef} from "mui-tiptap";
import DescriptionEditor from "../../../common/DescriptionEditor/DescriptionEditor";

type Props = {
    description: string;
    descriptionRteRef: React.RefObject<RichTextEditorRef | null>;
};

const UpdateAuctionDescription = ({description, descriptionRteRef}: Props) => {
    return (
        <DescriptionEditor rteRef={descriptionRteRef} initialDescription={description}/>
    );
};

export default UpdateAuctionDescription;
