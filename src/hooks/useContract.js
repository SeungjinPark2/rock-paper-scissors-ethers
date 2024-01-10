import { useMemo } from 'react';
import { useNetworkValueContext } from './useEthereum';
import { Contract } from 'web3';
import { GameAbi, GameFactoryAbi } from '../ethereum';

export function useContract() {
    const { network } = useNetworkValueContext();

    const contracts = useMemo(() => ({
        Game: new Contract(GameAbi),
        GameFactory: new Contract(GameFactoryAbi, network.contractAddress.GameFactory),
    }), []);

    return contracts;
}