import express from "express";
import fs from "fs";
import cors from "cors";

import { DATA_FOLDER_PATH } from "./const";



const app = express();
const port = 3000;

// CORSミドルウェアを適用
app.use(cors());

// JSONボディのパースを有効化
app.use(express.json());

// ルートエンドポイント
app.get("/", (req, res) => {
    res.json({ message: "Hello, API!" });
});



// 記録されている情報を取り出す
app.get("/memorizedTexts/:contentTitle", (req, res) => {
    const contentTitle: string = req.params.contentTitle;

    // dataフォルダにあるjsonfileを読み込む
    const filePath = `${DATA_FOLDER_PATH}/${contentTitle}.json`;
    if (!fs.existsSync(filePath)) {
        res.json({ texts: [] });
        return;
    }
    const file = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(file);

    res.json({ texts: data.texts });
});

// POSTリクエストの例
app.post("/users", (req, res) => {
    const { name } = req.body;
    res.status(201).json({ id: 1, name });
});

// サーバー起動
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
