var canvas = document.getElementById('c1');
var context = canvas.getContext('2d');


//в этой переменной будет храниться массив, который мы будем сортировать и к которому будем применять бинарный поиск
var array;

var iForBubbleSort, jForBubbleSort;

var isTimerOnBubbleSort = false;

var columnWidth = 15;

var canvasWidth = 1500;

function quickSortIterativeAnimation() {
    arrayOfChanges = [];
    quickSortIterative(array, arrayOfChanges);
    arrayOfChanges = _.uniqWith(arrayOfChanges, _.isEqual);
    var i = 0;
    let timer = setInterval(function () {
        if (i < arrayOfChanges.length) {
            context.clearRect(0, 0, canvasWidth, 400);
            showArray(arrayOfChanges[i]);
            i++;
        }
    }, parseInt(document.getElementById('animationSpeed').value, 10));
}

function quickSortIterative(arr) {
    // Creating an array that we'll use as a stack, using the push() and pop() functions
    stack = [];

    // Adding the entire initial array as an "unsorted subarray"
    stack.push(0);
    stack.push(arr.length - 1);

    // There isn't an explicit peek() function
    // The loop repeats as long as we have unsorted subarrays
    while (stack[stack.length - 1] >= 0) {

        // Extracting the top unsorted subarray
        end = stack.pop();
        start = stack.pop();

        pivotIndex = partition(arr, start, end);
        arrayOfChanges.push(Array.from(arr));


        // If there are unsorted elements to the "left" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex - 1 > start) {
            stack.push(start);
            stack.push(pivotIndex - 1);
        }

        // If there are unsorted elements to the "right" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex + 1 < end) {
            stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }
}

//функция разбиение для алгоритма быстрой сортировки
function partition(arr, start, end) {
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            pivotIndex++;
        }
    }

    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
    return pivotIndex;
};

function binarySearchAnimation() {
    var key = parseInt(document.getElementById('findNumber').value, 10);
    var oldArray = Array.from(array);

    if (isTimerOnBubbleSort) {
        timerSwitchBubbleSort();
    }

    let timer = setInterval(function () {
        if (array.length < 1) {
            clearInterval(timer);
            return;
        }
        if (array.length == 1 && key == array[0]) {
            clearInterval(timer);
            return;
        }
        binarySearch(array, key);
        context.clearRect(0, 0, oldArray.indexOf(array[0]) * 16, 400);
        context.clearRect(16 * (oldArray.indexOf(array[array.length - 1]) + 1), 0, canvasWidth, 400);
    }, parseInt(document.getElementById('animationSpeed').value, 10));
}

function binarySearch(sortedArray, key) {
    let start = 0;
    let end = sortedArray.length - 1;
    let middle = Math.floor((start + end) / 2);
    if (sortedArray.length == 1 && key != sortedArray[0]) {
        sortedArray.splice(0, 1);
    }

    if (sortedArray[middle] === key) {
        sortedArray.splice(0, middle);
        sortedArray.splice(1, sortedArray.length - 1);

    } else if (sortedArray[middle] < key) {
        if (middle != 0)
            sortedArray.splice(0, sortedArray.length - middle - 1);
        else
            sortedArray.splice(0, sortedArray.length - 1);
    } else {
        sortedArray.splice(middle, sortedArray.length - middle);
    }
}

function bubbleSortAnimation() {
    timerSwitchBubbleSort();

    let timer = setInterval(function () {
        if (!isTimerOnBubbleSort) {
            clearInterval(timer);
            return;
        }

        // отрисовать анимацию на момент timePassed, прошедший с начала анимации
        bubbleSort(array, iForBubbleSort, jForBubbleSort)

    }, parseInt(document.getElementById('animationSpeed').value, 10));
}

function timerSwitchBubbleSort() {
    if (isTimerOnBubbleSort)
        isTimerOnBubbleSort = false;
    else
        isTimerOnBubbleSort = true;
}

function bubbleSort(arr, i, j) {
    j = typeof j != "number" ? arr.length - 1 : j;
    i = typeof i != "number" ? 0 : i;
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {

                context.clearRect(0, 0, canvasWidth, 400);

                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;

                showArray(array);
                jForBubbleSort = j;
                iForBubbleSort = i;
                break;
            }
        }
        break;
    }
}

function showArray(array) {
    var x = 0;
    for (let i = 0; i < array.length; i += 1) {
        context.fillStyle = 'black';
        context.fillRect(x, 400, columnWidth, -array[i]);
        context.fillStyle = 'aqua';
        context.font = "small-caps 12px Arial";
        context.fillText(array[i], x, 400);
        x += columnWidth + 1;
    }
}

function arrayGenerate() {
    if (isTimerOnBubbleSort) {
        timerSwitchBubbleSort();
    }

    //создадим массив случайных чисел
    array = [];
    for (let i = 0; i < document.getElementById('arrayCount').value; i++) {
        array.push(Math.floor(Math.random() * (99 - 0) + 0));
    }

    //очистим канвас перед отображением массива
    context.clearRect(0, 0, canvasWidth, 400);

    //отобразим массив
    showArray(array);
}