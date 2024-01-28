import { useCallback } from 'react';
import { Buffer } from 'buffer';

export default function useSalt() {
    const generateAndSaveSalt = useCallback(() => {
        const randomValue = new Uint8Array(32);
        crypto.getRandomValues(randomValue);

        const salt = Buffer.from(Array.from(randomValue)).toString('hex');
        window.localStorage.setItem('salt', salt);
        return salt;
    }, []);

    const getSalt = useCallback(() => {
        let salt = window.localStorage.getItem('salt');

        if (salt == null) {
            salt = generateAndSaveSalt();
        }

        return salt;
    });

    const clearSalt = useCallback(() => {
        window.localStorage.clear();
    }, []);


    return { getSalt, clearSalt };
}