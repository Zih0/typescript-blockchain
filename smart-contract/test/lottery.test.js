const { isMainThread } = require('worker_threads');

const Lottery = artifacts.require('Lottery');

contract('Lottery', function ([deployer, user1, user2]) {
	let lottery;
	beforeEach(async () => {
		console.log('Before Each');
		lottery = await Lottery.new();
	});
	it('Basic test', async () => {
		console.log('Basic test');
		let owner = await lottery.owner();
		let value = await lottery.getSomeValue();
		console.log(`owner : ${owner}  value : ${value}`);

		assert.equal(value, 5);
	});
});
