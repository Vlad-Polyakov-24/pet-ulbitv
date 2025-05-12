export const getQueryParams = (params: Record<string, string | string[]>)=> {
	const searchParams = new URLSearchParams(window.location.search);

	Object.entries(params).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			searchParams.delete(key);
			value.forEach((val) => {
				if (val) {
					searchParams.append(key, val);
				}
			});
		}
		else if (key === 'search') {
			searchParams.set(key, value);
		}
		else if (value) {
			searchParams.set(key, value);
		}
	});

	return `?${searchParams.toString()}`;
};

export const addQueryParams = (params: Record<string, string | string[]>)=> {
	window.history.pushState(null, '', getQueryParams(params));
};