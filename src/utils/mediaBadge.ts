import { MediaType } from "@/types/media"

export default function getBadgeColor(type: MediaType) {
  switch (type) {
    case "game":
      return "bg-primary text-primary-foreground"
    case "movie":
      return "bg-secondary text-secondary-foreground"
    case "tv":
      return "bg-accent text-accent-foreground"
    case "music":
      return "bg-chart-4 text-white"
    case "book":
      return "bg-chart-5 text-white"
  }
}
