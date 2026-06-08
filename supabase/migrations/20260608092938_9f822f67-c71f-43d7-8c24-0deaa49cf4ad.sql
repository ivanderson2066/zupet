CREATE TABLE public.coupon_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  coupon_code TEXT NOT NULL DEFAULT 'ZUPET10',
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX coupon_claims_email_idx ON public.coupon_claims (lower(email));
GRANT SELECT, INSERT ON public.coupon_claims TO anon, authenticated;
GRANT ALL ON public.coupon_claims TO service_role;
ALTER TABLE public.coupon_claims ENABLE ROW LEVEL SECURITY;
-- No public read of emails; writes go through public API route using service role.
CREATE POLICY "deny all client reads" ON public.coupon_claims FOR SELECT USING (false);
CREATE POLICY "deny all client inserts" ON public.coupon_claims FOR INSERT WITH CHECK (false);