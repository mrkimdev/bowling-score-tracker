import { GamePlay } from '@/app/game/_components/GamePlay';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';

export default function GamePlayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center size-[200px] mx-auto">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      }
    >
      <GamePlay />
    </Suspense>
  );
}
