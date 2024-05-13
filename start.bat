@echo off
REM Start the first bun command in a new window
start cmd /k "bun run dev"
REM Start the second bun command in a new window from the backend directory
start cmd /k "cd backend && bun run index.ts"