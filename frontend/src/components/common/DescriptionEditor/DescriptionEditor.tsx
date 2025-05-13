import React from 'react';
import {useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

import {
    RichTextEditor,
    RichTextEditorProvider,
    LinkBubbleMenu,
    MenuControlsContainer,
    MenuButtonBold,
    MenuButtonItalic,
    MenuButtonUnderline,
    MenuButtonEditLink,
    LinkBubbleMenuHandler,
    type RichTextEditorRef,
} from 'mui-tiptap';

import {Box, Typography} from '@mui/material';

import {
    WrapperStyle,
    LabelStyle,
    ContentStyle,
    ToolbarStyle,
} from './DescriptionEditor.styles';

type DescriptionEditorProps = {
    rteRef: React.RefObject<RichTextEditorRef | null>;
    initialDescription: string;
};

const DescriptionEditor = ({rteRef, initialDescription}: DescriptionEditorProps) => {
    const extensions = [StarterKit, Underline, Link, LinkBubbleMenuHandler];
    const editor = useEditor({extensions, content: initialDescription});

    if (!editor) return null;

    return (
        <Box sx={WrapperStyle}>
            <Typography variant="caption" sx={LabelStyle}>
                Opis
            </Typography>
            <RichTextEditorProvider editor={editor}>
                <Box sx={ContentStyle}>
                    <RichTextEditor ref={rteRef} extensions={extensions}>
                        {() => (
                            <>
                                <Box sx={ToolbarStyle}>
                                    <MenuControlsContainer>
                                        <MenuButtonBold/>
                                        <MenuButtonItalic/>
                                        <MenuButtonUnderline/>
                                        <MenuButtonEditLink/>
                                    </MenuControlsContainer>
                                </Box>
                                <LinkBubbleMenu/>
                            </>
                        )}
                    </RichTextEditor>
                </Box>
            </RichTextEditorProvider>
        </Box>
    );
};

export default DescriptionEditor;
