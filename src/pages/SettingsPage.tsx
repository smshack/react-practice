import MainLayout from "@/components/MainLayout"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

export default function SettingsPage() {

  return (
    <MainLayout>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-muted-foreground mt-1">
          System Configuration
        </p>
      </div>

      <Card className="max-w-xl">

        <CardHeader>
          <CardTitle>
            Server Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>

            <label className="text-sm font-medium">
              API URL
            </label>

            <Input
              placeholder="https://api.example.com"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Server Name
            </label>

            <Input
              placeholder="SMART SERVER"
            />

          </div>

          <Button>
            Save
          </Button>

        </CardContent>

      </Card>

    </MainLayout>
  )
}