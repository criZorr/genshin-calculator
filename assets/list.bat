@echo off
setLocal EnableDelayedExpansion
dir "U:\Trabajos\genshin-calculator\assets\talents" /b /a-d > fileslist.txt
for /f "tokens=* delims= " %%a in (fileslist.txt) do (
set /a N+=1
echo ^"./assets/talents/%%a^",>>outputlist.txt
)
del fileslist.txt