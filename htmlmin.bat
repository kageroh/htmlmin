@echo off
setlocal
cscript //Nologo htmlmin.wsf utf-8 foo.html foo.min.html
endlocal
echo on
