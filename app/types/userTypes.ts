export type UserDetails = {
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
};

export type NewsItem = {
  body: string;
  id: number;
  title: string;
  userId: number;
  name: string;
  description: string;

  source: SourceType;
  author: string | null;
  // description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
};

type SourceType = {
  id: string | null;
  name: string;
};
