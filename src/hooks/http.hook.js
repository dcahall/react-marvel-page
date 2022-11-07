import { useState, useCallback } from "react";

const useHttp = () => {
	const [process, setProcess] = useState('waiting');

	const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
		setProcess('loading');

		try {
			const response = await fetch(url, {method, body, headers});

			if (!response.ok) {
				throw new Error(`Couldn't fetch ${url}, status: ${response.ok}`);
			}

			const data = await response.json();
			return data;
		} catch (e) {
			setProcess('error')
			throw e;
		}
	}, []);

	return {request, setProcess, process }
}

export { useHttp };