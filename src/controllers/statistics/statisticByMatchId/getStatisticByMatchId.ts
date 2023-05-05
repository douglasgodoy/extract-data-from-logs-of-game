import { Request, Response } from "express";
import { ResultType } from "@commons/types";
import {
  extractMatchesPlayed,
  getDataFromTxt,
  getDefaultResult,
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

    const result: ResultType = getDefaultResult();

    const { init, end } = matchesMap.get(Number(id));
    const logsOfMatch: string[] = [];

    getLogsOfMatch(init, end, splitedDataByRaw, logsOfMatch);
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

function getLogsOfMatch(
  init: any,
  end: any,
  splitedDataByRaw: string[],
  logsOfMatch: any[]
) {
  for (let index = init; index < end + 1; index++) {
    const raw = splitedDataByRaw[index];
    logsOfMatch.push(raw);
  }
}
