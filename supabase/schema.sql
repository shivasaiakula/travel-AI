-- InTravel AI Supabase Schema

-- 1. Users Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    email TEXT UNIQUE,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Trips Table
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    destination TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    duration INTEGER,
    budget_type TEXT, -- Economy, Medium, Luxury
    itinerary JSONB NOT NULL, -- Full day-wise JSON from AI
    total_estimated_cost NUMERIC,
    status TEXT DEFAULT 'planned', -- planned, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Destinations Table (Curated Data)
CREATE TABLE IF NOT EXISTS public.destinations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    state TEXT,
    description TEXT,
    image_url TEXT,
    coordinates POINT,
    tags TEXT[],
    best_time_to_visit TEXT
);

-- 4. Bookings Table (Simulated)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'hotel' or 'transport'
    item_name TEXT NOT NULL,
    item_details JSONB,
    cost NUMERIC,
    status TEXT DEFAULT 'confirmed', -- confirmed, cancelled
    booking_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage their own trips" ON public.trips FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own bookings" ON public.bookings FOR ALL USING (auth.uid() = user_id);

-- Destinations are public
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Destinations are viewable by everyone" ON public.destinations FOR SELECT USING (true);
