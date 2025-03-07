let paras = document.querySelectorAll('p')

function alertPara(event){
    if(event.target.nodeName === 'SPAN'){
        alert("You have clicked on para: " + event.target.textContent)
    }
}

// for(let i=0; i<paras.length; i++) {
//     let para = paras[i]
//     para.addEventListener('click', alertPara)
// }

let mydiv = document.getElementById('wrapper')
document.addEventListener('click', alertPara)