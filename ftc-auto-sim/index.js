let speedScaleFactor = 0.5; // Adjust this value to get the desired speed

let chassisCenter = { x: 460, y: 360 };
let chassisRotation = -90 * Math.PI / 180; // Convert to radians
let ROBOT_MAX_SPEED = 1;
// Calculate the size of a tile in pixels

// Calculate the robot's movement in pixels

let pos = {
    frontLeft: { x: 0, y: 0 },
    frontRight: { x: 0, y: 0 },
    backLeft: { x: 0, y: 0 },
    backRight: { x: 0, y: 0 }
};

const ROBOT_SPEED_INCHES_PER_SECOND = 0.3 // Modify this to match your robot's speed
let TILE_LEN = 24
// Calculate the size of a tile in pixels
let tileSizeInPixels = 300;

// Define the routes
let routes = [
    {
        backLeft: -48, // Reduced Y movement
        backRight: -48, // Reduced Y movement
        frontLeft: -48, // Reduced Y movement
        frontRight: -48, // Reduced Y movement
        speed: 6,
        timeout: 2 / (ROBOT_SPEED_INCHES_PER_SECOND / TILE_LEN) // Time to move 2 tiles
    },
    // Add more routes as needed
];

routes = routes.map(route => ({
    ...route,
    backLeft: route.backLeft / TILE_LEN,
    backRight: route.backRight / TILE_LEN,
    frontLeft: route.frontLeft / TILE_LEN,
    frontRight: route.frontRight / TILE_LEN,
}));



