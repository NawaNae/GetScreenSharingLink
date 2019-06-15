//META{"name":"GetScreenSharedLink"}*//
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
            "1.1.1" :
            `
                hehe
            `,
            "1.1.3" :
            `
            hehe
            `,
            "1.2.3" :
            `
            hehe
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

        NeatoLib.Updates.check(this);

        this.log = [];




        this.focused = true;

        this.focus = () => this.focused = true;
        this.unfocus = () => this.focused = false;

        window.addEventListener("focus", this.focus);
        window.addEventListener("blur", this.unfocus);

        this.onKeyDown = e => {
            if(e.altKey && e.key == "s") { // alt + s
                console.log("ctrl+s");
                console.log("\nlink : this.getShareLink()");
                this.copy(this.getShareLink());
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