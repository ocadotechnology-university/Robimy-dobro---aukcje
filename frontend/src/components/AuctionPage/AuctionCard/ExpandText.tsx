import React, {useEffect, useState, useRef } from "react";
import {Button, Typography, Link} from "@mui/material";
import parse from "html-react-parser";

type ExpandTextProps = {
    text: string;
    maxLinesNumber: number;
}

const ExpandText = ({text, maxLinesNumber}: ExpandTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const lineLength = 100;


    const stripHTML = (textWithHtml: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = textWithHtml;
        return tmp.textContent || tmp.innerText || '';
    };

    const textWithoutHtml = stripHTML(text);
    const textWithReplaceParagraph = text.replace(/<p>/g, '<br>').replace(/<\/p>/g, '').replace('<br>', '<p>') + '</p>';

    const matches = textWithReplaceParagraph.match(/<(strong|em|u)\b[^>]*>/gi);
    const tagAMatches = textWithReplaceParagraph.match(/<(a)\b[^>]*>/gi);
    const tagAMatchesSize = tagAMatches ? tagAMatches.length : 0;
    const tagAMatchesLength = tagAMatches ? tagAMatches.join("").length + 4*tagAMatchesSize : 0;
    const tagBrMatches = textWithReplaceParagraph.match(/<(br)\b[^>]*>/gi);
    const tagBrMatchesSize = tagBrMatches ? tagBrMatches.length : 0;

    const htmlSEUTagsLength = matches ? matches.join("").length*2 + matches.length : 0;
    const htmlATagLength = tagAMatches ? tagAMatchesLength : 0;
    const htmlBrTagLength = tagBrMatches ? tagBrMatchesSize*4 : 0;
    const htmlTagsLength = htmlSEUTagsLength + htmlATagLength + htmlBrTagLength;

    const removeParagraphTags = (textWithParagraph: string) => {
        return textWithParagraph.replace(/^<p>|<\/p>$/g, '');
    }

    const parts = textWithReplaceParagraph.split('<br>');
    let resultWithoutHtml = '';
    let resultWithHtml = '';
    let lineNumber = 1;
    let partLinesNumber = 0;
    let maxLengthResult = maxLinesNumber*lineLength;
    let displayedBrAmount = 0;

    for (let i = 0; i < parts.length; i++) {
        for(let j = 1; j <= maxLinesNumber; j++) {
            if (parts[i].length == 0) {
                partLinesNumber = j;
                break;
            }

            if (parts[i].length > (j-1)*lineLength && parts[i].length <= j*lineLength) {
                partLinesNumber = j;
                break;
            }
            else {partLinesNumber = j+1;}
        }

        displayedBrAmount = i;

        if (partLinesNumber + lineNumber - 1 > maxLinesNumber) {
            resultWithHtml += parts[i].slice(0, (maxLinesNumber+1-lineNumber)*lineLength + htmlTagsLength);
            resultWithoutHtml += parts[i].slice(0, (maxLinesNumber+1-lineNumber)*lineLength);
            lineNumber = maxLinesNumber + 1;
            break;
        }

        if ((resultWithoutHtml + stripHTML(parts[i])).length <= maxLengthResult) {
            resultWithoutHtml += stripHTML(parts[i]);
            resultWithHtml += parts[i];
        } else {
            resultWithHtml += parts[i].slice(0, maxLengthResult + htmlTagsLength);
            resultWithoutHtml += parts[i].slice(0, maxLengthResult);
            lineNumber = maxLinesNumber + 1;
            break;
        }

        if (parts.length > 1) {
            maxLengthResult -= lineNumber*lineLength - (lineNumber-1)*lineLength - parts[i].length%lineLength;
        }

        lineNumber += partLinesNumber;

        if (partLinesNumber == maxLinesNumber + 1) {
            break;
        }
    }

    const additionalLength = (displayedBrAmount == 0) ? htmlTagsLength : displayedBrAmount*4;

    let cutText = removeParagraphTags(textWithReplaceParagraph.slice(0, resultWithoutHtml.length + additionalLength));

    if (cutText[cutText.length-1] === '<') {
        cutText = cutText.slice(0, cutText.length - 1);
    }

    const isTooLong = (lineNumber > maxLinesNumber);
    return (
        <Typography variant="body2" color="text.secondary" component="div">
            {!isTooLong ? (
                parse(textWithReplaceParagraph)
            ) : isExpanded ?
                (<span>
                    {parse(removeParagraphTags(textWithReplaceParagraph))}&nbsp;
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => setIsExpanded(!isExpanded)}
                        sx={{display: "inline", padding: 0, minWidth: 0, color: "primary.dark", textDecorationColor: "primary.dark"}}
                    >
                            {'Zobacz mniej'}
                    </Link>
                </span>
                ) : (<>
                        {/*{parse(removeParagraphTags(textWithReplaceParagraph.slice(0, maxLength + htmlTagsLength) + "... "))}&nbsp;*/}
                        {parse(cutText + "... ")}&nbsp;
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => setIsExpanded(!isExpanded)}
                            sx={{display: "inline", padding: 0, minWidth: 0, color: "primary.dark", textDecorationColor: "primary.dark"}}
                        >
                            {'Zobacz więcej'}
                        </Link>
                    </>)
            }
        </Typography>
    );

}

export default ExpandText;