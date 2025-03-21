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
import ContentBase, { PromptSeed } from "./contents/ContentBase";

import "./App.css";




function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function App() {
    const [value, setValue] = useState(0);
    const [seeds, setSeeds] = useState<PromptSeed[]>([{title: "Prompt", content: ""}]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSetSeed = (curSeed: PromptSeed) => {
        // 同じタイトルのものがあったら更新し、なかったら追加する
        let newSeeds: PromptSeed[] = seeds.map(s => s.title === curSeed.title ? curSeed : s);
        if (newSeeds.find(s => s.title === curSeed.title) === undefined) {
            newSeeds.push(curSeed);
        }

        //const newSeeds = seeds.filter(s => s.title !== curSeed.title);
        //
        //// 同じタイトルのものがあれば、それを更新する
        //let newSeeds: PromptSeed[] = seeds.map(s => s.title === curSeed.title ? curSeed : s);

        
        //
        //// 新しいものを追加
        //newSeeds.push(seed);
        //setSeeds(newSeeds);

        // Prompt以外が更新された場合は、Promptも更新する
        if (curSeed.title !== "Prompt") {
            // Prompt以外のSeedsを取得
            const notPromptSeeds: PromptSeed[] = newSeeds.filter(s => s.title !== "Prompt");

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
                    (s.title === "Prompt") ? {title: "Prompt", content: promptContent} : s
            );
        }
        setSeeds(newSeeds);
        console.log(newSeeds);
    }

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
                    height: 224,
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
                    <Tab
                        icon={
                            hasSeed("Assumption")
                                ? <CheckBoxIcon sx={{ color: "green" }} />
                                : <CheckBoxOutlineBlankIcon />
                        }
                        label="ASMP"
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<SubjectIcon />}
                        label="PROMPT"
                        {...a11yProps(1)}
                    />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <ContentBase
                        contentTitle="Assumption"
                        contentDescription="前提となる内容を記入してください。"
                        handleSetSeed={handleSetSeed}
                        defaultSeedContent={seeds.find(s => s.title === "Assumption")?.content || ""}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ContentBase
                        contentTitle="Prompt"
                        contentDescription="前提となる内容を記入してください。"
                        handleSetSeed={handleSetSeed}
                        defaultSeedContent={seeds.find(s => s.title === "Prompt")?.content || ""}
                    />
                </TabPanel>
            </Box>
        </>
    )
}

export default App
