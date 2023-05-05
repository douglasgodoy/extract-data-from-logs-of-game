import * as fs from "fs";
import { getStatisticsController } from "./getStatistics";
import { ResultType } from "@commons/types";
import { Request, Response } from "express";
jest.mock("fs");
describe("getStatistics", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
      send: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the expected result when the file is valid", async () => {
    jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(
        `1:47 InitGame: \n22:06 Kill: 3 2 7: Player1 killed Player2 by MOD_SHOTGUN\n22:07 Kill: 4 2 7: Player1 killed Player2 by MOD_SHOTGUN\n22:08 Kill: 5 6 7: Player3 killed Player4 by MOD_SHOTGUN\n22:09 Kill: 5 6 7: Player3 killed Player4 by MOD_SHOTGUN\n22:10 Kill: 1022 1022 1022: <world> killed Player5 by MOD_TRIGGER_HURT\n22:11 Kill: 7 3 7: Player2 killed Player1 by MOD_SHOTGUN\n22:12 Kill: 6 5 7: Player4 killed Player3 by MOD_SHOTGUN\n22:13 Kill: 3 2 7: Player1 killed Player2 by MOD_SHOTGUN\n1:47 ShutdownGame:`
      );
    await getStatisticsController(req, res);

    const expectedResults: ResultType = {
      deaths: 8,
      world: {
        kills: 1,
      },
      killsBetweenPlayers: 7,
      causes: {
        MOD_TRIGGER_HURT: 1,
        MOD_ROCKET_SPLASH: 0,
        MOD_FALLING: 0,
        MOD_ROCKET: 0,
        MOD_RAILGUN: 0,
        MOD_MACHINEGUN: 0,
        MOD_SHOTGUN: 7,
        MOD_TELEFRAG: 0,
        MOD_BFG_SPLASH: 0,
        MOD_BFG: 0,
        MOD_CRUSH: 0,
      },
      matchesPlayed: 1,
    };

    expect(res.status(200).send).toHaveBeenCalledWith({
      error: false,
      results: expectedResults,
    });
  });

  it("should return an error message when the file does not exist", async () => {
    // mock fs.readFileSync to throw an error
    jest.spyOn(fs, "readFileSync").mockImplementation(() => {
      throw new Error("File not found");
    });

    await getStatisticsController(req, res);

    expect(res.status(400).send).toHaveBeenCalledWith({
      error: true,
      message: "File not found",
    });
  });
});
