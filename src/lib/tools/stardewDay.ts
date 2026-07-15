import { GIFT_VILLAGERS, GIFT_ITEMS, type GiftLoc } from '@/components/tools/stardewGiftData'
import { FISH, type Fish } from '@/components/tools/stardewFishData'
import { FESTIVALS, type Festival, type Season } from '@/lib/tools/stardewCalendarData'
import { CROPS, type Crop } from '@/lib/tools/stardewCropData'

export interface BirthdayEntry { villager: GiftLoc; loves: GiftLoc[] }
export interface DaySummary { birthdays: BirthdayEntry[]; festivalToday: Festival | null; tomorrowBirthdays: BirthdayEntry[] }
export interface SeasonWindow { fish: Fish[]; plantableCrops: Crop[] }

const SEASON_ORDER: Season[] = ['spring', 'summer', 'fall', 'winter']

export function nextDay(season: Season, day: number): { season: Season; day: number } {
  if (day < 28) return { season, day: day + 1 }
  const i = SEASON_ORDER.indexOf(season)
  return { season: SEASON_ORDER[(i + 1) % 4], day: 1 }
}

function birthdaysOn(season: Season, day: number): BirthdayEntry[] {
  return GIFT_VILLAGERS
    .filter((v) => v.season === season && v.day === day)
    .map((v) => ({
      villager: v.name,
      // resolve loved-gift keys to localized item names; skip any unknown key
      loves: v.loves.map((k) => GIFT_ITEMS[k]).filter((x): x is GiftLoc => Boolean(x)),
    }))
}

export function daySummary(season: Season, day: number): DaySummary {
  const t = nextDay(season, day)
  return {
    birthdays: birthdaysOn(season, day),
    festivalToday: FESTIVALS.find((f) => f.season === season && f.days.includes(day)) ?? null,
    tomorrowBirthdays: birthdaysOn(t.season, t.day),
  }
}

export function seasonWindow(season: Season, day: number): SeasonWindow {
  const daysLeft = 28 - day
  return {
    fish: FISH.filter((f) => f.seasons.includes(season)),
    plantableCrops: CROPS.filter(
      (c) => (c.season === season || c.season === 'any') && c.days <= daysLeft,
    ),
  }
}
