import { window, Terminal } from 'vscode';

const defaultTerminalName = 'Elastic-package plugin';

export function launchCommandInDefaultTerminal(command: string) {
    return launchCommandInTerminal(command, defaultTerminalName);
}

export function launchCommandInTerminal(command: string, termName: string) {
    if (termName === undefined) {
        termName = defaultTerminalName;
    }
    let term = getTerminal(termName);
    term.show(true);
    window.onDidCloseTerminal(event => {
        if (term && event.name === termName) {
            console.log(`Terminal closed ${termName}`);
            term.dispose();
        }
    });
    term.sendText(command);
}

function getTerminal(termName: string): Terminal {
    let terminal = window.terminals.find(x => x.name === termName);
    if (terminal === undefined) {
        return window.createTerminal(termName);
    }
    return terminal;

}