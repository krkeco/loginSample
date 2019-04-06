#LoginSample

Clone the repository

Add your sdk location.properties file
	should look something liek this: 
		sdk.dir=/root/Android/Sdk

open cli and run
	$react-native start

open another cli and run
	$react-native run-android

when the phone app is on shake the phone to get the developer menu
click Dev Settings
Scroll to Debug server host & port for devices
	add your server's ip address and port
	example: [ip.add.re.ss]:[port]
then go back to app (OK>[backButton])
shake phone again and refresh
you should see the server loading the app
the app should now load
	if it shows the bundle was downloaded but does not display
		force quit
		restart


Or just download the apk and try it out
