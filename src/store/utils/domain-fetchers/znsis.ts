import { Contract } from 'ethers';
import { namehash } from 'ethers/lib/utils';
import { DomainType, WalletDomain } from 'src/store/walletDomains';
import { getENSProvider } from 'src/utils/marketsAndNetworksConfig';
import { tFetch } from 'src/utils/tFetch';

const provider = getENSProvider();

const resolver1Abi = [
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'name',
    outputs: [{ name: 'ret', type: 'string' }],
    payable: false,
    type: 'function',
  },
];

const lookupAddress = async (address: string) => {
  const resolverZNSis = new Contract(
    '0xCE70B7f5BB44BE2f8A7f37f8c162240440Fc6218',
    resolver1Abi,
    provider
  );

  const nodehash = namehash(address.substring(2) + '.addr.reverse');

  try {
    const n = await resolverZNSis.name(nodehash);
    return n;
  } catch (error) {
    if (error.code === 'CALL_EXCEPTION') {
      return null;
    }
    throw error;
  }
};

const getEnsName = async (address: string): Promise<string | null> => {
  try {
    const name = await lookupAddress(address);
    return name;
  } catch (error) {
    console.error('ENS name lookup error', error);
  }
  return null;
};

const getEnsAvatar = async (name: string): Promise<string | undefined> => {
  try {
    const image = `https://metadata.ens.domains/mainnet/avatar/${name}/`;
    await tFetch<never>(image, { method: 'HEAD' });
    return image;
  } catch (error) {
    console.error('ENS avatar lookup error', error);
  }
};

export const getEnsDomain = async (address: string): Promise<WalletDomain | null> => {
  const name = await getEnsName(address);
  if (!name) return null;
  const avatar = await getEnsAvatar(name);
  return { name, avatar, type: DomainType.ENS };
};
