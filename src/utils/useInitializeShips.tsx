import { useEffect } from 'react';
import { generateShipCoordinates } from '@/utils/shipHelper';
import { Ships } from '@/utils/helper';

function useInitializeShips(callBack: (ships: Ships[]) => void) {
  // setup ships 1 battleship and 2 destroyers
  useEffect(() => {
    const ships: Ships[] = generateShipCoordinates();

    callBack(ships);
  }, []);
}

export default useInitializeShips;
