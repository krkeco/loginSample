#LoginSample

To get the app running:
##Ensure you have npm, react-native-cli, and nodejs installed on your machine.

##Option 1 View video
https://drive.google.com/open?id=1oZ85EMRH_jSXpgxHgKOtyKhGs-oo_9BI

#Option 2 (run on device)
##Go to the apk folder and download the apk to your Android dev phone and install/run

#Option 3 (run in dev mode from phone onto device)
##Clone the repository

##Add your sdk location.properties file
	The line should look something like this: 
		sdk.dir=/root/Android/Sdk

##Open cli and run
	$react-native start

##Open another cli and run
	$react-native run-android


##If you are using a real device instead of emulator this is also needed:

##When the phone app is on shake the phone to get the developer menu
	Click Dev Settings
	Scroll to Debug server host & port for devices
	Add your server's IP address and Port (usually 8081)
	Example: [ip.add.re.ss]:[port]
##Go back to the app (OK>[backButton])

##Shake phone again and refresh
	You should see the server loading the app
	The app should now load
	If it shows the bundle was downloaded but does not display
		Force quit
		Restart App
