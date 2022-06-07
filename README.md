# README
This demo contributes healthcare data secure sharing in privacy protection using public blockchains and sticky policy. It involves frameworks react, webpack and truffle. With `BRESPE`, you have user interfaces to share data with Ethereum as a user `data subject` or `data controller` or `data requestor`. Learn more about React:https://www.trufflesuite.com/boxes/react , Webpack:https://www.trufflesuite.com/boxes/webpack , Truffle: https://www.trufflesuite.com and Ethereum: https://ethereum.org/en/ .
## How to run
### Check configuration for Ethereum
1. Ensure you configures environment to run `Ethereum` 
2. check geth client `Ganache-cli` or `testrpc`, if no client, see step 3
3. install `testrpc`: **>>npm install -g ethereumjs-testrpc**
4. alternative step3 with install `Ganache-cli`: **>>npm install -g ganache-cli**
5. Run testRPC/ganache-cli to connect Ethereum in a terminal: **>>testrpc** or **>>ganache-cli**
6. configure the metamask to view more details in transactions with localhost network if you want 
  6.1. add MetaMask extension in the Chrome or Firefox browser and then creat your metamask account. 
  6.2 add localhost network into your metamask account: if localhost server is ganache-cli, network setting: `Networkname`: your localhost network name; `RPC URL`:http://127.0.0.1:8545; `chain id`: 1337;' if localhost server is ganache, `RPC URL`is http://127.0.0.1:7545, `chain id`is 1337.
  6.3 import your blockchain account into the metamask wallet. We have 10 default accounts with 100 eths from localhost. To select and copy one private keys of accounts, and then import into the metamask: select the `import account`>>choose type `private key`>>paste `private key string` with private key from default accounts in the localhost >> create and save >> check the assets of this account.

### Installation `react` box into your empty directory or see steps from https://www.trufflesuite.com/boxes/react or https://github.com/truffle-box/react-box
1. First run the second terminal and ensure you are in a new and empty directory.
2. Run the `unbox` command via `npx` and skip to step 3. This will install all necessary dependencies. A Create-React-App is generated in the `client` directory.
command: **>>npx truffle unbox react**
3. Alternatively, you can install Truffle globally and run the `unbox` command.
command: **>>npm install -g truffle** and then **>>truffle unbox react**
4. Run the development console.
command: **>>truffle develop**
5. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
command: **>>compile** and **>>migrate**
6. In the `client` directory, we run the React app in another terminal. Smart contract changes must be manually recompiled and migrated.
command: **>>cd client** and then **>>npm run start**
7. You will see a user interface (webpage) running in your browser shown as `localhost:3000`.
### Configure more in the `react` box
1. replace with `truffle-config.js` file to set up development model
2. add functions of `file save` and `SHA` hash calculation: 
3. download `file-saver` from https://github.com/eligrey/FileSaver.js and then unzip it into `node_modulers` directory under your `client` directory.
4. download `js-sha3` from https://github.com/emn178/js-sha3 and then unzip it into `node_modulers` directory under your `client` directory.
5. add dependencies: replace with `package.json` file in your `client` directory
6. npm install react-router-dom
### Add codes into the `react` box
1. add smart contracts codes: replace with `SimpleStorage.sol` file under the `contracts` directory
2. design user interface codes: replace with the whole `src` folder under the `client` directory
### Test
1. run testrpc or ganache-cli in a terminal
2. run the development mode to compile and migrate smart contracts in the second terminal: **>>truffle compile** and then **>>truffle migrate**
3. in the second terminal or the third terminal: **>>cd client** and then **>>npm run start**
4. See Home webpage in your browser after few seconds. To click the link, you can go to the user inner page. DR means data requester (e.g. a third party), who starts the data flow and sends the request. DS means data subject (e.g. patient), who is data owner. DC means data controller (e.g. primary care, hospital), who is resource owner to manage healthcare information of data subject. 
5. To assume Alice is a data requester. Alice sends a requester to DS (select options or input by yourself in the request form). A receipt with details is followed after this transaction. DS processes this request from Alice. DS can change the content of request by viewing details of this request and then click the consent, or consent directly without changes. A receipt also responded for DS after consent. Then, DC and Alice receive the consent. DC views this consent and makes a policy for Alice based on the consent before sharing the required healthcare data. DC encrypts the required healthcare data and pushes its' hash value into the blockchain. Alice receives the hash value as an evidence proof. After that, DC shares the required data with Alice. Alice receives the data and can compare with the hash value. A receipt always followed by the transaction including data exchange.
