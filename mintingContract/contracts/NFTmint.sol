// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTmint is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // increasable value
    mapping(address => uint256) rewardTokens; // USER => Amount. array

    uint256 TOTAL_SUPPLY = 1000;
    uint256 minting_fee = 0.005 ether;
    address payable owner;
    uint256 START_TIME = 1637230266;
    uint256 presale_period = 5;
    bool pauseState;
    uint256 pausablePoint;
    uint256 salePoint;
    address[] whitelist;
    string HAIR_URL =
        "https://gateway.pinata.cloud/ipfs/QmQGvVqBepaz2Gwt47RUdgkxhC4KD6yZKF3bAC4WANmEDw/";
    string HATS_URL =
        "https://gateway.pinata.cloud/ipfs/QmSjykvx2fnSJyehT4HLiLryyVkqgCktVAdfjTQjE31Xbr/";

    constructor() ERC721("LYA Penguin NFT", "LYA") { // main function for constructor
        owner = payable(msg.sender);   // msg.sender = logged in metamask address = owner
        salePoint = START_TIME + 86400 * presale_period;   // presale time set 
    }

    modifier onlyOwner() //check Ower or not, Owner = when deploy , connect to metamask, gas fee deposit address
    { 
        require(msg.sender == owner);
        _;
    }

    function setMintFee(uint256 _fee) public onlyOwner {
        minting_fee = _fee;
    }

    function getMintFee() public view returns (uint256) {
        return minting_fee;
    }

    function setOwner(address _new) public onlyOwner {
        owner = payable(_new);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getWhiteList() public view returns(address [] memory) {
        return whitelist;
    }

    function setPresalePeriod(uint256 _period) public onlyOwner {
        presale_period = _period;
    }

    function getPresalePeriod() public view returns(uint256) {
        return presale_period;
    }

    function getSalePoint() public view returns(uint256) {
        return salePoint;
    }

    function getTotalTokenId() public view returns (uint256) {
        uint256 lastId = _tokenIds.current();        //_tokenIds = unique id for NFT
        return lastId;
    }

    function pauseSale(bool _pause) public onlyOwner {
        pauseState = _pause;

        if (block.timestamp < salePoint) {    //block.timestamp = now
            if (_pause) {
                pausablePoint = block.timestamp;
            } else {
                salePoint += (block.timestamp - pausablePoint);
            }
        }
    }

    function getTimeStamp() public view returns (uint256) {
        return block.timestamp;
    }

    function concateString(string memory str1, string memory str2)   //meory confirmed style for string.
        public
        view
        returns (string memory)
    {
        return string(abi.encodePacked(str1, str2)); ///encodePacked = encode string.
    }

    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function makeStringFormat(uint256 _id, string memory str)
        public
        view
        returns (string memory)
    {
        uint256 numberTobeconverted = _id;
        string memory temp = uint2str(numberTobeconverted);
        string memory concated = concateString(temp, str);
        return concated;
    }

    function sendRewards() public { //Rewards = bosang

        for (uint256 i = 0; i < whitelist.length; i++) {
            uint256 _amount = rewardTokens[msg.sender];
            for (uint256 j = 0; j < _amount; j++) {
                _tokenIds.increment();
                _safeMint(msg.sender, _tokenIds.current());
                if (_tokenIds.current() > 500) {
                    _setTokenURI(
                        _tokenIds.current(),
                        concateString(
                            HAIR_URL,
                            makeStringFormat(
                                (_tokenIds.current() - 500),
                                ".json"
                            )
                        )
                    );
                } else {
                    _setTokenURI(
                        _tokenIds.current(),
                        concateString(
                            HATS_URL,
                            makeStringFormat(_tokenIds.current(), ".json")
                        )
                    );
                }
            }
        }
    }

    // main function
    function mintToken(uint256 _amount) public payable { //payable is for transfer, when send money from add1 to add2
        require(pauseState == false, "Now Minting is paused!");// if pauseState == false continue else "Now Minting"
        require(
            msg.value >= minting_fee * _amount,
            "Minting Fee is not suitable."
        );

        uint256 id = _tokenIds.current();

        require(
            id + _amount <= TOTAL_SUPPLY, //Total_supply is limit minting count
            "Tokens are going to mint over totalSupply!"
        );

        owner.transfer(msg.value);  // send msg.sender address msg.value amount send to owner

        for (uint256 i = 0; i < _amount; i++) {
            _tokenIds.increment();
            _safeMint(msg.sender, _tokenIds.current());  //_safeMint is minting function, mint _tokenIds.current() to msg.sender address 
            if (_tokenIds.current() > 500) {
                _setTokenURI(
                    _tokenIds.current(),
                    concateString(
                        HAIR_URL,
                        makeStringFormat((_tokenIds.current() - 500), ".json")
                    )
                );
            } else {
                _setTokenURI(
                    _tokenIds.current(),
                    concateString(
                        HATS_URL,
                        makeStringFormat(_tokenIds.current(), ".json")
                    )
                );
            }
        }

        if (block.timestamp < salePoint) {
            rewardTokens[msg.sender] = _amount;
            whitelist.push(msg.sender);
        }
    }
}
