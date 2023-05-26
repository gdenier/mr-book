import { ReactElement, ReactNode } from "react"

export const Section = ({
  children,
  title,
  action,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}): ReactElement => {
  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8">
        <h2 className="mt-10 flex min-h-[3rem] flex-wrap items-center gap-2 font-serif text-3xl font-semibold first:mt-0">
          {title}
        </h2>
        <div className="ml-auto flex gap-2">{action}</div>
      </div>
      <div className="px-4 py-4 sm:px-6 md:px-8">{children}</div>
    </>
  )
}
