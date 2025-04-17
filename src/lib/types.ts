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
  service_type: string;
  latitude: string;
  longitude: string;
  subscription_type: string;
  subscription_expires_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  category: Category;
  pricing: Pricing[];
  highlights: Highlight[];
  media: Media[];
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

export interface Highlight {
  id: string;
  service_id: string;
  highlight: string | null;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  service_id: string;
  media_type: string;
  media_url: string;
  created_at: string;
  updated_at: string;
}
