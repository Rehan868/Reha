"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Room } from "./types"

interface RoomFilterProps {
  rooms: Room[]
  selectedRooms: Room[]
  onChange: (rooms: Room[]) => void
}

export function RoomFilter({ rooms, selectedRooms, onChange }: RoomFilterProps) {
  const [open, setOpen] = useState(false)

  const toggleRoom = (room: Room) => {
    if (selectedRooms.some((r) => r.id === room.id)) {
      onChange(selectedRooms.filter((r) => r.id !== room.id))
    } else {
      onChange([...selectedRooms, room])
    }
  }

  const selectAll = () => {
    onChange(rooms)
  }

  const clearAll = () => {
    onChange([])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {selectedRooms.length === rooms.length
            ? "All Rooms"
            : selectedRooms.length === 0
              ? "No Rooms Selected"
              : `${selectedRooms.length} Room${selectedRooms.length === 1 ? "" : "s"}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search rooms..." />
          <CommandList>
            <CommandEmpty>No room found.</CommandEmpty>
          </CommandList>
          <div className="flex items-center justify-between px-2 py-1.5 border-b">
            <Button variant="ghost" size="sm" onClick={selectAll} className="text-xs">
              Select All
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs">
              Clear All
            </Button>
          </div>
          <CommandList>
            <CommandGroup>
              {rooms.map((room) => (
                <CommandItem key={room.id} value={room.id} onSelect={() => toggleRoom(room)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedRooms.some((r) => r.id === room.id) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="font-medium">{room.number}</span>
                  <span className="ml-2 text-xs text-gray-500">{room.type}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

