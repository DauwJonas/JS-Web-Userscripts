// ==UserScript==
// @name         2deHands Blocks Listed Ads
// @namespace    https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/2deHands/
// @version      0.2
// @description  Filter out annoying listed ads.
// @author       Dauw_Jonas
// @updateURL    https://github.com/DauwJonas/JS-Web-Userscripts/raw/master/2deHands/Blocks%20Listed%20Ads/Blocks%20Listed%20Ads.js
// @downloadURL  https://github.com/DauwJonas/JS-Web-Userscripts/raw/master/2deHands/Blocks%20Listed%20Ads/Blocks%20Listed%20Ads.js
// @match        https://www.2dehands.be/l/*
// @match        https://www.2dehands.be/q/*
// @icon         https://www.google.com/s2/favicons?domain=2dehands.be
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    //#region Block List
    let bannedText = [
        "<span>Topadvertentie</span>",
    ];

    {
        let bannedSellers = [
            "BVA Auctions",
            "Haaima Computers",
            "BeComputers.be",
            "Lalashops.nl",
            "iSolus.Be",
            "Megekko.nl",
        ];

        bannedSellers.forEach(el => {
            bannedText.push(`<span class="mp-Listing-seller-name">${el}</span>`);
        });
    }
    //#endregion

    //#region Trigger
    let lastRunTime = 0;
    let delayTime = 250;
    let timeoutFunction;
    let firstDetection = document.addEventListener("DOMNodeInserted", () => {
        let el = document.querySelectorAll("div.mp-Page-element.mp-Page-element--main")
        if (el.length != 0) {
            firstDetection = undefined;
            el[0].addEventListener("DOMNodeInserted", () => {
                timeoutTrigger();
            });
        };
    });

    function timeoutTrigger() {
        if (lastRunTime <= Date.now() - delayTime) {
            lastRunTime = Date.now();
            functionName();
        } else {
            clearTimeout(timeoutFunction);
            timeoutFunction = setTimeout(() => {
                functionName();
            }, delayTime);
        }
    }
    //#endregion

    //#region Retrigger on changing page
    let controlBtns = document.getElementsByClassName("mp-PaginationControls");
    for (let i = 0; i < controlBtns.length; i++) {
        const el = controlBtns[i];
        el.addEventListener("click", functionTimeout);
    }
    //#endregion 
    //#region Main Function
    function functionName() {
        console.log("Run Blocks Listed Ads");
        //#region Blocks Listed Ads & Sellers (mostly top of page)
        let allPageItems = document.querySelectorAll("div.mp-Page-element.mp-Page-element--main")[0].querySelectorAll("li.mp-Listing.mp-Listing--list-item");

        for (let i = 0; i < allPageItems.length; i++) {
            const el = allPageItems[i];
            for (let k = 0; k < bannedText.length; k++) {
                const el2 = bannedText[k];
                if (el.innerHTML.includes(el2)) {
                    setAttributeDisplayNone(el);
                    //el.setAttribute("style", "display:none !important;");
                    break;
                }
            }
        }
        //#endregion
        //#region Block Pro Zoekertjes (bottom of page)
        let divs = document.querySelectorAll("div.mp-Page-element.mp-Page-element--main>div");
        for (let i = 0; i < divs.length; i++) {
            const el = divs[i];
            if (el.innerHTML.includes("<span>Zoekertjes door 2dehands Pro</span>")) {
                setAttributeDisplayNone(el);
            }
        }
        //#endregion
    }
    //#region setAttributeDisplayNone
    function setAttributeDisplayNone(element) {
        element.setAttribute("style", "display:none !important;");
    }
    //#endregion
    //#endregion
})();