import { ExternalLinkIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Box, Button, Divider, SvgIcon, Typography } from '@mui/material';
import { Link } from 'src/components/primitives/Link';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';

import { ReserveEModePanel } from '../ReserveEModePanel';
import { PanelRow, PanelTitle } from '../ReservePanels';
import { GhoBorrowInfo } from './GhoBorrowInfo';


type GhoReserveConfigurationProps = {
  reserve: ComputedReserveData;
};

export const GhoReserveConfiguration: React.FC<GhoReserveConfigurationProps> = ({ reserve }) => {
  return (
    <>
      <PanelRow>
        <PanelTitle>
          <Trans>About ONEZ</Trans>
        </PanelTitle>
        <Box>
          <Typography gutterBottom>
            <Trans>
              ONEZ is a native decentralized, collateral-backed digital asset pegged to USD. It is
              created by users via borrowing against multiple collateral. When user repays their
              ONEZ borrow position, the protocol burns that user&apos;s ONEZ. All the interest
              payments accrued by minters of ONEZ would be directly transferred to the ZeroLend
              treasury.
            </Trans>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              component={Link}
              variant="outlined"
              size="small"
              href="https://docs.zerolend.xyz/onez"
              sx={{ p: '2px 4px', mt: 2, mr: 2, minWidth: 0 }}
            >
              <Typography sx={{ mr: 1, fontSize: '10px' }}>
                <Trans>Techpaper</Trans>
              </Typography>
              <SvgIcon sx={{ fontSize: 14 }}>
                <ExternalLinkIcon />
              </SvgIcon>
            </Button>
          </Box>
        </Box>
      </PanelRow>
      <Divider sx={{ my: { xs: 6, sm: 10 } }} />
      <PanelRow>
        <PanelTitle>
          <Trans>Borrow info</Trans>
        </PanelTitle>
        <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
          <GhoBorrowInfo reserve={reserve} />
        </Box>
      </PanelRow>
      {reserve.eModeCategoryId !== 0 && (
        <>
          <Divider sx={{ my: { xs: 6, sm: 10 } }} />
          <ReserveEModePanel reserve={reserve} />
        </>
      )}
    </>
  );
};
