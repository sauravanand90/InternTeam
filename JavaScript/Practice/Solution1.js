function Pyramid(n) {
    for (let i = n; i >= 0; i--) {
        let row = "" 
        for (let j = 1; j <= i; j++) {
            if (i == n || i == 1 || j == 1 || j == i){
                row += "*" 
            }
            else{
                row += " "
            }
        }
        console.log(row)
    }
}
Pyramid(5)
Pyramid(4)
Pyramid(3)
Pyramid(2)
