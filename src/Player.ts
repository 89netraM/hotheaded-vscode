import * as Speaker from "speaker";
import * as fs from "fs";

const playQueue: Array<string> = new Array<string>();
let isPlaying: boolean = false;

function play(file: string): void {
	isPlaying = true;

	const speaker = new Speaker({
		channels: 2,
		bitDepth: 16,
		sampleRate: 44100,
		final: donePlaying
	});
	fs.createReadStream(file).pipe(speaker);
}
function donePlaying(): void {
	isPlaying = false;

	const nextFile = playQueue.shift();
	if (nextFile !== undefined) {
		play(nextFile);
	}
}

export function addToPlayQueue(file: string): void {
	if (!isPlaying) {
		play(file);
	}
	else {
		playQueue.push(file);
	}
}