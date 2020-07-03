import { ExtensionContext, languages } from "vscode";
import { OnDidChangeDiagnostics } from "./ErrorTracker";

export function activate(context: ExtensionContext) {
	languages.onDidChangeDiagnostics(OnDidChangeDiagnostics, null, context.subscriptions);
}

export function deactivate() {}