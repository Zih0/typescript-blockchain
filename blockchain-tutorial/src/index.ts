// sha256암호화 라이브러리
import * as CryptoJS from 'crypto-js';

//Block structure
class Block {
	static caculateBlockHash = (
		index: number,
		previousHash: string,
		timestamp: number,
		data: string
	): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

	static validateStructure = (aBlock: Block): boolean =>
		typeof aBlock.index === 'number' &&
		typeof aBlock.hash === 'string' &&
		typeof aBlock.previousHash === 'string' &&
		typeof aBlock.timestamp === 'number' &&
		typeof aBlock.data === 'string';

	public index: number;
	public hash: string;
	public previousHash: string;
	public data: string;
	public timestamp: number;

	constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
		this.index = index;
		this.hash = hash;
		this.previousHash = previousHash;
		this.data = data;
		this.timestamp = timestamp;
	}
}

const genesisBlock: Block = new Block(0, '23124789127389', '', 'hello', 123456);

let blockchain: Block[] = [genesisBlock];

// 블록체인 가져오기; 전체 블록
const getBlockchain = (): Block[] => blockchain;

//마지막 블록 가져오기
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

// 타임스탬프
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

// 새 블록 만들기
const createNewBlock = (data: string): Block => {
	const previousBlock: Block = getLatestBlock();
	const newIndex: number = previousBlock.index + 1;
	const newTimestamp: number = getNewTimeStamp();
	const newHash: string = Block.caculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
	const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
	addBlock(newBlock);
	return newBlock;
};

// 블록 해쉬 가져오기
const getHashforBlock = (aBlock: Block): string =>
	Block.caculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

//간단한 검증; 인덱스, 해쉬값 비교
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
	if (!Block.validateStructure(candidateBlock)) {
		return false;
	} else if (previousBlock.index + 1 !== candidateBlock.index) {
		return false;
	} else if (previousBlock.hash !== candidateBlock.previousHash) {
		return false;
	} else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
		return false;
	} else {
		return true;
	}
};

// 검증 후 블록 추가
const addBlock = (candidateBlock: Block): void => {
	if (isBlockValid(candidateBlock, getLatestBlock())) {
		blockchain.push(candidateBlock);
	}
};

// 실행
createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');
console.log(getBlockchain());

export {};
