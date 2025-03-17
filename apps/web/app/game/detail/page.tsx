'use client';

import { Alert, AlertTitle } from '@repo/ui/components/alert';
import { ScoreSheet } from '../_components/ScoreSheet';
import { Loader2Icon } from 'lucide-react';
import { useGameDetailQuery } from '../_hooks/query';
import { max } from 'es-toolkit/compat';
import { useSearchParams } from 'next/navigation';

export default function GameDetail() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId') || '';
  const { data: game, isLoading } = useGameDetailQuery(gameId);
  const winnerScore = max(game?.scores ?? []);
  const winnerIndex = game?.scores.findIndex((score) => score === winnerScore);
  const winner = game?.players[winnerIndex ?? 0];

  return (
    <div className="flex flex-col gap-4 mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center size-[200px]">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          {game ? (
            <>
              <h1 className="text-2xl font-bold text-center">
                Game #{game.id}, Winner is {winner}
              </h1>
              <ScoreSheet game={game} isReadOnly />
            </>
          ) : (
            <Alert variant="destructive">
              <AlertTitle>Game not found</AlertTitle>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
