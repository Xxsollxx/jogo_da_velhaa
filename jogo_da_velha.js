var player_time;
var scoreboard = [0,0,0]
var ia = false
var playspossible;
var marks;
var btnia = document.getElementById("buttonia");
var restarbtn = document.getElementById('button');
const casas = document.querySelectorAll('.casa');
var statusgame = document.getElementById("resultado");
const win_possible = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [2,5,8],
    [3,6,9]
];
function init(){
    btnrestart()
    player_time = 'X';
    marks = [];
    playspossible = win_possible
    casas.forEach((item, index) => {
        item.addEventListener('click',marcar)
    })
    btnia.addEventListener("click",activeia);
}
function activeia(){
    ia = !ia;
    ia ? btnia.innerHTML = "MAQUINA: ON" : btnia.innerHTML = "MAQUINA: OFF";
}
function updatescore(){
    let score = document.querySelector('.scoreboard').querySelectorAll('div')
    score.forEach((element, index)=>{
        element.innerHTML = scoreboard[index];
    })
}
function btnrestart(hide = false){
    if(hide) return restarbtn.style="display:inline-block;";
    restarbtn.style="display:none;"
    restarbtn.addEventListener('click', restartgame, {once:true});
}
function changeplayer(){
    player_time === 'X' ? player_time = 'O' : player_time = 'X';
}
function validplay(local){
    return(local.innerHTML == '')
}
function cellelement(id){
    if(casas[id-1].innerHTML !="")return casas[id-1].innerHTML
}
function setcellelement(id){
    casas[id-1].click()
}
function endgame(){
    casas.forEach((item, index)=>{
        item.removeEventListener("click", marcar)
    })
}
const marcar = (e)=>{
    if(validplay(e.target)){
        e.target.innerHTML = player_time
        marks.push(e.target.innerHTML)
        if(iswinner()){
            statusgame.innerHTML = `'${player_time}' WINNER`
            switch(player_time){
                case 'X':
                    scoreboard[0]++;
                break;
                case 'O':
                    scoreboard[1]++;
                break;
            }
            updatescore()
            endgame()
            btnrestart(true)
        }else{
            if(isdraw()){
                scoreboard[2]++;
                updatescore()
                statusgame.innerHTML = "EMPATE!";
                btnrestart(true)
            }else{
                changeplayer();
                if(player_time == "O" && ia) iacheck();
            }
        }
    }else{
        alert("jogada idevida!")
    }
}
function isdraw(){
    return(marks.length == 9);
}
function iswinner(){
    return win_possible.some((combination)=>{
        return combination.every((id)=>{
            return (cellelement(id)== player_time)
        })
    })
}
const restartgame = (e)=>{
    init();
    casas.forEach((casa)=>{
        casa.innerHTML = "";
    })
    statusgame.innerHTML="JOGO DA VELHA"
}
function iamark(combination){
    let id=0;
    combination.some((element)=>{
        if(cellelement(element)==undefined) id = element
    })
    setcellelement(id)
}
function iacheck(){
    let aX = [];
    let aO = [];
    let init = [];
    let win = [];
    let risk = [];
    let trywin = [];
    win_possible.forEach((combination)=>{
        let X=0;
        let O=0;
        combination.forEach((element)=>{
            if(cellelement(element)=='X')X++;
            if(cellelement(element)=='O')O++;
        })
        aX.push(X);
        aO.push(O);
    })
    aO.forEach((element, index)=>{
        switch(element){
            case 0:
                if(aX[index]== 2){
                    risk.push(win_possible[index])
                }else if(aX[index]==1){
                    init.push(win_possible[index])
                }
                break;
                case 1:
                    if(aX[index]==0)trywin.push(win_possible[index])
                    else if(aX[index]==1)init.push(win_possible[index])
                break;
                case 2:
                    if(aX[index]==0){
                        win.push(win_possible[index])
                    }
                break;
        }
    })
    if(win.length>0){
        return iacheckInit(win)
    }else if(risk.length>0){
        return iacheckInit(risk)
    }else if(trywin.length>0){
        return iacheckInit(trywin)
    }else if(init.length>0) iacheckInit(init)    
}
function iacheckInit(init){
    let numbers = []
    init.forEach((element)=>{
        element.forEach((num, i)=>{
            if(cellelement(num)==undefined){
                numbers.push(num)
            }
        });
    })
    iarandomplay(numbers)
}
function iarandomplay(combination){
    let idPlay = []
    idPlay.push(combination[Math.floor(math.random()*combination.length)])
    iamark(idPlay)
}
activeia();
updatescore()
init();


