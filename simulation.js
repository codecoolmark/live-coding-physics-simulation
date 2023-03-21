// this functions get a simulation frame 
// and returns the next frame
function simulateOneStep(simulation) {
    const newSimulation = {};
    const newParticles = [];

    for (const particle of simulation.particles) {
        const currentPosition = particle.position;
        const currentVelocity = particle.velocity;
        
        const newPosition = {};
        newPosition.x = currentPosition.x + currentVelocity.x;
        newPosition.y = currentPosition.y + currentVelocity.y;

        const newParticle = { ...particle };
        newParticle.position = newPosition;

        newParticles.push(newParticle);
    }

    newSimulation.particles = newParticles;

    return newSimulation
}

function startSimulation() {
    const previousSimulation = initSimulation(1);
    nextSimulation = simulateOneStep(previousSimulation)
    // todo user interface (board, buttons, help)
    // simulation loop
}

function stopSimulation() { }

function resetSimulation() { }

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function createParticle({ boxWidth = 100, 
    boxHeight = 100, 
    minDiameter = 4, 
    maxDiameter = 4, 
    minVelocity = -10, 
    maxVeloctity = 10 }) {
    
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
    newParticle.velocity.x = randomNumber(minVelocity, maxVeloctity);
    newParticle.velocity.y = randomNumber(minVelocity, maxVeloctity);


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

startSimulation();

const startSimulationButton = document.getElementById("start-simulation-button");
const stopSimulationButton = document.getElementById("stop-simulation-button");
const resetSimulationButton = document.getElementById("reset-simulation-button");

function startButtonEventListener() {
    startSimulation();
}

function stopButtonEventListener() {
    stopSimulation();
}

function resetButtonEventListener() {
    resetSimulation();
}

startSimulationButton.addEventListener("click", startButtonEventListener);
stopSimulationButton.addEventListener("click", stopButtonEventListener);
resetSimulationButton.addEventListener("click", resetButtonEventListener);