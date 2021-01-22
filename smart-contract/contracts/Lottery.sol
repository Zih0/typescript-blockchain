pragma solidity >=0.4.21 <0.9.0;

contract Lottery {
    
    address public owner;
    //public 자동으로 getter 만들어줌. 외부에서 바로 확인 가능
    
    constructor() public {
        owner = msg.sender; 
        //sender 스마트컨트랙트에서 제공하는 전역 변수
    }

    function getSomeValue() public pure returns(uint256 value) {
        return 5;
    }
}