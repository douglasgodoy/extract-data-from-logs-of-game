import { Request, Response } from "express";
import {
  extractMatchesPlayed,
  getDataFromTxt,
  getLogsOfMatch,
} from "@commons/functions/index";
import { getPlayerRanking } from "./functions";

export const getPlayerStatisticsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { matchId } = req.params;
    const data = getDataFromTxt();
    const splitedDataByRaw = data.split(`\n`);
    const matchesMap = extractMatchesPlayed(splitedDataByRaw);

    const match = matchesMap.get(Number(matchId));

    if (!match) {
      res.status(404).send({ error: false, message: "Match not found" });
      return;
    }

    const logsOfMatch: string[] = getLogsOfMatch(match, splitedDataByRaw);

    const result = getPlayerRanking(logsOfMatch, splitedDataByRaw);

    res.status(200).send({ error: false, ranking: result });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    res.status(400).send({ error: true, message });
  }
};
