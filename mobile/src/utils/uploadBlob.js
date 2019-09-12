import axios from 'axios';
export default function (dataUrl) {

  const url = process.env.VUE_APP_SERVER_API+'/blob';

  return axios.post(url, {uri:dataUrl});
};