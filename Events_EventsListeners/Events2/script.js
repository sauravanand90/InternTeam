let anchorElement = document.getElementById('fanchor')

anchorElement.addEventListener('click', function(event){
    event.preventDefault()
    anchorElement.textContent = "Click Done"
})