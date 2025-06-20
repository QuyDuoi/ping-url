const express = require('express');

const url = 'https://mcivietnam.com/course-list/';
const interval = 4000;
let intervalId;

async function pingURL() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            console.log(`[${new Date().toISOString()}] ✅ Ping thành công - Status: ${response.status}`);
        } else {
            console.log(`[${new Date().toISOString()}] ⚠️ Ping lỗi - Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Lỗi khi ping:`, error.message);
    }
}

function startPinging() {
    console.log(`[${new Date().toISOString()}] ▶️ Bắt đầu ping...`);
    pingURL();
    intervalId = setInterval(pingURL, interval);

    const now = new Date();
    const stopTime = new Date(now);
    stopTime.setHours(10, 0, 0, 0); // 10:00
    const timeToStop = stopTime.getTime() - now.getTime();

    setTimeout(stopPinging, timeToStop);
}

function stopPinging() {
    clearInterval(intervalId);
    console.log(`[${new Date().toISOString()}] ⏹️ Đã dừng ping.`);
}

function schedulePinging() {
    const now = new Date();
    const startTime = new Date(now);
    startTime.setHours(8, 40, 0, 0); // 08:40

    if (now >= startTime) {
        startTime.setDate(startTime.getDate() + 1);
    }

    const timeToStart = startTime.getTime() - now.getTime();

    console.log(`[${new Date().toISOString()}] ⏳ Sẽ bắt đầu ping lúc 08:40 (sau ${Math.floor(timeToStart / 1000)} giây).`);

    setTimeout(() => {
        startPinging();
        schedulePinging();
    }, timeToStart);
}

// 👉 Tạo web server để giữ Render luôn "thức"
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('✅ Server đang hoạt động');
});

app.listen(port, () => {
    console.log(`🚀 HTTP server listening on port ${port}`);
});

// 👉 Khởi động script ping
schedulePinging();
