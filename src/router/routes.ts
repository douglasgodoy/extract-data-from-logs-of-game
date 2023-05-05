import { getStatisticsController } from "@controllers/statistics/getStatistics";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/statistics", getStatisticsController);

export default router;
