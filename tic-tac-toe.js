"use strict";

document.addEventListener('DOMContentLoaded', () => {
    let statusmsg = document.getElementById("status");
    let defaultmsg = "Move your mouse over a square and click to play an X or an O.";;
    let boardsquares = document.querySelectorAll("#board div"); 
    const newgamebtn = document.querySelector('.controls button');
    let flip = "X";
    var tracker = {
        0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: ""
    };

    var win = false;
    var drawcnt = 0;

    var winnercheck = function(){
        if ((tracker[0] == "X" && tracker[1] == "X" && tracker[2] == "X") || 
            (tracker[3] == "X" && tracker[4] == "X" && tracker[5] == "X") ||
            (tracker[6] == "X" && tracker[7] == "X" && tracker[8] == "X") ||

            (tracker[0] == "X" && tracker[3] == "X" && tracker[6] == "X") || 
            (tracker[1] == "X" && tracker[4] == "X" && tracker[7] == "X") ||
            (tracker[2] == "X" && tracker[5] == "X" && tracker[8] == "X") ||
            
            (tracker[0] == "X" && tracker[4] == "X" && tracker[8] == "X") ||
            (tracker[6] == "X" && tracker[4] == "X" && tracker[2] == "X")  ){
            
            statusmsg.classList.add("you-won");
            statusmsg.style.color = "#42B883";
            statusmsg.style.borderTop = "4px solid #42B883";
            statusmsg.textContent = "Congratulations! X is the winner! Click New Game to restart."
            flip = "X";

            return true;
        }              
        else if ((tracker[0] == "O" && tracker[1] == "O" && tracker[2] == "O") || 
            (tracker[3] == "O" && tracker[4] == "O" && tracker[5] == "O") ||
            (tracker[6] == "O" && tracker[7] == "O" && tracker[8] == "O") ||
                 
            (tracker[0] == "O" && tracker[3] == "O" && tracker[6] == "O") || 
            (tracker[1] == "O" && tracker[4] == "O" && tracker[7] == "O") ||
            (tracker[2] == "O" && tracker[5] == "O" && tracker[8] == "O") ||
                 
            (tracker[0] == "O" && tracker[4] == "O" && tracker[8] == "O") ||
            (tracker[6] == "O" && tracker[4] == "O" && tracker[2] == "O")  ){
            
            statusmsg.classList.add("you-won");
            statusmsg.style.color = "#E57996";
            statusmsg.style.borderTop = "4px solid #E57996";
            statusmsg.textContent = "Congratulations! O is the winner! Click New Game to restart."
            flip = "O";

            return true;
        }

        return false;
    };

    //console.log(newgamebtn);
    console.log(flip);

    boardsquares.forEach(function(el, idx) {
        el.classList = "square";      
        
        el.addEventListener('click', function(e) {   
            drawcnt = 0;

            for (const i in tracker) {
                if (tracker[i] != ""){
                    drawcnt += 1;
                }
            }
            console.log(drawcnt);

            if (e.target.textContent == "X" || e.target.textContent == "O"){
                if (win == false && drawcnt != 9){
                    statusmsg.textContent = "Remember to play fair! Try another square somewhere else.";
                }
                else if (win == false && drawcnt == 9){
                    statusmsg.textContent = "It's a draw! Click New Game to restart.";
                }
            }           
            
            else if(flip == "O"){
                tracker[idx] = flip;

                statusmsg.textContent = defaultmsg                
                e.target.textContent = "O";   
                e.target.classList.add("O");
                             
                flip = "X";

                win = winnercheck();

                console.log(tracker);                
                console.log(flip);
            }

            else if(flip == "X"){
                tracker[idx] = flip; 

                statusmsg.textContent = defaultmsg                
                e.target.textContent = "X";  
                e.target.classList.add("X");

                flip = "O";

                win = winnercheck();

                console.log(tracker);                
                console.log(flip);
            }                    
        });

        el.addEventListener('mouseover', function(e) {
            e.target.classList.add('hover');
        });
          
        el.addEventListener('mouseout', function(e) {
            e.target.classList.remove('hover');
        });       
        
    });

    newgamebtn.addEventListener('click', function(el) {   
        statusmsg.classList.remove("you-won");
        statusmsg.style.color = "black";
        statusmsg.style.borderTop = "4px solid #32ABE1";
        statusmsg.textContent = defaultmsg

        tracker = {0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: ""};
        console.log(tracker);
    
        boardsquares.forEach(function(el) {
            el.textContent = ""
            el.classList.remove("O");
            el.classList.remove("X");
        });
    });

   
});

