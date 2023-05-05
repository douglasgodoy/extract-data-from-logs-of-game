import { PlayerResultType } from "../types";

const WORLD_ID = "1022";

function getPlayerRanking(data: string[], splitedDataByRaw: string[]) {
  const result: PlayerResultType = {
    ranking: {},
  };

  const playersMap = changeNameOfPlayers(splitedDataByRaw);

  collectKillsOfEachPlayer(data, result);
  deleteWorldOfTheStatistics(result);
  const sortedRanking = sortPlayersRanking(result, playersMap);
  return sortedRanking;
}

function sortPlayersRanking(
  result: PlayerResultType,
  playersMap: Map<string, string>
) {
  return Object.entries(result.ranking)
    .sort(([, value1], [, value2]) => value2 - value1)
    .reduce((acc, [key, value], index) => {
      const name = playersMap.get(key);
      if (name) {
        // @ts-ignore
        acc[index + 1] = { name, points: value };
      }
      return acc;
    }, {});
}

function deleteWorldOfTheStatistics(result: PlayerResultType): void {
  delete result.ranking[WORLD_ID];
}

function collectKillsOfEachPlayer(
  data: string[],
  result: PlayerResultType
): void {
  for (const line of data) {
    const match = line.match(
      /^(\d+:\d+) Kill: (\d+) (\d+) (\d+): ([<\w\s>]+) killed ([\w\s]+) by (\w+)/
    );

    if (match) {
      const [, , killerId, victimId] = match;
      const killerPoints = result.ranking[killerId] || 0;
      const victimPoints = result.ranking[victimId] || 0;

      result.ranking[killerId] = killerPoints + 1;
      result.ranking[victimId] = victimPoints - 1;
    }
  }
}

function changeNameOfPlayers(splitedDataByRaw: string[]): Map<string, string> {
  const playersMap = new Map<string, string>();
  for (const line of splitedDataByRaw) {
    const match = line.match(
      /(\d+) ClientUserinfoChanged: (\d+) n\\(.+?)\\t\\/
    );
    if (match) {
      const [, , playerId, newName] = match;
      if (!playersMap.has(playerId)) playersMap.set(playerId, newName);
    }
  }
  return playersMap;
}

export { getPlayerRanking };
