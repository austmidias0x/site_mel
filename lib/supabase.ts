import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = 'https://wpjyoflzundujtigdriu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwanlvZmx6dW5kdWp0aWdkcml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MjA4NjYsImV4cCI6MjA3NDM5Njg2Nn0.V_5vxeBZGbLLbzoGxk2FcDrZHoP6bjEXXV9mbFx_G8M'

// Criar o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos TypeScript para o banco de dados
export interface LeadMel {
  id?: number
  name: string
  whatsapp: string
  email: string
  created_at?: string
}

// Função para inserir um novo lead
export async function insertLead(data: Omit<LeadMel, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('leads_mel')
    .insert([
      {
        name: data.name,
        whatsapp: data.whatsapp,
        email: data.email,
      }
    ])
    .select()

  if (error) {
    console.error('Erro ao inserir lead:', error)
    throw error
  }

  return result
}

// Função para buscar todos os leads (para testes)
export async function getLeads() {
  const { data, error } = await supabase
    .from('leads_mel')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar leads:', error)
    throw error
  }

  return data
}
