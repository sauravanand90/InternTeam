fetch("https://jsonplaceholder.typicode.com/users")
.then(response=>response.json())
.then(data=>{
    const userList=document.getElementById("userList");
    data.forEach(user => {
        let listItem=document.createElement("li");
        listItem.textContent=`${user.name} - ${user.email}`;
        userList.append(listItem);
    });
})
.catch(error=>console.error('error in fetching data',error));