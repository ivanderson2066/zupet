CREATE POLICY "Anyone can upload review photos"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'review-photos');