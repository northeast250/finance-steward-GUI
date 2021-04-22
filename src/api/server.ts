import { app } from "./index";

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Express listening: http://localhost:${port}`);
  console.log(`Visit OpenAPI @ http://localhost:${port}/docs`);
});
