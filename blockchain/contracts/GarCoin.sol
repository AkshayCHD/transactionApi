pragma solidity ^0.5.0;

contract GarCoin {
    string  public name = "GarCoin";
    string  public symbol = "Gar";
    string  public standard = "Gar Token v1.0";
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor () public {
        balanceOf[address(this)] = 500000;
        totalSupply = 1000000;
    }

    function transferFromContract(uint256 _value) public returns (bool success) {
        require(balanceOf[address(this)] >= _value, 'not Enough coins in contract');

        balanceOf[address(this)] -= _value;
        balanceOf[msg.sender] += _value;

        //emit Transfer(msg.sender, _to, _value);

        return true;
    }
    
    function getBalance() public view returns(uint) {
        return balanceOf[msg.sender];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        //emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        //Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        //Transfer(_from, _to, _value);

        return true;
    }
}