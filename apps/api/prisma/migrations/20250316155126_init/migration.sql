-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" DATETIME,
    "players" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameFrame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "frame_number" INTEGER NOT NULL,
    "roll_1" INTEGER NOT NULL,
    "roll_2" INTEGER,
    "roll_3" INTEGER,
    "game_id" TEXT NOT NULL,
    "player_order" INTEGER NOT NULL,
    CONSTRAINT "GameFrame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameScore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total_score" INTEGER NOT NULL,
    "game_id" TEXT NOT NULL,
    "player_order" INTEGER NOT NULL,
    CONSTRAINT "GameScore_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
