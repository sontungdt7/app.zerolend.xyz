import { ReactNode } from 'react';

// Enable for premissioned market
// import { PermissionView } from 'src/components/transactions/FlowCommons/PermissionView';

export type MarketDataType = {
  v3?: boolean;
  marketTitle: string;
  // the network the market operates on
  chainId: number;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
    debtSwitch?: boolean;
  };
  isFork?: boolean;
  permissionComponent?: ReactNode;
  disableCharts?: boolean;
  subgraphUrl?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    DEBT_SWITCH_ADAPTER?: string;
    FAUCET?: string;
    PERMISSION_MANAGER?: string;
    WALLET_BALANCE_PROVIDER: string;
    L2_ENCODER?: string;
    UI_POOL_DATA_PROVIDER: string;
    UI_INCENTIVE_DATA_PROVIDER?: string;
    COLLECTOR?: string;
    V3_MIGRATOR?: string;
    GHO_TOKEN_ADDRESS?: string;
    GHO_UI_DATA_PROVIDER?: string;
  };
  /**
   * https://www.hal.xyz/ has integrated aave for healtfactor warning notification
   * the integration doesn't follow aave market naming & only supports a subset of markets.
   * When a halIntegration is specified a link to hal will be displayed on the ui.
   */
  halIntegration?: {
    URL: string;
    marketName: string;
  };
};

export enum CustomMarket {
  proto_zksync_goerli_v3 = 'proto_zksync_goerli_v3',
  proto_zksync_era_v3 = 'proto_zksync_era_v3',
}

export const marketsData: {
  [key in keyof typeof CustomMarket]: MarketDataType;
} = {
  // [CustomMarket.proto_mainnet_v3]: {
  //   marketTitle: 'Ethereum',
  //   chainId: ChainId.mainnet,
  //   v3: true,
  //   enabledFeatures: {
  //     governance: true,
  //     staking: true,
  //     liquiditySwap: true,
  //     collateralRepay: true,
  //     incentives: true,
  //     debtSwitch: false,
  //   },
  //   subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3',
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
  //     LENDING_POOL: AaveV3Ethereum.POOL,
  //     WETH_GATEWAY: AaveV3Ethereum.WETH_GATEWAY,
  //     REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Ethereum.REPAY_WITH_COLLATERAL_ADAPTER,
  //     SWAP_COLLATERAL_ADAPTER: AaveV3Ethereum.SWAP_COLLATERAL_ADAPTER,
  //     WALLET_BALANCE_PROVIDER: AaveV3Ethereum.WALLET_BALANCE_PROVIDER,
  //     UI_POOL_DATA_PROVIDER: AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
  //     UI_INCENTIVE_DATA_PROVIDER: AaveV3Ethereum.UI_INCENTIVE_DATA_PROVIDER,
  //     COLLECTOR: AaveV3Ethereum.COLLECTOR,
  //     GHO_TOKEN_ADDRESS: AaveV3Ethereum.GHO_TOKEN,
  //     GHO_UI_DATA_PROVIDER: AaveV3Ethereum.UI_GHO_DATA_PROVIDER,
  //   },
  //   halIntegration: {
  //     URL: 'https://app.hal.xyz/recipes/aave-v3-track-health-factor',
  //     marketName: 'aavev3',
  //   },
  // },
  [CustomMarket.proto_zksync_era_v3]: {
    marketTitle: 'zkSync',
    chainId: 324,
    v3: true,
    enabledFeatures: {
      // governance: true,
      // faucet: true,
      staking: false,
      // liquiditySwap: true,
      // collateralRepay: true,
      incentives: true,
    },
    // subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x4f285Ea117eF0067B59853D6d16a5dE8088bA259',
      LENDING_POOL: '0x4d9429246EA989C9CeE203B43F6d1C7D83e3B8F8',
      WETH_GATEWAY: '0x767b4A087c11d7581Ac95eaFfc1FeBFA26bad3d2',
      // REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Ethereum.REPAY_WITH_COLLATERAL_ADAPTER,
      // SWAP_COLLATERAL_ADAPTER: AaveV3Ethereum.SWAP_COLLATERAL_ADAPTER,
      WALLET_BALANCE_PROVIDER: '0xdeEa10da04D867e3303AB6E50FA26C2d8a5e9f70',
      UI_POOL_DATA_PROVIDER: '0x8FE0ac76b634B7D343Bd32282B98E9f271B43367',
      UI_INCENTIVE_DATA_PROVIDER: '0x91ccF57c1E9A7F5A9537eE59306faF8dA3b7e960',
    },
    // halIntegration: {
    //   URL: 'https://app.hal.xyz/recipes/aave-v3-track-health-factor',
    //   marketName: 'aavev3',
    // },
  },
  [CustomMarket.proto_zksync_goerli_v3]: {
    marketTitle: 'zkSync Goerli',
    chainId: 280,
    v3: true,
    enabledFeatures: {
      // governance: true,
      // faucet: true,
      staking: false,
      // liquiditySwap: true,
      // collateralRepay: true,
      incentives: false,
    },
    // subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x6CDe8a8cEE9771A30dE4fEAB8eaccb58cb0d30aF',
      LENDING_POOL: '0xC4b785A74b3d8EBE75C8d0b8Ff960d66527CAE63',
      WETH_GATEWAY: '0xd4Ed3f810B4D28Daf85Bd1a0a52E09A7c05fF915',
      // REPAY_WITH_COLLATERAL_ADAPTER: AaveV3Ethereum.REPAY_WITH_COLLATERAL_ADAPTER,
      // SWAP_COLLATERAL_ADAPTER: AaveV3Ethereum.SWAP_COLLATERAL_ADAPTER,
      WALLET_BALANCE_PROVIDER: '0x0b89CaebaA446b8cf88CABFFB74819D32eEFe5b9',
      UI_POOL_DATA_PROVIDER: '0x5CE5D50Ac25497ae1b4E4A3FB18fcEDbc15FCea0',
      FAUCET: '0x63C82e4D77c75e3F175149c2108b167B6C5ad4Db',
      UI_INCENTIVE_DATA_PROVIDER: '0x9356B8D3ca90d6D26977f3A22e8a2D5EE39e0CaF',

      GHO_TOKEN_ADDRESS: '0x669Cd3d6B99196B555363E092eF3e015bE8E2298',
      GHO_UI_DATA_PROVIDER: '0xdedd2d9E478571f36df5B7c214146aFbE92B4920',
      // COLLECTOR: AaveV3Ethereum.COLLECTOR,
    },
    // halIntegration: {
    //   URL: 'https://app.hal.xyz/recipes/aave-v3-track-health-factor',
    //   marketName: 'aavev3',
    // },
  },
} as const;
