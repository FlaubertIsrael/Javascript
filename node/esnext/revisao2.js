// Arrow Function
const soma = (a, b) => a + b 
console.log(soma(2,3))

// Arrow Function (this)
const lexico1 = () => console.log(this === exports)
const lexico2 = lexico1.bind({})
lexico1()
lexico2()

// parametro defaut
function log(text = 'Node'){
    console.log()
}
 
log()
log('Sou mais forte')


// operador rest
function total(...numeros) {
    let total = 0
    numero.forEach(n => total +- n)
    return total  
}
console.log(total(2, 3, 4, 5))