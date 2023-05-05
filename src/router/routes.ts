import { getDetailsFromStatisticController } from "@controllers/statistics/statisticByMatchId/getStatisticByMatchId";
import { getStatisticsController } from "@controllers/statistics/generalStatistics/getStatistics";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/statistics", getStatisticsController);
router.get("/statistics/:id", getDetailsFromStatisticController);

export default router;
