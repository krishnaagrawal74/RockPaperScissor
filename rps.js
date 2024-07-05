const images = ["rock.png", "paper.png", "scissor.png"];

const start = document.querySelector('.start');
const select = document.querySelector('.select');
const anothergame = document.querySelector('.anothergame');
const computerimg = document.querySelector('#computerimg');
const displayedImage = document.getElementById('displayed-image');
const container = document.querySelector('.image-container');
const statement = document.querySelector('.resultstatement');

let currentIndex = 0;
let computerscorediv = document.querySelector('.computerscore');
let userscorediv = document.querySelector('.userscore');
let computerscore = 0;
let userscore = 0;

function updateImage() {
    displayedImage.src = images[currentIndex];
}

function resetImages() {
    computerimg.src = 'rock.png';
    displayedImage.src = images[0];
    currentIndex = 0;
}

// Handle mouse wheel events for desktops
const onWheel = (event) => {
    if (event.deltaY > 0) {
        // Scroll down
        if (currentIndex < images.length - 1) {
            currentIndex++;
        }
    } else {
        // Scroll up
        if (currentIndex > 0) {
            currentIndex--;
        }
    }
    updateImage();
};

// Variables to handle touch events
let startY;

const onTouchStart = (event) => {
    startY = event.touches[0].clientY;
};

const onTouchMove = (event) => {
    const touchY = event.touches[0].clientY;
    const deltaY = startY - touchY;

    if (deltaY > 0) {
        // Scroll down
        if (currentIndex < images.length - 1) {
            currentIndex++;
        }
    } else {
        // Scroll up
        if (currentIndex > 0) {
            currentIndex--;
        }
    }

    updateImage();
    startY = touchY; // Update start position for next touch move
};

start.addEventListener('click', () => {
    container.addEventListener('wheel', onWheel);

    // Add touch event listeners for mobile
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);

    console.log("Game started");
    start.style.display = 'none';
    select.style.display = 'block';
    resetImages();
});

select.addEventListener('click', () => {
    container.removeEventListener('wheel', onWheel);

    // Remove touch event listeners
    container.removeEventListener('touchstart', onTouchStart);
    container.removeEventListener('touchmove', onTouchMove);

    select.disabled = true;

    // Shuffle images for the computer choice
    let shuffle = setInterval(() => {
        let random1 = images[Math.floor(Math.random() * images.length)];
        computerimg.src = random1;
    }, 80);

    // Clear the interval after 5 seconds and call decidingResult
    setTimeout(() => {
        clearInterval(shuffle);
        decidingResult();
        select.style.display = 'none';
        anothergame.style.display = 'block';
    }, 5000);
});

// Helper function to extract filename from the image src path
function getFileNameFromPath(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

// Function to decide the game result
function decidingResult() {
    const userChoice = getFileNameFromPath(displayedImage.src);
    const computerChoice = getFileNameFromPath(computerimg.src);

    if (userChoice === computerChoice) {
        statement.innerHTML = 'It\'s a Tie!';
    } else if (
        (userChoice === 'rock.png' && computerChoice === 'scissor.png') ||
        (userChoice === 'paper.png' && computerChoice === 'rock.png') ||
        (userChoice === 'scissor.png' && computerChoice === 'paper.png')
    ) {
        statement.innerHTML = 'User Wins!';
        userscore++;
    } else {
        statement.innerHTML = 'Computer Wins!';
        computerscore++;
    }
    statement.style.display = 'flex';
    computerscorediv.innerHTML = `Computer Score: ${computerscore}`;
    userscorediv.innerHTML = `User Score: ${userscore}`;
}

const nextRound = (event) => {
    anothergame.style.display = 'none';
    start.style.display = 'block';
    statement.style.display = 'none';
    select.disabled = false;
};

anothergame.addEventListener('click', nextRound);
