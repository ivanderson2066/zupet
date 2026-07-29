CREATE TABLE public.product_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_handle text,
  order_ref text,
  author_name text NOT NULL,
  rating smallint NOT NULL,
  title text,
  body text,
  photo_url text,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.validate_product_review()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.rating < 1 OR NEW.rating > 5 THEN
    RAISE EXCEPTION 'rating must be between 1 and 5';
  END IF;
  IF length(NEW.author_name) < 2 OR length(NEW.author_name) > 60 THEN
    RAISE EXCEPTION 'invalid author_name';
  END IF;
  IF NEW.body IS NOT NULL AND length(NEW.body) > 2000 THEN
    RAISE EXCEPTION 'body too long';
  END IF;
  NEW.approved := false;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_product_review_before_insert
BEFORE INSERT ON public.product_reviews
FOR EACH ROW EXECUTE FUNCTION public.validate_product_review();

GRANT SELECT, INSERT ON public.product_reviews TO anon;
GRANT SELECT, INSERT ON public.product_reviews TO authenticated;
GRANT ALL ON public.product_reviews TO service_role;

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a review"
ON public.product_reviews FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read approved reviews"
ON public.product_reviews FOR SELECT TO anon, authenticated
USING (approved = true);