import { Mods, ResultType } from "@commons/types";
import * as fs from "fs";
import * as path from "path";

export function extractMatchesPlayed(splitedDataByRaw: string[]) {
  const matchesMap = new Map();
  splitedDataByRaw.forEach((raw, index) => {
    if (/InitGame/.test(raw)) {
      matchesMap.set(matchesMap.size + 1, { init: index, end: null });
    }

    if (/ShutdownGame/.test(raw) && !matchesMap.get(matchesMap.size).end) {
      matchesMap.set(matchesMap.size, {
        ...matchesMap.get(matchesMap.size),
        end: index,
      });
    }
  });
  return matchesMap;
}

export function getDataFromTxt(): string {
  const filePath = path.resolve(__dirname, "../../../data.txt");

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  return data;
}

export function getDefaultResult(): ResultType {
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
    matchesPlayed: 0,
  };
}

export function getResumeFromKills(data: string[], result: ResultType) {
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
