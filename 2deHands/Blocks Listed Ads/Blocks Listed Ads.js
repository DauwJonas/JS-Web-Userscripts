// ==UserScript==
// @name         2deHands Blocks Listed Ads
// @namespace    https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/2deHands/
// @version      0.0
// @description  Filter out annoying listed ads.
// @author       Dauw_Jonas
// @updateURL    
// @downloadURL  
// @match        https://www.2dehands.be/*
// @icon         https://www.google.com/s2/favicons?domain=2dehands.be
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let allPageItems = document.querySelectorAll("div.mp-Page-element.mp-Page-element--main")[0].querySelectorAll("li.mp-Listing.mp-Listing--list-item");

    for (let i = 0; i < allPageItems.length; i++) {
        const el = allPageItems[i];
        if (el.innerHTML.includes("<span>Topadvertentie</span>")) {
            el.setAttribute("style", "display:none !important;")
        }
    }
})();