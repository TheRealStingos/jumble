export default function LandingCard({
  title,
  body,
}: {
  title: string
  body: string
}) {
  return (
    <div className="bg-card m-2 flex max-w-80 flex-col rounded-xl p-4 shadow-md">
      <h1 className="px-4 text-xl font-bold">{title}</h1>
      <p className="px-4">{body}</p>
    </div>
  )
}
