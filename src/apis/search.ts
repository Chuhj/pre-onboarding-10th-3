import apiRequest from './index';

const RESOURCE = '/search';

export type searchParams = {
  query: string;
  page?: number;
  limit?: number;
};

export const search = async ({ query, page, limit }: searchParams) => {
  try {
    const pageQuery = page && page > 0 ? `&page=${page}` : '';
    const limitQuery = limit && limit > 0 ? `&limit=${limit}` : '';
    const response = await apiRequest.get(`${RESOURCE}?q=${query}${pageQuery}${limitQuery}`);

    return response;
  } catch (error) {
    throw new Error('API search error');
  }
};
