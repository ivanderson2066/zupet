
CREATE TABLE public.abandoned_carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  cart_id text NOT NULL,
  checkout_url text NOT NULL,
  total_amount numeric(12,2),
  currency text DEFAULT 'BRL',
  items_count integer DEFAULT 0,
  recovered_at timestamptz,
  reminder_sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, cart_id)
);

GRANT ALL ON public.abandoned_carts TO service_role;

ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny all client reads" ON public.abandoned_carts FOR SELECT USING (false);
CREATE POLICY "deny all client inserts" ON public.abandoned_carts FOR INSERT WITH CHECK (false);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_abandoned_carts_updated_at
BEFORE UPDATE ON public.abandoned_carts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_abandoned_carts_email ON public.abandoned_carts(email);
CREATE INDEX idx_abandoned_carts_created ON public.abandoned_carts(created_at DESC);
