create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  display_name text,
  account_state text not null default 'guest' check (account_state in ('guest','member','premium')),
  premium_unlocked boolean not null default false,
  premium_unlocked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  product_code text not null unique,
  product_type text not null check (product_type in ('track','bundle','vault_drop')),
  slug text not null unique,
  title text not null,
  lane text not null,
  base_price_pence integer not null check (base_price_pence >= 0),
  sale_price_pence integer,
  sale_enabled boolean not null default false,
  sale_group text,
  guest_visible boolean not null default true,
  premium_visible boolean not null default true,
  purchase_grants_premium_mode boolean not null default true,
  website_streamable_after_purchase boolean not null default false,
  direct_download_included boolean not null default false,
  artwork_pack_included boolean not null default false,
  lyric_sheet_included boolean not null default false,
  collector_note_included boolean not null default false,
  vault_only boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bundle_items (
  id uuid primary key default gen_random_uuid(),
  bundle_product_id uuid not null references products(id) on delete cascade,
  item_product_id uuid not null references products(id) on delete cascade,
  position integer not null,
  created_at timestamptz not null default now(),
  unique (bundle_product_id, item_product_id),
  unique (bundle_product_id, position)
);

create table if not exists promo_rules (
  id uuid primary key default gen_random_uuid(),
  promo_group text not null unique,
  cadence_days integer not null check (cadence_days > 0),
  selection_mode text not null default 'random_from_pool',
  active_count integer not null check (active_count > 0),
  strike_price_pence integer not null check (strike_price_pence >= 0),
  promo_price_pence integer not null check (promo_price_pence >= 0),
  starts_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists promo_rule_items (
  id uuid primary key default gen_random_uuid(),
  promo_rule_id uuid not null references promo_rules(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (promo_rule_id, product_id)
);

create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  provider text not null check (provider in ('stripe')),
  provider_payment_intent_id text unique,
  provider_checkout_session_id text unique,
  amount_pence integer not null check (amount_pence >= 0),
  currency text not null default 'gbp',
  status text not null check (status in ('pending','paid','failed','cancelled')),
  purchased_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists entitlements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  purchase_id uuid references purchases(id) on delete set null,
  entitlement_type text not null check (entitlement_type in ('premium_mode','track_owned','bundle_owned','vault_owned')),
  active boolean not null default true,
  granted_at timestamptz not null default now(),
  unique (profile_id, product_id, entitlement_type)
);

create table if not exists premium_assets (
  id uuid primary key default gen_random_uuid(),
  asset_key text not null unique,
  title text not null,
  asset_type text not null check (asset_type in ('audio','image','pdf','zip','theme','feature_flag')),
  storage_path text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists entitlement_assets (
  id uuid primary key default gen_random_uuid(),
  entitlement_id uuid not null references entitlements(id) on delete cascade,
  premium_asset_id uuid not null references premium_assets(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (entitlement_id, premium_asset_id)
);

create index if not exists idx_products_product_code on products(product_code);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_purchases_profile_id on purchases(profile_id);
create index if not exists idx_purchases_product_id on purchases(product_id);
create index if not exists idx_entitlements_profile_id on entitlements(profile_id);
create index if not exists idx_entitlements_product_id on entitlements(product_id);
create index if not exists idx_bundle_items_bundle_product_id on bundle_items(bundle_product_id);
create index if not exists idx_promo_rule_items_rule_id on promo_rule_items(promo_rule_id);

alter table profiles enable row level security;
alter table purchases enable row level security;
alter table entitlements enable row level security;

drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own"
on profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own"
on profiles
for update
to authenticated
using (auth.uid() = id);

drop policy if exists "purchases_select_own" on purchases;
create policy "purchases_select_own"
on purchases
for select
to authenticated
using (auth.uid() = profile_id);

drop policy if exists "entitlements_select_own" on entitlements;
create policy "entitlements_select_own"
on entitlements
for select
to authenticated
using (auth.uid() = profile_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_profiles_updated_at on profiles;
create trigger touch_profiles_updated_at
before update on profiles
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_products_updated_at on products;
create trigger touch_products_updated_at
before update on products
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_promo_rules_updated_at on promo_rules;
create trigger touch_promo_rules_updated_at
before update on promo_rules
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_purchases_updated_at on purchases;
create trigger touch_purchases_updated_at
before update on purchases
for each row execute procedure public.touch_updated_at();
