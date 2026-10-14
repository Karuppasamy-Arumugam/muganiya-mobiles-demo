ALTER TABLE public.offers
  DROP CONSTRAINT IF EXISTS offers_offer_type_check;

ALTER TABLE public.offers
  ADD CONSTRAINT offers_offer_type_nonempty_check
  CHECK (char_length(trim(offer_type)) > 0);