import * as vscode from 'vscode';
import { elasticPackageCommand } from "../command";
import { launchCommandInDefaultTerminal } from "../terminal";


export function defaultHandler(message: string, parameters: string, verbose: boolean): () => void {
    return () => {
        vscode.window.showInformationMessage(`${message}...`);
        let command = elasticPackageCommand(parameters, verbose);

        launchCommandInDefaultTerminal(command);
    };
}