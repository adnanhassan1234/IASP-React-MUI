export interface IArticle {
  id: string;
  title: string;
  body: string;
  createdBy: string;
  createdDate: string;
  countries: string[];
  images: Image[];
  slug: string;
}

interface Image {
  id: string;
  url: string;
}
