function changeText() {
    let fpara = document.getElementById('fpara')
    fpara.textContent = "Hello Linkedin Family"
}

let fpara = document.getElementById('fpara')

fpara.addEventListener('click', changeText)

//This will remove the EventListener
//fpara.removeEventListener('click', changeText())

//This will give the details of event
// function changeText(event) {
//     console.log(event)
//     let fpara = document.getElementById('fpara')
//     fpara.textContent = "Hello Linkedin Family"
// }