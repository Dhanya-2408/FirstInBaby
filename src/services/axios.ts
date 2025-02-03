import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.mememall.tv";

// const api = axios.create({
//   baseURL: 'https://api.mememall.tv',
// });


const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY29tQHRlbXBsYXRlLmNvbSIsImlhdCI6MTcwNjk1MzQ2MH0.CJgYJlltA1nB8XWHWeovd-TTQUszEtLG_dTVDcReG7bXqiSTWlCLAXArzrIFdISDldQ30Yulr919FrmzY6sCMg'

axios.defaults.headers.common = {
  "Content-Type": "application/json",
  accept: "*/*",
  "Authorization" : `Bearer ${token}`
};

export function fetchData(params: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    axios
      .request(params)
      .then((response: AxiosResponse) => resolve(response.data))
      .catch((error: AxiosError) => reject(error));
  });
}
