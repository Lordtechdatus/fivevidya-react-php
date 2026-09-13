@echo off
setlocal
cd /d "%~dp0frontend"
if not exist node_modules call npm install
call npm run build
if errorlevel 1 exit /b 1
cd /d "%~dp0"
node frontend\scripts\copy-production.mjs
if errorlevel 1 exit /b 1
echo.
echo Production build copied into backend\public.
echo Now run run-production.bat and open http://localhost:8000
pause
