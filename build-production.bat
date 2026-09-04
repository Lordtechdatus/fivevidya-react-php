@echo off
setlocal
cd /d "%~dp0frontend"
if not exist node_modules call npm install
call npm run build
if errorlevel 1 exit /b 1
cd /d "%~dp0"
if not exist backend\public mkdir backend\public
for /d %%D in (backend\public\assets) do rmdir /s /q "%%D"
copy /y frontend\dist\index.html backend\public\index.html >nul
xcopy /e /i /y frontend\dist\assets backend\public\assets >nul
echo.
echo Production build copied into backend\public.
echo Now run run-production.bat and open http://localhost:8000
pause
