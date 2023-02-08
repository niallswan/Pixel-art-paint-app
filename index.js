// App elements
let container = document.querySelector(".container");
let gridBtn = document.getElementById("submit-grid");
let clearGridBtn = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorBtn = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

//Sound
let click = new Audio('click.mp3');
click.volume = 0.3;

// Mouse and touch inputs
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    }
};

let deviceType = "";

let draw = false;
let erase = false;

// Detect if it is a touch device or a computer
const isTouchDevice = () =>{
    try{
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch(e){
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

// Create grid
gridBtn.addEventListener("click", ()=>{
    click.pause();
    click.currentTime = 0;
    click.play();

    container.innerHTML = "";
    let count = 0;

    // Loop through grid height and create each row
    for(let i=0; i<gridHeight.value; i++){
        let div = document.createElement("div");
        div.classList.add("gridRow");

        // Loop through grid width and create each column
        for(let j=0; j<gridWidth.value; j++){
            count+=1;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, ()=>{
                draw = true;
                if(erase){
                    col.style.backgroundColor = "transparent";
                }else{
                    col.style.backgroundColor = colorBtn.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e)=>{
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }
        container.appendChild(div);
    }

});

// Check for draw or erase in a clicked pixel in the grid and change color appropriately
function checker(elementId){
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element)=>{
        if(elementId == element.id){
            if(draw && !erase){
                element.style.backgroundColor = colorBtn.value;
            }else if(draw && erase){
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

// Clear canvas
clearGridBtn.addEventListener("click", ()=>{
    click.pause();
    click.currentTime = 0;
    click.play();

    container.innerHTML = "";
});

// Turn on eraser mode
eraseBtn.addEventListener("click", ()=>{
    click.pause();
    click.currentTime = 0;
    click.play();

    erase = true;
    eraseBtn.style.backgroundColor = "#2c30ff";
    paintBtn.style.backgroundColor = "#6d70ff";

});

// Turn on paint mode
paintBtn.addEventListener("click", () => {
    click.pause();
    click.currentTime = 0;
    click.play();

    erase = false;
    paintBtn.style.backgroundColor = "#2c30ff";
    eraseBtn.style.backgroundColor = "#6d70ff";
});

// Play sound on color picker click
colorBtn.addEventListener("click", ()=>{
    click.pause();
    click.currentTime = 0;
    click.play();
});

// Width input
gridWidth.addEventListener("input", ()=>{
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

// Height input
gridHeight.addEventListener("input", ()=>{
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

// On load set grid to 0x0
window.onload = ()=>{
    gridHeight.value = 0;
    gridWidth.value = 0;
};