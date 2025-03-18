/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Check the health of the application */
        get: operations["AppController_health"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/metrics": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Collect metrics from the application */
        get: operations["AppController_getMetrics"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/games": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all games */
        get: operations["GamesController_findAll"];
        put?: never;
        /** Create a new game */
        post: operations["GamesController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/games/{gameId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a game by ID */
        get: operations["GamesController_findOne"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/games/{gameId}/end": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** End a game by ID */
        post: operations["GamesController_endGame"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/games/{gameId}/frames": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a new frame */
        post: operations["FramesController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/games/{gameId}/frames/{frameId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update a frame */
        put: operations["FramesController_update"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        FrameDto: {
            /** @description The number of the frame */
            frame_number: number;
            /** @description The first roll of the frame */
            roll_1: number;
            /** @description The second roll of the frame */
            roll_2?: number;
            /** @description The third roll of the frame */
            roll_3?: number;
            /** @description The ID of the game */
            game_id: string;
            /** @description The order of the player */
            player_order: number;
            /** @description The ID of the frame */
            id: string;
        };
        GameDto: {
            /** @description The ID of the game */
            id: string;
            /** @description The creation time of the game */
            created_at: string;
            /** @description The end time of the game */
            ended_at?: string;
            /** @description The players of the game */
            players: string[];
            /** @description The frames of the game */
            frames: components["schemas"]["FrameDto"][];
            /** @description The scores of the game */
            scores: number[];
        };
        CreateGameDto: {
            /** @description The players of the game */
            players: string[];
        };
        CreateFrameDto: {
            /** @description The number of the frame */
            frame_number: number;
            /** @description The first roll of the frame */
            roll_1: number;
            /** @description The second roll of the frame */
            roll_2?: number;
            /** @description The third roll of the frame */
            roll_3?: number;
            /** @description The ID of the game */
            game_id: string;
            /** @description The order of the player */
            player_order: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AppController_health: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    AppController_getMetrics: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    GamesController_findAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description All Games have been successfully retrieved. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GameDto"][];
                };
            };
        };
    };
    GamesController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateGameDto"];
            };
        };
        responses: {
            /** @description New Game has been successfully created. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GameDto"];
                };
            };
        };
    };
    GamesController_findOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                gameId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Game has been successfully retrieved. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GameDto"];
                };
            };
        };
    };
    GamesController_endGame: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                gameId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Game has been successfully ended. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GameDto"];
                };
            };
        };
    };
    FramesController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateFrameDto"];
            };
        };
        responses: {
            /** @description New Frame has been successfully created. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FrameDto"];
                };
            };
        };
    };
    FramesController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                frameId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FrameDto"];
            };
        };
        responses: {
            /** @description Frame has been successfully updated. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FrameDto"];
                };
            };
        };
    };
}
