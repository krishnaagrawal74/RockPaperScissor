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

// Function to change the image on click
const onClickImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    console.log("Hey i am updated")
    updateImage();
};

start.addEventListener('click', () => {
    displayedImage.addEventListener('click', onClickImage);

    console.log("Game started");
    start.style.display = 'none';
    select.style.display = 'block';
    displayedImage.addEventListener('click', onClickImage);

    resetImages();
});

select.addEventListener('click', () => {
    displayedImage.removeEventListener('click', onClickImage);
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
