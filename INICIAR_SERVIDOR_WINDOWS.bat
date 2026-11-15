@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo ERROR: Primero instala Node.js LTS desde https://nodejs.org/
 pause
 exit /b 1
)
echo Servidor RELICS 10 para LAN: http://localhost:8787
node servidor\server.js
pause
