import { supabase } from "./supabaseClient";

export const signinUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { ...data, error };
};