@echo off
cd /d "%~dp0"
echo Starting production site on http://localhost:8000
php -S localhost:8000 -t backend\public
pause
