let start_btn = document.querySelector("#start_button");
let cells = document.querySelectorAll(".wrapper > div");
let par = document.querySelector("p");
let curr_move = 1; //Текущий ход, 1 - крестик, 0 - нолик

function reset() {
    for(let i = 0; i < cells.length; i++){
        cells[i].textContent = "";
        cells[i].style.backgroundColor = "";
    }
    curr_move = 1;
    par.textContent = "next move: X"
}

//flag = 1 - столбец, 2 - строка, 3 - главная диагональ, 4 - побочная диагональ
function end_game(pos, flag){
    for(let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", add_sign);
    }
    switch (flag){
        case 1: 
            for(let i = pos; i < pos + 3; i++){
                cells[i].style.backgroundColor = "rgb(186, 158, 253)";
            }
            break;
        case 2:
            let i = 0;
            while(i < 7){
                cells[pos + i].style.backgroundColor = "rgb(186, 158, 253)";
                i += 3;
            }
            break;
        case 3:
            let k = 0;
            while(k < 9){
                cells[pos + k].style.backgroundColor = "rgb(186, 158, 253)";
                k += 4;
            }
            break;
        case 4:
            let j = 0;
            while(j < 6){
                cells[pos + j].style.backgroundColor = "rgb(186, 158, 253)";
                j += 2;
            }
            break;

    }
}

function is_empty(elem){
    if (elem.textContent != "") {
        return -1;
    } else {
        return 1;
    }
}

function place_sign(elem) {
    if (curr_move === 1) {
        elem.textContent = "x";
        curr_move = 0;
        par.textContent = "next move: O";
    } else {
        elem.textContent = "o";
        curr_move = 1;
        par.textContent = "next move: X";
    }
}

function add_sign() {
    if(is_empty(this) === 1){
        place_sign(this)
        switch (check_rows()){
            case -1:
                break;
            case 0: 
                par.textContent = "won " + cells[0].textContent;
                end_game(0, 1);
                break;
            case 3:
                par.textContent = "won " + cells[3].textContent;
                end_game(3, 1);
                break;
            case 6:
                par.textContent = "won " + cells[6].textContent;
                end_game(6, 1);
                break;
        }
        switch(check_cols()){
            case -1: 
                break;
            case 0:
                par.textContent = "won " + cells[0].textContent;
                end_game(0, 2);
                break;
            case 1:
                par.textContent = "won " + cells[1].textContent;
                end_game(1, 2);
                break;
            case 2:
                par.textContent = "won " + cells[2].textContent;
                end_game(2, 2);
                break;
        }
        switch(check_main_diag()){
            case 0:
                break;
            case 1:
                par.textContent = "won " + cells[0].textContent;
                end_game(0, 3);
                break;
        }
        switch(check_sec_diag()){
            case 0:
                break;
            case 1:
                par.textContent = "won " + cells[2].textContent;
                end_game(2, 4);
                break;
        }
    }
    else {
        return console.log("not empty cell");
    }
}

function check_main_diag(){
    if(is_empty(cells[0]) != 1){
        if(is_empty(cells[4]) != 1){
            if(is_empty(cells[8]) != 1){
                if(cells[0].textContent === cells[4].textContent){
                    if(cells[4].textContent === cells[8].textContent){
                        return 1;
                    }
                }
            }
        }
    }
    return 0;
}

function check_sec_diag(){
    if(is_empty(cells[2]) != 1){
        if(is_empty(cells[4]) != 1){
            if(is_empty(cells[6]) != 1){
                if(cells[2].textContent === cells[4].textContent){
                    if(cells[4].textContent === cells[6].textContent){
                        return 1;
                    }
                }
            }
        }
    }
    return 0;
}

function check_cols(){
    let pos = 0;
    let position = -1;
    while(pos < 3){
        if(is_empty(cells[pos]) != 1){
            if(cells[pos].textContent === cells[pos + 3].textContent){
                if(cells[pos + 3].textContent === cells[pos + 6].textContent){
                    position = pos;
                    break;
                }
            }
        }
        pos += 1;
    }
    return position;
}

function check_rows(){
    let pos = 0;
    let position = -1;
    while (pos < 7) {
        if(is_empty(cells[pos]) != 1){
            if(cells[pos].textContent === cells[pos+1].textContent){
                if(cells[pos+1].textContent === cells[pos+2].textContent){
                    position = pos;
                    break;
                }
            }
        }
        pos += 3;
    }
    return position;
}

function is_finished() {

    
}
 
function start_game() {
    reset();
    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", add_sign);
    }
}

start_btn.addEventListener("click", start_game);