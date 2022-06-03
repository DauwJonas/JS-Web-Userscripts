// ==UserScript==
// @name        YouTube Hide Download Button
// @namespace   https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/YouTube/Hide%20Download%20Button
// @version     1.0
// @description Simple script, that hides the download button on YouTube videos (below the video and from the context menu)
// @author      The Timebreaker @GreasyFork
// @author      Dauw_Jonas
// @updateURL   https://raw.githubusercontent.com/DauwJonas/JS-Web-Userscripts/master/YouTube/Hide%20Download%20Button/YouTube%20Hide%20download%20button.js
// @downloadURL https://raw.githubusercontent.com/DauwJonas/JS-Web-Userscripts/master/YouTube/Hide%20Download%20Button/YouTube%20Hide%20download%20button.js
// @match       https://youtube.com/*
// @match       https://www.youtube.com/*
// @icon        https://www.youtube.com/s/desktop/d4eb50c8/img/favicon_144x144.png
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerText = 'ytd-menu-service-item-download-renderer{display:none;}ytd-download-button-renderer{display:none;}';
    document.head.appendChild(style);
})();