import Axios from '../../node_modules/axios';
import config from './config';

export default Axios.create({
  baseURL : config.rootPath,
  withCredentials : true

}); 