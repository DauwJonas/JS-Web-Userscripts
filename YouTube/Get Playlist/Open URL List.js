let urlList = ``.split(',');
console.log(urlList);

urlList.forEach(element => {
    open(element)
});