const dev = {
  API_ENDPOINT_URL: 'https://10.10.30.15:8080'
};

const prod = {
  API_ENDPOINT_URL: 'https://10.10.30.15:8080'
};

const test = {
  API_ENDPOINT_URL: 'https://10.10.30.15:8080'
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
