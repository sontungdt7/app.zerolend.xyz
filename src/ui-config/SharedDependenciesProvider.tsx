import { createContext, useContext } from 'react';
import { UiStakeDataService } from 'src/services/UiStakeDataService';
import { WalletBalanceService } from 'src/services/WalletBalanceService';
import { useRootStore } from 'src/store/root';
import { getProvider } from 'src/utils/marketsAndNetworksConfig';
import invariant from 'tiny-invariant';

// import { governanceConfig } from './governanceConfig';
// import { stakeConfig } from './stakeConfig';

interface SharedDependenciesContext {
  // governanceService: GovernanceService;
  // governanceWalletBalanceService: WalletBalanceService;
  poolTokensBalanceService: WalletBalanceService;
  // uiStakeDataService: UiStakeDataService;
}

const SharedDependenciesContext = createContext<SharedDependenciesContext | null>(null);

export const SharedDependenciesProvider: React.FC = ({ children }) => {
  const currentMarketData = useRootStore((state) => state.currentMarketData);

  // providers
  const currentProvider = getProvider(currentMarketData.chainId);

  // services
  const poolTokensBalanceService = new WalletBalanceService(
    currentProvider,
    currentMarketData.addresses.WALLET_BALANCE_PROVIDER,
    currentMarketData.chainId
  );

  return (
    <SharedDependenciesContext.Provider
      value={{
        poolTokensBalanceService,
      }}
    >
      {children}
    </SharedDependenciesContext.Provider>
  );
};

export const useSharedDependencies = () => {
  const context = useContext(SharedDependenciesContext);
  invariant(context, 'Component should be wrapper inside a <SharedDependenciesProvider />');
  return context;
};
