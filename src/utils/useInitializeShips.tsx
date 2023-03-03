import { useEffect } from "react";


interface Props {
    totalShips: number;
    callBack: () => void;
}

function useInitializeShips({totalShips, callBack} : Props) {

    // setup ships 1 battleship and 2 destroyers
    useEffect(() => {
        
    }, [])


}

export default useInitializeShips;