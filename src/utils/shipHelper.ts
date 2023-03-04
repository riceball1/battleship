import { ShipTypes } from '@/utils/helper';
import { Coordinates } from '@/utils/helper';
// file dedicated to ship coordinates generation

// Define a function that generates a random number between min and max, inclusive
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Define the grid size and the maximum number of attempts to generate coordinates
const gridSize = 10;
const maxAttempts = 100;

// Define an array to store the coordinates of each object
const objectCoords: Coordinates[][] = [];

// Define a function that generates coordinates for a new object
function generateObjectCoords(length: number) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    // Generate a random starting point for the object
    const startX = getRandomInt(0, gridSize - 1);
    const startY = getRandomInt(0, gridSize - 1);

    // Generate a random direction for the object (either "horizontal" or "vertical")
    const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

    // Calculate the ending point of the object based on its length and direction
    let endX = startX;
    let endY = startY;
    if (direction === 'horizontal') {
      endX += length - 1;
    } else {
      endY += length - 1;
    }

    // Check if the ending point is within the bounds of the grid
    if (endX >= gridSize || endY >= gridSize) {
      attempts++;
      continue;
    }

    // Check if the object overlaps with any existing objects
    let overlaps = false;
    for (let i = 0; i < objectCoords.length; i++) {
      const coords = objectCoords[i];
      for (let j = 0; j < coords.length; j++) {
        const coord = coords[j];
        if (
          (direction === 'horizontal' &&
            coord.y === startY &&
            coord.x >= startX &&
            coord.x <= endX) ||
          (direction === 'vertical' &&
            coord.x === startX &&
            coord.y >= startY &&
            coord.y <= endY)
        ) {
          overlaps = true;
          break;
        }
      }
      if (overlaps) {
        break;
      }
    }
    if (overlaps) {
      attempts++;
      continue;
    }

    // If we've made it this far, the coordinates are valid
    const coords = [];
    for (let i = 0; i < length; i++) {
      coords.push({
        x: direction === 'horizontal' ? startX + i : startX,
        y: direction === 'vertical' ? startY + i : startY,
      });
    }
    objectCoords.push(coords);
    break;
  }
}
generateObjectCoords(2);
generateObjectCoords(2);
generateObjectCoords(4);

/*
  generateShips will generate three different ships in different positions on the board
  2 Destroyers with length of 2 cells
  1 Battleship with length of 4 cells

*/
const generateShipCoordinates = () => {
  const shipCoords = objectCoords.map((obj, index) => {
    return {
      shipType: index == 2 ? ShipTypes.BATTLESHIP : ShipTypes.DESTROYER,
      coordinates: obj,
    };
  });
  return shipCoords;
};

export { generateShipCoordinates };
