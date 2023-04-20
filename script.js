const start = document.querySelector('#start')
start.addEventListener('click', começar)
let células = document.querySelectorAll('.cells')
let jogada = 0
let playerOne, playerTwo
let isDarkMode = true

function players(){
  while(!playerOne) {
    playerOne = prompt('Qual o Nick do Player Um?')
  }
  while(!playerTwo) {
    playerTwo = prompt('Qual o Nick do Player Two?')
  }

  nickOne.innerText = playerOne
  nickTwo.innerText = playerTwo
  nickOne.style.color = 'blue'
  nickTwo.style.color = 'green'
}

function começar(){
  players()

  células.forEach( (celula) => { celula.addEventListener('click', jogar)})
  células.forEach( (celula) => { celula.classList.add('animation')})

  start.innerText = 'Restart'
}

function reiniciar(){
  jogada = 0
  playerOne = null
  playerTwo = null
  nickOne.innerText = ''
  nickTwo.innerText = ''
  
  células.forEach((celula) => {
    celula.innerText = '';
    celula.classList.remove('x', 'o', 'vencedora');
  });

  mensagem.innerText = '';
  nickOne.style.color = 'blue';
  nickTwo.style.color = 'red';
  células.forEach((celula) => {
    celula.addEventListener('click', jogar);
    celula.classList.add('animation');
  });
  players()

  start.innerText = 'Restart'
}

function jogar(event) {
const celula = event.target;
  
  if(celula.innerText !== ''){
    return
  }

  if (jogada % 2 === 0) {
    celula.innerText = 'X';
    celula.classList.add('x');
    jogada++;
  } else {
    celula.innerText = 'O';
    celula.classList.add('o');
    jogada++;
  }

  celula.removeEventListener('click', jogar)
  celula.classList.remove('animation')

  if(jogada % 2 === 0){
    nickOne.style.color = 'blue'
    nickTwo.style.color = 'green'
  } else{
    nickOne.style.color = 'green'
    nickTwo.style.color = 'red'
  }

  if(verificarVencedor()){
    const vencedor = verificarVencedor()
    mensagem.innerText = `O vencedor é: ${vencedor}` 
  } else if (jogada === 9){
    mensagem.innerText = 'Velha'
  }
}

function verificarVencedor(){

const vitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
]

let vencedor = null
let vencedoras = null

for (let i = 0; i < vitoria.length; i++){
  const [a, b, c] = vitoria[i]
  if(células[a].innerText === '' || células[b].innerText === '' || células[c].innerText === ''){
    continue
  }
  if(células[a].innerText === células[b].innerText && células[b].innerText === células[c].innerText){
    vencedor = células[a].classList.contains('x') ? nickOne.innerText : nickTwo.innerText
    
    vencedoras = [a, b, c]
    break
  }
}
  if(vencedor) {
    destacarVencedoras(vencedor, vencedoras)
  }
return vencedor
}

function destacarVencedoras(vencedor, vencedoras) {
  for (let i = 0; i < vencedoras.length; i++) {
    células[vencedoras[i]].classList.add('vencedora')
  }
  desativarCelulas()
}

function desativarCelulas(){
  células.forEach(celulas => {
    celulas.removeEventListener('click', jogar)
    celulas.classList.remove('animation')
  })
}


const buttonTheme = document.querySelector('#switchTheme')


buttonTheme.addEventListener('click', () =>{

  const body = document.querySelector('body')
    if(isDarkMode){
      body.style.backgroundColor = 'rgb(243 243 243)';
      células.forEach(celulas => {
        celulas.style.backgroundColor = '#800080'
      })
      start.classList.remove('buttonMenu')
      buttonTheme.classList.remove('buttonMenu')
      start.classList.add('buttonMenuLigth')
      buttonTheme.classList.add('buttonMenuLigth')
      isDarkMode = false
    } else{
      body.style.backgroundColor = 'black';
      células.forEach(celulas => {
        celulas.style.backgroundColor = '#9ed1d4'
      })
      start.classList.remove('buttonMenuLigth')
      buttonTheme.classList.remove('buttonMenuLigth')
      start.classList.add('buttonMenu')
      buttonTheme.classList.add('buttonMenu')
      isDarkMode = true

    }
})

