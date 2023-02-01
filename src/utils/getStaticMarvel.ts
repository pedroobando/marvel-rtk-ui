import { marvelApi } from '@/api';
import { Character, ComicListResult, MarvelListResponse } from '@/interfaces';
import { FC } from 'react';

export const marvelList = async (limit: number, offset: number = 1): Promise<string[]> => {
  const { data } = await marvelApi.get<MarvelListResponse>(`/characters?limit=${limit}&offset=${offset}`);
  const marvel1001 = data.data.results.map((characterItem) => `${characterItem.id}`);
  return marvel1001;
};

export const getMarvelCharacter = async (id: string): Promise<Character | null> => {
  try {
    const { data } = await marvelApi.get<MarvelListResponse>(`/characters?id=${id}`);
    const chactNoImage = data.data.results[0];
    const { data: comicListResult } = await marvelApi.get<ComicListResult>(`/characters/${id}/comics`);
    return {
      id: chactNoImage.id,
      description: chactNoImage.description,
      name: chactNoImage.name,
      modified: chactNoImage.modified,
      image: `${chactNoImage.thumbnail.path}.${chactNoImage.thumbnail.extension}`,
      comicResult: comicListResult.data.results.map(
        ({ id, description, isbn, issueNumber, modified, pageCount, title, resourceURI, thumbnail }) => ({
          id,
          description,
          isbn,
          issueNumber,
          modified,
          pageCount,
          image: `${thumbnail.path}.${thumbnail.extension}`,
          thumbnail,
          title,
          resourceURI,
        })
      ),
    } as Character;
  } catch (error) {
    return null;
  }
};
