import { ExclamationIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { AssetCapData } from 'src/hooks/useAssetCaps';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

type DebtCeilingMaxedTooltipProps = TextWithTooltipProps & {
  debtCeiling: AssetCapData;
};

export const DebtCeilingMaxedTooltip = ({ debtCeiling, ...rest }: DebtCeilingMaxedTooltipProps) => {
  if (!debtCeiling || !debtCeiling.isMaxed) return null;

  return (
    <Box sx={{ ml: 2 }}>
      <TextWithTooltip {...rest} icon={<ExclamationIcon />} iconColor="error.main" iconSize={18}>
        <>
          <Trans>
            Protocol debt ceiling is at 100% for this asset. Futher borrowing against this asset is
            unavailable.
          </Trans>
        </>
      </TextWithTooltip>
    </Box>
  );
};
