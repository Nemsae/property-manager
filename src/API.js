import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  fetchProperties () {
    axios.get('/api/properties')
      .then((res) => {
        ServerActions.receiveProperties(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchProperties', err);
      });
  },

  fetchPropTenants (propId) {
    axios.get(`/api/properties/${propId}`)
      .then((res) => {
        console.log('res.data: ', res.data);
        ServerActions.receivePropTenants(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchPropTenants', err);
      });
  },

  fetchTenants () {
    axios.get('/api/tenants/')
      .then((res) => {
        console.log('res.data: ', res.data);
        ServerActions.receiveTenants(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchTenants', err);
      });
  }
};

export default API;
