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
	console.debug('Extension "elasticPackage" activated');

	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.lint', defaultHandler("Running lint...", "lint", true)));

	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.check', defaultHandler("Running check...", "check", true)));

	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.build', defaultHandler("Running build...", "build", true)));

	// Stack Management 
	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.stack.status', stackStatusHandler));
	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.stack.up', stackUpHandler));
	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.stack.down', stackDownHandler));

	// Service Management
	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.service.up', serviceUpHandler));

	// Profiles Management
	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.profiles.list', profileListHandler));
	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.profiles.create', profileCreateHandler));
	context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.profiles.delete', profileDeleteHandler));

	// Create data-stream
	//context.subscriptions.push(vscode.commands.registerCommand('elasticPackage.create.datastream', createDataStreamHandler));
}

// this method is called when your extension is deactivated
export function deactivate() { }
