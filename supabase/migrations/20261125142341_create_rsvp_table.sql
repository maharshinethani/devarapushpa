/*
# Create wedding RSVP table (single-tenant, no auth)

1. New Tables
- `rsvps` — guest responses for the Pushpa & Srikanth wedding invitation
  - `id` (uuid, primary key)
  - `guest_name` (text, not null) — guest's name
  - `attendance` (text, not null) — either 'accept' or 'decline'
  - `guest_count` (integer, not null, default 1) — number of guests
  - `message` (text, nullable) — optional message to the couple
  - `created_at` (timestamptz, default now)
2. Security
- Enable RLS on `rsvps`.
- Grant INSERT + SELECT to `anon` and `authenticated` (no-auth single-tenant app).
- Policies: anyone may submit an RSVP; reads allowed so the family can review responses.
*/

CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  attendance text NOT NULL CHECK (attendance IN ('accept', 'decline')),
  guest_count integer NOT NULL DEFAULT 1 CHECK (guest_count > 0 AND guest_count <= 50),
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON rsvps TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can submit rsvp" ON rsvps;
CREATE POLICY "Anyone can submit rsvp" ON rsvps
FOR INSERT TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read rsvps" ON rsvps;
CREATE POLICY "Anyone can read rsvps" ON rsvps
FOR SELECT TO anon, authenticated
USING (true);