import { DiagnosticChangeEvent, Uri, Diagnostic, window, languages, DiagnosticSeverity, Range, TextDocument, Position, TextEditor } from "vscode";
import { bash } from "./Basher";

export function OnDidChangeDiagnostics(e: DiagnosticChangeEvent): void {
	const activeTextEditor = window.activeTextEditor;
	if (
		activeTextEditor && e.uris.find(uri => uri.path === activeTextEditor.document.uri.path)
	) {
		const errors = errorsForFile(activeTextEditor, activeTextEditor.document.uri);
		if (errors.length > 0) {
			if (errors.filter((d) => !sameAsPrevious(d)).length > 0) {
				console.log(errors);
				bash();
				setPreviousError(errors[0]);
			}
		} else {
			console.log("No errors");
			clearPreviousError();
		}
	}
}
function errorsForFile(editor: TextEditor, fileUri: Uri): Array<Diagnostic> {
	return languages
		.getDiagnostics(fileUri)
		.filter(d => d.severity === DiagnosticSeverity.Error && isErrorCurrent(editor, d));
}

function textBetween(document: TextDocument, cursor: Position, error: Range): string {
	if (error.contains(cursor)) {
		return "";
	}
	else {
		let start: Position;
		let end: Position;
		if (cursor.isBeforeOrEqual(error.start)) {
			start = cursor;
			end = error.start;
		}
		else {
			start = error.end;
			end = cursor;
		}

		return document.getText(new Range(start, end));
	}
}
function isErrorCurrent(editor: TextEditor, error: Diagnostic): boolean {
	const between = textBetween(editor.document, editor.selection.active, error.range);
	return /^\s*$/.test(between);
}

let previousError: Diagnostic | null = null;
function setPreviousError(error: Diagnostic): void {
	previousError = error;
}
function clearPreviousError(): void {
	previousError = null;
}
function sameAsPrevious(error: Diagnostic): boolean {
	return previousError?.code === error.code && previousError?.range.end.line === error.range.end.line;
}