import { DiagnosticChangeEvent, Uri, Diagnostic, window, languages, DiagnosticSeverity } from "vscode";

export function OnDidChangeDiagnostics(e: DiagnosticChangeEvent): void {
	const errors = errorsForActiveFile(e.uris);

	if (errors.length > 0) {
		console.log(errors);
	}
	else {
		console.log("No errors");
	}
}

function errorsForActiveFile(errorUris: ReadonlyArray<Uri>): Array<Diagnostic> {
	if (window.activeTextEditor !== undefined && errorUris.includes(window.activeTextEditor.document.uri)) {
		return errorsForFile(window.activeTextEditor.document.uri);
	}
	else {
		return new Array<Diagnostic>();
	}
}
function errorsForFile(fileUri: Uri): Array<Diagnostic> {
	return languages.getDiagnostics(fileUri).filter(d => d.severity === DiagnosticSeverity.Error);
}