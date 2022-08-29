import * as cp from "child_process";

export const execShell = (cmd: string, cwd: string) =>
  new Promise<string>((resolve, reject) => {
    cp.exec(cmd, {cwd}, (err, stdout, stderr) => {
      if (err) {
        return resolve(cmd+' error!: '+ err);
        //or,  reject(err);
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      return resolve(stderr);
    });
  });