// @ts-nocheck
import { Request, Response } from "express";
import {
  extractMatchesPlayed,
  getDataFromTxt,
  getLogsOfMatch,
} from "@commons/functions/index";
import { getPlayerRanking } from "./functions";
import { getPlayerStatisticsController } from "./getPlayerStatistics";

jest.mock("./functions", () => ({
  getPlayerRanking: jest.fn(),
}));

jest.mock("@commons/functions/index", () => ({
  extractMatchesPlayed: jest.fn(),
  getDataFromTxt: jest.fn(),
  getLogsOfMatch: jest.fn(),
}));

describe("getPlayerStatisticsController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      params: { matchId: "1" },
    };

    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
  });

  it("should return 404 if match is not found", async () => {
    (getDataFromTxt as jest.Mock).mockReturnValue("log data");
    (extractMatchesPlayed as jest.Mock).mockReturnValue(new Map());
    await getPlayerStatisticsController(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: false,
      message: "Match not found",
    });
  });

  it("should return ranking when match is found", async () => {
    const matchesMap = new Map();
    const match = "match data";

    const expectedResponse = {
      error: false,
      ranking: {
        "1": {
          name: "Assasinu Credi",
          points: 1,
        },
        "2": {
          name: "UnnamedPlayer",
          points: 1,
        },
        "3": {
          name: "Isgalamido",
          points: 0,
        },
        "4": {
          name: "Dono da Bola",
          points: -1,
        },
        "5": {
          name: "Zeh",
          points: -1,
        },
        "6": {
          name: "Assasinu Credi",
          points: -2,
        },
      },
    };

    (getDataFromTxt as jest.Mock).mockReturnValue("log data");

    matchesMap.get = jest.fn().mockReturnValue(match);
    (extractMatchesPlayed as jest.Mock).mockReturnValue(matchesMap);
    (getLogsOfMatch as jest.Mock).mockReturnValue(["log 1", "log 2"]);
    (getPlayerRanking as jest.Mock).mockReturnValue(expectedResponse.ranking);

    await getPlayerStatisticsController(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
  });

  it("should return error message when an error occurs", async () => {
    (getDataFromTxt as jest.Mock).mockImplementation(() => {
      throw new Error("Error getting data");
    });

    await getPlayerStatisticsController(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: true,
      message: "Error getting data",
    });
  });
});
