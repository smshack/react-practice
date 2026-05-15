import MainLayout from "@/components/MainLayout"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function UsersPage() {

  const users = [
    {
      id: 1,
      name: "admin",
      role: "ADMIN",
    },

    {
      id: 2,
      name: "developer",
      role: "USER",
    },

    {
      id: 3,
      name: "operator",
      role: "MANAGER",
    },
  ]

  return (
    <MainLayout>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <p className="text-muted-foreground mt-1">
          User Management
        </p>
      </div>

      <Card>

        <CardHeader>
          <CardTitle>
            User List
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="space-y-3">

            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>

                  <div className="font-medium">
                    {user.name}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {user.role}
                  </div>

                </div>
              </div>
            ))}

          </div>

        </CardContent>

      </Card>

    </MainLayout>
  )
}