Math.map = (value, start1, stop1, start2, stop2) => {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

function executeRoute(route) {
    // let's use lerp
    // 200ms to go one tile forward
    let timer = 0;
    console.log(route)
    let rt = setInterval(() => {
        if (timer > route.backLeft * 200) clearInterval(rt);
        window['route' + Math.random()] = route
        timer++;
    })
}

/**
 * let ticks = 0;
let a = setInterval(() => {
	moveLeftStick(0, -1)
	ticks++;
})
let b = () => {
console.log(ticks)
clearInterval(a)}
 */



function stopRobot() {
    // Stop the robot here
    // This is just a placeholder, replace with your actual implementation
    console.log('Stopping robot');
}

function startRecordingGamepad() {
    // Start recording the gamepad state
    console.log('Recording gamepad state');
    setInterval(() => {
        frames.push({
            axes: navigator.getGamepads()[0].axes.slice(),
            buttons: navigator.getGamepads()[0].buttons.slice()
        });
    }, frameTimer)
}

function stopRecordingGamepad() {
    // Stop recording the gamepad state
    console.log('Stopped recording gamepad state');
    console.log(frames);
}

// Mock gamepad object
// window.addEventListener('load', setupMockGamepad);

function setupMockGamepad() {
    // Mock gamepad object
    let mockGamepad = {
        axes: [0, 0, 0, 0], // [leftStickX, leftStickY, rightStickX, rightStickY]
        buttons: Array(17).fill({ pressed: false }) // Fill an array with 17 buttons, all unpressed
    };

    // Mock navigator.getGamepads function
    navigator.getGamepads = () => [mockGamepad]
    // Function to simulate moving the left stick
    moveLeftStick = (x, y) => {
        mockGamepad.axes[0] = x;
        mockGamepad.axes[1] = y;
        simulateMecanumDrive(getLeftStickPosition().x, getLeftStickPosition().y, getRightStickPosition.y);
        // can we call gamepad api here?
    }

    // Function to simulate moving the right stick
    moveRightStick = (x, y) => {
        mockGamepad.axes[2] = x;
        mockGamepad.axes[3] = y;
        simulateMecanumDrive(getLeftStickPosition().x, getLeftStickPosition().y, getRightStickPosition.y);
    }

    // Function to simulate pressing a button
    pressButton = (buttonIndex) => {
        mockGamepad.buttons[buttonIndex].pressed = true;
    }

    // Function to simulate releasing a button
    releaseButton = (buttonIndex) => {
        mockGamepad.buttons[buttonIndex].pressed = false;
    }

    for (let route of routes) {
        // Execute the route
        executeRoute(route);
    }
}

// Execute each route in the routes arra


let rotationScaleFactor = 0.01; // Adjust this value to get the desired rotation speed

function getRightStickPosition() {
    let gamepad = navigator.getGamepads()[0];
    let rightStickX = gamepad.axes[2];
    let rightStickY = gamepad.axes[3];
    if (Math.abs(rightStickX) < 0.1) {
        rightStickX = 0;
    }
    if (Math.abs(rightStickY) < 0.1) {
        rightStickY = 0;
    }
    return { x: rightStickX, y: rightStickY };
}

function getLeftStickPosition() {
    let gamepad = navigator.getGamepads()[0];
    let rightStickX = gamepad.axes[0];
    let rightStickY = gamepad.axes[1];
    if (Math.abs(rightStickX) < 0.1) {
        rightStickX = 0;
    }
    if (Math.abs(rightStickY) < 0.1) {
        rightStickY = 0;
    }
    return { x: rightStickX, y: rightStickY };
}
function calculateWheelDirection(leftStickPosition, chassisRotation, wheelIndex) {
    // Calculate the magnitude of the left stick position
    let stickMagnitude = Math.sqrt(leftStickPosition.x * leftStickPosition.x + leftStickPosition.y * leftStickPosition.y);

    // If the stick magnitude is close to zero, return zero
    if (stickMagnitude < 0.1) {
        return 0;
    }

    // Calculate the direction of the left stick
    let stickDirection = Math.atan2(leftStickPosition.y, leftStickPosition.x);

    // Calculate the relative direction for this wheel
    let wheelRelativeDirection = (Math.PI / 4) * wheelIndex;

    // Calculate the wheel direction
    let wheelDirection = stickDirection + chassisRotation + wheelRelativeDirection;

    // Normalize the wheel direction to the range [-1, 1]
    wheelDirection = Math.cos(wheelDirection);

    return wheelDirection;
}

function simulateMecanumDrive(x, y, rotation) {
    x *= speedScaleFactor;
    y *= speedScaleFactor;
    rotation *= rotationScaleFactor;

    let rightStickPosition = getRightStickPosition();
    if (Math.abs(rightStickPosition.x) > 0.1 || Math.abs(rightStickPosition.y) > 0.1) {
        rotation = rightStickPosition.x * rotationScaleFactor; // Assuming x-axis of the right stick controls rotation
    } else {
        rotation = 0;
    }

    // Calculate angle and magnitude
    let angle = Math.atan2(y, x);
    let magnitude = Math.sqrt(x * x + y * y);

    // Calculate the new x and y values based on the angle and magnitude
    let newX = Math.cos(angle) * magnitude;
    let newY = Math.sin(angle) * magnitude;

    // Calculate the new chassis center and rotation

    // Calculate wheel speeds
    let frontLeft = Math.sin(angle + Math.PI / 4) * magnitude + rotation;
    let frontRight = Math.sin(angle - Math.PI / 4) * magnitude - rotation;
    let backLeft = Math.sin(angle - Math.PI / 4) * magnitude + rotation;
    let backRight = Math.sin(angle + Math.PI / 4) * magnitude - rotation;

    // Find the maximum absolute wheel speed
    let max = Math.max(Math.abs(frontLeft), Math.abs(frontRight), Math.abs(backLeft), Math.abs(backRight));

    // If the maximum wheel speed is greater than 1, scale all wheel speeds
    if (max > 1) {
        frontLeft /= max;
        frontRight /= max;
        backLeft /= max;
        backRight /= max;
    }

    // Calculate the new chassis rotation
    // Calculate the new chassis rotation based on the average of the wheel rotations
    // Calculate the new chassis rotation
    // Adjust the joystick inputs based on the chassis rotation
    let adjustedX = x * Math.cos(chassisRotation) - y * Math.sin(chassisRotation);
    let adjustedY = x * Math.sin(chassisRotation) + y * Math.cos(chassisRotation);

    // Calculate the new chassis rotation
    let newChassisRotation = chassisRotation + rotation;

    // Calculate the positions of the wheels relative to the new chassis center and rotation
    let wheelDistance = 30; // Set this value based on your specific robot design
    pos.frontLeft.x = chassisCenter.x + adjustedX + Math.cos(newChassisRotation + Math.PI / 4) * wheelDistance;
    pos.frontLeft.y = chassisCenter.y + adjustedY + Math.sin(newChassisRotation + Math.PI / 4) * wheelDistance;
    pos.frontRight.x = chassisCenter.x + adjustedX + Math.cos(newChassisRotation - Math.PI / 4) * wheelDistance;
    pos.frontRight.y = chassisCenter.y + adjustedY + Math.sin(newChassisRotation - Math.PI / 4) * wheelDistance;
    pos.backLeft.x = chassisCenter.x + adjustedX + Math.cos(newChassisRotation + 3 * Math.PI / 4) * wheelDistance;
    pos.backLeft.y = chassisCenter.y + adjustedY + Math.sin(newChassisRotation + 3 * Math.PI / 4) * wheelDistance;
    pos.backRight.x = chassisCenter.x + adjustedX + Math.cos(newChassisRotation - 3 * Math.PI / 4) * wheelDistance;
    pos.backRight.y = chassisCenter.y + adjustedY + Math.sin(newChassisRotation - 3 * Math.PI / 4) * wheelDistance;

    // Update the chassis center based on the adjusted joystick inputs
    chassisCenter.x += adjustedX;
    chassisCenter.y += adjustedY;

    // Update the chassis rotation
    chassisRotation = newChassisRotation;

    // Update the chassis rotation
    chassisRotation = newChassisRotation;

    // Draw new wheel positions
    // Get the left stick position
    let leftStickPosition = getLeftStickPosition();

    // Draw new wheel positions
    Crocodile.Engine.clear();
    drawRotatedSquare(pos.backLeft.x, pos.backLeft.y, 15, 15, backLeft, calculateWheelDirection(leftStickPosition, chassisRotation, 0));
    drawRotatedSquare(pos.frontLeft.x, pos.frontLeft.y, 15, 15, frontLeft, calculateWheelDirection(leftStickPosition, chassisRotation, 1));
    drawRotatedSquare(pos.backRight.x, pos.backRight.y, 15, 15, backRight, calculateWheelDirection(leftStickPosition, chassisRotation, 2));
    drawRotatedSquare(pos.frontRight.x, pos.frontRight.y, 15, 15, frontRight, calculateWheelDirection(leftStickPosition, chassisRotation, 3));
    Crocodile.Engine.context.restore();

    // Calculate the position of the square
    // Calculate the position of the square
    // Calculate the position of the square
    frontSquare(pos, adjustedX, adjustedY, chassisRotation);
    pointSquare(pos, adjustedX, adjustedY, chassisRotation);
    RotationSquare(pos, adjustedX, adjustedY, chassisRotation);
    drawDirectionSquare(chassisRotation);
    drawPositionText()
    drawRotText();
}
function drawRotText() {
    Crocodile.Engine.context.fillStyle = 'black';
Crocodile.Engine.context.font = '16px Arial';
Crocodile.Engine.context.fillText('Chassis Rotation: ' + (chassisRotation * (180 / Math.PI)).toFixed(2) + '°', 10, 30);

}

function drawPositionText() {
    // Calculate the position text
    let positionText = `Position: (${chassisCenter.x.toFixed(2)}, ${chassisCenter.y.toFixed(2)})`;
    let context = Crocodile.Engine.context;

    // Set the font and color
    context.font = '16px Arial';
    context.fillStyle = 'black';

    // Draw the position text
    context.fillText(positionText, 10, 20); // Adjust the x and y values as needed
}

function drawDirectionSquare() {
    // Calculate the position of the square
    let squareDistance = 30; // Set this value based on your specific robot design
    let squareSize = 10; // Set this value based on your specific robot design
    let squareX = chassisCenter.x + Math.sin(chassisRotation) * squareDistance;
    let squareY = chassisCenter.y + -Math.cos(chassisRotation) * squareDistance;
    let context = Crocodile.Engine.context;

    // Save the current context state
    context.save();

    // Translate to the center of the square
    context.translate(squareX + squareSize / 2, squareY + squareSize / 2);

    // Rotate the context to match the chassis rotation
    context.rotate(chassisRotation);

    // Draw the square
    context.fillStyle = 'red'; // Set the color of the square to red
    context.fillRect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);

    // Restore the context state
    context.restore();
}

