"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "./types"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateRangeSelectorProps {
  dateRange: DateRange
  onChange: (range: DateRange) => void
}

export function DateRangeSelector({ dateRange, onChange }: DateRangeSelectorProps) {
  const [date, setDate] = useState<DateRange>({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  })

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.startDate ? (
              date.endDate ? (
                <>
                  {format(date.startDate, "LLL dd, y")} - {format(date.endDate, "LLL dd, y")}
                </>
              ) : (
                format(date.startDate, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.startDate}
            selected={{
              from: date.startDate,
              to: date.endDate,
            }}
            onSelect={(selectedDate) => {
              if (selectedDate?.from && selectedDate?.to) {
                const newRange = {
                  startDate: selectedDate.from,
                  endDate: selectedDate.to,
                }
                setDate(newRange)
                onChange(newRange)
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

