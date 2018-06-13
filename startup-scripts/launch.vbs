Set WshShell = WScript.CreateObject("WScript.Shell")

Set AppWindow= WshShell.Exec("""C:\Program Files (x86)\Google\Chrome\Application\chrome.exe""  --profile-directory=Default --app-id=eopcdcjemdbmhndiakikflfmijiiinbg")

WScript.Sleep 5000

WshShell.AppActivate(AppWindow.ProcessID)
WshShell.SendKeys "{F11}"