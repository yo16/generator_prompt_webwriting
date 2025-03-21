/*
ContentBase
説明と入力ボックスだけのコンテンツ
*/

import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { getMemorizedTexts } from "../lib/getMemorizedTexts";
import { Candidate } from "../lib/getMemorizedTexts";

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
    const {handleSetSeed, contentTitle, contentDescription} = props;
    const [content, setContent] = useState("");
    const [candidates, setCandidates] = useState<Candidate[]>([]);


    // 最初に、contentTitleに紐づくテキストを取得し、candidatesに格納する
    useEffect(() => {
        const fetchMemorizedTexts = async () => {
            try {
                const texts: Candidate[] = await getMemorizedTexts(contentTitle);
                setCandidates(texts);
            } catch (error) {
                // エラーの場合は特に何もしない
                console.log("空です");
            }
        };
        fetchMemorizedTexts();
    }, [contentTitle]);

    const handleOnChange = (value: string) => {
        setContent(value);
        handleSetSeed({
            title: contentTitle,
            content: value
        });
    };

    const handleOnClickCandidate = (content: string) => {
        setContent(content);
        handleSetSeed({
            title: contentTitle,
            content: content
        });
    };

    return (
        <div>
            <h1>{contentTitle}</h1>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                {contentDescription}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                    }}
                >
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {candidates && candidates.length > 0 && candidates.map((candidate) => (
                            <Button
                                key={candidate.title}
                                onClick={() => handleOnClickCandidate(candidate.content)}
                                color="secondary"
                                variant="outlined"
                            >
                                {candidate.title}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

