pragma solidity ^0.4.4;

contract Ins {
    mapping (address => uint) posPoints;
    mapping (address => uint) negPoints;

	function addPosPoints (uint v) public  {
		var val = getPosPoints(msg.sender) + v;
		if (val < 0) val = 0;

		posPoints[msg.sender] = val;
	}

	function addNegPoints(uint v) public {
		var val = getNegPoints(msg.sender) + v;
		if (val < 0) val = 0;
		negPoints[msg.sender] = val;
	}

	function getPosPoints(address addr) constant returns(uint) {
		return posPoints[addr];
	}
	function getNegPoints(address addr) public returns(uint) {
    	return negPoints[addr];
    }


}
