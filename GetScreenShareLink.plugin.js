//META{"name":"GetScreenSharedLink","website":"https://hackmd.io/kFDZRnfKT7ueu089o97nZA?view","source":"https://github.com/NawaNae/GetScreenSharingLink/blob/master/GetScreenShareLink.plugin.js"}*//
//原始範例 : https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/VoiceChatNotifications.plugin.js
class GetScreenSharedLink {	
    getName() { return "GetScreenSharedLink"; }
    getDescription() { return "Let you have ability to get screen sharing link of current voice channel by press some shortcut keys (alt + S)"; }
    getVersion() { return "0.0.1"; }
	getAuthor() { return "NawaNawa"; }
	getChanges() {
		return {
            "0.0.1" : 
            `
               try to make it.
            `,
            "0.0.2" :
            `
                new feature : [ctrl + S] append link to the chatbox 
            `
        };
	}
    load() {}
    start() {
        let libLoadedEvent = () => {
            try{ this.onLibLoaded(); }
            catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); }
        };
		let lib = document.getElementById("NeatoBurritoLibrary");
		if(lib == undefined) {
			lib = document.createElement("script");
			lib.setAttribute("id", "NeatoBurritoLibrary");
			lib.setAttribute("type", "text/javascript");
			lib.setAttribute("src", "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js");
			document.head.appendChild(lib);
		}
        if(typeof window.Metalloriff !== "undefined") libLoadedEvent();
        else lib.addEventListener("load", libLoadedEvent);
    }
    copy(text)
    {
        let input=document.createElement("input");
        document.body.appendChild(input);
        input.value=text;
        input.select();
        document.execCommand("copy");
        input.remove();
    }
    getShareLink()
    {
        return location.href.slice(0,location.href.lastIndexOf("/")+1)+NeatoLib.getSelectedVoiceChannel().id;
    }
	onLibLoaded() {
        this.onKeyDown = e => {
            if(e.ctrlKey && e.key =="s")
            {
                try
                {
                    console.log(`\nlink : ${this.getShareLink()}`);
                    NeatoLib.Chatbox.appendText(this.getShareLink());
                }
                catch(e)
                {
                    console.log("fail to get current channel link")
                }
            }
            else
            if(e.altKey && e.key == "s") { // alt + s
                try
                {
                    console.log(`\nlink : ${this.getShareLink()}`);
                    this.copy(this.getShareLink());
                }
                catch(e)
                {
                    console.log("fail to get current channel link")
                }
            }
        };
        document.addEventListener("keydown", this.onKeyDown);
        NeatoLib.Events.onPluginLoaded(this);
    }
    stop() {
        if(this.onKeyDown) document.removeEventListener("keydown", this.onKeyDown);
        this.ready = false;
	}
}