import { utils } from 'web3';
import { ButtonWithBorder } from '../../../../../components';
import { ParticipateDialogBox } from './components';
import { useContract } from '../../../../../hooks/useContract';
import { useCallback, useEffect, useState } from 'react';
import { isAddress } from 'web3-validator';
import { useNavigate, useParams } from 'react-router-dom';
import { useMetaMask } from '../../../../../hooks/useMetaMask';

function ParticipateDialog ({ betSize, creator, setUserStatus }) {
    const { address } = useParams();
    const { wallet, hasProvider } = useMetaMask();
    const { Game } = useContract();
    const navigate = useNavigate();
    const [ requestOnGoing, setrequestOnGoing ] = useState(false);
 
    if (isAddress(address) === false) {
        navigate('/', { replace: true });
    } else {
        Game.options.address = address;
    }

    useEffect(() => {
        if (wallet.accounts.length > 0 && hasProvider) {
            if (Game.provider == null) {
                Game.setProvider(window.ethereum);
            }
        }

        return () => {
            Game.removeAllListeners();
        };
    }, [hasProvider, wallet]);

    const participate = useCallback(async () => {
        setrequestOnGoing(true);

        try {
            const result = await Game.methods.participate().send({
                from: wallet.accounts[0],
            });
            console.log(result);
        } catch (error) {
            console.error(error);
        }

        setrequestOnGoing(false);
        setUserStatus('participant');
    }, [wallet]);

    return (
        <ParticipateDialogBox>
            { requestOnGoing === true && (
                <div>please change me to loading</div>
            ) }
            <div>
                <div>
                    opponent: {creator}
                </div>
                <div>
                    betting size: {utils.fromWei(betSize, 'ether')} ether
                </div>
            </div>
            <ButtonWithBorder onClick={() => {
                participate();
            }}>participate</ButtonWithBorder>
        </ParticipateDialogBox>
    );
}

export default ParticipateDialog;