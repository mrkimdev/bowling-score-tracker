import { useApiClient } from "@/hooks/common";
import { operations } from "@/lib/api-generated/api";
import { UseMutationOptions } from "@tanstack/react-query";
import { FetchOptions } from "openapi-fetch";
import { FrameDto, GameDto } from "./types";

export const useGameCreationMutation = (
  options: Partial<
    UseMutationOptions<
      GameDto,
      Error,
      FetchOptions<operations['GamesController_create']>
    >
  > = {},
) => {
  return useApiClient().useMutation('post', '/v1/games', options);
};

export const useGameEndMutation = (options: Partial<
  UseMutationOptions<
    GameDto,
    Error,
    FetchOptions<operations["GamesController_endGame"]>
  >
> = {}) => {
  return useApiClient().useMutation("post", "/v1/games/{gameId}/end", options);
};

export const useGameFrameCreationMutation = (options: Partial<
  UseMutationOptions<
    FrameDto,
    Error,
    FetchOptions<operations["FramesController_create"]>
  >
> = {}) => {
  return useApiClient().useMutation("post", "/v1/games/{gameId}/frames", options);
};

export const useGameFrameUpdateMutation = (options: Partial<
  UseMutationOptions<
    FrameDto,
    Error,
    FetchOptions<operations["FramesController_update"]>
  >
> = {}) => {
  return useApiClient().useMutation("put", "/v1/games/{gameId}/frames/{frameId}", options);
};
