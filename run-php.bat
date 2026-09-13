@echo off
cd /d "%~dp0"
echo Starting PHP backend on http://localhost:8000
php -S localhost:8000 -t backend\public backend\router.php
pause
