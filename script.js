let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function () {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile)
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1500);
    setInterval(setPlant, 2000);
}

function getRandomTile(excludeTile) {
    let num;
    do {
        num = Math.floor(Math.random() * 9).toString();
    } while (num === excludeTile);
    return num;
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "img/monty-mole.png";

    let num = getRandomTile(currPlantTile ? currPlantTile.id : null);
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "img/piranha-plant.png";

    let num = getRandomTile(currMoleTile ? currMoleTile.id : null);
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = `Score: ${score.toString()}`;
    } else if (this == currPlantTile) {
        gameOver = true;
        Swal.fire({
            title: 'GAME OVER!',
            text: `Your final score is ${score}.`,
            icon: 'error',
            confirmButtonText: 'Play Again',
            backdrop: false 
        }).then((result) => {
            if (result.isConfirmed) {

                resetGame();
            }
        });
    }
}

function resetGame() {
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();

    if (currMoleTile) currMoleTile.innerHTML = "";
    if (currPlantTile) currPlantTile.innerHTML = "";

    setMole();
    setPlant();
}