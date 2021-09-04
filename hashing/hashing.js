"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

function blockHash(bl) {
	return crypto.createHash("sha256").update(bl).digest("hex");
}

const createBlock = ({ data = '', index, prevHash }) => {
	const block = {
		index,
		prevHash,
		data,
		timestamp: Date.now(),
	};

	return {
		...block,
		hash: blockHash(`${index}${prevHash}${data}${block.timestamp}`)
	}
}

for (let line of poem) {
	const { blocks } = Blockchain;
	const index = blocks.length;
	const prevHash = blocks[index - 1].hash;
	blocks.push(createBlock({ data: line, index, prevHash }));
}

const verifyBlock = (block, prevBlock) => {
	if (block.index === 0) {
		return block.hash === '000000';
	}
	if (!block.data) return false;
	if (!block.prevHash) return false;
	if (block.index < 1) return false;
	if (block.hash !== blockHash(`${block.index}${block.prevHash}${block.data}${block.timestamp}`)) return false;
	if (block.prevHash !== prevBlock.hash) return false;
	return true;
}

const verifyChain = (chain = []) => {
	let isValid;
	for (let block of chain) {
		isValid = verifyBlock(block, chain[block.index - 1]);
		if (!isValid) {
			console.log('not valid block:', block);
			break;
		}
	}
	return isValid;
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain.blocks)}`);