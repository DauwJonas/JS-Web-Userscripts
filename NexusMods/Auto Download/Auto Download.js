// ==UserScript==
// @name         NexusMods Auto Download
// @namespace    https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/NexusMods/Auto%20Download
// @version      0.1
// @description  Auto Clicks on the button "Slow download".
// @author       Dauw_Jonas
// @downloadURL  https://github.com/DauwJonas/JS-Web-Userscripts/raw/master/NexusMods/Auto%20Download/Auto%20Download.js
// @updateURL    https://github.com/DauwJonas/JS-Web-Userscripts/raw/master/NexusMods/Auto%20Download/Auto%20Download.js
// @match        https://www.nexusmods.com/*/mods/*
// @icon         https://images.nexusmods.com/favicons/DeepOrange/favicon-230x230.png
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Vars
    let btnDownload = document.getElementById("slowDownloadButton");

    btnDownload.click();
})();