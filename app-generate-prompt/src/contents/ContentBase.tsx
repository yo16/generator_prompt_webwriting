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
import { MarkdownBox } from "./MarkdownBox";

export interface PromptSeed {
    title: string;
    content: string;
}

interface ContentBaseProps {
    handleSetSeed: (seed: PromptSeed) => void;
    contentTitle: string;
    contentDescription: string;
    defaultSeedContent: string;
    showClearButton?: boolean;
}
export const ContentBase: React.FC<ContentBaseProps> = (props) => {
    const {handleSetSeed, contentTitle, defaultSeedContent, showClearButton = true} = props;
    const [content, setContent] = useState(defaultSeedContent);
    const [candidates, setCandidates] = useState<Candidate[]>([]);


    // 最初に、contentTitleに紐づくテキストを取得し、candidatesに格納する
    useEffect(() => {
        // seedContentがなければ、contentTitleに紐づくテキストを取得し、candidatesに格納する
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

    // 入力ボックスの内容を変更する
    const handleOnChange = (value: string) => {
        setContent(value);
        handleSetSeed({
            title: contentTitle,
            content: value
        });
    };

    // 候補の内容をクリックしたときの処理
    const handleOnClickCandidate = (curContent: string) => {
        // 既存の項目の最後に追加する
        const newContent = (content.length > 0) ? (content + "\n\n" + curContent) : curContent;

        handleOnChange(newContent);
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
                {/* contentDescription */}
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
                {showClearButton && (
                    <Button
                        variant="outlined"
                        onClick={() => handleOnChange("")}
                    >
                        クリア
                    </Button>
                )}
                <MarkdownBox
                    markdownText={content}
                    sx={{
                        width: '500px',
                    }}
                />
            </Box>
        </div>
    )
}

