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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode, useRef, useState } from 'react';
import { compactNumber, FormattedNumber } from 'src/components/primitives/FormattedNumber';
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

const COPY_IMAGE_TIME = 5000;

export const GhoBorrowSuccessView = ({ txHash, action, amount, symbol }: SuccessTxViewProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | undefined>();
  const [generatedBlob, setGeneratedBlob] = useState<Blob | null>();
  const [clickedCopyImage, setClickedCopyImage] = useState(false);
  const { mainTxState } = useModalContext();
  const { currentNetworkConfig } = useProtocolDataContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const trackEvent = useRootStore((store) => store.trackEvent);

  const compactedNumber = compactNumber({ value: amount, visibleDecimals: 2, roundDown: true });
  const finalNumber = `${compactedNumber.prefix}${compactedNumber.postfix}`;
  const canCopyImage = typeof ClipboardItem !== 'undefined';

  const onCopyImage = () => {
    if (generatedBlob) {
      navigator.clipboard
        .write([
          new ClipboardItem({
            [generatedBlob.type]: generatedBlob,
          }),
        ])
        .then(() => {
          trackEvent(GHO_SUCCESS_MODAL.GHO_COPY_IMAGE);
          setClickedCopyImage(true);
          setTimeout(() => {
            setClickedCopyImage(false);
          }, COPY_IMAGE_TIME);
        })
        .catch(() => {
          trackEvent(GHO_SUCCESS_MODAL.GHO_FAIL_COPY_IMAGE);
        });
    }
  };

  const transformImage = (svg: SVGSVGElement) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        const img = new Image();
        img.onload = () => {
          document.fonts.ready.then(() => {
            context.drawImage(img, 0, 0);
            setGeneratedImage(canvasRef.current?.toDataURL('png', 1));
            canvasRef.current?.toBlob((blob) => setGeneratedBlob(blob), 'png');
          });
        };
        img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg.outerHTML)}`;
      }
    }
  };

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
