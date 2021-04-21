import * as ts from "typescript";

const f = new Function("doc", `console.log(doc);return false;`);

// let f = eval(ts.transpile(input));

try {
  //@ts-ignore
  f("xx");
} catch (e) {
  console.log("error: ", e.message);
}
