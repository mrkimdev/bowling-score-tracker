'use client'

import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod"
import { MAX_NUMBER_OF_PLAYERS } from "@repo/util/bowling-score"
import { MinusIcon } from "lucide-react";
import { useGameCreationMutation } from "../_hooks/mutation";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  players:
    z.array(
      z.object({
        value: z.string().min(1, "Please enter a player name")
      })).min(1, {
        message: "At least one player is required.",
      }).max(MAX_NUMBER_OF_PLAYERS, {
        message: `Maximum ${MAX_NUMBER_OF_PLAYERS} players are allowed.`,
      }),
})

export default function NewGamePage() {
  const router = useRouter()
  const { isPending, mutate } = useGameCreationMutation({
    onSuccess: (data) => {
      toast.success("Game created successfully")
      router.push(`/game/play`)
    },
    onError: (error) => {
      toast.error("Unable to create game", { description: error.message })
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      players: [{ value: "" }],
    },
  })
  const { control,
    register,
    handleSubmit,
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const players = data.players.map(player => player.value)
    mutate({ body: { players } })
  }
  

  return <div className="flex flex-col gap-4 mx-auto">
    <h1 className="text-2xl font-bold text-center">New Game</h1>
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-2 w-full md:max-w-[600px] mx-auto">
        {fields.map((item, index) => {
          return (
            <FormField
              key={index}
              {...register(`players.${index}.value`)}
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel className="text-sm font-medium">Player {index + 1} </FormLabel>
                  <FormLabel className="text-sm font-medium" />
                  <div className="flex w-full items-end justify-between gap-1">
                    <FormControl>
                      <Input placeholder="Enter Player Name" {...field} />
                    </FormControl>
                    <Button disabled={fields.length === 1} type="button" variant="outline" onClick={() => {
                      remove()
                    }}>
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            /> 
          )
        })}
        <div className="flex items-center gap-2 w-full">
          <Button
            type="button"
            disabled={fields.length >= MAX_NUMBER_OF_PLAYERS}
            onClick={() => {
              append({ value: "" })
            }}
            variant="outline"
            className="flex w-full flex-1 items-center gap-2 justify-center text-center"
          >
            Add Player
          </Button>
          <Button className="flex-1 w-full" type="submit" disabled={isPending || fields.length === 0}>Save</Button>
        </div>
      </form>
    </Form> 
   </div>;
}
