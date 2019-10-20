
const web3 = require('web3');
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
var CONTRACT_ABI = require('./config.js').CONTRACT_ABI
var CONTRACT_ADDRESS = require('./config.js').CONTRACT_ADDRESS

web3js = new web3(new web3.providers.HttpProvider("https://testnet2.matic.network/"));

var privateKey = Buffer.from('36BBF9F1E278101FE04D1201C9ED14990B050C7B46597FD4E3531A15B5DBE9DD', 'hex')
var myAddress = '0xDF60A482c951AeE9F817108b0dDc9AC007420008';

var credentials = {
    'akshay': {
        private: '36BBF9F1E278101FE04D1201C9ED14990B050C7B46597FD4E3531A15B5DBE9DD',
        public: '0xDF60A482c951AeE9F817108b0dDc9AC007420008' 
    },
    'parul': {
        private: '3174307E5E659C5D2892C1DC0574E8228BC8DD7E83CCCDBD7AE96B3B58FF84F2',
        public: '0x92EE03F468d17AAE39a2AC65F365f6BA47382dA0'
    },
    'dhruv': {
        private: '8F244292F3AAA3BECB10AEB1CE6CEFED946412FA891389C99D58DB3E05B2CC4E',
        public: '0xfA18C4Da5B80D2459aCD95e905BD081227446107'
    }
}


var contractABI = CONTRACT_ABI;
var contractAddress = CONTRACT_ADDRESS;
//creating contract object
var contract = new web3js.eth.Contract(contractABI, contractAddress);

app.get('/allotPoints',function(req,res) {
    var person = req.query.person
    var tokens = Number(req.query.tokens)
    var zone = Number(req.query.zone)
    var toAddress = credentials[person].public
    web3js.eth.accounts.privateKeyToAccount(privateKey);
    const tx = {
        from: myAddress,
        gasPrice: "0x0",
        gasLimit: 100000,
        to: contractAddress,
        value: 0,
        data: contract.methods.transferFromContract(tokens, zone, toAddress).encodeABI(),
      };
    web3js.eth.accounts.signTransaction(tx, privateKey).then((result) => {
        web3js.eth.sendSignedTransaction(result.rawTransaction).then((reciept) => {console.log(reciept)});
        res.send(true)    
    })
});

app.get('/getBalance', function(req, res) {
    var person = req.query.person

    var toAddress = credentials[person].public
    contract.methods.getBalance(toAddress).call()
    .then(function(balance){
        console.log(balance)
        res.send(balance); 
    });
})

app.get('getBalancePerZone', function(req, res) {
    var person = req.query.person
    var zone = req.query.zone

    var toAddress = credentials[person].public
    contract.methods.getBalancePerZone(zone, toAddress).call()
    .then(function(balance){
        console.log(balance)
        res.send(balance); 
    }); 
})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))