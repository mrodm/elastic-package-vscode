import { window, Terminal } from 'vscode';

export function launchCommandInTerminal(command: string, termName: string) {
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