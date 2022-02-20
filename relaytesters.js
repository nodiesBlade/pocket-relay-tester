const prompts = require('prompts');
const axios = require('axios');
const fs = require('fs/promises');
const pocketJS = require('@pokt-network/pocket-js')
const {Pocket, Configuration, HttpRpcProvider} = pocketJS;
const {ChainType} = require('./rpcdata/chains')


const promptQuestions = [
    {
        type: 'text',
        name: 'pocket_rpc_endpoint',
        message: 'What is your pocket rpc endpoint? (Grab from Portal)',
        initial: '',
        clearFirst: true,
    },
    {
        type: 'list',
        name: 'node_addresses',
        message: 'Enter your node addresses, example: address 1, address 2:',
        initial: '',
        separator: ','
    },
];

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

async function testNodes() {

    const {pocket_rpc_endpoint, node_addresses} = await prompts(promptQuestions);

    const dispatch = new URL(pocket_rpc_endpoint);
    const rpcProvider = new HttpRpcProvider(dispatch);
    const configuration = new Configuration(5, 1000, 0, 40000);
    const pocketInstance = new Pocket([dispatch], rpcProvider, configuration);


    for (const nodeAddress of node_addresses) {
        const {node} = await pocketInstance.rpc().query.getNode(nodeAddress);
        const {chains, serviceURL} = node;
        const {href} = serviceURL;

        const asyncCalls = chains.map(async id => {
            const rpcPayload = (await fs.readFile(`./rpcdata/${id}.json`, 'utf-8')).replace(/(\r\n|\n|\r)/gm, "");
            return axios.post(`${href}v1/client/sim`, {
                relay_network_id: `${id}`,
                payload: {
                    method: "POST", ...(id != ChainType.POCKET_NETWORK && {data: rpcPayload}),
                    path: (id == ChainType.POCKET_NETWORK ? "v1/query/height" : "")
                }
            }).catch(() => {
            })
        });

        const results = await Promise.all(asyncCalls);
        console.log(`Testing out Node: ${nodeAddress}`);
        console.log(`Detected node service url as: ${href}`);
        results.forEach((result, index) => {
            const networkName = getKeyByValue(ChainType, chains[index]).replace("_", " ")
            console.log(`${networkName}: ${(result && result.status && result.status == 200) ? 'Successfully relayed' : 'Failed to relay'}`)
        });
        console.log();
        console.log();
    }
}

testNodes().then(() => {
    console.log("Program finish");
}).catch((e) => {
    console.log(e);
    console.log("Something went wrong");
})