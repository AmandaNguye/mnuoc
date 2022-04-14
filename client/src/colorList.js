const colorList = [
	"lavender",
	"lightblue",
	"lightcoral",
	"lightcyan",
	"lightgoldenrodyellow",
	"lightgray",
	"lightgreen",
	"lightseagreen",
	"lightskyblue",
];

function hash(i) {
	i = ((i >> 16) ^ i) * 0x45d9f3b;
	i = ((i >> 16) ^ i) * 0x45d9f3b;
	i = (i >> 16) ^ i;
	return i % colorList.length;
}

export { colorList, hash };
