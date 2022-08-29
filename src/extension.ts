// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {execShell} from './command'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const cwd: string = getCurrentWorkingDirectory();
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "epcode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('epcode.lint', async () => {
		vscode.window.showInformationMessage('Hello World from epcode! Running Lint...');
		const output: string = await execShell(`elastic-package lint`, cwd);
		
	}));

	context.subscriptions.push(vscode.commands.registerCommand('epcode.check', async () => {
		vscode.window.showInformationMessage('Hello World from epcode! Running Check...');
		const output: string = await execShell(`elastic-package check`, cwd);
		vscode.window.showInformationMessage(output);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('epcode.build', async () => {
		vscode.window.showInformationMessage('Hello World from epcode! Running Build...');
		const output: string = await execShell(`elastic-package build`, cwd);
		vscode.window.showInformationMessage(output)
		
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getCurrentWorkingDirectory(): string {
	let message: string;
	let cwd: string
	if(vscode.workspace.workspaceFolders !== undefined) {
		let path = vscode.workspace.workspaceFolders[0].uri.fsPath ; 
	
		message = `epcode: working directory: ${path}` ;
	
		vscode.window.showInformationMessage(message);
		return path;
	} 
	
	message = "epcode: Working folder not found, open a folder an try again" ;
	
	vscode.window.showErrorMessage(message);
	
	return message
}
