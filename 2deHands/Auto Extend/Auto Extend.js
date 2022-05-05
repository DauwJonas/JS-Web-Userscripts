// ==UserScript==
// @name         2deHands Auto Extend
// @namespace    https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/2deHands/Auto%20Extend
// @version      0.2
// @description  Auto extend all expiring.
// @author       Dauw_Jonas
// @updateURL    https://github.com/DauwJonas/JS-Web-Userscripts/raw/master/2deHands/Auto%20Extend/Auto%20Extend.js
// @downloadURL  https://github.com/DauwJonas/JS-Web-Userscripts/raw/master/2deHands/Auto%20Extend/Auto%20Extend.js
// @match        https://www.2dehands.be/my-account/sell/index.html
// @icon         https://www.google.com/s2/favicons?domain=2dehands.be
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    DoExtent();
    setTimeout(DoExtent, 1000);
    setTimeout(DoExtent, 5000);
    setTimeout(DoExtent, 10000);

    function DoExtent() {
        document.getElementsByClassName("verlengen").forEach(element => element.click());
        console.log("Extent clicked.")
    }
})();