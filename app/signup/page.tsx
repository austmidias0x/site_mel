"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";

const phoneRegex = /^(\+?\d{1,3})?\s?\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Seu nome precisa ter pelo menos 2 caracteres")
    .max(80, "Use um nome mais curto"),
  email: z
    .string()
    .min(1, "Informe seu e-mail")
    .email("Digite um e-mail válido"),
  whatsapp: z
    .string()
    .min(1, "Informe seu WhatsApp")
    .regex(phoneRegex, "Digite um WhatsApp válido"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", whatsapp: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Cadastro realizado com sucesso!", {
        description: "Enviamos um e-mail de confirmação.",
      });
      form.reset();
    } catch (error) {
      toast.error("Não foi possível enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Cadastre-se para receber novidades e conteúdos exclusivos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome"
                        autoComplete="name"
                        inputMode="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        autoComplete="email"
                        inputMode="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Usaremos apenas para contato importante.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(11) 9 1234-5678"
                        autoComplete="tel"
                        inputMode="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="p-0">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Criar conta"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}


