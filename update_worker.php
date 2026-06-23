<?php
// Script tu dong cap nhat link cho Cloudflare Worker
// Dung de thay the Rebrandly (Khong gioi han luot click)

// ===== CAU HINH =====
$workerUrl = "https://vpp-stationery.estt.workers.dev/update";
// ===================

if ($argc < 2) {
    echo "ERROR: Thieu tham so URL.\n";
    exit(1);
}

$newUrl = $argv[1];
$updateUrl = $workerUrl . "?url=" . urlencode($newUrl);

echo "Dang gui link moi len Cloudflare Worker: $newUrl\n";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $updateUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo "SUCCESS: Da cap nhat Worker thanh cong!\n";
    echo "Link vinh vien cua ban: https://vpp-stationery.estt.workers.dev/\n";
} else {
    echo "ERROR: Cap nhat Worker that bai (HTTP $httpCode).\n";
    echo "Chi tiet: " . $response . "\n";
}
