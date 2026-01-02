
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
}

export interface CaseStudy {
  id: number;
  client: string;
  category: string;
  image: string;
  video?: string;
}

export interface NavLink {
  name: string;
  path: string;
}
