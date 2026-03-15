// js/supabase.js
import { createClient }
  from 'https://esm.sh/@supabase/supabase-js@2'

// ↓ Reemplaza con tus valores reales de Settings → API
const SUPABASE_URL = 'https://yguljejruuxxlvylcbzq.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndWxqZWpydXV4eGx2eWxjYnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODgzOTksImV4cCI6MjA4OTE2NDM5OX0.xtgHhvwyNcSmQ6_Kvb51garLL5LToCFpHB8lG2zYlUg'

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

// Devuelve el usuario de tu tabla usuarios
// incluyendo nombre, rol y comisiones
export async function getUsuario() {
  const { data: { user } } =
    await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
}

// Cerrar sesión
export async function cerrarSesion() {
  await supabase.auth.signOut()
  location.href = '../paginas/login.html'
}