import axios from 'axios';
import {allUrl} from './screen/url';

export const fetchData = () => {
  return axios.get(`${allUrl.BASE_URL}`);
};
