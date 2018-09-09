'use strict'

var pMessage = document.getElementById("permutationResult");
var messageNthNum = document.getElementById("smallResult");
var pOutput = new Array();

//Common Start
function sucessFunction(result, message) {
    message.innerHTML = result;

    if (message.classList.contains("alert-danger")) {
        message.classList.remove("alert-danger");
    }

    if (!message.classList.contains("alert-primary")) {
        message.className += " alert-primary";
    }
}

function errorFunction(err, message) {
    var msg = '<ul class=\"list-group\">';
    err.forEach(function (element) {
        msg += '<li>' + element + '</li>';
    });
    msg += '</ul>';
    message.innerHTML = msg;

    if (message.classList.contains("alert-primary")) {
        message.classList.remove("alert-primary");
    }

    if (!message.classList.contains("alert-danger")) {
        message.className += " alert-danger";
    }
}
//Common End

//Permutations Start
function pSwap(alphabets, index1, index2) {
    var temp = alphabets[index1];
    alphabets[index1] = alphabets[index2];
    alphabets[index2] = temp;
    return alphabets;
}

function permute(alphabets, startIndex, endIndex) {
    if (startIndex === endIndex) {
        pOutput.push(alphabets.join(''));
    } else {
        var i;
        for (i = startIndex; i <= endIndex; i++) {
            pSwap(alphabets, startIndex, i);
            permute(alphabets, startIndex + 1, endIndex);
            pSwap(alphabets, i, startIndex);
        }
    }
    return pOutput;
}

function permutations() {
    var pInputNumber;
    var errPerMessage = new Array();
    var pArray = new Array();
    pMessage.innerHTML = "";
    pMessage.style.display = "block";
    pInputNumber = document.getElementById("numbers").value;
    console.log(pInputNumber.trim())
    try {
        if (pInputNumber === null || pInputNumber === undefined || pInputNumber.trim() === "") {
            errPerMessage.push("Input is empty");
        } else {
            pArray = pInputNumber.split(",").map(Number);
            pArray.forEach(function (element) {
                if (isNaN(element)) {
                    errPerMessage.push("Input array is dirty");
                }
            });
        }

        if (errPerMessage.length != 0) {
            throw errPerMessage;
        }
        pOutput.length = 0;
        var pResult = permute(pArray, 0, pArray.length - 1);
        sucessFunction(pResult, pMessage);
    }
    catch (err) {
        errorFunction(err, pMessage);

    }
}
//Permutations End

//nth Start
function nthSamllestNumber(nums, k) {
    if (k < 1 || nums == null) {
        return 0;
    }
    return getKth(k, nums, 0, nums.length - 1);
}

function getKth(k, nums, start, end) {
    var pivot = nums[end];
    var left = start;
    var right = end;
    while (true) {
        while (nums[left] < pivot && left < right) {
            left++;
        }
        while (nums[right] >= pivot && right > left) {
            right--;
        } if (left == right) {
            break;
        }
        swapNthNumber(nums, left, right);
    }

    swapNthNumber(nums, left, end);

    if (k == left + 1) {
        return pivot;
    } else if (k < left + 1) {
        return getKth(k, nums, start, left - 1);
    } else {
        return getKth(k, nums, left + 1, end);
    }
}

function swapNthNumber(nums, n1, n2) {
    var tmp = nums[n1];
    nums[n1] = nums[n2];
    nums[n2] = tmp;
}

function nthNumber() {
    var inputNumberToGetNth = document.getElementById("numberSmall").value;
    var inputNthNumber = document.getElementById("nSmall").value;
    messageNthNum.innerHTML = "";
    var errMessage = [];
    var arrayNth = [];
    messageNthNum.style.display = "block";
    try {
        if (inputNumberToGetNth === null || inputNumberToGetNth === undefined || inputNumberToGetNth.trim() === "") {
            errMessage.push("Input is empty");
        } else {
            arrayNth = inputNumberToGetNth.split(",").map(Number);
            arrayNth.forEach(function (element) {
                if (isNaN(element)) {
                    errMessage.push("Input array is dirty");
                }
            });
        }

        if (inputNthNumber === null || inputNthNumber === undefined || inputNthNumber.trim() === "") {
            errMessage.push("nth Number is empty");
        } else if (isNaN(inputNthNumber) || !Number.isInteger(Number(inputNthNumber))) {
            errMessage.push("nth Number is not a integer");
        }


        if (Number(inputNthNumber) <= 0 || arrayNth.length < Number(inputNthNumber)) {
            errMessage.push("Out of Index, nth number should be greater than 0 and less than are equal to" + arrayNth.length);
        }

        if (errMessage.length != 0) {
            throw errMessage;
        }

        var nResult = nthSamllestNumber(arrayNth, inputNthNumber);
        sucessFunction(nResult, messageNthNum);
    } catch (err) {
        errorFunction(err, messageNthNum);
    }
}
//nth End