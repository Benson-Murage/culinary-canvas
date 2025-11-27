import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://orztlxeyfadoyqfuvyjs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yenRseGV5ZmFkb3lxZnV2eWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTQ1NjgsImV4cCI6MjA3NzQzMDU2OH0.WiyPYcalZ3rOpOMCi47Q2y46Nn0nx2sCnQjm21mUJCY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);