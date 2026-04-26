"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { useForm } from "@tanstack/react-form"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: async ({ value }) => {
      // এখানে আপনার API কল বা সাবমিট লজিক থাকবে
      console.log("Form Submitted:", value)
    }
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="flex flex-col gap-4">
            {/* 1. Name Field */}
            <form.Field
              name="name"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" htmlFor={field.name}>Name</label>
                  <input
                    id={field.name}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />

            {/* 2. Email Field */}
            <form.Field
              name="email"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" htmlFor={field.name}>Email</label>
                  <input
                    id={field.name}
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="m@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />

            {/* 3. Password Field */}
            <form.Field
              name="password"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" htmlFor={field.name}>Password</label>
                  <input
                    id={field.name}
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        {/* form="signup-form" দেওয়ার কারণে বাটনটি ফর্মের বাইরে থাকলেও সাবমিট কাজ করবে */}
        <Button form="signup-form" type="submit" className="w-full">
          Create Account
        </Button>
      </CardFooter>
    </Card>
  )
}