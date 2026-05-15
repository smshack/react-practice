import  React  from "react"

import Sidebar from "@/widgets/sidebar/Sidebar"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({
  children,
}: Props) {

  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 p-6 bg-muted/40">
        {children}
      </main>

    </div>
  )
}