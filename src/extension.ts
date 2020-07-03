import { ExtensionContext, languages } from "vscode";
import { OnDidChangeDiagnostics } from "./ErrorTracker";
import { initBashing } from "./Basher";

export function activate(context: ExtensionContext) {
	initBashing(context.asAbsolutePath(""));

	languages.onDidChangeDiagnostics(OnDidChangeDiagnostics, null, context.subscriptions);
}

export function deactivate() {}