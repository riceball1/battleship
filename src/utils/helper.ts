enum ShipTypes {
  NONE = 'NONE',
  DESTROYER = 'DESTROYER',
  BATTLESHIP = 'BATTLESHIP',
}

enum TurnType {
  WIN = 'WIN', // all other ships are down
  MISSED = 'MISSED', // no ship was hit
  HIT = 'HIT', // when a ship is hit but not sunk
  SUNK = 'SUNK', // when a ship is completely hit
}

export interface Coordinates {
  x: number;
  y: number;
}

interface ShipProps {
  shipType: ShipTypes;
  coordinates: Coordinates[];
}

interface CheckTurnProps {
  ships: ShipProps[];
  cellCoordinates: Coordinates;
}

function checkTurn({ ships, cellCoordinates }: CheckTurnProps) {
  // handle wins
  // handle sunks

  for (let ship of ships) {
    // iterate over the coordinates of the ship
    for (const coordinate of ship.coordinates) {
      // @TODO: handle wins/sunks

      // HIT
      if (
        `${cellCoordinates.x}${cellCoordinates.y}` ===
        `${coordinate.x}${coordinate.y}`
      ) {
        return TurnType.HIT;
      }
    }
  }

  return TurnType.MISSED;
}

enum Color {
  BATTLESHIP = 'red',
  DESTROYER = 'yellow',
  NONE = 'gray',
}

const getShipColor = ({
  ships,
  coordinates,
}: {
  ships: ShipProps[];
  coordinates: Coordinates;
}) => {

  for (let ship of ships) {
    let locations = ship.coordinates;
    for (let location of locations) {
      if (`${location.x}${location.y}` === `${coordinates.x}${coordinates.y}`) {
        // found a matching ship
        return Color[ShipTypes[ship.shipType]];
      } 
    }
  }

  return Color[ShipTypes.NONE];
};

export { checkTurn, ShipTypes, getShipColor, Color };
