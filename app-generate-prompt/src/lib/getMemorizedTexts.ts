/*
サーバーへ問い合わせ、メモリに保存されたテキストを取得する関数
*/

import { SERVER_URL } from "./const";



export async function getMemorizedTexts(contentTitle: string) {
    try {
        // サーバーへ問い合わせる
        const url = `${SERVER_URL}/memorizedTexts/${contentTitle}`;
        //console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        return data.texts;
    } catch (error) {
        // 見つからなかったら、空を返す
        //console.error("Error fetching memorized texts:", error);
        return [];
    }
}
