/*
MarkdownBox
Markdownを表示するコンポーネント
*/

import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';
import ReactMarkdown from "react-markdown";

import "./MarkdownBox.css";


interface MarkdownBoxProps {
    markdownText: string;
    sx?: SxProps;
}
export const MarkdownBox: React.FC<MarkdownBoxProps> = ({
    markdownText,
    sx = {},
}) => {
    return (
        <Box
            sx={sx}
            className="markdown-box"
        >
            <ReactMarkdown>{markdownText}</ReactMarkdown>
        </Box>
    );
}
