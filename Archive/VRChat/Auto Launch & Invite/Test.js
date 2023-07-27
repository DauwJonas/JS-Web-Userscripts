// ==UserScript==
// @name         Test
// @namespace    https://github.com/DauwJonas
// @description
// @author       Dauw_Jonas
// @match        https://vrchat.com/home/*
// @icon         https://assets.vrchat.com/www/favicons/safari-pinned-tab.svg
// @run-at       document-end
// @grant        none
// ==/UserScript==

//#region Event locationChange
(function() {
    var pushState = history.pushState;
    var replaceState = history.replaceState;

    history.pushState = function() {
        pushState.apply(history, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationChange'));
    };

    history.replaceState = function() {
        replaceState.apply(history, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationChange'));
    };

    window.addEventListener('popstate', function() {
        window.dispatchEvent(new Event('locationChange'))
    });
})();
//#endregion

(function() {
    'use strict';

    ////Settings
    let launchDelay = 5; //In Seconds

    //Format settings 
    launchDelay = launchDelay * 1000;

    //Insert UI
    let ALW_Body = document.createElement("div");
    ALW_Body.classList.add("ALW_Body");
    ALW_Body.innerHTML = `<div class="ALW_Body">
    <script src="https://dauwjonas.github.io/Library/js/EasyFunctions.js" type="text/javascript"></script>
    <style type="text/css">
        /*#region General*/
        
         :root {
            /* General */
            --DJ-background-color: #191919;
            --DJ-background-color2: #262626;
            --DJ-background-color2: #262626;
            --DJ-background-color3: #2d2d2d;
            /* Text */
            --DJ-color: #afafaf;
            --DJ-font-family: inherit;
            --DJ-font-size: 2rem;
            /** Link */
            /* Input Text */
            --DJ-input-text-background-color: #262626;
            --DJ-input-text-border-color: #34393D;
            /** Button */
            --DJ-button-background-color: #82471A;
            --DJ-button-border-color: #592D10;
            --DJ-button-color: #D1D1D1;
        }
        
        p {
            margin: 0;
            margin-bottom: .25rem;
        }
        /*#endregion General*/
        /*#region Body*/
        
        .ALW_Body {
            width: 100%;
            align-items: center;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            z-index: 10000;
        }
        
        .ALW_Body>* {
            font-family: var(--DJ-font-family);
            color: var(--DJ-color);
        }
        
        .ALW_UI {
            display: block;
            background-color: var(--DJ-background-color);
            border: 2px solid var(--DJ-background-color2);
            border-radius: 2px;
            padding: .5rem;
            position: fixed;
            top: 0;
            z-index: 10000;
        }
        
        .ALW_UI>div {
            margin-bottom: .5rem;
        }
        
        .ALW_UI div:last-child {
            margin-bottom: 0;
        }
        /*#endregion Body*/
        /*#region Header*/
        
        .ALW_Header {
            font-size: 125%;
            font-weight: bold;
            text-align: center;
        }
        
        .ALW_h1 {
            font-size: 125%;
        }
        
        .ALW_h2 {
            font-size: 100%;
        }
        
        .ALW_Credits {
            display: none;
            font-size: 80%;
            text-align: right;
        }
        /*#endregion Header*/
        /*#region Status*/
        
        .ALW_Status {
            margin-bottom: .5rem;
        }
        /*#endregion Status*/
        /*#region Buttons*/
        
        .ALW_Btn {
            background-color: var(--DJ-background-color2);
            border-color: var(--DJ-background-color3);
            border-radius: .75rem;
            border-style: solid;
            border-width: .2rem;
            color: var(--DJ-button-color);
            display: block;
            font-weight: bold;
            margin: 0 auto;
            padding: .3rem;
            text-align: center;
            transition-duration: .1s;
            width: fit-content;
            min-width: 35%;
        }
        
        .ALW_Btn:hover,
        .ALW_Btn:focus {
            background-color: var(--DJ-background-color3);
            border-color: var(--DJ-background-color2);
            cursor: pointer;
            font-weight: bold;
        }
        /*#region Cancel*/
        
        .ALW_Cnl {
            background-color: #8b0000;
            border-color: #640000;
        }
        
        .ALW_Cnl:hover,
        .ALW_Cnl:focus {
            background-color: #640000;
            border-color: #8b0000;
        }
        /*#endregion Cancel*/
        /*#endregion Buttons*/
    </style>
    <div class="ALW_UI">
        <div class="ALW_Header">
            <p class="ALW_h1">Auto Launch & Invite</p>
            <p id="ALW_h2" class="ALW_h2">Auto Launch xor Invite</p>
            <p class="ALW_Credits">By Dauw_Jonas</p>
        </div>
        <div class="ALW_Status">
            <span>Status: </span>
            <span id="ALW_Status">Status message.</span> <span id="ALW_Status2">Timer</span><span>.</span>
        </div>
        <div class="ALW_Cancel">
            <p class="ALW_CancelP" id="ALW_CancelP">Cancel message.</p>
            <p class="ALW_Btn ALW_Cnl" id="ALW_CancelBtn">Cancel</p>
        </div>
        <div class="ALW_Close">
            <p class="ALW_CloseP" id="ALW_CloseP">Close message.</p>
            <p class="ALW_Btn" id="ALW_CloseBtn">Close</p>
        </div>
    </div>
</div>`;
    //Insert UI
    document.body.appendChild(ALW_Body);
    //Var UI
    let ALW_h2 = document.getElementById("ALW_h2");
    let ALW_Status = document.getElementById("ALW_Status");
    let ALW_Status2 = document.getElementById("ALW_Status2");
    let ALW_CancelP = document.getElementById("ALW_CancelP");
    let ALW_CloseP = document.getElementById("ALW_CloseP");
    let ALW_CancelBtn = document.getElementById("ALW_CancelBtn");
    let ALW_CloseBtn = document.getElementById("ALW_CloseBtn");

    //Set UI Test
    ALW_h2.innerHTML = "Test";
    //Set Status
    ALW_Status.innerText = "Count page change:";
    let PCC = 0;
    updateStatus();
    //Wait for page to load

    window.addEventListener("locationChange", function() {
        PCC++;
        updateStatus();
        ALW_h2.innerHTML = "TT";
    });

    function updateStatus() {
        ALW_Status2.innerText = PCC;
    }
})();