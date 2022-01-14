const USER_CHOICE = 'O'
const MY_CHOICE = 'X'

const gridGlobal = [
    ['*', '*', '*'],
    ['*', '*', '*'],
    ['*', '*', '*']
]
const winTriplets = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
]

const userWin = (grid)=>{
    for(let x=0;x<winTriplets.length;x++){
        let y;
        for(y=0;y<3;y++){
            if(grid[winTriplets[x][y][0]][winTriplets[x][y][1]]!==USER_CHOICE){
                break;
            }
        } 
        if(y==3){
            document.getElementById(`div${winTriplets[x][0][0]*3+winTriplets[x][0][1]}`).style.backgroundColor='#8bcc00'
            document.getElementById(`div${winTriplets[x][1][0]*3+winTriplets[x][1][1]}`).style.backgroundColor='#8bcc00'
            document.getElementById(`div${winTriplets[x][2][0]*3+winTriplets[x][2][1]}`).style.backgroundColor='#8bcc00'
            return true;
        }
        
    }
    return false
}

const compWin = (grid)=>{
    for(let x=0;x<winTriplets.length;x++){
        let y;
        for(y=0;y<3;y++){
            if(grid[winTriplets[x][y][0]][winTriplets[x][y][1]]!==MY_CHOICE){
                break;
            }
        } 
        if(y==3){
            document.getElementById(`div${winTriplets[x][0][0]*3+winTriplets[x][0][1]}`).style.backgroundColor='#8bcc00'
            document.getElementById(`div${winTriplets[x][1][0]*3+winTriplets[x][1][1]}`).style.backgroundColor='#8bcc00'
            document.getElementById(`div${winTriplets[x][2][0]*3+winTriplets[x][2][1]}`).style.backgroundColor='#8bcc00'
            return true;
        }
        
    }
    return false
}
const youWin = (i, grid)=>{
    if(document.getElementById(`div${i}`).innerHTML!==''){
        return false;
    }
    grid[parseInt(i/3)][parseInt(i%3)]=MY_CHOICE;
    if(compWin(grid)){
        return true;
    }
    else grid[parseInt(i/3)][parseInt(i%3)]='*'
    return false;
}
let flag = false
const makeMyMove = (grid)=>{
    for(let i=0;i<9;i++){
        const gridcopy = [
            [grid[0][0], grid[0][1], grid[0][2]],
            [grid[1][0], grid[1][1], grid[1][2]],
            [grid[2][0], grid[2][1], grid[2][2]]
        ]
        if(youWin(i, gridcopy)){
            document.getElementById(`div${i}`).innerHTML=MY_CHOICE
            console.log('Comp Wins')
            flag = true;
            setTimeout(()=>{
                if(confirm('Sorry!! Tum haar gaye.. Fir se?')){
                    location.reload();
                }
            },500)
            return;
        }
    }
    for(let i=0;i<winTriplets.length;i++){
        const arr = winTriplets[i];
        const str= gridGlobal[arr[0][0]][arr[0][1]]+gridGlobal[arr[1][0]][arr[1][1]]+gridGlobal[arr[2][0]][arr[2][1]];
        if(str===USER_CHOICE+'*'+USER_CHOICE){
            const x = arr[1][0]
            const y = arr[1][1]
            document.getElementById(`div${x*3+y}`).innerHTML=MY_CHOICE
            gridGlobal[x][y]=MY_CHOICE
            return;
        }
        if(str==='*'+USER_CHOICE+USER_CHOICE){
            const x = arr[0][0]
            const y = arr[0][1]
            document.getElementById(`div${x*3+y}`).innerHTML=MY_CHOICE
            gridGlobal[x][y]=MY_CHOICE
            return;
        }
        if(str===USER_CHOICE+USER_CHOICE+'*'){
            const x = arr[2][0]
            const y = arr[2][1]
            document.getElementById(`div${x*3+y}`).innerHTML=MY_CHOICE
            gridGlobal[x][y]=MY_CHOICE
            return;
        }
    }

    if(grid[1][1]==='*'){
        document.getElementById(`div4`).innerHTML=MY_CHOICE
        gridGlobal[1][1]=MY_CHOICE
        return;
    }
    if(gridGlobal[0][0]===USER_CHOICE && gridGlobal[2][2]===USER_CHOICE){
        for(let i=1;i<9;i+=2){
            if(document.getElementById(`div${i}`).innerHTML===''){
                document.getElementById(`div${i}`).innerHTML=MY_CHOICE
                gridGlobal[parseInt(i/3)][parseInt(i%3)]=MY_CHOICE
                return;
            }
        }
    }

    if(gridGlobal[0][2]===USER_CHOICE && gridGlobal[2][0]===USER_CHOICE){
        for(let i=1;i<9;i+=2){
            if(document.getElementById(`div${i}`).innerHTML===''){
                document.getElementById(`div${i}`).innerHTML=MY_CHOICE
                gridGlobal[parseInt(i/3)][parseInt(i%3)]=MY_CHOICE
                return;
            }
        }
    }
    const top = gridGlobal[0][0]===USER_CHOICE || gridGlobal[0][1]===USER_CHOICE || gridGlobal[0][2]===USER_CHOICE;
    const bottom = gridGlobal[2][0]===USER_CHOICE || gridGlobal[2][1]===USER_CHOICE || gridGlobal[2][2]===USER_CHOICE;
    const left = gridGlobal[0][0]===USER_CHOICE || gridGlobal[1][0]===USER_CHOICE || gridGlobal[2][0]===USER_CHOICE;
    const right = gridGlobal[0][2]===USER_CHOICE || gridGlobal[1][2]===USER_CHOICE || gridGlobal[2][2]===USER_CHOICE;
    if(grid[0][0]==='*' && top && left){
        document.getElementById(`div0`).innerHTML=MY_CHOICE
        gridGlobal[0][0]=MY_CHOICE
        return;
    }
    if(grid[0][2]==='*' && top && right){
        document.getElementById(`div2`).innerHTML=MY_CHOICE
        gridGlobal[0][2]=MY_CHOICE
        return;
    }
    if(grid[2][0]==='*' && bottom && left){
        document.getElementById(`div6`).innerHTML=MY_CHOICE
        gridGlobal[2][0]=MY_CHOICE
        return;
    }
    if(grid[2][2]==='*' && bottom && right){
        document.getElementById(`div8`).innerHTML=MY_CHOICE
        gridGlobal[2][2]=MY_CHOICE
        return;
    }
    for(let i=0;i<9;i+=2){
        if(document.getElementById(`div${i}`).innerHTML===''){
            document.getElementById(`div${i}`).innerHTML=MY_CHOICE
            gridGlobal[parseInt(i/3)][parseInt(i%3)]=MY_CHOICE
            return;
        }
    }
    for(let i=1;i<9;i+=2){
        if(document.getElementById(`div${i}`).innerHTML===''){
            document.getElementById(`div${i}`).innerHTML=MY_CHOICE
            gridGlobal[parseInt(i/3)][parseInt(i%3)]=MY_CHOICE
            return;
        }
    }

}

const makeMove = (i)=>{
    if(document.getElementById(`div${i}`).innerHTML!==''){
        return;
    }
    document.getElementById(`div${i}`).innerHTML=USER_CHOICE
    gridGlobal[parseInt(i/3)][parseInt(i%3)]=USER_CHOICE
    if(userWin(gridGlobal)){
        console.log("You Won")
        setTimeout(()=>{
            alert('You won the game bro')
        },500)
        return;
    }
    makeMyMove(gridGlobal);
    let count = 0;
    for(let j=0;j<9;j++){
        if(document.getElementById(`div${j}`).innerHTML===''){
            count++;
        }
    }
    if(count<2 && !flag){
        setTimeout(()=>{
            if(confirm('No way Win!! Play again?')){
                location.reload();
            }
        },500)
    }
}