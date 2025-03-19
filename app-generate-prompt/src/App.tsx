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
    const [seeds, setSeeds] = useState<PromptSeed[]>([]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSetSeed = (seed: PromptSeed) => {
        // 同じタイトルのものがあれば削除
        const newSeeds = seeds.filter(s => s.title !== seed.title);

        // 新しいものを追加
        newSeeds.push(seed);
        setSeeds(newSeeds);
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
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ContentBase
                        contentTitle="Prompt"
                        contentDescription="前提となる内容を記入してください。"
                        handleSetSeed={handleSetSeed}
                    />
                </TabPanel>
            </Box>
        </>
    )
}

export default App
