@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION

::--------------------------------------------------------
::-- @author frankdevhub@gmail.com 
::-- @Date 2019/04/05 Friday
::-- @description: shutdown local service
::--------------------------------------------------------

@echo 'start' 

git pull 
git add .
git commit -m "page rebuild"
git push -u origin master

PAUSE

