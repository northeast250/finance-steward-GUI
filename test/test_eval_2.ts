import * as ts from "typescript";

let code: string = `({
    Run: (data: string): string => {
        console.log(data); return Promise.resolve("SUCCESS"); }
    })`;

let result = ts.transpile(code);
let runnalbe: any = eval(result);
runnalbe.Run("RUN!").then((result: string) => {
  console.log(result);
});
