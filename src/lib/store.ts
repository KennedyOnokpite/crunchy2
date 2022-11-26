import { writable } from 'svelte/store';

type Store = {
	lastMoves: string;
	movedPiece: string;
	recordings: string;
	whitePromotes: boolean;
	blackPromotes: boolean;
	promotionSquare: string;
	moveSound: any;
	captureSound: any;
	taggedSquares: string[];
	originSquare: string;
	darkSquareColor: string;
	lightSquareColor: string;
	coordinatesVisibility: string;
	possibleEnpassantSquare: string;
	whiteToMove: boolean;
	showLastMoves: boolean;
	showLegalMoves: boolean;
	randomBoardView: boolean;
	hideCoordinates: boolean;
	flippedBoardView: boolean;
	possibleWhiteKingSideCastling: boolean;
	possibleBlackKingSideCastling: boolean;
	possibleWhiteQueenSideCastling: boolean;
	possibleBlackQueenSideCastling: boolean;
	order: number[];
	lightSquares: string[];
	squareArray: string[];
	flippedSquareArray: string[];
	movedPieceLegalMoves: string[];
	whiteLegalMoves: string[];
	blackLegalMoves: string[];
};

const storeData: Store = {
	lastMoves: '',
	movedPiece: '',
	whitePromotes: false,
	blackPromotes: false,
	promotionSquare: '',
	recordings: '',
	moveSound: {},
	captureSound: {},
	taggedSquares: [],
	originSquare: '',
	darkSquareColor: 'bg-red-500',
	lightSquareColor: 'bg-gray-200',
	coordinatesVisibility: '',
	possibleEnpassantSquare: '-',
	whiteToMove: true,
	showLastMoves: true,
	showLegalMoves: true,
	randomBoardView: false,
	hideCoordinates: false,
	flippedBoardView: false,
	possibleWhiteKingSideCastling: true,
	possibleBlackKingSideCastling: true,
	possibleWhiteQueenSideCastling: true,
	possibleBlackQueenSideCastling: true,
	order: [1, 2, 3, 4, 5, 6, 7, 8],
	lightSquares: [
		'a8',
		'c8',
		'e8',
		'g8',
		'b7',
		'd7',
		'f7',
		'h7',
		'a6',
		'c6',
		'e6',
		'g6',
		'b5',
		'd5',
		'f5',
		'h5',
		'a4',
		'c4',
		'e4',
		'g4',
		'b3',
		'd3',
		'f3',
		'h3',
		'a2',
		'c2',
		'e2',
		'g2',
		'b1',
		'd1',
		'f1',
		'h1'
	],
	squareArray:[
		'a8',
		'b8',
		'c8',
		'd8',
		'e8',
		'f8',
		'g8',
		'h8',
		'a7',
		'b7',
		'c7',
		'd7',
		'e7',
		'f7',
		'g7',
		'h7',
		'a6',
		'b6',
		'c6',
		'd6',
		'e6',
		'f6',
		'g6',
		'h6',
		'a5',
		'b5',
		'c5',
		'd5',
		'e5',
		'f5',
		'g5',
		'h5',
		'a4',
		'b4',
		'c4',
		'd4',
		'e4',
		'f4',
		'g4',
		'h4',
		'a3',
		'b3',
		'c3',
		'd3',
		'e3',
		'f3',
		'g3',
		'h3',
		'a2',
		'b2',
		'c2',
		'd2',
		'e2',
		'f2',
		'g2',
		'h2',
		'a1',
		'b1',
		'c1',
		'd1',
		'e1',
		'f1',
		'g1',
		'h1'
	],
	flippedSquareArray: [
		'h1',
		'g1',
		'f1',
		'e1',
		'd1',
		'c1',
		'b1',
		'a1',
		'h2',
		'g2',
		'f2',
		'e2',
		'd2',
		'c2',
		'b2',
		'a2',
		'h3',
		'g3',
		'f3',
		'e3',
		'd3',
		'c3',
		'b3',
		'a3',
		'h4',
		'g4',
		'f4',
		'e4',
		'd4',
		'c4',
		'b4',
		'a4',
		'h5',
		'g5',
		'f5',
		'e5',
		'd5',
		'c5',
		'b5',
		'a5',
		'h6',
		'g6',
		'f6',
		'e6',
		'd6',
		'c6',
		'b6',
		'a6',
		'h7',
		'g7',
		'f7',
		'e7',
		'd7',
		'c7',
		'b7',
		'a7',
		'h8',
		'g8',
		'f8',
		'e8',
		'd8',
		'c8',
		'b8',
		'a8'
	],
	movedPieceLegalMoves: [],
	whiteLegalMoves: [],
	blackLegalMoves: []
};

export const store = writable(storeData);
