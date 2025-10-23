@echo off
echo ================================
echo 🚀 Git + GitHub Setup Script
echo ================================

:: Step 1: Configure Git user
git config --global user.name "codChirag"
git config --global user.email "chiragputhran2003@gmail.com"

:: Step 2: Initialize Git in current folder
git init

:: Step 3: Add all files
git add .

:: Step 4: Commit files
git commit -m "Initial commit"

:: Step 5: Ask for GitHub repository URL
set /p repo_url=Enter your GitHub repository URL: 

:: Step 6: Link local repo to GitHub
git remote add origin %repo_url%

:: Step 7: Check branch name
for /f "tokens=*" %%b in ('git branch --show-current') do set branch=%%b

if "%branch%"=="" (
    echo No branch found, creating main branch...
    git branch -M main
    set branch=main
)

:: Step 8: Push to GitHub
git push -u origin %branch%

echo ================================
echo ✅ Project successfully pushed to GitHub!
echo ================================
pause
