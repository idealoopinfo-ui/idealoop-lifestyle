import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lxvoytlpnbzwxplxfnxj.supabase.co';
const supabaseKey = 'sb_publishable_loxOkFpAM0ux9CeqGGDEuQ_NM9ZhZg-';

export const supabase = createClient(supabaseUrl, supabaseKey);
