import MainLayout from "@/layouts/MainLayout"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {

  return (
    <MainLayout>

      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>
              Total Users
            </CardTitle>
          </CardHeader>

          <CardContent>
            120
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Active Servers
            </CardTitle>
          </CardHeader>

          <CardContent>
            8
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Build Status
            </CardTitle>
          </CardHeader>

          <CardContent>
            SUCCESS
          </CardContent>
        </Card>

      </div>

    </MainLayout>
  )
}