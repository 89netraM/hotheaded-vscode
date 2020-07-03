import * as Speaker from "speaker";
import * as path from "path";
import * as fs from "fs";

let assetsPath: string;
export function initBashing(extensionPath: string): void {
	assetsPath = path.join(extensionPath, "assets");
}

const bashes: ReadonlyArray<string> = new Array<string>(
	"Are you dumb.wav",
	"That's never gonna work.wav",
	"That's not even real code.wav",
	"That's not right.wav",
	"What are you writing.wav",
	"What is that.wav",
	"WTF.wav"
);
const takenBashes: Array<string> = new Array<string>();

function randomMessage(): string {
	let bash;
	do {
		bash = bashes[Math.floor(Math.random() * bashes.length)];
	} while (takenBashes.includes(bash));

	takenBashes.push(bash);
	if (takenBashes.length > Math.round(bashes.length * 0.4)) {
		takenBashes.shift();
	}

	return bash;
}
function randomFile(): string {
	return path.join(assetsPath, randomMessage());
}

export function bash(): void {
	const speaker = new Speaker({
		channels: 2,
		bitDepth: 16,
		sampleRate: 44100
	});

	fs.createReadStream(randomFile()).pipe(speaker);
}