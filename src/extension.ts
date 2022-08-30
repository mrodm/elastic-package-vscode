// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { stackDownHandler, stackStatusHandler, stackUpHandler } from './handlers/stack';
import { serviceUpHandler } from './handlers/service';
import { defaultHandler } from './handlers/default';
import { profileCreateHandler, profileDeleteHandler, profileListHandler } from './handlers/profile';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.debug('Extension "epcode" activated');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('epcode.lint', defaultHandler("Running lint...", "lint", true)));

	context.subscriptions.push(vscode.commands.registerCommand('epcode.check', defaultHandler("Running check...", "check", true)));

	context.subscriptions.push(vscode.commands.registerCommand('epcode.build', defaultHandler("Running build...", "build", true)));

	// Stack Management 
	context.subscriptions.push(vscode.commands.registerCommand('epcode.stack.status', stackStatusHandler));
	context.subscriptions.push(vscode.commands.registerCommand('epcode.stack.up', stackUpHandler));
	context.subscriptions.push(vscode.commands.registerCommand('epcode.stack.down', stackDownHandler));

	// Service Management
	context.subscriptions.push(vscode.commands.registerCommand('epcode.service.up', serviceUpHandler));

	// Profiles Management
	context.subscriptions.push(vscode.commands.registerCommand('epcode.profiles.list', profileListHandler));
	context.subscriptions.push(vscode.commands.registerCommand('epcode.profiles.create', profileCreateHandler));
	context.subscriptions.push(vscode.commands.registerCommand('epcode.profiles.delete', profileDeleteHandler));
}

// this method is called when your extension is deactivated
export function deactivate() { }
