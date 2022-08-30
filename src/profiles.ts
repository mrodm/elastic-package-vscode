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
    console.log(`Executing ${command}`);
    const output = await execShell(command, ".");
    console.log(`Output: ${output}`);
    const profiles: ReadonlyArray<Profile> = JSON.parse(output.stdout);
    console.log(`Profiles: ${JSON.stringify(profiles)}`);
    const profileNames = profiles.map(x => x.name);


    return profileNames;
}