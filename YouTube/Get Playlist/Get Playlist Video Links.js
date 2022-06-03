let iStart = undefined;
let iStop = undefined;

let aList = document.querySelectorAll('a#video-title')
let idList = Array();
iStart == undefined ? iStart = 0 : null;
iStop == undefined ? aList.length : null;
for (let i = iStart; i <= iStop; i++) {
    const element = aList[i];
    idList.push("https://youtu.be/" + element.getAttribute('href').substring(9, 20))
}

console.log(idList.toString())