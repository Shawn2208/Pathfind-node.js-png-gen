# Maze Generation and Pathfinding

# This project generates a maze using Prim's algorithm and then uses a custom algorithm to solve the maze.

# Features
Generates a maze using Prim's algorithm.
Visualizes the maze, the path found, and the nodes visited during pathfinding.
Saves the visual representation as a PNG image.

# Dependencies
canvas: Required for creating the visual representation of the maze and path.
fs: To save the visual representation as a PNG image.

# Usage
Install the required node packages (if not already installed):
npm install canvas

# Run the script:
node your_script_name.js
After running the script, a file named maze_with_path.png will be saved in the current directory, showcasing the generated maze, the nodes visited during pathfinding, and the solution path.

# Functions
generateMaze(): Generates the maze using Prim's algorithm.
getNeighbors(cell): Returns valid neighboring cells given a cell.
isValid(row, col): Checks if a cell is within the maze boundaries.
customAlgorithm(start, end, maze): An algorithm to solve the maze.
drawMaze(maze): Visualizes the maze on a canvas.
drawVisitedNodes(nodes): Visualizes the nodes visited during pathfinding.
drawPath(path): Visualizes the solution path.
saveCanvasAsImage(): Saves the canvas content as a PNG image.

# Customizing Pathfinding Algorithm
Use a different algorithm for solving the maze, you can replace the logic within the customAlgorithm function. I have commmented where
is best to put your algorithm.