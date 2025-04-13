@echo off
REM Caminho para o Git Bash
SET GITBASH="C:\Program Files\Git\bin\bash.exe"

REM Caminho para o script deploy
SET SCRIPT="./deploy-vm.sh"

REM Executa o deploy
%GITBASH% %SCRIPT%

pause
