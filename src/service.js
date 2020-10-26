import axios from 'axios';
import {allUrl} from './url';

export const fetchData = () => {
  return axios.get(`${allUrl.BASE_URL}`);
};
