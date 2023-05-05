// @ts-nocheck
import { Request, Response } from "express";
import { ResultType } from "@commons/types";
import {
  extractMatchesPlayed,
  getDataFromTxt,
  getDefaultResult,
  getLogsOfMatch,
  getResumeFromKills,
} from "@commons/functions/index";

jest.mock("@commons/functions/index", () => ({
  extractMatchesPlayed: jest.fn(),
  getDataFromTxt: jest.fn(),
  getDefaultResult: jest.fn(),
  getLogsOfMatch: jest.fn(),
  getResumeFromKills: jest.fn(),
}));

import { getDetailsFromStatisticController } from "./getStatisticByMatchId";

describe("getDetailsFromStatisticController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: {
        id: "1",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return 400 status when an error is thrown", async () => {
    const errorMessage = "An error occurred";
    getDataFromTxt.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await getDetailsFromStatisticController(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: true,
      message: errorMessage,
    });
  });

  it("should return 200 status with the result when the function executes successfully", async () => {
    const matchesMap = new Map();
    const match = "match data";
    const logsOfMatch = ["log 1", "log 2"];
    const result: ResultType = {
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

    getDataFromTxt.mockReturnValue("text data");
    extractMatchesPlayed.mockReturnValue(matchesMap);

    matchesMap.get = jest.fn().mockReturnValue(match);
    getLogsOfMatch.mockReturnValue(logsOfMatch);
    getDefaultResult.mockReturnValue(result);

    await getDetailsFromStatisticController(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ error: false, results: result });
  });
});
