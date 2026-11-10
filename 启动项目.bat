@echo off
chcp 65001 >nul
title 花间序 - 本地启动
cd /d "%~dp0"

echo ================================================
echo            花间序 · 本地启动
echo ================================================
echo.

if not exist node_modules (
    echo [1/2] 首次运行，正在安装依赖，请耐心等待...
    call npm install --registry=https://registry.npmmirror.com
    if errorlevel 1 (
        echo.
        echo 依赖安装失败，请把上面红色报错发给我。
        pause
        exit /b
    )
) else (
    echo [1/2] 依赖已存在，跳过安装。
)

echo.
echo [2/2] 正在启动开发服务器...
echo       启动成功后浏览器会自动打开 http://localhost:3000
echo       关闭这个黑窗口即可停止服务。
echo.

start "" http://localhost:3000
call npm start
pause
