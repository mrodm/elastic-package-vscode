// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import semverRegex = require('semver-regex');

import { execShell } from './command';
import { elasticPackageCommand } from './command';
import { launchCommandInTerminal } from './terminal';
import { getCurrentProfiles } from './profiles';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// const cwd: string = getCurrentWorkingDirectory();
	const termName: string = "elastic package plugin";

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "epcode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('epcode.lint', async () => {
		vscode.window.showInformationMessage('Running Lint...');
		let command = elasticPackageCommand('lint', true);

		launchCommandInTerminal(command, termName);
		// const output: string = await execShell(`${elasticPackageCmd} lint`, cwd);
		//vscode.window.showInformationMessage(output);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('epcode.check', async () => {
		vscode.window.showInformationMessage('Running Check...');
		let command = elasticPackageCommand('check', true);

		launchCommandInTerminal(command, termName);
		// vscode.window.showInformationMessage('Hello World from epcode! Running Check...');
		// const output: string = await execShell(`${elasticPackageCmd} check`, cwd);
		// vscode.window.showInformationMessage(output);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('epcode.build', async () => {
		let command = elasticPackageCommand('build', true);

		launchCommandInTerminal(command, termName);
		// const output: string = await execShell(`${elasticPackageCmd} build`, cwd);
		// vscode.window.showInformationMessage(output);

	}));

	// Stack Management 
	context.subscriptions.push(vscode.commands.registerCommand('epcode.stack.status', async () => {
		let command = elasticPackageCommand('stack status', false);

		vscode.window.showInformationMessage('Running Stack status...');
		launchCommandInTerminal(command, termName);
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// const output: string = await execShell(`${elasticPackageCmd} stack status`, cwd);
		// vscode.window.showInformationMessage(output);

	}));
	context.subscriptions.push(vscode.commands.registerCommand('epcode.stack.up', async () => {
		const configuration = vscode.workspace.getConfiguration('epcode');
		const defaultProfile = configuration['defaultProfile'];

		const elasticStackVersion = await vscode.window.showInputBox({
			value: 'default',
			placeHolder: 'Type Elastic version stack to run (e.g. 7.17.6, 8.1.0, 8.4.0) or "default"',
			validateInput: text => {
				if (text === "default") {
					return undefined;
				}

				if (semverRegex().test(text)) {
					return undefined;
				}

				return "Check version";
			},
		});
		const serviceList: ReadonlyArray<string> = ['fleet-server', 'package-registry', 'elastic-agent', 'elasticsearch', 'kibana'];
		const services = await vscode.window.showQuickPick(
			serviceList,
			{
				placeHolder: 'Select the services to start/restart in the stack.',
				canPickMany: true,
			}
		);

		const profiles = await getCurrentProfiles();
		console.log(`Available profiles: ${profiles}`);
		const profile = await vscode.window.showQuickPick(
			profiles,
			{
				canPickMany: false,
				placeHolder: `Profile to use in elastic-package commands (default ${defaultProfile})`,
			}
		);
		if ([elasticStackVersion, services, profile].some(x => x === undefined)) {
			// Pressed ESC
			return;
		}
		let command = `stack up -d --profile ${profile}`;
		if (elasticStackVersion !== "default") {
			command = `${command} --version ${elasticStackVersion}`;
		}
		if (services !== undefined && services.length > 0) {
			command = `${command} --services ${services.join()}`;
		}
		console.log(`Value of services: ${JSON.stringify(services)}`);
		console.log(`Value of elastic stack version: ${elasticStackVersion}`);
		console.log(`Value of profile: ${profile}`);
		command = elasticPackageCommand(`${command}`, true);
		vscode.window.showInformationMessage('Elastic-Package: Running Stack up...');
		launchCommandInTerminal(command, termName);
		// const output: string = await execShell(`${elasticPackageCmd} stack up -d --version ${elasticVersion}`, cwd);
		// vscode.window.showInformationMessage(output);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('epcode.stack.down', async () => {
		let command = elasticPackageCommand('stack down', true);

		vscode.window.showInformationMessage('Running Stack down...');
		launchCommandInTerminal(command, termName);
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// const output: string = await execShell(`${elasticPackageCmd} stack status`, cwd);
		// vscode.window.showInformationMessage(output);
	}));

	// Service Management
	context.subscriptions.push(vscode.commands.registerCommand('epcode.service.up', async () => {
		let command = elasticPackageCommand('service up', true);

		vscode.window.showInformationMessage('Running service up...');
		launchCommandInTerminal(command, termName);
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// const output: string = await execShell(`${elasticPackageCmd} stack status`, cwd);
		// vscode.window.showInformationMessage(output);

	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
