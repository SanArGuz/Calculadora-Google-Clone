let ans_value = 0
let inversas = false
let sin_arg = 'sin('
let cos_arg = 'cos('
let tan_arg = 'tan('
let degree = false

function toggle_degree() {
  degree = !degree
  if (degree) {
    document.getElementById('rad').style.color = "gray"
    document.getElementById('deg').style.color = "black"
  } else {
    document.getElementById('rad').style.color = "black"
    document.getElementById('deg').style.color = "gray"
  }
}

function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1
}

function toggle_inversas() {
  inversas = !inversas
  if (inversas) {
    document.getElementById('sin').firstChild.data = "arcsin"
    document.getElementById('cos').firstChild.data = "arccos"
    document.getElementById('tan').firstChild.data = "arctan"
    sin_arg = 'arcsin('
    cos_arg = 'arccos('
    tan_arg = 'arctan('

  } else {
    document.getElementById('sin').firstChild.data = "sin"
    document.getElementById('cos').firstChild.data = "cos"
    document.getElementById('tan').firstChild.data = "tan"
    sin_arg = 'sin('
    cos_arg = 'cos('
    tan_arg = 'tan('
  }
}

function ans() {
  document.getElementById('result').value = ans_value
  document.getElementById('ans').textContent = "Ans ="
}


function agregar(value) {
  const result = document.getElementById('result').value
  document.getElementById('result').value = result + value
}

function limpiar() {
  document.getElementById('result').value = ''
}

function igual() {
  const result = document.getElementById('result').value
  const input_array = result.split([' '])

  let numeros = input_array.filter((numero, index) => { if (index % 2 == 0) return numero })
  let operadores = input_array.filter((operador, index) => { if (index % 2 !== 0) return operador })

  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i].includes('𝝅')) {
      let pi = Math.PI
      numeros[i] = `${pi}`
    }
    else if (numeros[i].includes("e")) {
      let e = Math.E
      numeros[i] = `${e}`
    }
    else if (numeros[i].startsWith('sin(')) {
      let value = numeros[i].slice(4, numeros[i].length - 1)
      let seno
      if (degree) {
        seno = Math.sin(value * Math.PI / 180);
      } else {
        seno = Math.sin(value)
      }
      numeros[i] = `${seno}`
    }
    else if (numeros[i].includes('arcsin(')) {
      let value = numeros[i].slice(7, numeros[i].length - 1)
      let arcseno = Math.asin(value)
      numeros[i] = `${arcseno}`
    }
    else if (numeros[i].startsWith('cos(')) {
      let value = numeros[i].slice(4, numeros[i].length - 1)
      let coseno
      if (degree) {
        coseno = Math.sin(value * Math.PI / 180);
      } else {
        coseno = Math.sin(value)
      }
      numeros[i] = `${coseno}`
    }
    else if (numeros[i].includes('arccos(')) {
      let value = numeros[i].slice(7, numeros[i].length - 1)
      let arccoseno = Math.acos(value)
      numeros[i] = `${arccoseno}`
    }
    else if (numeros[i].startsWith('tan(')) {
      let value = numeros[i].slice(4, numeros[i].length - 1)
      let tangente
      if (degree) {
        tangente = Math.sin(value * Math.PI / 180);
      } else {
        tangente = Math.tan(value)
      }
      numeros[i] = `${tangente}`
    }
    else if (numeros[i].includes('arctan(')) {
      let value = numeros[i].slice(7, numeros[i].length - 1)
      let arctangente = Math.atan(value)
      numeros[i] = `${arctangente}`
    }
    else if (numeros[i].includes('√(')) {
      let value = numeros[i].slice(2, numeros[i].length - 1)
      let raiz = Math.sqrt(value)
      numeros[i] = `${raiz}`
    }
    else if (numeros[i].includes('ln(')) {
      let value = numeros[i].slice(3, numeros[i].length - 1)
      let ln = Math.log(value)
      numeros[i] = `${ln}`
    }
    else if (numeros[i].includes('log(')) {
      let value = numeros[i].slice(4, numeros[i].length - 1)
      let log = Math.log10(value)
      numeros[i] = `${log}`
    }
    else if (numeros[i].includes('E')) {
      let base = 1
      let index = numeros[i].indexOf('E')

      if (index > 0) {
        base = numeros[i].substr(0, index)
      }

      let exp = numeros[i].substr(index + 1, numeros[i].length)
      let expo = base * Math.pow(10, exp)

      numeros[i] = `${expo}`
    }
    else if (numeros[i].includes('^')) {
      let index = numeros[i].indexOf('^')
      let base = numeros[i].substr(0, index)
      let exp = numeros[i].substr(index + 1, numeros[i].length)
      let expo = Math.pow(base, exp)
      numeros[i] = `${expo}`
    }
    else if (numeros[i].includes('%')) {
      let index = numeros[i].indexOf('%')
      let base = numeros[i].substr(0, index)
      let porcentaje = base / 100
      numeros[i] = `${porcentaje}`
    }
    else if (numeros[i].includes('!')) {
      let index = numeros[i].indexOf('!')
      let base = numeros[i].substr(0, index)
      let res = factorial(base)
      numeros[i] = `${res}`
    }
  }

  for (let i = 0; i < operadores.length; i++) {
    if (operadores[i] == 'x') {
      let multiplicacion = numeros[i] * numeros[i + 1]
      operadores.splice(i, 1)
      numeros[i] = multiplicacion
      numeros.splice(i + 1, 1)
      i = i - 1
    }
    else if (operadores[i] == '÷') {
      let division = numeros[i] / numeros[i + 1]
      operadores.splice(i, 1)
      numeros[i] = division
      numeros.splice(i + 1, 1)
      i = i - 1
    }
  }

  for (let i = 0; i < operadores.length; i++) {
    if (operadores[i] == '+') {
      let suma = parseFloat(numeros[i]) + parseFloat(numeros[i + 1])
      operadores.splice(i, 1)
      numeros[i] = suma
      numeros.splice(i + 1, 1)
      i = i - 1
    } else if (operadores[i] == '-') {
      let resta = numeros[i] - numeros[i + 1]
      operadores.splice(i, 1)
      numeros[i] = resta
      numeros.splice(i + 1, 1)
      i = i - 1
    }
  }

  let resultado = numeros[0]
  document.getElementById('result').value = resultado
  document.getElementById('ans').textContent = result + " = "
  ans_value = resultado

}
