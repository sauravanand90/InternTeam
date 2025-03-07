let arr1 = [1, 2, 3, 4, 5]
let arr2 = [10, 50, 40, 80]

function MaxMin(arr) {
    let max = Number.MIN_SAFE_INTEGER
    let min = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= max) {
            max = arr[i]
        }
        if (arr[i] <= min) {
            min = arr[i]
        }
    }
    console.log(max, min)
}
MaxMin(arr1)
MaxMin(arr2)