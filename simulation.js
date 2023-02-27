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

const simulation = {
    particles: createRandomParticles({ numberOfParticles: 6,
        position: { x: { min: 0, max: 500}, y: { min: 0, max: 500 }}, 
        velocity: { x: { min: -10, max: 10}, y: { min: -10, max: 10 }}})
};

function showSimulation(canvas, simulation) {
    canvas.restore();

    for (const particle of simulation.particles) {
        const { x, y } = particle.position;
        canvas.moveTo(x, y);
        canvas.ellipse(x, y, 5, 5, 0, 0, 360);
        canvas.fill();
    }

    canvas.save();
}

const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");
const simulationCanvas = document.querySelector("#simulation-canvas");
const canvasContext = simulationCanvas.getContext("2d");

showSimulation(canvasContext, simulation);