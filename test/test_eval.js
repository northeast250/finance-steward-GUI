let code = `var funcFilter = (doc) => {console.log("hello");return false;}`;
eval(code);
funcFilter('xx')