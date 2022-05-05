// ==UserScript==
// @name         Auto Download
// @namespace    https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/NexusMods
// @version      0.0
// @description  
// @author       Dauw_Jonas
// @downloadURL  
// @updateURL    
// @match        https://www.nexusmods.com/newvegas/mods/*
// @icon         
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let btnDownload = document.getElementById("slowDownloadButton");

    btnDownload.click();
})();