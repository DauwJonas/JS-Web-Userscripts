// ==UserScript==
// @name         Twitter Media Content Warning Remover
// @namespace    https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/Twitter/Content%20Warning%20Remover
// @version      0
// @description  Remove content warning from tweets
// @author       sapphire & Dauw_Jonas
// @updateURL    https://raw.githubusercontent.com/DauwJonas/JS-Web-Userscripts/master/Twitter/Content%20Warning%20Remover/
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://platform.twitter.com/*
// @grant        none
// @run-at       document-end
// @license      MIT
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