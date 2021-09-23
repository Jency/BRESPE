# README
This demo contributes healthcare data secure sharing in privacy protection using public blockchains and sticky policy. It invovles frameworks react, webpack and truffle. With `BRESPE`, you can have user interfaces to operate data sharing in the Ethereum as a user `data subject` or `data controller` or `data requestor`. Learn more about React:https://www.trufflesuite.com/boxes/react , Webpack:https://www.trufflesuite.com/boxes/webpack , Truffle: https://www.trufflesuite.com and Ethereum: https://ethereum.org/en/ .
## How to run
### Installation for react box or see steps from https://www.trufflesuite.com/boxes/react or https://github.com/truffle-box/react-box
1. First ensure you are in a new and empty directory.
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
7. You will see a user interface (webpage) running in your broswer shown as `localhost:3000`.
### Check configuration for Ethereum
1. Ensure you configures environment for run `Ethereum` with `Ganache-cli` or `testrpc`
2. install `testrpc`: **>>npm install -g ethereumjs-testrpc**
3. alternative step2 with install `Ganache-cli`: **>>npm install -g ganache-cli**
4. Run testRPC/ganache-cli to connect Ethereum in another terminal: **>>testrpc** or **>>ganache-cli**
### Add codes into the `react`
