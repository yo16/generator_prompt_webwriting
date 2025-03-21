/*
サーバーへ問い合わせ、メモリに保存されたテキストを取得する関数
*/

export interface Candidate {
    title: string;
    content: string;
}

import { SERVER_URL } from "./const";


export async function getMemorizedTexts(contentTitle: string) {
    let texts: Candidate[] = [];
    try {
        // サーバーへ問い合わせる
        const url = `${SERVER_URL}/memorizedTexts/${contentTitle}`;
        const response = await fetch(url);
        const data = await response.json();
        texts = data.texts;
    } catch (error) {
        // エラーの場合は空配列を返す
        console.error("Error fetching memorized texts:", error);
        return [];
    }

    return texts;
}
