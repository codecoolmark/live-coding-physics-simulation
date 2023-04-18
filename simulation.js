// this functions get a simulation frame 
// and returns the next frame
function simulateOneStep(simulation, stepLength, width, height) {
    const newSimulation = {};
    const newParticles = [];

    for (const particle of simulation.particles) {
        const currentPosition = particle.position;
        const currentVelocity = particle.velocity;
        
        const newPosition = {};
        newPosition.x = currentPosition.x + currentVelocity.x * stepLength;
        newPosition.y = currentPosition.y + currentVelocity.y * stepLength;

        const newVelocity = { ...currentVelocity };

        if (newPosition.x < 0 || newPosition.x > width) {
            newVelocity.x = - currentVelocity.x;
            newVelocity.y = currentVelocity.y;
        } else if (newPosition.y < 0 || newPosition.y > height) {
            newVelocity.x = currentVelocity.x;
            newVelocity.y = - currentVelocity.y;
        }

        const newParticle = { ...particle };
        newParticle.position = newPosition;
        newParticle.velocity = newVelocity;

        newParticles.push(newParticle);
    }

    newSimulation.particles = newParticles;

    return newSimulation
}

let simulation = null;
let isSimulationRunning = false; 

function startSimulation(drawingContext) {
    isSimulationRunning = true;

    const animationLoopFunction = function () {
        if (simulation === null) {
            simulation = initSimulation(10);
        }
        simulation = simulateOneStep(simulation, 1 / 100, 
            drawingContext.canvas.width, drawingContext.canvas.height);
        drawSimulation(simulation, drawingContext);
        if (isSimulationRunning) {
            requestAnimationFrame(animationLoopFunction);
        }
    };

    animationLoopFunction();
}

function drawSimulation(simulation, drawingContext) {
    drawingContext.clearRect(0, 0, drawingContext.canvas.width, 
        drawingContext.canvas.height);
    
    for (const particle of simulation.particles) {
        drawingContext.beginPath();
        drawingContext.ellipse(particle.position.x, particle.position.y, 10, 10, 0, 0, 360);
        drawingContext.fill();
    }
}

function stopSimulation() {
    isSimulationRunning = false;
 }

function resetSimulation(drawingContext) {
    simulation = null;
    drawSimulation(initSimulation(0), drawingContext);
 }

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function createParticle({ boxWidth = 100, 
    boxHeight = 100, 
    minDiameter = 4, 
    maxDiameter = 4, 
    minVelocity = -10, 
    maxVelocity = 10 }) {
    
    const newParticle = {};

    newParticle.position = {};
    newParticle.diameter = randomNumber(minDiameter, maxDiameter);

    const effectiveBoxWidth = boxWidth - newParticle.diameter / 2;
    const effectiveBoxHeight = boxHeight - newParticle.diameter / 2;
    const effectiveBoxOriginX = newParticle.diameter / 2;
    const effectiveBoxOriginY = newParticle.diameter / 2;

    newParticle.position.x = randomNumber(effectiveBoxOriginX, effectiveBoxWidth);
    newParticle.position.y = randomNumber(effectiveBoxOriginY, effectiveBoxHeight);

    newParticle.velocity = {}
    newParticle.velocity.x = randomNumber(minVelocity, maxVelocity);
    newParticle.velocity.y = randomNumber(minVelocity, maxVelocity);


    return newParticle;
}

function initSimulation(numberOfParticles, particleOptions = {}) {
    const simulation = {};

    const particles = [];
    for (let particleNumber = 0; particleNumber < numberOfParticles; particleNumber++) {
        const newParticle = createParticle(particleOptions);
        particles.push(newParticle);
    }
    
    simulation.particles = particles;

    return simulation;
}

const simulationCanvas = document.getElementById("simulation-canvas");
const drawingContext = simulationCanvas.getContext("2d");
const startSimulationButton = document.getElementById("start-simulation-button");
const stopSimulationButton = document.getElementById("stop-simulation-button");
const resetSimulationButton = document.getElementById("reset-simulation-button");

function startButtonEventListener() {
    startSimulation(drawingContext);
}

function stopButtonEventListener() {
    stopSimulation();
}

function resetButtonEventListener() {
    resetSimulation(drawingContext);
}

startSimulationButton.addEventListener("click", startButtonEventListener);
stopSimulationButton.addEventListener("click", stopButtonEventListener);
resetSimulationButton.addEventListener("click", resetButtonEventListener);