@echo off
title TAT TOAN BO HE THONG NODE.JS VA CLOUDFLARE
color 0c

echo =======================================================
echo          DANG DONG MAY CHU VA TAT CLOUDFLARE...        
echo =======================================================
echo.

echo 1. Dang tat cac tien trinh Node.js (Frontend, Backend, Gateway)...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo 2. Dang ngat ket noi Cloudflare Tunnel...
taskkill /F /IM cloudflared.exe >nul 2>&1

echo.
echo 3. Xoa file nhat ky tam thoi...
del cloudflare_log.txt >nul 2>&1
del Link_Truy_Cap.txt >nul 2>&1

echo.
echo Da tat toan bo he thong thanh cong! Ban co the yen tam ra ve.
timeout /t 3 >nul
exit
