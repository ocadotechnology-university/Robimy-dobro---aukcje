import React, {useEffect, useState, useRef } from "react";
import {Button, Typography, Link} from "@mui/material";
import parse from "html-react-parser";

type ExpandTextProps = {
    text: string;
    maxLength: number;
}

const ExpandText = ({text, maxLength}: ExpandTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const stripHTML = (textWithHtml: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = textWithHtml;
        return tmp.textContent || tmp.innerText || '';
    };

    const textWithoutHtml = stripHTML(text);

    const isTooLong = textWithoutHtml.length > maxLength;
    const matches = text.match(/<(strong|em|u)\b[^>]*>/gi);
    const tagAMatches = text.match(/<(a)\b[^>]*>/gi);
    const tagAMatchesSize = tagAMatches ? tagAMatches.length : 0;
    const tagAMatchesLength = tagAMatches ? tagAMatches.join("").length + 4*tagAMatchesSize : 0;
    const htmlTagsLength = matches ? matches.join("").length*2 + matches.length + tagAMatchesLength : 0;

    const removeParagraphTags = (textWithParagraph: string) => {
        return textWithParagraph.replace(/^<p>|<\/p>$/g, '');
    }

    return (
        <Typography variant="body2" color="text.secondary" component="div">
            {!isTooLong ? (
                parse(text)
            ) : isExpanded ?
                (<span>
                    {parse(removeParagraphTags(text))}&nbsp;
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => setIsExpanded(!isExpanded)}
                        sx={{ display: "inline", padding: 0, minWidth: 0 }}
                    >
                            {'Zobacz mniej'}
                    </Link>
                </span>
                ) : (<>
                        {parse(removeParagraphTags(text.slice(0, maxLength + htmlTagsLength) + "... "))}&nbsp;
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {'Zobacz więcej'}
                        </Link>
                    </>)
            }
        </Typography>
    );

}

export default ExpandText;