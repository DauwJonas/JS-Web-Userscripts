// ==UserScript==
// @name         2deHands Auto Extend
// @namespace    https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/2deHands
// @version      0.1
// @description  Auto extend all expiring.
// @author       Dauw_Jonas
// @updateURL    https://github.com/DauwJonas/JS-Web-Userscripts/blob/master/2deHands/2deHands%20Auto%20Extend.js
// @downloadURL  https://github.com/DauwJonas/JS-Web-Userscripts/blob/master/2deHands/2deHands%20Auto%20Extend.js
// @match        https://www.2dehands.be/my-account/sell/index.html
// @icon         https://www.google.com/s2/favicons?domain=2dehands.be
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByClassName("verlengen").forEach(element => element.click());
})();