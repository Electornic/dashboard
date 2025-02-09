import { createClient } from '@supabase/supabase-js';

// Supabase 기본 URL과 익명 키를 환경 변수에서 가져옴
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseKey);
