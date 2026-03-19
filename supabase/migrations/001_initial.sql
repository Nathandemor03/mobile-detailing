-- Cities
create table cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  active boolean default true,
  headline text,
  seo_title text,
  seo_description text,
  travel_fee numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- Service Areas
create table service_areas (
  id uuid primary key default gen_random_uuid(),
  city_id uuid references cities(id) on delete cascade,
  zip_codes text[] default '{}',
  booking_radius_miles numeric(5,2) default 15
);

-- Services
create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  base_price numeric(10,2) not null,
  created_at timestamptz default now()
);

-- Service Packages
create table service_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null,
  included_services text[] default '{}',
  created_at timestamptz default now()
);

-- Add-ons
create table add_ons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  description text
);

-- Customers
create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  address text,
  created_at timestamptz default now()
);

-- Detailers
create table detailers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city_id uuid references cities(id),
  phone text,
  active boolean default true
);

-- Availability Slots
create table availability_slots (
  id uuid primary key default gen_random_uuid(),
  detailer_id uuid references detailers(id),
  city_id uuid references cities(id),
  datetime timestamptz not null,
  is_booked boolean default false
);

-- Bookings
create table bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  detailer_id uuid references detailers(id),
  city_id uuid references cities(id),
  service_package_id uuid references service_packages(id),
  add_ons uuid[] default '{}',
  address text not null,
  scheduled_at timestamptz,
  status text default 'pending' check (status in ('pending','confirmed','in_progress','completed','cancelled')),
  total_price numeric(10,2),
  stripe_payment_intent_id text,
  vehicle_type text,
  created_at timestamptz default now()
);

-- Reviews
create table reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  city_id uuid references cities(id),
  rating integer check (rating between 1 and 5),
  body text,
  is_published boolean default false,
  created_at timestamptz default now()
);

-- Memberships
create table memberships (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  plan_type text not null,
  billing_interval text check (billing_interval in ('monthly','yearly')),
  status text default 'active',
  stripe_subscription_id text,
  created_at timestamptz default now()
);
