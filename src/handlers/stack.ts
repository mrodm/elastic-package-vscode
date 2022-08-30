import * as vscode from 'vscode';
import semverRegex = require('semver-regex');

import { getCurrentProfiles, getDefaultProfile } from '../profiles';
import { elasticPackageCommand } from "../command";
import { launchCommandInDefaultTerminal } from "../terminal";

const termName: string = 'Elastic-package plugin';

export async function stackDownHandler() {
    let command = elasticPackageCommand('stack down', true);

    vscode.window.showInformationMessage('Running Stack down...');
    launchCommandInDefaultTerminal(command);
}

export async function stackStatusHandler() {
    let command = elasticPackageCommand('stack status', false);

    vscode.window.showInformationMessage('Running Stack status...');
    launchCommandInDefaultTerminal(command);
}

export async function stackUpHandler() {
    const defaultProfile = getDefaultProfile();

    const elasticStackVersion = await vscode.window.showInputBox({
        value: 'default',
        placeHolder: 'Type Elastic version stack to run (e.g. 7.17.6, 8.1.0, 8.4.0) or "default"',
        title: "Select Elastic Stack version (1/3)",
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
    if (elasticStackVersion === undefined ) {
        // Pressed ESC
        return ;
    }

    const serviceList: ReadonlyArray<string> = ['fleet-server', 'package-registry', 'elastic-agent', 'elasticsearch', 'kibana'];
    const services = await vscode.window.showQuickPick(
        serviceList,
        {
            placeHolder: 'Select the services to start/restart in the stack. If none selected, it defaults to all services.',
            canPickMany: true,
            title: "Select Services (2/3)",
        }
    );
    if (services === undefined) {
        // Pressed ESC
        return ;
    }


    const profiles = await getCurrentProfiles();
    const profile = await vscode.window.showQuickPick(
        profiles,
        {
            canPickMany: false,
            placeHolder: `Profile to use in elastic-package commands (default ${defaultProfile})`,
            title: "Select Profile (3/3)",
        }
    );
    if (profile === undefined) {
        // Pressed ESC
        return;
    }
    let command = `stack up -d --profile ${profile}`;
    if (elasticStackVersion !== "default") {
        command = `${command} --version ${elasticStackVersion}`;
    }
    if (services.length > 0) {
        command = `${command} --services ${services.join()}`;
    }
    console.log(`Selected services: ${JSON.stringify(services)}`);
    console.log(`Selected Elastic Stack version: ${elasticStackVersion}`);
    console.log(`Selected profile: ${profile}`);

    command = elasticPackageCommand(`${command}`, true);
    vscode.window.showInformationMessage('Elastic-Package: Running Stack up...');
    launchCommandInDefaultTerminal(command);
}