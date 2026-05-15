import { type ReactNode } from "react"

import Sidebar from "./Sidebar"

interface Props {
  children: ReactNode
}

export default function MainLayout({
  children,
}: Props) {

  return (
    <div className="flex min-h-screen bg-muted/30">

      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>

    </div>
  )
}