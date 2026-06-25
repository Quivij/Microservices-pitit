@echo off
title BAO MAT TREN MAY CHU: DANG MO WEB (KHONG MO XAMPP)
color 0a

cd /d "%~dp0"

echo =======================================================
echo      DANG KHI DONG HE THONG CHAY NGAM (NODE.JS)...        
echo =======================================================
echo.

echo 1. Dang xoa cac phien lam viec cu de tranh loi...
:: taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM cloudflared.exe >nul 2>&1
del cloudflare_log.txt >nul 2>&1
del Link_Truy_Cap.txt >nul 2>&1

echo.
echo 2. (Da bo qua buoc bat localhost ngam)...
:: powershell -WindowStyle Hidden -Command "Start-Process cmd -ArgumentList '/c npm start' -WindowStyle Hidden -WorkingDirectory '%~dp0'"

echo.
echo 3. Dang tao Cloudflare Tunnel de lay link (Frontend Port 3000)...
powershell -WindowStyle Hidden -Command "Start-Process cmd -ArgumentList '/c .\cloudflared.exe tunnel --url http://localhost:3000 2> cloudflare_log.txt' -WindowStyle Hidden -WorkingDirectory '%~dp0'"

echo.
echo 4. Cho he thong tao duong dan tu dong (khoang 15 giay)...
timeout /t 15 /nobreak >nul

echo.
echo 5. Dang trich xuat Link va cap nhat Worker...
powershell -Command "$content = Get-Content 'cloudflare_log.txt' -ErrorAction SilentlyContinue | Out-String; if ($content -match '(https://[a-zA-Z0-9-]+\.trycloudflare\.com)') { $url = $matches[1]; '===================================================' | Out-File -Encoding ASCII 'Link_Truy_Cap.txt'; ' LINK TRUY CAP CLOUDFLARE (LINK THAT):' | Out-File -Encoding ASCII -Append 'Link_Truy_Cap.txt'; \" $url\" | Out-File -Encoding ASCII -Append 'Link_Truy_Cap.txt'; '===================================================' | Out-File -Encoding ASCII -Append 'Link_Truy_Cap.txt'; '' | Out-File -Encoding ASCII -Append 'Link_Truy_Cap.txt'; 'Luu y: Chieu/Toi khi ve, ban nho CHAY FILE [Tat_Ngam_Khong_XAMPP.bat] nhe!' | Out-File -Encoding ASCII -Append 'Link_Truy_Cap.txt'; Start-Process notepad 'Link_Truy_Cap.txt'; Start-Process $url; } else { 'Mang hoi cham. Ban cho chut hoac mo file cloudflare_log.txt de xem nhe!' | Out-File -Encoding ASCII 'Link_Truy_Cap.txt'; Start-Process notepad 'Link_Truy_Cap.txt' }"

echo.
echo Hoan tat! Web da chay an. Notepad chua Link cua ban se mo ra.
echo Ban co the dong cua so den nay.
timeout /t 3 >nul
exit
