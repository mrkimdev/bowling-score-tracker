import { Button } from "@repo/ui/components/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Bowling Score Tracker</h1>
        <div className="flex flex-col gap-4 w-full md:max-w-[400px] mt-10">
          <Button asChild className="w-full">
            <Link href="/game/new">New Game</Link>
          </Button>
          <Button asChild className="w-full" variant={"secondary"}>
            <Link href="/game/history">View Scores</Link> 
          </Button>
        </div>
      </div>
    </div>
  )
}