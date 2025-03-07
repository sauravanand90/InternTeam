function getData(dataId, getNextData){
    setTimeout(()=>{
        console.log("Data : ", dataId)
        if(getNextData){
            getNextData()
        }
    }, 2000)
}

//Callback Hell: Nested callbacks stacked below one another forming a pyramid structure.
//Difficult to manage and understand. For this problem, promises were introduced.
getData(1, ()=>{
    console.log("Getting data 2...")
    getData(2, ()=>{
        console.log("Getting data 3...")
        getData(3, ()=>{
            console.log("Getting data 4...")
            getData(4)
        })
    })
})

