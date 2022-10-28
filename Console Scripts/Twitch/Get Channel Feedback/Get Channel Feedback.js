let mainDiv = document.querySelector('div[data-a-target="recommendations-Channel Feedback"]');
let nextPage = mainDiv.parentElement.querySelector('button[aria-label="Next Page"]');
let array = new Array;

let lastRunTime = 0;
let delayTime = 250;
let timeoutFunction = undefined;

let triggerCount = 0;

let channelStop = "";

let CFL = mainDiv.addEventListener("DOMNodeInserted", () => {
    timeoutTrigger();
});

function timeoutTrigger() {
    if (lastRunTime <= Date.now() - delayTime) {
        lastRunTime = Date.now();
        console.log("Next");
        functionName();
    } else {
        console.log("Wait");
        clearTimeout(timeoutFunction);
        timeoutFunction = setTimeout(() => {
            if (!array.includes(channelStop)) {
                functionName();
            }
            else {
                done();
            }
        }, delayTime);
    }
}

function functionName() {
    const elChannelNames = mainDiv.querySelectorAll('.bDGnvG');
    elChannelNames.forEach(element => {
        const elT = element.innerHTML;
        if (!array.includes(elT)) {
            array.push(elT);
        }
    });
    nextPage.click();
}

function done() {
    let arrayString = '{"channels":[';
    array.forEach(element => {
        if (element != "Channel Feedback") {
            arrayString += "\"" + element + "\",";
        }
    });
    arrayString = arrayString.substring(0, arrayString.length - 1);
    arrayString += "]}";
    console.log(arrayString);
    Download(arrayString, "Twitch Not Interested", "json")
}

function Download(src, fileName = "Img", fileExtension = "png") {
    let nDownloadEl = document.createElement("a");
    nDownloadEl.setAttribute("download", fileName + "." + fileExtension);
    nDownloadEl.setAttribute("href", "data:text/json," + src);
    nDownloadEl.setAttribute("style", "display:none;")
    document.body.append(nDownloadEl);
    console.log(nDownloadEl);
    nDownloadEl.click();
    nDownloadEl.remove();
}

functionName();