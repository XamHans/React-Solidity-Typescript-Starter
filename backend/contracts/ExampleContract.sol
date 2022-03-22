//SPDX-License-Identifier: Unlicense
//specific solidity cersion
pragma solidity ^0.8.7;
// we can use the console.log func from hardhat for debugging (like in javascript)
import "hardhat/console.sol";

// openzeppelin provides libaries of different use cases, this one provides a counter with best practices 
// a simple way to get a counter that can only be incremented or decremented. Very useful for ID generation, counting contract activity, among others.
import "@openzeppelin/contracts/utils/Counters.sol";

contract ExampleContract {
    // this is how to define a enum, the values are defined in the {}
    enum ExampleEnum{CREATED, OPEN, CLOSED}

    // a struct is like a class but without any implementation logic
    struct AccountInfo {
        uint id;
        string name;
        address accountAddress;
    }
    //  Functions in a library can be used by many contracts. If you have many contracts that have some common code, then you can deploy that common code as a library.
    // The directive using A for B; can be used to attach library functions of library A to a given type B. These functions will used the caller type as their first parameter (identified using self).
    using Counters for Counters.Counter;
    Counters.Counter private accountId;

    // mapping (technically a hashtable) stores keys to values (key => value) good for association topics
    // this mapping is used to keep track of the ids (number) to the right account address (hash)
    mapping ( uint=> AccountInfo ) private accounts;

    // an event is used to let other parties know that something important has happend in your contract
    // other contracts or event frontends can subscribe to your events
    event accountCreatedEvent(address indexed accountAddress, string name);

    function addAccount(string calldata _name) external {
        // require is like an early out criterium, if the condition is false, the function will be stopped and the error message (defined as second parameter) will be returned
        // msg. sender is the address who calls the contract
        require(msg.sender != address(0x0), "The sender address must exist");
        accountId.increment();
        uint accountId = accountId.current();
        // create new object from type AccountInfo
        // memory indicates that the object only lives during the function call, if you want to store it permanently on the blockchain use the storage keyword
        address accAddress = address(msg.sender);
        AccountInfo memory newAccount = AccountInfo(accountId, _name, accAddress);
        accounts[accountId] = newAccount; 
        // trigger event that a new account has been created
        emit accountCreatedEvent(accAddress, _name);
        console.log("NEW ACCOUNT ADDED", newAccount.name);
    }


}
