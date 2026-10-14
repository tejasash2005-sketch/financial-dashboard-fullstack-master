@echo off
set "ROOT=%~dp0"

echo ==========================================
echo   Financial Dashboard Starter
echo ==========================================

:: 1. Ask if user wants to seed dummy data
set /p SEED="Do you want to add realistic dummy records first? (y/n): "
if /i "%SEED%"=="y" (
    echo [SEEDING] Adding realistic records to your Cloud MongoDB...
    cd /d "%ROOT%server"
    call npx ts-node src/seed.ts
    cd /d "%ROOT%"
)

:: 2. Setup Backend .env (already done, but keeping for safety)
if not exist "%ROOT%server\.env" (
    echo MONGODB_URI=mongodb+srv://tejasash2005_db_user:tejasdevil2000@cluster0.0o57rpb.mongodb.net/financial-dashboard?retryWrites=true^&w=majority > "%ROOT%server\.env"
    echo PORT=5000 >> "%ROOT%server\.env"
    echo JWT_SECRET=dev_secret_key >> "%ROOT%server\.env"
)

:: 3. Start Backend
echo [1/2] Starting Backend...
start "Backend Server" /D "%ROOT%server" cmd /k "echo --- BACKEND --- && npm install --legacy-peer-deps && echo Building... && npm run build-ts && echo Starting... && npm run watch"

:: 4. Start Frontend
echo [2/2] Starting Frontend...
start "Frontend Client" /D "%ROOT%client" cmd /k "echo --- FRONTEND --- && npm install --legacy-peer-deps && echo Starting... && npm start"

echo.
echo ==========================================
echo DUMMY ACCOUNT (If seeded):
echo Email: yaot@test.io
echo Password: test1234
echo ==========================================
pause
