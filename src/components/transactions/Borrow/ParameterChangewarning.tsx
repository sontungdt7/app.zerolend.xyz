import { Trans } from '@lingui/macro';
import { Warning } from 'src/components/primitives/Warning';


export const ParameterChangewarning = ({ }: { underlyingAsset: string }) => {
  return (
    <Warning severity="info" sx={{ my: 6 }}>
      <Trans>
        <b>Attention:</b> Parameter changes via governance can alter your account health factor and
        risk of liquidation.
      </Trans>
    </Warning>
  );
};