function frontSquare(pos, adjustedX, adjustedY, chassisRotation) {
    // Calculate the position of the square
    let midPointX = (pos.frontLeft.x + pos.frontRight.x) / 2;
    let midPointY = (pos.frontLeft.y + pos.frontRight.y) / 2;
    let squareSize = 10; // Set this value based on your specific robot design

    // Save the current context state
    Crocodile.Engine.context.save();

    // Translate to the center of the square
    Crocodile.Engine.context.translate(midPointX + squareSize / 2, midPointY + squareSize / 2);

    // Rotate the context to match the chassis rotation
    Crocodile.Engine.context.rotate(chassisRotation);

    // Draw the square
    Crocodile.Engine.context.fillStyle = 'blue'; // Set the color of the square to blue
    Crocodile.Engine.context.fillRect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);

    // Restore the context state
    Crocodile.Engine.context.restore();
}


let currentRotation = 0; // Initialize current rotation
let lerpSpeed = 0.05; // Set the speed of interpolation

function RotationSquare(pos, adjustedX, adjustedY, chassisRotation) {
    // Calculate the position of the square
    let squareSize = 10; // Set this value based on your specific robot design

    // Save the current context state
    Crocodile.Engine.context.save();

    // Translate to the center of the robot
    Crocodile.Engine.context.translate(chassisCenter.x + squareSize / 2, chassisCenter.y + squareSize / 2);

    // Interpolate the current rotation towards the target rotation
    currentRotation = lerp(currentRotation, chassisRotation, lerpSpeed);

    // Rotate the context to match the current rotation
    Crocodile.Engine.context.rotate(currentRotation);

    // Draw the square
    Crocodile.Engine.context.fillStyle = 'green'; // Set the color of the square to green
    Crocodile.Engine.context.fillRect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);

    // Restore the context state
    Crocodile.Engine.context.restore();
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}
function pointSquare(pos, adjustedX, adjustedY, chassisRotation) {
    let squareDistance = 60; // Set this value based on your specific robot design
    let squareSize = 10; // Set this value based on your specific robot design
    let squareX = chassisCenter.x + adjustedX * squareDistance;
    let squareY = chassisCenter.y + adjustedY * squareDistance;
    // Save the current context state
    Crocodile.Engine.context.save();

    // Translate to the center of the square
    Crocodile.Engine.context.translate(squareX + squareSize / 2, squareY + squareSize / 2);

    // Rotate the context to match the chassis rotation
    Crocodile.Engine.context.rotate(chassisRotation);

    // Draw the square
    Crocodile.Engine.context.fillStyle = 'red'; // Set the color of the square to red
    Crocodile.Engine.context.fillRect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);

    // Restore the context state
    Crocodile.Engine.context.restore();
}

