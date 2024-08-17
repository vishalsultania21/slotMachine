let numbersPool = [405, 406, 407, 408, 409, 437, 438, 439, 440].flatMap(n => Array(4).fill(n));
let history = [];
let counts = {
    405: 0,
    406: 0,
    407: 0,
    408: 0,
    409: 0,
    437: 0,
    438: 0,
    439: 0,
    440: 0
};

function shufflePool() {
    for (let i = numbersPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbersPool[i], numbersPool[j]] = [numbersPool[j], numbersPool[i]];
    }
}

function resetPool() {
    numbersPool = [405, 406, 407, 408, 409, 437, 438, 439, 440].flatMap(n => Array(4).fill(n));
    shufflePool();
    const slotElement = document.getElementById('slot');
    slotElement.textContent = "-";
    document.getElementById('alert').textContent = "";
    document.getElementById('alert').style.opacity = 0;
    slotElement.classList.remove('show');
    history = [];
    counts = { 405: 0, 406: 0, 407: 0, 408: 0, 409: 0, 437: 0, 438: 0, 439: 0, 440: 0 };
    updateCountDisplay();
}

function spinSlotMachine() {
    if (numbersPool.length === 0) {
        alert('No more numbers left! Please reset the slot machine.');
        return;
    }

    const slotElement = document.getElementById('slot');
    slotElement.classList.remove('show');
    
    const randomIndex = Math.floor(Math.random() * numbersPool.length);
    const drawnNumber = numbersPool[randomIndex];
    
    numbersPool.splice(randomIndex, 1);
    
    slotElement.textContent = drawnNumber;
    
    setTimeout(() => {
        slotElement.classList.add('show');
    }, 10);
    
    counts[drawnNumber]++;
    updateCountDisplay();
    checkHistory(drawnNumber);
}

function checkHistory(number) {
    const alertElement = document.getElementById('alert');
    if (history.includes(number)) {
        alertElement.textContent = "";
    } else {
        history.push(number);
        alertElement.textContent = "New number!";
    }
    alertElement.style.opacity = 1; // Ensure the alert is visible
}

function updateCountDisplay() {
    const countDisplay = document.getElementById('countDisplay');
    countDisplay.innerHTML = `
        405: ${counts[405]}<br>
        406: ${counts[406]}<br>
        407: ${counts[407]}<br>
        408: ${counts[408]}<br>
        409: ${counts[409]}<br>
        437: ${counts[437]}<br>
        438: ${counts[438]}<br>
        439: ${counts[439]}<br>
        440: ${counts[440]}
    `;
}

document.getElementById('resetButton').addEventListener('click', resetPool);
document.getElementById('spinButton').addEventListener('click', spinSlotMachine);

resetPool();
