import { Request, Response } from "express";
import { ResultType } from "@commons/types";
import {
  extractMatchesPlayed,
  getDataFromTxt,
  getDefaultResult,
  getLogsOfMatch,
  getResumeFromKills,
} from "@commons/functions/index";

export const getDetailsFromStatisticController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const data = getDataFromTxt();
    const splitedDataByRaw = data.split(`\n`);
    const matchesMap = extractMatchesPlayed(splitedDataByRaw);
    const match = matchesMap.get(Number(id));

    if (!match) {
      res.status(404).send({ error: false, message: "Match not found" });
      return;
    }

    const result: ResultType = getDefaultResult();

    const logsOfMatch: string[] = getLogsOfMatch(match, splitedDataByRaw);

    getResumeFromKills(logsOfMatch, result);

    result.matchesPlayed = 1;
    result.killsBetweenPlayers = result.deaths - result.world.kills;

    res.status(200).send({ error: false, results: result });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    res.status(400).send({ error: true, message });
  }
};
