"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CheckCircle, Loader2, User, Phone, Mail, UserPlus } from "lucide-react"

// Schema de validação usando Zod
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  whatsapp: z
    .string()
    .min(10, "WhatsApp deve ter pelo menos 10 dígitos")
    .max(15, "WhatsApp deve ter no máximo 15 dígitos")
    .regex(/^[\d\s+()-]+$/, "Formato de WhatsApp inválido")
    .transform((val) => val.replace(/\D/g, "")), // Remove caracteres não numéricos
  email: z
    .string()
    .email("Email deve ter um formato válido")
    .min(5, "Email deve ter pelo menos 5 caracteres")
    .max(100, "Email deve ter no máximo 100 caracteres")
    .toLowerCase()
})

type FormData = z.infer<typeof formSchema>

export default function FormsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      email: "",
    },
    mode: "onBlur", // Validação ao sair do campo
  })

  // Formatação do WhatsApp durante a digitação
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Simula uma requisição para o servidor
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      console.log("Dados do formulário:", data)
      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    form.reset()
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Cadastro Realizado!
              </h2>
              <p className="text-gray-600">
                Seus dados foram enviados com sucesso. Em breve entraremos em contato!
              </p>
            </div>
            <Button onClick={resetForm} className="w-full" size="lg">
              <UserPlus className="mr-2 h-4 w-4" />
              Fazer Novo Cadastro
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Faça seu Cadastro
            </CardTitle>
            <CardDescription className="text-gray-600">
              Preencha os dados abaixo para se cadastrar e receber nossas novidades
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        <User className="inline h-4 w-4 mr-2" />
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu nome completo"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        <Phone className="inline h-4 w-4 mr-2" />
                        WhatsApp
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(11) 99999-9999"
                          className="h-12 text-base"
                          type="tel"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatWhatsApp(e.target.value)
                            field.onChange(e.target.value)
                            e.target.value = formatted
                          }}
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
                      <FormLabel className="text-gray-700 font-medium">
                        <Mail className="inline h-4 w-4 mr-2" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="seu@email.com"
                          type="email"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Cadastrar
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>
                Seus dados estão seguros conosco e serão usados apenas para entrar em contato.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
