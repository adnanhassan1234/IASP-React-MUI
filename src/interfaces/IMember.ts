export interface IMember {
  id: string;
  fullName: string;
  position: string;
  image: {
    id: string;
    url: string;
  };
  slug: string;
}
