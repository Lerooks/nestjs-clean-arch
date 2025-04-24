export namespace User {
  export interface SearchParams {
    page?: number;
    pageSize?: number;
    orderBy?: 'createdAt' | 'name' | 'email';
    orderDirection?: 'asc' | 'desc';
  }

  export interface CreateProps {
    name: string;
    email: string;
    password: string;
  }

  export interface UpdateProps {
    id: string;
    name: string;
  }

  export interface OutputProps {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Props {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
