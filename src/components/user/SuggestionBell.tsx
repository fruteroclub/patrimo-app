'use client'

import { BellIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import Suggestions from './Suggestions'

const suggestionCount = 2 // o usar estado

export default function SuggestionBell() {
  return (
    <Popover>
      <PopoverTrigger className="relative">
        <BellIcon className="w-6 h-6" />
        {suggestionCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 text-xs"
          >
            {suggestionCount}
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-4">
        <Suggestions />
      </PopoverContent>
    </Popover>
  )
}
