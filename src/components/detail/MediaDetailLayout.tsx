import { MediaResult } from "@/types/media"
import Image from "next/image"
import LogMedia from "../LogMedia"
import { Badge } from "../ui/badge"
import getBadgeColor from "@/utils/mediaBadge"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface MediaDetailLayoutProps {
  result: MediaResult
  children: React.ReactNode
  isLoggedIn: boolean
}

export default function MediaDetailLayout({
  result,
  children,
  isLoggedIn,
}: MediaDetailLayoutProps) {
  return (
    <div className="m-8 flex w-screen flex-col items-center">
      <div className="bg-card flex w-fit justify-center gap-8 rounded-lg p-4">
        {/* Left Quadrant */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Badge className={getBadgeColor(result.type)}>
            {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
          </Badge>
          <div className="relative h-[300px] w-[200px]">
            {result.coverUrl && (
              <Image
                src={result.coverUrl}
                alt={`${result.title} cover art`}
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>

        {/* Right Quadrant */}
        <div className="items-centers flex flex-col justify-center gap-2">
          <div className="flex flex-col">
            <h3 className="text-primary text-lg font-semibold">
              {result.title}
            </h3>
            <p className="text-accent text-md text-shadow-xl font-semibold">
              Released:{" "}
              {new Date(result.releaseDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex max-w-150 flex-col">
            {children}
            {isLoggedIn && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Log</Button>
                </DialogTrigger>
                <DialogContent className="min-h-100 min-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-primary text-center font-semibold">
                      Media Entry Log
                    </DialogTitle>
                  </DialogHeader>
                  <LogMedia result={result} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
