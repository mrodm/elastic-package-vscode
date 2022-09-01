import * as vscode from 'vscode';
import { elasticPackageCommand, execShell, getCurrentWorkingDirectory } from "./command";

interface Profile {
    name: string;
    dateCreated: string;
    user: string;
    version: string;
    path: string;
}

export async function getCurrentProfiles(): Promise<ReadonlyArray<string>> {
    const command = elasticPackageCommand("profiles list --format json", false);
    console.debug(`Executing ${command}`);
    const output = await execShell(command, ".");
    console.debug(`Output: ${output}`);
    const profiles: ReadonlyArray<Profile> = JSON.parse(output.stdout);
    console.debug(`Profiles: ${JSON.stringify(profiles)}`);

    return profiles.map(x => x.name);
}

export function getDefaultProfile() {
    const configuration = vscode.workspace.getConfiguration('elastic-package-code');
    return configuration['defaultProfile'];
}