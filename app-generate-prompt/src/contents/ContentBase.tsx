/*
ContentBase
説明と入力ボックスだけのコンテンツ
*/

import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export interface PromptSeed {
    title: string;
    content: string;
}


export default function ContentBase(
    props: {
        handleSetSeed: (seed: PromptSeed) => void;
        contentTitle: string;
        contentDescription: string;
    }
) {
    const { handleSetSeed, contentTitle, contentDescription } = props;
    const [content, setContent] = useState("");

    const handleOnChange = (value: string) => {
        setContent(value);
        handleSetSeed({
            title: contentTitle,
            content: value
        });
    };

    return (
        <div>
            <h1>{contentTitle}</h1>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {contentDescription}
                <TextField
                    label={contentTitle}
                    value={content}
                    onChange={(e) => handleOnChange(e.target.value)}
                    multiline
                    rows={10}
                    sx={{
                        width: '500px',
                    }}
                />
            </Box>
        </div>
    )
}

