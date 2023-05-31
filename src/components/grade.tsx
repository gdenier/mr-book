import { StarHalfIcon, StarIcon } from "lucide-react"
import { ReactElement } from "react"
import { cn } from "~/lib/utils"

type StarState = "empty" | "fill" | "semi"

export const Grade = ({ value }: { value: number }): ReactElement => {
  const stars: StarState[] = [
    value >= 1 ? "fill" : value >= 0.5 ? "semi" : "empty",
    value >= 2 ? "fill" : value >= 1.5 ? "semi" : "empty",
    value >= 3 ? "fill" : value >= 2.5 ? "semi" : "empty",
    value >= 4 ? "fill" : value >= 3.5 ? "semi" : "empty",
    value >= 5 ? "fill" : value >= 4.5 ? "semi" : "empty",
  ]

  return (
    <div className="flex gap-2">
      {stars.map((star, index) => (
        <Star type={star} key={`star-${index}`} />
      ))}
    </div>
  )
}

const Star = ({ type }: { type: StarState }) => {
  return (
    <div className="relative h-4 w-4">
      <StarIcon
        className={cn("h-4 w-4", type === "fill" && "fill-foreground")}
      />
      {type === "semi" ? (
        <StarHalfIcon className="absolute inset-0 h-4 w-4 fill-foreground" />
      ) : null}
    </div>
  )
}
