export type Mods = {
  MOD_TRIGGER_HURT: number;
  MOD_ROCKET_SPLASH: number;
  MOD_FALLING: number;
  MOD_ROCKET: number;
  MOD_RAILGUN: number;
  MOD_MACHINEGUN: number;
  MOD_SHOTGUN: number;
  MOD_TELEFRAG: number;
  MOD_BFG_SPLASH: number;
  MOD_BFG: number;
  MOD_CRUSH: number;
};

export type ResultType = {
  deaths: number;
  world: {
    kills: number;
  };
  killsBetweenPlayers: number;
  causes: Mods;
  matchesPlayed: number;
};
