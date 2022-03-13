# Pocket Network Relay Tester
- This tool will detect your staked nodes' relay chains and send a sample payload to test whether it is working or not.
- Ensure that your nodes' has simulate relay enabled.

## Requirements
- Node 11+
- Pocket endpoint to query nodes' staked chains, you can retrieve a free one using the [Portal](https://www.portal.pokt.network/#1)

## Installation
- Requires Node 11 or higher
- `npm install` - to install dependencies

## Usage
- `npm run start` - to run the program


## Example output
```
√ What is your pocket rpc endpoint? (Grab from Portal) ...  https://mainnet.gateway.pokt.network/v1/lb/XXXXX

√ Enter your node addresses, example: address 1, address 2: ... 5b2e46990fc71fdf75df79afd63b7cf7669a3185

Testing out Node: 5b2e46990fc71fdf75df79afd63b7cf7669a3185
Detected node service url as: https://val1645129370.c0d3r.org:443

HARMONY SHARD_0: Successfully relayed
ETHEREUM: Successfully relayed
FUSE: Successfully relayed
POLYGON: Successfully relayed
ETHEREUM GOERLI: Successfully relayed
AVALANCHE: Failed to relay
ETHEREUM RINKEBY: Successfully relayed
ETHEREUM ROPSTEN: Successfully relayed
ETHEREUM ARCHIVAL: Successfully relayed
POCKET NETWORK: Successfully relayed
GNOSIS CHAIN: Successfully relayed
```
