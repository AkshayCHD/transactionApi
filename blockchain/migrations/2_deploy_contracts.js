const GarCoin = artifacts.require("GarCoin");

module.exports = function(deployer) {
  deployer.deploy(GarCoin);
};
