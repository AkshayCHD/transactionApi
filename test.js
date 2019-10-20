const web3 = require('web3');

var CONTRACT_ABI = require('./config.js').CONTRACT_ABI
var CONTRACT_ADDRESS = require('./config.js').CONTRACT_ADDRESS

web3js = new web3(new web3.providers.HttpProvider("https://testnet2.matic.network/"));

var contractABI = CONTRACT_ABI;
var contractAddress = CONTRACT_ADDRESS;
var contract = new web3js.eth.Contract(contractABI, contractAddress);
var toAddress = '0xDF60A482c951AeE9F817108b0dDc9AC007420008';

var privateKey = Buffer.from('36BBF9F1E278101FE04D1201C9ED14990B050C7B46597FD4E3531A15B5DBE9DD', 'hex')
var myAddress = '0xDF60A482c951AeE9F817108b0dDc9AC007420008';
web3js.eth.accounts.privateKeyToAccount(privateKey);
const tx = {
    from: myAddress,
    gasPrice: "0x0",
    gasLimit: 100000,
    to: contractAddress,
    value: 0,
    data: contract.methods.transferFromContract(99, 1, toAddress).encodeABI(),
  };
web3js.eth.accounts.signTransaction(tx, privateKey).then((result) => {
    web3js.eth.sendSignedTransaction(result.rawTransaction).then((reciept) => {console.log(reciept)});
})
