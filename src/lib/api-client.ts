"use client";
import Axios, { type InternalAxiosRequestConfig } from "axios";

import i18next from "i18next";

function getToken(): string | null {
	return localStorage.getItem("token");
}

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	const token = getToken();

	if (config.headers) {
		config.headers.Accept = "application/json";
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			config.headers.languageCode = i18next.language;
		}
	}
	return config;
}

export const api = Axios.create({
	// baseURL: env.API_URL,
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
	(response) => {
		if (response?.data?.status === false) {
			// showToast('error', response.data.message);
			return Promise.reject({
				response: response,
				message: response.data.message || "Unknown error occurred",
			});
		}
		return response.data;
	},
	(error) => {
		if (error.response?.status === 422) {
			error.response?.data?.errors.map(() => {
				// showToast('error', t(error?.errorMessage));
			});
		} else if (error.response?.status === 401) {
			const searchParams = new URLSearchParams();
			const redirectTo = searchParams.get("redirectTo");
			localStorage.removeItem("token");
			window.location.href = `/auth/login?redirectTo=${redirectTo}`;
			return;
		} else {
			// const message = error.response?.data?.message || error.message;
			// useNotifications.getState().addNotification({
			//   type: 'error',
			//   title: 'Error',
			//   message,
			// });
		}

		// if (error.response?.status === 401) {
		//   const searchParams = new URLSearchParams();
		//   const redirectTo = searchParams.get('redirectTo');
		//   localStorage.removeItem('token');
		//   window.location.href = `/auth/login?redirectTo=${redirectTo}`;
		// }

		return Promise.reject(error);
	},
);
