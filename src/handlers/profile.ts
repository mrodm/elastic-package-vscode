import * as vscode from 'vscode';
import { elasticPackageCommand } from '../command';
import { getCurrentProfiles, getDefaultProfile } from "../profiles";
import { launchCommandInDefaultTerminal } from '../terminal';

export async function profileDeleteHandler() {
    const profiles = await getCurrentProfiles();
    const profile = await vscode.window.showQuickPick(
        profiles,
        {
            canPickMany: false,
            placeHolder: `Profile to be deleted`,
            title: "Select Profile",
        }
    );
    if (profile === undefined) {
        // Pressed ESC
        return;
    }
    let command = `profiles delete ${profile}`;
    console.log(`Selected profile: ${profile}`);

    command = elasticPackageCommand(`${command}`, true);
    vscode.window.showInformationMessage('Elastic-Package: Running profile delete...');
    launchCommandInDefaultTerminal(command);
}

export async function profileCreateHandler() {
    const profiles = await getCurrentProfiles();
    const newProfileName = await vscode.window.showInputBox({
        placeHolder: 'Name for the new profile',
        title: "Choose Profile Name (1/2)",
        validateInput: text => {
            if (text === '') {
                return 'Empty name not valid';
            }

            return undefined;
        },
    });
    if (newProfileName === undefined ) {
        // Pressed ESC
        return ;
    }
    const profileFrom = await vscode.window.showQuickPick(
        profiles,
        {
            canPickMany: false,
            placeHolder: `(Optional) Profile to be used as basis`,
            title: "Select Profile to copy from (2/2)",
        }
    );
    if (profileFrom === undefined) {
        // Pressed ESC
        return;
    }
    let command = `profiles create ${newProfileName}`;
    if (profileFrom !== "") {
        command = `${command} --from ${profileFrom}`;
    }
    console.log(`Selected profile to copy from: ${profileFrom}`);
    console.log(`Name for the new profile: ${newProfileName}`);

    command = elasticPackageCommand(`${command}`, true);
    vscode.window.showInformationMessage('Elastic-Package: Running profile create...');
    launchCommandInDefaultTerminal(command);
}

export async function profileListHandler() {
    let command = `profiles list`;

    command = elasticPackageCommand(`${command}`, false);
    vscode.window.showInformationMessage('Elastic-Package: Running profile list...');
    launchCommandInDefaultTerminal(command);
}
