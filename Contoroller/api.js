import { Player } from "textalive-app-api";

// 単語が発声されていたら #text に表示する
const animateWord = function (now, unit) {
    if (unit.contains(now)) {
        document.querySelector("#text").textContent = unit.text;
    }
};

// TextAlive Player を作る
const player = new Player({ app: { token: "your token" } });
player.addListener({
    onVideoReady: (v) => {
        let w = player.video.firstWord;
        while (w) {
            w.animate = animateWord;
            w = w.next;
        }
    },
});

// 再生ボタンの制御
document.getElementById("playButton").addEventListener("click", () => {
    if (player.isPlaying) {
        player.requestPause(); // 一時停止
        document.getElementById("playButton").textContent = "再生";
    } else {
        player.requestPlay(); // 再生
        document.getElementById("playButton").textContent = "一時停止";
    }
});

player.addListener({
    onAppReady: (app) => {
        if (!app.songUrl) {
            player.createFromSongUrl("https://piapro.jp/t/ULcJ");
        }
        if (!app.managed) {
            console.log("アプリが準備完了しました");
        }
    },
});