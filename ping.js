const url = 'https://mcivietnam.com/course-list/';
const interval = 4000;
let intervalId;

// Hàm gửi ping
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

// Bắt đầu ping
function startPinging() {
    console.log(`[${new Date().toISOString()}] ▶️ Bắt đầu ping...`);
    pingURL(); // Gọi lần đầu
    intervalId = setInterval(pingURL, interval);

    // Hẹn giờ dừng lúc 08:50
    const now = new Date();
    const stopTime = new Date(now);
    stopTime.setHours(12, 50, 0, 0); // 12:50:00
    const timeToStop = stopTime.getTime() - now.getTime();

    setTimeout(stopPinging, timeToStop);
}

// Dừng ping
function stopPinging() {
    clearInterval(intervalId);
    console.log(`[${new Date().toISOString()}] ⏹️ Đã dừng ping.`);
}

// Hẹn giờ đến 08:40
function schedulePinging() {
    const now = new Date();
    const startTime = new Date(now);
    startTime.setHours(8, 40, 0, 0); // 08:40:00

    // Nếu đã quá 08:40 hôm nay, đặt lịch cho ngày mai
    if (now >= startTime) {
        startTime.setDate(startTime.getDate() + 1);
    }

    const timeToStart = startTime.getTime() - now.getTime();

    console.log(`[${new Date().toISOString()}] ⏳ Sẽ bắt đầu ping lúc 08:40 (sau ${Math.floor(timeToStart / 1000)} giây).`);

    setTimeout(() => {
        startPinging();
        schedulePinging(); // Lặp lại cho ngày hôm sau
    }, timeToStart);
}

// Chạy hẹn giờ
schedulePinging();
