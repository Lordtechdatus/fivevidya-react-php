@echo off
cd /d "%~dp0frontend"
if not exist node_modules (
  echo Installing React dependencies...
  call npm install
)
echo Starting React on http://localhost:5173
call npm run dev
pause
