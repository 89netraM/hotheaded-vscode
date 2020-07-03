import { DiagnosticChangeEvent } from "vscode";

export function OnDidChangeDiagnostics(e: DiagnosticChangeEvent): void {
	console.log("Error(s) detected!");
}