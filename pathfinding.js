// Import necessary modules
const { createCanvas } = require('canvas');
const fs = require('fs');

// Constants for canvas dimensions and grid specifications
const canvasWidth = 400;
const canvasHeight = 400;
const gridSize = 20;
const rows = canvasHeight / gridSize;
const cols = canvasWidth / gridSize;

// Create a canvas of specified width and height
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

// Initialize a 2D array to represent the maze. 
// Here, 1 represents a wall and 0 represents a path.
const maze = new Array(rows).fill(null).map(() => new Array(cols).fill(1));

// Define starting and ending points for the maze
const start = { row: 0, col: Math.floor(cols / 2) };
const end = { row: rows - 1, col: Math.floor(cols / 2) };

// Generate the maze using Prim's algorithm
generateMaze();

// Execute the custom pathfinding algorithm to solve the maze
const { path: userPath, visitedNodes } = customAlgorithm(start, end, maze);

// Drawing functions to visualize the maze and solution
drawMaze(maze);
drawVisitedNodes(visitedNodes);
drawPath(userPath);
saveCanvasAsImage();

function generateMaze() {
    let wallList = [];
    // Choose a random starting cell and mark it as path
    let startCell = { row: Math.floor(Math.random() * rows), col: Math.floor(Math.random() * cols) };
    maze[startCell.row][startCell.col] = 0;

    // Get neighboring walls of the starting cell
    let walls = getNeighbors(startCell);
    wallList.push(...walls);

    // Continue until there are walls left to be checked
    while (wallList.length > 0) {
        // Pick a random wall from the list
        let wall = wallList.splice(Math.floor(Math.random() * wallList.length), 1)[0];
        // Get the neighboring cells that are paths
        let neighbors = getNeighbors(wall).filter(cell => maze[cell.row][cell.col] === 0);

        // If the wall has exactly one neighboring path, make it a path
        if (neighbors.length === 1) {
            maze[wall.row][wall.col] = 0;
            // Add neighboring walls of this wall to the wallList
            let outerWalls = getNeighbors(wall).filter(cell => maze[cell.row][cell.col] === 1);
            wallList.push(...outerWalls);
        }
    }
}

function getNeighbors(cell) {
    const neighbors = [];
    // Define potential directions to move (up, down, left, right)
    const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 }
    ];

    // Loop through directions to get valid neighboring cells
    for (const dir of directions) {
        const newRow = cell.row + dir.row;
        const newCol = cell.col + dir.col;
        if (isValid(newRow, newCol)) {
            neighbors.push({ row: newRow, col: newCol });
        }
    }

    return neighbors;
}

function isValid(row, col) {
    // Check if cell is within the maze boundaries
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

function customAlgorithm(start, end, maze) {
    
    // ---------- Initialization ----------
    // Depending on the user's algorithm, these data structures may need to be altered or replaced.
    const visited = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    const prev = new Array(rows).fill(null).map(() => new Array(cols).fill(null));
    
    let queue = [start];
    visited[start.row][start.col] = true;

    // ---------- Pathfinding Logic ----------
    // **Replace or modify the entire section below with custom algorithm**
    
    while (queue.length > 0) {
        let current = queue.shift();

        if (current.row === end.row && current.col === end.col) {
            break; // Reached the destination
        }

        let neighbors = getNeighbors(current);

        for (const neighbor of neighbors) {
            if (!visited[neighbor.row][neighbor.col] && maze[neighbor.row][neighbor.col] === 0) {
                queue.push(neighbor);
                visited[neighbor.row][neighbor.col] = true;
                prev[neighbor.row][neighbor.col] = current;
            }
        }
    }

    // ---------- Path Reconstruction ----------
    // Depending on the algorithm and the data structures, this part may need tweaking.
    let path = [];
    for (let at = end; at != null; at = prev[at.row][at.col]) {
        path.push(at);
    }
    path.reverse();

    // ---------- Collect Visited Nodes ----------
    // This section is good for visualization purposes. If visual feedback isn't necessary, this can be skipped.
    const visitedNodes = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (visited[row][col]) {
                visitedNodes.push({ row: row, col: col });
            }
        }
    }

    // Return the results. If the user's algorithm generates different output, this should be adjusted accordingly.
    return { path: path, visitedNodes: visitedNodes };
}

function drawMaze(maze) {
    // Render the maze where walls are black and paths are white
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.fillStyle = maze[row][col] === 1 ? 'black' : 'white';
            ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
        }
    }
}

function drawVisitedNodes(nodes) {
    // Render the nodes visited during pathfinding in light gray
    ctx.fillStyle = 'lightgray';
    for (const node of nodes) {
        ctx.fillRect(node.col * gridSize, node.row * gridSize, gridSize, gridSize);
    }
}

function drawPath(path) {
    // Render the solution path in blue
    ctx.fillStyle = 'blue';
    for (const node of path) {
        ctx.fillRect(node.col * gridSize, node.row * gridSize, gridSize, gridSize);
    }
}

function saveCanvasAsImage() {
    // Save the canvas content as an image (PNG format)
    const out = fs.createWriteStream(__dirname + '/maze_with_path.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('Image saved.'));
}
