import { Button } from "@/components/ui/button"
import Link from "next/link"
import LandingCard from "@/components/landing/LandingCard"

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="bg-card flex w-screen flex-col items-center gap-8 border-b-2 p-20">
        <h2 className="text-2xl text-gray-600">YOUR PERSONAL MEDIA LOG</h2>
        <h1 className="max-w-130 text-center text-4xl font-bold">
          Every book, movie, game, album, and show -{" "}
          <p className="text-primary inline">tracked</p>
        </h1>
        <h2 className="text-md max-w-120 text-center text-gray-600">
          Jumble is a personal logging app for everything you watch, read, play,
          and listen to. Rate it, review it, build your log.
        </h2>
        <div className="flex gap-4">
          <Button asChild>
            <Link href={"/signup"}>Get Started</Link>
          </Button>
          <Button asChild>
            <Link href={"/stingos"}>See an example</Link>
          </Button>
        </div>
      </div>

      <div className="flex w-screen flex-col items-center border-b-2">
        <div>
          <div className="mx-4 my-12 flex flex-col gap-2">
            <h2 className="text-primary text-lg font-semibold">
              What you can do
            </h2>
            <h1 className="text-3xl font-semibold">Everything in one place</h1>
          </div>
          <div className="flex pb-8">
            <LandingCard
              title={"Rate Everything"}
              body={
                "5 star rating system (with half steps inbetween) for precise rating of your media"
              }
            />
            <LandingCard
              title={"Write reviews"}
              body={"Capture your thoughts and tell the world your perspective"}
            />
            <LandingCard
              title={"Track by date"}
              body={
                "Log when you finished something. Your media, your log, your history"
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-primary flex flex-1 items-center justify-around">
        <div className="flex flex-col gap-4">
          <h1 className="font-bol text-3xl text-white">Start your log today</h1>
          <h2 className="texl-lg text-white">
            Free to use, more features coming soon
          </h2>
          <Button className="bg-secondary" asChild>
            <Link href={"/signup"}>Create Your Account</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
