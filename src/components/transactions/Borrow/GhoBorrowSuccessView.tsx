import { InterestRate } from '@aave/contract-helpers';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  SvgIcon,
  SvgIconProps,
  Typography,
} from '@mui/material';
import { ReactNode, } from 'react';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useRootStore } from 'src/store/root';
import { GHO_SUCCESS_MODAL } from 'src/utils/mixPanelEvents';

export type SuccessTxViewProps = {
  txHash?: string;
  action?: ReactNode;
  amount: string;
  symbol?: string;
  collateral?: boolean;
  rate?: InterestRate;
  customAction?: ReactNode;
  customText?: ReactNode;
};

const ExtLinkIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <ExternalLinkIcon />
  </SvgIcon>
);


export const GhoBorrowSuccessView = ({ txHash, action, amount, symbol }: SuccessTxViewProps) => {
  const { mainTxState } = useModalContext();
  const { currentNetworkConfig } = useProtocolDataContext();

  const trackEvent = useRootStore((store) => store.trackEvent);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '48px',
            height: '48px',
            bgcolor: 'success.200',
            borderRadius: '50%',
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SvgIcon sx={{ color: 'success.main', fontSize: '32px' }}>
            <CheckIcon />
          </SvgIcon>
        </Box>

        <Typography sx={{ mt: 4 }} variant="h2">
          <Trans>All done!</Trans>
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {action && amount && symbol && (
            <Typography>
              <Trans>
                You {action}{' '}
                <FormattedNumber value={Number(amount)} compact variant="secondary14" /> {symbol}
              </Trans>
            </Typography>
          )}
        </Box>
        <Button
          sx={{ mt: 4 }}
          variant="outlined"
          size="small"
          endIcon={<ExtLinkIcon style={{ fontSize: 12 }} />}
          onClick={() => trackEvent(GHO_SUCCESS_MODAL.GHO_BORROW_VIEW_TX_DETAILS)}
          href={currentNetworkConfig.explorerLinkBuilder({
            tx: txHash ? txHash : mainTxState.txHash,
          })}
          target="_blank"
        >
          <Typography variant="buttonS">
            <Trans>Review tx details</Trans>
          </Typography>
        </Button>
      </Box>
    </>
  );
};
