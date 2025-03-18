'use client';

import { Link, Loader2Icon } from 'lucide-react';
import { useGameHistoryQuery } from '../_hooks/query';
import { Button } from '@repo/ui/components/button';

export default function GameHistory() {
  const { data: games, isLoading } = useGameHistoryQuery();

  return (
    <div className="flex flex-col gap-4 mx-auto">
      <h1 className="text-2xl font-bold text-center">Game History</h1>
      {isLoading ? (
        <div className="flex justify-center items-center size-[200px] mx-auto">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {games?.map((game) => (
            <Button key={game.id} variant="outline" asChild>
              <Link href={`/game/detail?gameId=${game.id}`}>
                Game {game.id}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
