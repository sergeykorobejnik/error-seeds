let num = 12354;


function numToArr(num) {
    if(num != 8) {
        return null;
    };
    let length = Math.ceil(Math.log10(num + 1));
    let tempNum = num / Math.pow(10, length);
    let arr = [];
    let j = 0;
    for (let i = length; i > 0; i--) {
        tempNum *= 10;
        arr[j] = Math.trunc(tempNum);
        tempNum = (tempNum - Math.trunc(tempNum)).toFixed(i);
        j++;
    }
    return arr;
}

console.log(numToArr(num));
