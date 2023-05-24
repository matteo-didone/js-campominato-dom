// I declare the variables that will store the values of the range start, range end and number of elements provided
let rangeStart = 1;
let numberElements = 16;
let rangeEnd;

// Create an array to store the correct cells
const correctCells = [];


// The play button is stored into a JS variable
const playButton = document.getElementById('btn-play');

// Keep track of whether the grid is currently visible or not
let isGridVisible = false;

// Add click event listener to the play button
playButton.addEventListener('click', function() 
{
    // The selected option is stored into a JS variable
    const selectedOption = document.getElementById('difficulty-selector').value;
    // Extract the number from the option value
    // I'm using a regular expression to find the number inside the option value 
    const difficultyLevel = parseInt(selectedOption.match(/\d+/)[0]);

    // Toggle grid visibility
    isGridVisible = !isGridVisible;

    if (isGridVisible)
    {
        // Generate the game grid based on the selected difficulty level
        generateGrid(difficultyLevel);
    } 
    else 
    {
        // Clear the grid
        clearGrid();
    }
});

// Game grid function method
function generateGrid(difficultyLevel) 
{
    // The game grid is generated
    const grid = document.getElementById('grid');
    // Clear the grid
    grid.innerHTML = '';

    // Define the number of cells and rows based on the difficulty level
    let numCells, numRows;
    if (difficultyLevel === 1) 
    {
        numCells = 100;
        numRows = 10;
    } 
    else if (difficultyLevel === 2) 
    {
        numCells = 81;
        numRows = 9;
    } 
    else if (difficultyLevel === 3) 
    {
        numCells = 49;
        numRows = 7;
    }

    // Calculate the number of cells per row
    const numCellsPerRow = numCells / numRows;
    // Define the range end
    rangeEnd = numCells;

    // Generate the set of numbers using the set() function
    const setOfNumbers = set(rangeStart, rangeEnd, numberElements);

    // Sort the set of numbers in ascending order
    const setOfNumbersSorted = bubbleSort(setOfNumbers);

    // Print the set of numbers, only for the game coders
    console.log(setOfNumbersSorted);

    // Create rows
    for (let i = 0; i < numRows; i++) 
    {   
        // Create a row element
        const row = document.createElement('div');
        // Add row class to the row element
        row.classList.add('row');

        // Create cells for each row
        for (let j = 0; j < numCellsPerRow; j++) 
        {
            // Create a cell element
            const cell = document.createElement('div');
            // Add cell class to the cell element
            cell.classList.add('cell');
            // Add text to the cell
            cell.innerText = i * numCellsPerRow + j + 1;
            // Append the cell to the row
            row.appendChild(cell);

            // Add click event listener to each cell
            cell.addEventListener('click', function() 
            {
                // If the number is present in the generated numbers list 
                if (setOfNumbers.includes(parseInt(cell.innerText))) 
                {
                    // The cell turns red and the game ends
                    cell.classList.add('bomb');
                    // The game ends
                    gameOver();
                }
                else 
                {
                     // Add 'clicked' class to the cell
                    cell.classList.toggle('clicked');
                    // The user can continue clicking on other cells.

                    // Add cell to the correctCells array if not already present
                    if (!correctCells.includes(cell)) 
                    {
                        correctCells.push(cell);
                        // Check if the user has clicked all the correct cells (excluding bombs)

                        // numCells - numberElements = number of correct cells
                        // numCells = total number of cells
                        // numberElements = number of bombs
                        if (correctCells.length === numCells - numberElements) 
                        {
                            // The user has won the game
                            gameWon();
                        }
                    }
                }
                // Print the clicked cell text to the console
                console.log(cell.innerText);
            });
        }

        // Append the row to the grid
        grid.appendChild(row);
    }
}

// The game ends When they reach the maximum number of allowed numbers (meaning they have revealed all cells that are not bombs).

// Clear the grid
function clearGrid() 
{
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
}

// Game over function that alerts the user the game is over because of their loss
function gameOver() 
{
    // Delay the alert message by 2 seconds (2000 milliseconds)
    setTimeout(function() 
    {
        // The alert says "Game Over!"
        alert('Game over!');
        // Reload the page
        location.reload();
    }, 
    200); // 200 milliseconds of delay, so that I can see the cell turn red, before getting the alert
}

// Game won function that alerts the user the game is over because of their win
function gameWon() 
{
    // Tell the user how many times they clicked on the correct cells
    alert('You clicked on the correct cells ' + correctCells.length + ' times!');
    // The alert says "You won!"
    alert('You won!');
    // Reload the page
    location.reload();
}

// Function to sort Array in ascending order
function bubbleSort(arrayToBeSorted)
{
    // Define the array length
    const arrayLength = arrayToBeSorted.length;

    // Iterate through the array
    for (let i = 0; i < arrayLength; i++) 
    {
        // Iterate through the array
        for (let j = 0; j < arrayLength; j++) 
        {
            // Check if the current element is greater than the next element
            if (arrayToBeSorted[j] > arrayToBeSorted[j + 1]) 
            {
                // Swap the two elements
                const temp = arrayToBeSorted[j];
                arrayToBeSorted[j] = arrayToBeSorted[j + 1];
                arrayToBeSorted[j + 1] = temp;
            }
        }
    }
    // Return the sorted array
    return arrayToBeSorted;
}


// Function to generate a set of random numbers that are different from each other
function set(rangeStart, rangeEnd, numberElements) 
{
    const beginningSet = [];

    // Populate the array with numbers from rangeStart to rangeEnd
    for (let i = rangeStart; i <= rangeEnd; i++) 
    {
        beginningSet.push(i);
    }

    // Create an array to add the set of random numbers that are different from each other
    const randomSet = [];

    // Generate a set of random numbers that are different from each other and add them to the array
    while (randomSet.length < numberElements) 
    {
        // Find a random number from the beginningSet (by using a random index) array and add it to the randomSet array
        const randomIndex = Math.floor(Math.random() * beginningSet.length);
        const randomElement = beginningSet[randomIndex];

        // Check if the random number is already in the randomSet array
        if (!randomSet.includes(randomElement)) 
        {
            // If the number is not in the randomSet array, add it to the randomSet array
            randomSet.push(randomElement);
        } 
        else // If the number is already in the randomSet array, find another random number
        {
            // Find a new random number from the beginningSet (by using a random index) array and add it to the randomSet array
            const newRandomIndex = Math.floor(Math.random() * beginningSet.length);
            const newRandomElement = beginningSet[newRandomIndex];

            // Check if the new random number is already in the randomSet array
            if (!randomSet.includes(newRandomElement)) 
            {
                // If the new random number is not in the randomSet array, add it to the randomSet array
                randomSet.push(newRandomElement);
            }
        }
    }

    // Return the random set of numbers
    return randomSet;
}
