const simulation = {
    "particles": [
        {
            "position": { x: 10, y: 5 },
            "speed": { x: 5, y: 6 },
            "diameter": 10,
            "weight": 6,
            "color": { red: 120, green: 120, blue: 200 }
        }, {
            "position": { x: 10, y: 5 },
            "speed": { x: 5, y: 6 },
            "diameter": 10,
            "weight": 6,
            "color":  { red: 120, green: 120, blue: 200 }
        }
    ]
}

function startSimulation() {}

function stopSimulation() {}

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

console.log(createParticle({
    minDiameter: 10, maxDiameter: 20
}));

function initSimulation() {
    const simulation = {};
    
    return simulation;
}
