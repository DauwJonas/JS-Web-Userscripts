// ==UserScript==
// @name         VRC Auto Invite
// @namespace    https://github.com/DauwJonas/JS-Web-Userscripts/tree/master/VRChat/Auto%20Launch%20%26%20Invite
// @version      0.2
// @description  Auto invite using the web interface.
// @author       Dauw_Jonas
// @updateURL    https://github.com/DauwJonas/JS-Web-Userscripts/blob/master/VRChat/Auto%20Launch%20%26%20Invite/Auto%20Invite.js
// @downloadURL  https://github.com/DauwJonas/JS-Web-Userscripts/blob/master/VRChat/Auto%20Launch%20%26%20Invite/Auto%20Invite.js
// @match        https://vrchat.com/home/launch?worldId=wrld_*
// @icon         https://assets.vrchat.com/www/favicons/safari-pinned-tab.svg
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    ////Settings
    let launchDelay = 5; //In Seconds

    //Format settings 
    launchDelay = launchDelay * 1000;

    //Insert UI
    let ALW_Body = document.createElement("div");
    ALW_Body.classList.add("ALW_Body");
    ALW_Body.innerHTML = "<style>\/*****  General*\/ :root {\/* General *\/--DJ-background-color: #191919;--DJ-background-color2: #262626;\/* Text *\/--DJ-color: #afafaf;--DJ-font-family: inherit;--DJ-font-size: 2rem;\/** Link *\/\/* Input Text *\/--DJ-input-text-background-color: #262626;--DJ-input-text-border-color: #34393D;\/** Button *\/--DJ-button-background-color: #82471A;--DJ-button-border-color: #592D10;--DJ-button-color: #D1D1D1;}p {margin: 0;margin-bottom: .25rem;}\/*****  Body*\/.ALW_Body {width: 100%;align-items: center;display: flex;flex-direction: column;flex-wrap: nowrap;justify-content: center;z-index: 10000;}.ALW_Body>* {font-family: var(--DJ-font-family);color: var(--DJ-color);}.ALW_UI {display: block;background-color: var(--DJ-background-color);border: 2px solid var(--DJ-background-color2);border-radius: 2px;padding: .5rem;position: fixed;top: 0;z-index: 10000;}.ALW_UI>div {margin-bottom: .5rem;}.ALW_UI div:last-child {margin-bottom: 0;}\/****  Header*\/.ALW_Header {}.ALW_h1 {font-size: 125%;font-weight: bold;text-align: center;}.ALW_Credits {display: none;font-size: 80%;text-align: right;}\/****  Status*\/.ALW_Status {margin-bottom: .5rem;}\/****  Cancel*\/.ALW_Btn {background-color: #8b0000;border: 2px solid #640000;border-radius: .5rem;color: var(--DJ-button-color);display: block;font-weight: bold;margin: 0 auto;padding: .3rem;text-align: center;transition-duration: .1s;width: fit-content;min-width: 35%;}.ALW_Btn:hover,.ALW_Btn:focus {background-color: #640000;border: 2px solid #8b0000;cursor: pointer;font-weight: bold;}<\/style><div class=\"ALW_UI\"><div class=\"ALW_Header\"><p class=\"ALW_h1\">Auto Launch Web<\/p><p class=\"ALW_Credits\">By Dauw_Jonas<\/p><\/div><div class=\"ALW_Status\"><span>Status: <\/span><span id=\"ALW_Status\"><\/span><span id=\"ALW_Status2\"><\/span><span>.<\/span><\/div><div class=\"ALW_Cancel\"><p class=\"ALW_p\">Stop auto launching of a instance in web.<\/p><p class=\"ALW_Btn\" id=\"ALW_Cancel\">Cancel<\/p><\/div><\/div>";
    //Insert UI
    document.body.appendChild(ALW_Body);
    //Var UI
    let ALW_Status = document.getElementById("ALW_Status");
    let ALW_Status2 = document.getElementById("ALW_Status2");
    let ALW_Cancel = document.getElementById("ALW_Cancel");
    let timeOutFunction;
    let intervalFunction;
    ALW_Cancel.addEventListener("click", function() {
        clearTimeout(timeOutFunction);
        clearInterval(intervalFunction);
        ALW_Status.innerText = "Canceled";
        ALW_Status2.innerText = "";
        ALW_Cancel.parentElement.remove();
        timeOutFunction = setTimeout(function() {
            ALW_Body.remove();
        }, 1000);
    });
    //Set Status
    ALW_Status.innerText = "Wait for page to load";
    //Var VRC Web
    let btnInvite;
    let VRCWebEls; //VRCEls Var
    //Times
    const checkPageLoadedDelay = 2000; //In ms
    let countPageNotLoaded = 0;
    let launchIn;
    //Wait for page to load
    timeOutFunction = setTimeout(checkPageLoaded, checkPageLoadedDelay);

    function checkPageLoaded() {
        btnInvite = document.querySelector("button.btn.btn-primary.launch-btn.secondary-launch-btn.btn-secondary");
        VRCWebEls = [btnInvite];
        if (btnInvite == null) {
            countPageNotLoaded++;
            if (countPageNotLoaded >= 3) {
                ALW_Status.innerText += " Times failed: ";
                ALW_Status2.innerText = countPageNotLoaded;
                timeOutFunction = setTimeout(checkPageLoaded, checkPageLoadedDelay * 2);
            } else if (countPageNotLoaded >= 10) {
                ALW_Status.innerText = "Page Failed to load or didn't find needed Elements";
                ALW_Status2.innerText = "";
                //End script
            }
        } else {
            //Wait for user to cancel otherwise continue
            ALW_Status.innerText = "Inviting in ";
            ALW_Status2.innerText = launchDelay / 1000;
            launchIn = launchDelay;
            timeOutFunction = setTimeout(launchCountDown, 1000);
        }
    }

    function launchCountDown() {
        launchIn -= 1000;
        if (launchIn > 0) {
            ALW_Status2.innerText = launchIn / 1000;
            timeOutFunction = setTimeout(launchCountDown, 1000);
        } else {
            ALW_Status2.innerText = "Now";
            launchWorldInWeb();
        }
    }

    function launchWorldInWeb() {
        for (let i = 0; i < VRCWebEls.length; i++) {
            const element = VRCWebEls[i];
            element.click();
        }
        ALW_Status.innerText = "Done";
        ALW_Status2.innerText = "";
        //End script
    }
})();