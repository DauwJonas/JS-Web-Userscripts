// ==UserScript==
// @name         2deHands Auto Extend
// @namespace    
// @version      0.1
// @description  Auto extend all expiring.
// @author       Dauw_Jonas
// @updateURL    
// @downloadURL  
// @match        https://www.2dehands.be/my-account/sell/index.html
// @icon         https://www.google.com/s2/favicons?domain=2dehands.be
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByClassName("verlengen").forEach(element => element.click());
})();