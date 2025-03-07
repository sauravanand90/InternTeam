function getData(dataId){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log("Data : ", dataId)
            resolve("success")
        }, 2000)
    })
}

//Promise Chaining
let p1 = getData(1)
p1.then((res) => {
    console.log(res)
    let p2 = getData(2)
    p2.then((res) => {
        console.log(res)
        let p3 = getData(3)
        p3.then((res) => {
            console.log(res)
        })
    })
})