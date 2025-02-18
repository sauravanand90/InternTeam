(* The below file is HTML file *)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="padding: 1rem; margin: 1rem; background-color: yellow;">
        Hello Jee
        <div id="mydiv" style="padding: 3rem;
        background-color: grey;">
            <p id="fpara">First</p>
            <h1>second</h1>
            <p>Third</p>
        </div>
    </div>
    <script src="indexx.js"></script>
</body>
</html>

(* The below file is JavaScript file *)
let mydiv = document.querySelector('#mydiv')

let newElement = document.createElement('span')
newElement.textContent = "Aanchal"

mydiv.insertAdjacentElement('beforebegin', newElement)

let parent = document.querySelector('#mydiv')
let child = document.querySelector('#fpara')
parent.removeChild(child)
