-- Script SQL para criar a tabela no Supabase
-- Copie e cole este código no SQL Editor do seu dashboard Supabase

-- Criar a tabela de cadastros
CREATE TABLE IF NOT EXISTS cadastros (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para otimizar consultas
CREATE INDEX IF NOT EXISTS idx_cadastros_email ON cadastros(email);
CREATE INDEX IF NOT EXISTS idx_cadastros_created_at ON cadastros(created_at);

-- Habilitar RLS (Row Level Security) para segurança
ALTER TABLE cadastros ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção para usuários anônimos (público)
CREATE POLICY "Permitir inserção pública" ON cadastros
FOR INSERT 
TO anon
WITH CHECK (true);

-- Política para permitir leitura apenas para usuários autenticados (opcional)
CREATE POLICY "Permitir leitura autenticada" ON cadastros
FOR SELECT 
TO authenticated
USING (true);

-- Comentários na tabela e colunas
COMMENT ON TABLE cadastros IS 'Tabela para armazenar cadastros de usuários do formulário';
COMMENT ON COLUMN cadastros.id IS 'ID único do cadastro';
COMMENT ON COLUMN cadastros.name IS 'Nome completo do usuário';
COMMENT ON COLUMN cadastros.whatsapp IS 'Número do WhatsApp';
COMMENT ON COLUMN cadastros.email IS 'Endereço de email';
COMMENT ON COLUMN cadastros.created_at IS 'Data e hora do cadastro';
