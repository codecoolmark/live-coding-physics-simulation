function createRandomParticles({ numberOfParticles, position, velocity }) {
    const particles = [];

    for (let particleNumber = 0; particleNumber < numberOfParticles; particleNumber++) {
        particles.push(createRandomParticle({ position, velocity }));
    }

    return particles;
}

function createRandomParticle({
    position: { x: { min: minX, max: maxX }, y: { min: minY, max: maxY } }, 
    velocity: { x: { min: minXVelocity, max: maxXVelocity }, y: { min: minYVelocity, max: maxYVelocity } }}) {
    
    return {
        position: { x: randomNumber(minX, maxX), y: randomNumber(minY, maxY) },
        velocity: { x: randomNumber(minXVelocity, maxXVelocity), y: randomNumber(minYVelocity, maxYVelocity) }
    }

}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min
}

let simulation = {
    particles: createRandomParticles({ numberOfParticles: 6,
        position: { x: { min: 0, max: 500}, y: { min: 0, max: 500 }}, 
        velocity: { x: { min: -10, max: 10}, y: { min: -10, max: 10 }}})
};

function simulateOneStep(simulation, timeDelta) {
    const newParticles = []

    for (const particle of simulation.particles) {
        const { x, y } = particle.position;
        const { x: xVelocity, y: yVelocity } = particle.velocity;

        const newX = x + xVelocity * timeDelta;
        const newY = y + yVelocity * timeDelta;

        newParticles.push({
            position: { x: newX, y: newY },
            velocity: { x: xVelocity, y: yVelocity }
        });
    }

    return {
        particles: newParticles
    }
}

function showSimulation(canvas, simulation) {
    for (const particle of simulation.particles) {
        const { x, y } = particle.position;
        canvas.beginPath();
        canvas.moveTo(x, y);
        canvas.ellipse(x, y, 5, 5, 0, 0, 360);
        canvas.fill();
    }
}

const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");
const simulationCanvas = document.querySelector("#simulation-canvas");
const canvasContext = simulationCanvas.getContext("2d");
showSimulation(canvasContext, simulation);

let isRunning = false;
startButton.addEventListener("click", function(event) {
    const simulate = function() {
        simulation = simulateOneStep(simulation, 60 / 1000);
        canvasContext.clearRect(0, 0, simulationCanvas.width, simulationCanvas.height);
        showSimulation(canvasContext, simulation);
        if (isRunning) {
            setTimeout(simulate, 1000 / 60);
        }
    }

    isRunning = true;
    simulate();
})

stopButton.addEventListener("click", function(event) {
    isRunning = false;
})