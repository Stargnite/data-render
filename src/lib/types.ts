export interface Service {
  id: string;
  name: string;
  description: string;
  service_category_id: string;
  website_url: string;
  country: string;
  state: string;
  city: string;
  year_of_experience: string;
  language: string;
  availability_start_time: string;
  availability_end_time: string;
  hourly_price: string;
  hourly_currency: string;
  latitude: string;
  longitude: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  phone_no: string;
  email: string;
  subscription_expires_at: string | null;
  status: string
  category: Category;
  packages: [];
  highlights: [];
  media: [];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon_url: string;
}

export interface Pricing {
  id: string;
  service_id: string;
  pricing_type: string;
  package_name: string | null;
  price: string;
  created_at: string;
  updated_at: string;
}