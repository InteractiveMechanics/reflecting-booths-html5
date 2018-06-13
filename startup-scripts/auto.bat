SET computer=NS11Interaction1

cd C:\Users\%computer%\booth-interaction-master
start /min cmd /k "lein trampoline ring server-headless 3000"

cd C:\Users\%computer%\Desktop\reflecting-booths-html5\
start /min cmd /k "serve -s build -p 5000"
start /min cmd /k "node expressServer.js"



wscript "C:\Users\%computer%\Desktop\launch.vbs"