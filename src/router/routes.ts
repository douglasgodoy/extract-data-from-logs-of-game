import { getDetailsFromStatisticController } from "@controllers/statistics/statisticByMatchId/getStatisticByMatchId";
import { getStatisticsController } from "@controllers/statistics/generalStatistics/getStatistics";
import { Request, Response, Router } from "express";
import { getPlayerStatisticsController } from "@controllers/player/statistics/getPlayerStatistics";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/statistics", getStatisticsController);
router.get("/statistics/:id", getDetailsFromStatisticController);
router.get("/players/statistics/:matchId", getPlayerStatisticsController);

export default router;
