CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'abandoned-cart-recovery') THEN
    PERFORM cron.unschedule('abandoned-cart-recovery');
  END IF;
END $$;

SELECT cron.schedule(
  'abandoned-cart-recovery',
  '*/15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://zupet.lovable.app/api/public/cron/abandoned-cart',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpa3VkaHNzZ2FkcGhtd3pwcGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4ODk2MjksImV4cCI6MjA5NjQ2NTYyOX0.SnwQxhJndlXjm_KVq9sFyWksurFSCzOsZepY4oSYx4w"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);