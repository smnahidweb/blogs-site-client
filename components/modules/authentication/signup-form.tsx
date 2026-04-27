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

// Zod Schema updated (z.string().email() correctly)
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum Length is 8"),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
     
      try{
     const {data,error} = await authClient.signUp.email(value)
    const toastId = toast.loading("User Creating")
    
    if(error){
      toast.error(error.message, {id:toastId})
      return;
    }

    toast.success("User Created successfully", {id:toastId})


      }
      catch(err){

        toast.error("Somethings went wrong. Please try again")


      }

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
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor={field.name}>Name</label>
                    <input
                      id={field.name}
                      className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-background transition-colors ${
                        isInvalid ? "border-red-500 focus:ring-red-500" : "border-input"
                      }`}
                      placeholder="John Doe"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <span className="text-[0.8rem] font-medium text-red-500">
                        {field.state.meta.errors.map(err => err?.message ?? err).join(", ")}
                      </span>
                    )}
                  </div>
                )
              }}
            />

            {/* 2. Email Field */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor={field.name}>Email</label>
                    <input
                      id={field.name}
                      type="email"
                      className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-background transition-colors ${
                        isInvalid ? "border-red-500 focus:ring-red-500" : "border-input"
                      }`}
                      placeholder="m@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <span className="text-[0.8rem] font-medium text-red-500">
                        {field.state.meta.errors.map(err => err?.message ?? err).join(", ")}
                      </span>
                    )}
                  </div>
                )
              }}
            />

            {/* 3. Password Field */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor={field.name}>Password</label>
                    <input
                      id={field.name}
                      type="password"
                      className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-background transition-colors ${
                        isInvalid ? "border-red-500 focus:ring-red-500" : "border-input"
                      }`}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <span className="text-[0.8rem] font-medium text-red-500">
                        {field.state.meta.errors.map(err => err?.message ?? err).join(", ")}
                      </span>
                    )}
                  </div>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="signup-form" type="submit" className="w-full">
          Create Account
        </Button>
      </CardFooter>
    </Card>
  )
}