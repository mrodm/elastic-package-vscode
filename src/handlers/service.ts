import * as vscode from 'vscode';
import { elasticPackageCommand } from "../command";
import { launchCommandInDefaultTerminal } from "../terminal";

const termName: string = 'Elastic-package plugin';

export async function serviceUpHandler() {
    let command = elasticPackageCommand('service up', true);

    vscode.window.showInformationMessage('Running service up...');
    launchCommandInDefaultTerminal(command);
}