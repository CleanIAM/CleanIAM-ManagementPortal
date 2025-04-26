
const getBody = <T>(c: Response | Request): Promise<T> => {
	const contentType = c.headers.get('content-type');
  
	if (contentType && contentType.includes('application/json')) {
	  return c.json();
	}
  
	if (contentType && contentType.includes('application/pdf')) {
	  return c.blob() as Promise<T>;
	}
  
	return c.text() as Promise<T>;
  };

  const getUrl = (contextUrl: string): string => {
	const url = new URL(contextUrl);
	const pathname = url.pathname;
	const search = url.search;
	const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:5001';
	const requestUrl = new URL(`${baseUrl}${pathname}${search}`);
  
	return requestUrl.toString();
  };
  
  const getHeaders = (headers?: HeadersInit): HeadersInit => {
	return {
	  ...headers,
	  Authorization: 'token',
	  'Content-Type': 'multipart/form-data',
	};
  };
  
  export const customFetch = async <T>(
	url: string,
	options: RequestInit,
  ): Promise<T> => {
	const requestUrl = getUrl(url);
	const requestHeaders = getHeaders(options.headers);
  
	const requestInit: RequestInit = {
	  ...options,
	  headers: requestHeaders,
	};
  
	const response = await fetch(requestUrl, requestInit);
	const data = await getBody<T>(response);
  
	return { status: response.status, data, headers: response.headers } as T;
  };

export default customFetch;
