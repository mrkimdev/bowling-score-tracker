'use client'

import { Button } from "@repo/ui/components/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { MAX_NUMBER_OF_PLAYERS } from "@repo/util/bowling-score"
import { useState } from "react";
import { MinusIcon,PlusIcon } from "lucide-react";
import { useGameCreationMutation } from "../_hooks/mutation";

const formSchema = z.object({
  players: z.array(z.string()).min(1, {
    message: "At least one player is required.",
  }).max(MAX_NUMBER_OF_PLAYERS, {
    message: `Maximum ${MAX_NUMBER_OF_PLAYERS} players are allowed.`,
  }),
})

export default function NewGamePage() {
  const [players, setPlayers] = useState<number[]>([1])
  const { isPending, mutate } = useGameCreationMutation()
  const form = useForm()

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }
  

  return <div className="flex flex-col gap-4 mx-auto">
    <h1 className="text-2xl font-bold text-center">New Game</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => { })} className="flex flex-col items-center gap-2 w-full md:max-w-[600px] mx-auto">
        {players.map((item, index) => {
          return (
            <div key={item} className="flex w-full items-end justify-between gap-1">
               <FormField
                control={form.control}
                name="players"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm font-medium">Player {index + 1} </FormLabel>
                    <FormLabel className="text-sm font-medium" />
                    <FormControl>
                      <Input placeholder="Enter Player Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={players.length === 1} type="button" variant="outline" onClick={() => {
                setPlayers(prev => prev.filter(player => player !== item))
              }}>
                <MinusIcon className="w-4 h-4" />
              </Button>
            </div>
           
          )
        })}
        <div className="flex items-center gap-2 w-full">
          <Button
            type="button"
            disabled={players.length >= MAX_NUMBER_OF_PLAYERS}
            onClick={() => {
              setPlayers(prev => [...prev, prev.length + 1])
            }}
            variant="outline"
            className="flex w-full flex-1 items-center gap-2 justify-center text-center"
          >
            Add Player
          </Button>
          <Button className="flex-1 w-full" type="submit" disabled={isPending || players.length === 0}>Save</Button>
        </div>
      </form>
    </Form> 
   </div>;
}
