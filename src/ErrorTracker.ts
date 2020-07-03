import { DiagnosticChangeEvent, Uri, Diagnostic, window, languages, DiagnosticSeverity, TextEditor } from "vscode";

export function OnDidChangeDiagnostics(e: DiagnosticChangeEvent): void {
	if (window.activeTextEditor !== undefined) {
		const errors = errorsForActiveFile(window.activeTextEditor, e.uris);

		if (errors.length > 0) {
			console.log(errors);
		}
		else {
			console.log("No errors");
		}
	}
}

function errorsForActiveFile(editor: TextEditor, errorUris: ReadonlyArray<Uri>): Array<Diagnostic> {
	if (errorUris.includes(editor.document.uri)) {
		return errorsForFile(editor.document.uri);
	}
	else {
		return new Array<Diagnostic>();
	}
}
function errorsForFile(fileUri: Uri): Array<Diagnostic> {
	return languages.getDiagnostics(fileUri).filter(d => d.severity === DiagnosticSeverity.Error);
}