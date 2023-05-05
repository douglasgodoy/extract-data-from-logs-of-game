import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import router from "./router/routes";

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