function drawRotatedSquare(x, y, width, height, angle, wheelDirection) {
    // Save the current context state
    Crocodile.Engine.context.save();

    // Translate to the center of the square
    Crocodile.Engine.context.translate(x + width / 2, y + height / 2);

    // Rotate the context to match the direction
    Crocodile.Engine.context.rotate(angle);

    // Set the color based on the wheel direction
    if (wheelDirection > 0) {
        Crocodile.Engine.context.fillStyle = 'blue'; // Clockwise
    } else if (wheelDirection < 0) {
        Crocodile.Engine.context.fillStyle = 'red'; // Counter-clockwise
    } else {
        Crocodile.Engine.context.fillStyle = 'gray'; // No rotation
    }

    // Draw the square
    Crocodile.Engine.context.fillRect(-width / 2, -height / 2, width, height);

    // Restore the context state
    Crocodile.Engine.context.restore();
}

window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected, index: " + e.gamepad.index);

    // Start the game loop when the gamepad is connected
    requestAnimationFrame(updateGamepadState);
});

function updateGamepadState() {
    // Get the state of the first gamepad
    var gamepad = navigator.getGamepads()[0];

    if (gamepad) {
        // Log the state of the gamepad

        // Use the gamepad state to control your robot here
        // For example, you can use gamepad.axes[0] and gamepad.axes[1] for the left joystick,
        // and gamepad.axes[2] and gamepad.axes[3] for the right joystick.
        simulateMecanumDrive(getLeftStickPosition().x, getLeftStickPosition().y, getRightStickPosition.y);
    }

    // Update the gamepad state every frame
    requestAnimationFrame(updateGamepadState);
}

// let frameTimer = 5;
// frames.forEach((frame, index) => {
//   setTimeout(() => {
//       moveLeftStick(frame.axes[0], frame.axes[1]);
//       moveRightStick(frame.axes[2], frame.axes[3]);
//   }, index * frameTimer);
// });