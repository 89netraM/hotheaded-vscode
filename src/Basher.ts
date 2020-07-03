import { window } from "vscode";

const bashes: ReadonlyArray<string> = new Array<string>(
	"What is that?",
	"What are you writing?",
	"WTF?",
	"That's not right!",
	"That's not even real code!",
	"Are you dumb?",
	"That's never gonna work!"
);

function randomMessage(): string {
	return bashes[Math.floor(Math.random() * bashes.length)];
}

export function bash(): void {
	window.showInformationMessage(randomMessage());
}