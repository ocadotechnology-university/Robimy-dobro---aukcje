import React from "react";
import { type RichTextEditorRef } from 'mui-tiptap';

export interface AddAuction {
    moderator?: boolean,
    title?: string,
    description?: string,
    fileId?: string,
    preferredAuctionDate?: string,
    cityOnlyPickUp?: string,
    price?: string
}