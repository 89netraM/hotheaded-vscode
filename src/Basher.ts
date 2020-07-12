import * as path from "path";
import * as glob from "glob";
import { addToPlayQueue } from "./Player";
import { workspace } from "vscode";

let bashes: ReadonlyArray<string>;
export function initBashing(extensionPath: string): void {
	let globPattern = workspace.getConfiguration("hotheadedVSCode").get<string>("voiceLineGlob");
	if (globPattern == null || globPattern.length === 0) {
		globPattern = path.join(extensionPath, "assets/**/*.wav");
	}

	glob(
		globPattern,
		(error, matches) => {
			bashes = matches;
		}
	);
}

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
	return randomMessage();
}

export function bash(): void {
	addToPlayQueue(randomFile());
}