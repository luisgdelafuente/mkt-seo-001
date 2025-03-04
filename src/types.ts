export interface SearchResult {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  cacheId?: string;
  formattedUrl?: string;
  htmlFormattedUrl?: string;
  pagemap?: {
    cse_thumbnail?: Array<{
      src: string;
      width: string;
      height: string;
    }>;
    metatags?: Array<Record<string, string>>;
    cse_image?: Array<{ src: string }>;
  };
}

export interface SearchInformation {
  searchTime: number;
  formattedSearchTime: string;
  totalResults: string;
  formattedTotalResults: string;
}

export interface SearchResponse {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: {
    request: Array<{
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      language?: string;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
    nextPage?: Array<{
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      language?: string;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
  };
  context: {
    title: string;
  };
  searchInformation: SearchInformation;
  items: SearchResult[];
}

export interface SearchParams {
  q: string;
  gl?: string; // Country geolocation parameter
  lr?: string; // Language restriction
  start?: string; // Starting index for pagination
  num?: string; // Number of results to return
  safe?: string; // Safe search setting
  c2coff?: string; // Simplified Chinese search setting
  filter?: string; // Duplicate content filter
}