import * as vscode from "vscode";
import * as cp from "child_process";

interface CommandOutput {
    stdout: string;
    stderr: string;
}
export const execShell = (cmd: string, cwd: string) =>
    new Promise<CommandOutput>((resolve, reject) => {
        cp.exec(cmd, { cwd }, (err, stdout, stderr) => {
            if (err) {
                return resolve({stdout: `${cmd}  failed`, stderr});
                //or,  reject(err);
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            return resolve({stdout, stderr});
        });
    });


const elasticPackageCmd = "elastic-package";
const verboseOption = "-v";

export function elasticPackageCommand(parameters: string, verbose: boolean): string {
    if (verbose) {
        return `${elasticPackageCmd} ${verboseOption} ${parameters}`;
    }
    return `${elasticPackageCmd} ${parameters}`;

}

export function getCurrentWorkingDirectory(): string {
	let message: string;
	if (vscode.workspace.workspaceFolders !== undefined) {
		let path = vscode.workspace.workspaceFolders[0].uri.fsPath;

		message = `elasticPackage: working directory: ${path}`;

		vscode.window.showInformationMessage(message);
		return path;
	}

	message = "elasticPackage: Working folder not found, open a folder an try again";

	vscode.window.showErrorMessage(message);

	return message;
}