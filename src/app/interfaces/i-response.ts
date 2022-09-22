export interface IResponse<T> {
  data: T;
  headers?: {
    message: string;
  };
  links?: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta?: {
    ['current_page']: number;
    from: number;
    ['last_page']: number;
    links: { active: boolean; label: string; url: string }[];
    path: string;
    ['per_page']: number;
    to: number;
    total: number;
  };
}


