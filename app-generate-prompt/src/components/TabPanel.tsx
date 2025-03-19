/*
タブの１つ
*/

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { PromptSeed } from '../contents/ContentBase';




interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    handleSetSeed?: (seed: PromptSeed) => void;
}
export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, handleSetSeed, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

