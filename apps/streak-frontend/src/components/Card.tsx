import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className: string
}

export default function Card(props: CardProps) {
  return (
    <div className={props.className + " bg-white border-solid border-2 border-streak-gray-primary rounded-2xl p-6 gap-4"}>
      { props.children }
    </div>
  )
}