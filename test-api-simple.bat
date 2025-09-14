@echo off
echo Testing API endpoints...

echo.
echo 1. Testing server health...
curl -s http://localhost:3000

echo.
echo.
echo 2. Testing policies endpoint...
curl -s http://localhost:3000/api/policies

echo.
echo.
echo 3. Testing dashboard endpoint...
curl -s http://localhost:3000/api/dashboard

echo.
echo.
echo Test completed!
pause
