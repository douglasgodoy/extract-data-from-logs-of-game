import { Request, Response } from "express";
import { Mods, ResultType } from "@commons/types";
import * as fs from "fs";
import * as path from "path";

export const getStatisticsController = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const data = getDataFromTxt();
    const parsedData = data.split(`\n`).filter((raw) => /Kill/.test(raw));

    const result: ResultType = getDefaultResult();

    getResumeFromParsedData(parsedData, result);

    result.killsBetweenPlayers = result.deaths - result.world.kills;

    res.send({ error: false, results: result });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    res.send({ error: true, message });
  }
};

function getResumeFromParsedData(data: string[], result: ResultType) {
  for (const line of data) {
    const match = line.match(
      /^(\d+:\d+) Kill: (\d+) (\d+) (\d+): ([<\w\s>]+) killed ([\w\s]+) by (\w+)/
    );

    if (match) {
      const [, , , , , killerName, , mod] = match;

      if (killerName === "<world>") result.world.kills++;

      const cause = mod as keyof Mods;

      result.deaths += 1;
      result.causes[cause] += 1;
    }
  }
}

function getDataFromTxt(): string {
  const filePath = path.resolve(__dirname, "../../../data.txt");

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  return data;
}

function getDefaultResult(): ResultType {
  return {
    deaths: 0,
    world: {
      kills: 0,
    },
    killsBetweenPlayers: 0,
    causes: {
      MOD_TRIGGER_HURT: 0,
      MOD_ROCKET_SPLASH: 0,
      MOD_FALLING: 0,
      MOD_ROCKET: 0,
      MOD_RAILGUN: 0,
      MOD_MACHINEGUN: 0,
      MOD_SHOTGUN: 0,
      MOD_TELEFRAG: 0,
      MOD_BFG_SPLASH: 0,
      MOD_BFG: 0,
      MOD_CRUSH: 0,
    },
  };
}
