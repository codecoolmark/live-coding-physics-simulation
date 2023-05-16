// this functions get a simulation frame 
// and returns the next frame
function simulateOneStep(simulation, stepLength, width, height) {
    const newSimulation = {};
    const newParticles = [];

    for (const particle of simulation.particles) {
        const currentPosition = particle.position;
        const currentVelocity = particle.velocity;

        const newVelocity = { ...currentVelocity };

        if (currentPosition.x < 0 || currentPosition.x > width) {
            newVelocity.x = - currentVelocity.x;
            newVelocity.y = currentVelocity.y;
        } else if (currentPosition.y < 0 || currentPosition.y > height) {
            newVelocity.x = currentVelocity.x;
            newVelocity.y = - currentVelocity.y;
        }

        for (const otherParticle of simulation.particles) {
            if (particle !== otherParticle && distance(currentPosition, otherParticle.position) < (particle.diameter / 2 + otherParticle.diameter / 2)) {
                const otherPosition = otherParticle.position;
                const otherVelocity = otherParticle.velocity;

                const factor = scalarProduct(subtract2d(currentVelocity, otherVelocity), subtract2d(currentPosition, otherPosition)) / (distance(currentPosition, otherPosition) ** 2)
                newVelocity.x = currentVelocity.x - ((currentPosition.x - otherPosition.x) * factor)
                newVelocity.y = currentVelocity.y - ((currentPosition.y - otherPosition.y) * factor)
            }
        }

        const newPosition = {};
        newPosition.x = currentPosition.x + newVelocity.x * stepLength;
        newPosition.y = currentPosition.y + newVelocity.y * stepLength;
        
        const newParticle = { ...particle };
        newParticle.position = newPosition;
        newParticle.velocity = newVelocity;

        newParticles.push(newParticle);
    }

    newSimulation.particles = newParticles;

    return newSimulation
}

function distance(positionA, positionB) {
    const { x: xA, y: yA } = positionA;
    const { x: xB, y: yB } = positionB;

    return Math.sqrt((xA - xB) ** 2 + (yA - yB) ** 2)
}

function scalarProduct(vectorA, vectorB) {
    const { x: xA, y: yA } = vectorA;
    const { x: xB, y: yB } = vectorB;

    return xA * xB + yA * yB
}

function subtract2d(vectorA, vectorB) {
    const { x: xA, y: yA } = vectorA;
    const { x: xB, y: yB } = vectorB;

    return { x: xA - xB, y: yA - yB }
}

let simulation = null;
let isSimulationRunning = false; 

function startSimulation(drawingContext) {
    isSimulationRunning = true;

    const animationLoopFunction = function () {
        if (simulation === null) {
            simulation = initSimulation(10, {
                boxWidth: drawingContext.canvas.width,
                boxHeight: drawingContext.canvas.height,
                minDiameter: 40,
                maxDiameter: 100
            });
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
    const particleImage = document.getElementById("particle-image")
    drawingContext.clearRect(0, 0, drawingContext.canvas.width, 
        drawingContext.canvas.height);
    drawingContext.fillStyle = "rgba(142, 172, 190, 0)"
    
    for (const particle of simulation.particles) {
        drawingContext.beginPath();
        drawingContext.ellipse(particle.position.x, particle.position.y, particle.diameter / 2, particle.diameter / 2, 0, 0, 360);
        drawingContext.fill();
        drawingContext.drawImage(particleImage, 
            particle.position.x - particle.diameter / 2, 
            particle.position.y - particle.diameter / 2, 
            Math.round(particle.diameter), Math.round(particle.diameter))
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