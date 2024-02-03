import app from "./app";
import { initDb } from "./db/sequelize";

const port = process.env.PORT || 3000;

(async () => {
  await initDb();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${port}`);
  });
})();

export default app;
