import { Request, Response } from "express";
import { ResultType } from "@commons/types";
import {
  extractMatchesPlayed,
  getDataFromTxt,
  getDefaultResult,
  getResumeFromKills,
} from "@commons/functions/index";

export const getStatisticsController = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const data = getDataFromTxt();
    const splitedDataByRaw = data.split(`\n`);
    const filterDataByKill = splitedDataByRaw.filter((raw) => /Kill/.test(raw));
    const matchesMap = extractMatchesPlayed(splitedDataByRaw);

    const result: ResultType = getDefaultResult();

    getResumeFromKills(filterDataByKill, result);

    result.matchesPlayed = matchesMap.size;
    result.killsBetweenPlayers = result.deaths - result.world.kills;

    res.status(200).send({ error: false, results: result });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    res.status(400).send({ error: true, message });
  }
};
