# BRESPE
This demo contributes healthcare data secure sharing in privacy protection using public blockchains and sticky policy. It invovles frameworks react, webpack and truffle. With `BRESPE`, you can have user interfaces to operate data sharing in the Ethereum as a user `data subject` or `data controller` or `data requestor`. Learn more about React:https://www.trufflesuite.com/boxes/react , Webpack:https://www.trufflesuite.com/boxes/webpack , Truffle: https://www.trufflesuite.com and Ethereum: https://ethereum.org/en/ .
## How to run
### Installation for react box or see steps from https://www.trufflesuite.com/boxes/react or https://github.com/truffle-box/react-box
1. First ensure you are in a new and empty directory.
2. Run the `unbox` command via `npx` and skip to step 3. This will install all necessary dependencies. A Create-React-App is generated in the `client` directory.
3. **>>npx truffle unbox react**
4. Alternatively, you can install Truffle globally and run the `unbox` command.
5. **>>npm install -g truffle** and then **>>truffle unbox react**
6. Run the development console.
7. **>>truffle develop**
8. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
9. **>>compile** and **>>migrate**
10. In the `client` directory, we run the React app in another terminal. Smart contract changes must be manually recompiled and migrated.
11. **>>cd client** and then **>>npm run start**
12. You will see a user interface (webpage) running in your broswer shown as `localhost:3000`.
