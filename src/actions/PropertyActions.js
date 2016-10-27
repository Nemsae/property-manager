import API from '../API';

const PropertyActions = {
  fetchProperties () {
    API.fetchProperties();
  },

  fetchPropTenants (id) {
    API.fetchPropTenants(id);
  },

  fetchTenants () {
    API.fetchTenants();
  }
};

export default PropertyActions;
