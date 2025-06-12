import { PORT } from "./config/envs";
import server from "./server";

// server.get("/", (_req, res) => {
//   res.send("Servidor funcionando");
// });
server.listen(PORT, () => {
  console.info(`Server up and running on http://localhost:${PORT}`);
});
