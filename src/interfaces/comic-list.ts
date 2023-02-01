import { Thumbnail } from './marvel-list';

export interface ComicListResult {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: DataList;
}

export interface DataList {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicResult[];
}

export interface ComicResult {
  id: number;
  title: string;
  issueNumber: number;
  description: string;
  modified: string;
  isbn: string;
  pageCount: number;
  resourceURI: string;
  image: string;
  thumbnail: Thumbnail;
}
