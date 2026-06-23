// Script tu dong cap nhat link cho Cloudflare Worker bang Node.js
// Dung de thay the phien ban PHP cu

const https = require('https');

// ===== CAU HINH =====
const workerUrl = "https://vpp-stationery.estt.workers.dev/update";
// ===================

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error("ERROR: Thieu tham so URL.");
    process.exit(1);
}

const newUrl = args[0];
const updateUrl = `${workerUrl}?url=${encodeURIComponent(newUrl)}`;

console.log(`Dang gui link moi len Cloudflare Worker: ${newUrl}`);

https.get(updateUrl, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("SUCCESS: Da cap nhat Worker thanh cong!");
            console.log("Link vinh vien cua ban: https://vpp-stationery.estt.workers.dev/");
        } else {
            console.error(`ERROR: Cap nhat Worker that bai (HTTP ${res.statusCode}).`);
            console.error("Chi tiet: " + data);
        }
    });

}).on("error", (err) => {
    console.error("ERROR: Khong the ket noi toi Worker.");
    console.error(err.message);
});
