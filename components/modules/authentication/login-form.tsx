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
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

// ১. এরর দেখানোর জন্য কাস্টম কম্পোনেন্ট (Code Clean রাখার জন্য)
function FieldErrors({ field }: { field: any }) {
  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
  if (!isInvalid) return null;

  return (
    <span className="text-[0.8rem] font-medium text-red-500">
      {field.state.meta.errors.map((err: any) => err?.message ?? err).join(", ")}
    </span>
  );
}

// ২. Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: loginSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...")
      
      try {
        const { data, error } = await authClient.signIn.email(value)

        if (error) {
          toast.error(error.message || "Login failed", { id: toastId })
          return;
        }

        toast.success("Logged in successfully!", { id: toastId })
        // এখানে আপনি রিডাইরেক্ট লজিক যোগ করতে পারেন (যেমন: router.push('/dashboard'))
        
      } catch (err) {
        toast.error("Something went wrong. Please try again", { id: toastId })
      }
    }
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="flex flex-col gap-4">
            
            {/* Email Field */}
            <form.Field
              name="email"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" htmlFor={field.name}>Email</label>
                  <input
                    id={field.name}
                    type="email"
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-background transition-colors ${
                      field.state.meta.isTouched && field.state.meta.errors.length > 0 
                      ? "border-red-500 focus:ring-red-500" : "border-input"
                    }`}
                    placeholder="m@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldErrors field={field} />
                </div>
              )}
            />

            {/* Password Field */}
            <form.Field
              name="password"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium" htmlFor={field.name}>Password</label>
                    <a href="#" className="text-xs text-muted-foreground hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id={field.name}
                    type="password"
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-background transition-colors ${
                      field.state.meta.isTouched && field.state.meta.errors.length > 0 
                      ? "border-red-500 focus:ring-red-500" : "border-input"
                    }`}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldErrors field={field} />
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}