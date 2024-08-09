// Maze configurations for different levels
let level1 = [
    [1, 0, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1]
];

let level2 = [
    [1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1]
];

let level3 = [
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 1]
];

// New levels added
let level4 = [
    [1, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1]
];

let level5 = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
];

let level6 = [
    [1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1]
];

let level7 = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
];

let level8 = [
    [1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
];

// Initial maze array
let mazearray = level1;

// Event listener to change levels
let Level = document.getElementById("levelselect");
Level.addEventListener("change", function () {
    let level = Level.value;
    if (level == 1) {
        mazearray = level1;
    } else if (level == 2) {
        mazearray = level2;
    } else if (level == 3) {
        mazearray = level3;
    } else if (level == 4) {
        mazearray = level4;
    } else if (level == 5) {
        mazearray = level5;
    } else if (level == 6) {
        mazearray = level6;
    } else if (level == 7) {
        mazearray = level7;
    } else if (level == 8) {
        mazearray = level8;
    }

    // Reset maze and recreate it
    maze.innerHTML = `<img src="rat.png" id="rat" width="50px" height="50px" alt="rat">
        <img src="food.png" id="food" alt="food" width="50px" height="50px">`;
    createMaze();
    startRatMovement(); // Begin rat movement when the maze is created
});

let maze = document.getElementById("maze-container");
let rat = document.getElementById("rat");
let food = document.getElementById("food");

// Set rat position
function setRatPosition(x, y) {
    rat.style.top = x * 50 + "px";
    rat.style.left = y * 50 + "px";
}

// Create maze
function createMaze() {
    for (let i = 0; i < mazearray.length; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < mazearray[i].length; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (mazearray[i][j] == 0) {
                cell.classList.add("wall");
            }
            row.appendChild(cell);
        }
        maze.appendChild(row);
    }
}

// Move rat through maze using DFS
function startRatMovement() {
    let visited = Array.from({ length: mazearray.length }, () => Array(mazearray[0].length).fill(false));
    let path = [];

    function dfs(x, y) {
        if (x < 0 || y < 0 || x >= mazearray.length || y >= mazearray[0].length || visited[x][y] || mazearray[x][y] === 0) {
            return false;
        }

        path.push([x, y]);
        visited[x][y] = true;

        // Check if the rat has reached the food (bottom right corner)
        if (x === mazearray.length - 1 && y === mazearray[0].length - 1) {
            return true; // Reached the cheese
        }

        // Explore neighbors: right, down, left, up
        if (dfs(x, y + 1) || dfs(x + 1, y) || dfs(x, y - 1) || dfs(x - 1, y)) {
            return true;
        }

        path.pop();
        return false;
    }

    dfs(0, 0);

    let index = 0;
    function move() {
        if (index < path.length) {
            setRatPosition(path[index][0], path[index][1]);
            index++;
            setTimeout(move, 500); // Adjust speed here (in milliseconds)
        }
    }

    move();
}

createMaze();
startRatMovement();