/*
app全体
*/

import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SubjectIcon from '@mui/icons-material/Subject';

import TabPanel from "./components/TabPanel";
import { ContentBase, PromptSeed } from "./contents/ContentBase";

import "./App.css";


interface ContentTitle {
    title: string;
    introduction: string;
    showClearButton?: boolean;
    showCopyButton?: boolean;
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const PROMPT_TITLE = "プロンプト";

function App() {
    const [value, setValue] = useState(0);
    const [seeds, setSeeds] = useState<PromptSeed[]>([{title: PROMPT_TITLE, content: ""}]);

    const [contentsFrame] = useState<ContentTitle[]>([
        {
            title: "前提",
            introduction: "前提となる内容を記入してください。"
        },
        {
            title: "依頼内容",
            introduction: "依頼内容を記入してください。"
        },
        {
            title: "最終ゴール",
            introduction: "最終ゴールを記入してください。"
        },
        {
            title: "ターゲット",
            introduction: "ターゲットを記入してください。"
        },
        {
            title: "ジャンル",
            introduction: "ジャンルを記入してください。"
        },
        {
            title: "コンテンツ内容",
            introduction: "コンテンツ内容を記入してください。"
        },
        {
            title: "文章フレームワーク",
            introduction: "文章フレームワークを記入してください。"
        },
        {
            title: PROMPT_TITLE,
            introduction: "データ活用を記入してください。",
            showClearButton: false,
            showCopyButton: true
        }
    ])

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSetSeed = (curSeed: PromptSeed) => {
        // 同じタイトルのものがあったら更新し、なかったら追加する
        let newSeeds: PromptSeed[] = seeds.map(s => s.title === curSeed.title ? curSeed : s);
        if (newSeeds.find(s => s.title === curSeed.title) === undefined) {
            newSeeds.push(curSeed);
        }

        // Prompt以外が更新された場合は、Promptも更新する
        if (curSeed.title !== PROMPT_TITLE) {
            // Prompt以外のSeedsを取得
            const notPromptSeeds: PromptSeed[] = newSeeds.filter(s => s.title !== PROMPT_TITLE);

            // notPromptSeedsの並びを、contentsFrameのtitleの並び順と同じにする
            notPromptSeeds.sort((a, b) => {
                return contentsFrame.findIndex(c => c.title === a.title) - contentsFrame.findIndex(c => c.title === b.title);
            });

            // Prompt以外のSeedsから、Promptのcontentを作成
            const promptContent: string = notPromptSeeds.reduce(
                (content: string, curSeed: PromptSeed) => {
                    let retContent = content;
                    if (retContent.length > 0) {
                        retContent += "\n\n";
                    }
                    retContent += `# ${curSeed.title}\n${curSeed.content}`;
                    return retContent;
                },
                ""
            );

            newSeeds = newSeeds.map(
                (s: PromptSeed) =>
                    (s.title === PROMPT_TITLE) ? {title: PROMPT_TITLE, content: promptContent} : s
            );
        }
        setSeeds(newSeeds);
    }

    // Seedに内容があるかどうかを確認する
    const hasSeed = (title: string) => {
        return seeds.filter(
            seed => (seed.title === title) && (seed.content.length > 0)
        ).length > 0;
    }

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    height: '100%',
                }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {contentsFrame.map((content, index) => (
                        <Tab
                            icon={
                                (content.title === PROMPT_TITLE)
                                    ? <SubjectIcon />
                                    : (hasSeed(content.title)
                                        ? <CheckBoxIcon sx={{ color: "green" }} />
                                        : <CheckBoxOutlineBlankIcon />
                                    )
                            }
                            label={content.title}
                            {...a11yProps(index)}
                        />
                        ))
                    }
                </Tabs>
                {contentsFrame.map((content, index) => (
                    <TabPanel value={value} index={index}>
                        <ContentBase
                            contentTitle={content.title}
                            contentDescription={content.introduction}
                            handleSetSeed={handleSetSeed}
                            defaultSeedContent={seeds.find(s => s.title === content.title)?.content || ""}
                            showClearButton={content.showClearButton}
                            showCopyButton={content.showCopyButton}
                        />
                    </TabPanel>
                ))}

            </Box>
        </>
    )
}

export default App
