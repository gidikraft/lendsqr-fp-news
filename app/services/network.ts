import { getFromLS } from '@/utils/storage';
import axios from 'axios';
import crashlytics from '@react-native-firebase/crashlytics';

const url = 'https://jsonplaceholder.typicode.com/';

export const SERVER = axios.create({
  baseURL: url,
});

SERVER.interceptors.request.use(
  async config => {
    try {
      const token = await getFromLS('__token__');

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      // const httpMetric = perf().newHttpMetric(
      //   config.url as string,
      //   config.method,
      // );
      // config.metadata = { httpMetric };

      // await httpMetric.start();
    } finally {
      return config;
    }

    // return config;
  },
  error => {
    crashlytics().recordError(error);
    console.log(`axios helper error: ${error}`);
    return Promise.reject(error);
  },
);

// SERVER.interceptors.response.use(
//   async function (response) {
//     try {
//       const { httpMetric } = response.config.metadata;

//       httpMetric.setHttpResponseCode(response.status);
//       httpMetric.setResponseContentType(response.headers['content-type']);
//       await httpMetric.stop();
//     } finally {
//       return response;
//     }
//   },
//   async function (error) {
//     try {
//       const { httpMetric } = error.config.metadata;

//       httpMetric.setHttpResponseCode(error.response.status);
//       httpMetric.setResponseContentType(error.response.headers['content-type']);
//       await httpMetric.stop();
//     } finally {
//       // Ensure failed requests throw after interception
//       console.log(error, 'news error');
//       return Promise.reject(error);
//     }
//   },
// );
