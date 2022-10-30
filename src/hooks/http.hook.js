import { useState, useCallback } from "react";

const useHttp = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
		setLoading(true);

		try {
			const response = await fetch(url, {method, body, headers});

			if (!response.ok) {
				throw new Error(`Couldn't fetch ${url}, status: ${response.ok}`);
			}

			const data = await response.json();
			setLoading(false);

			return data;
		} catch (e) {
			setLoading(false);
			setError(e.message);

			throw e;
		}
	}, []);

	const clearError = useCallback(() => setError(false), []);

	return { loading, error, request, clearError }
}

export { useHttp };