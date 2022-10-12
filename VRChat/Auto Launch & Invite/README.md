# VRC-Auto-Launch-in-web-and-invite [OUTDATED]

Sometimes I look for worlds on the VRChat website. And to easily play in that world I need to launch them. But the settings you put in don’t get saved. So I have to reinput them in if I want my desired settings. Otherwise I can just launch it with the default settings. Which is Public, US. But I prefer Friends+ and I’m from the EU.

Thanks to this script I can scroll through the world list and open every world I want to visit in a new tab and it will automatically launch the instance with the desired settings. Then it will automatically invite myself and predownload/cache the world using VRCX <https://github.com/pypy-vrc/VRCX>.  (Note: Make sure you have increased your cache size if you are planning to predownload a lot of worlds, otherwise VRChat might delete them because of a lack of space and thus you have wasted that download. Info on how to change cache settings (and other stuff) <https://docs.vrchat.com/docs/configuration-file>.)

Then the tab will remain so I can invite myself when I wanna to that world.

## Auto Launch Web

Auto make a new instance using the web interface.

You can change the following settings in the JS file under ////Settings

* Instance Type:
  * The type of the instance: friends+, friends, invite+, invite.
  * Var name: "instanceType".
* Region: region = "eu";
  * The region of the instance: us, eu, jp. (Future regions might be automaticity supported.)
  * Var name: "region".
* Launch Delay:
  * How long it will take before the script does it thing. Value in seconds. This gives you time to cancel it.
  * Var name: "launchDelay".

## Auto Invite

Auto invite using the web interface.

You can change the following settings in the JS file under ////Settings

* Launch Delay:
  * How long it will take before the script does it thing. Value in seconds. This gives you time to cancel it.
  * Var name: "launchDelay".
