// ==UserScript==
// @name        Twitter Media Content Warning Remover
// @namespace   https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/Twitter/Content%20Warning%20Remover
// @version     1
// @description Remove content warning from tweets
// @author      sapphire - https://www.sapphire.sh/
// @author      Dauw_Jonas
// @updateURL   https://raw.githubusercontent.com/DauwJonas/JS-Web-Userscripts/master/Twitter/Content%20Warning%20Remover/Twitter%20Media%20Content%20Warning%20Remover.js
// @downloadURL https://raw.githubusercontent.com/DauwJonas/JS-Web-Userscripts/master/Twitter/Content%20Warning%20Remover/Twitter%20Media%20Content%20Warning%20Remover.js
// @match       https://twitter.com/*
// @match       https://mobile.twitter.com/*
// @match       https://platform.twitter.com/*
// @icon        https://abs.twimg.com/favicons/twitter.ico
// @grant       none
// @run-at      document-end
// @license     MIT
// ==/UserScript==
/******/
(() => { // webpackBootstrap
    /******/
    "use strict";
    var __webpack_exports__ = {};
    /*!******************************************************!*\
      !*** ./src/scripts/twitter-media-warning-remover.ts ***!
      \******************************************************/

    (function() {
        var observer = new MutationObserver(function() {
            var elements = Array.from(document.querySelectorAll('article div[role="button"].r-173mn98'));
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var element = elements_1[_i];
                element.click();
            }
        });
        observer.observe(document.body, {
            'childList': true,
            'subtree': true,
        });
    })();

    /******/
})();