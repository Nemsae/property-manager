import React, { Component } from 'react';

import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions';

export default class PropertyPage extends Component {
  constructor () {
    super();

    this.state = {
      properties: PropertyStore.getProperties(),
      propertyTenant: PropertyStore.getPropTenants()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    PropertyActions.fetchProperties();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      properties: PropertyStore.getProperties(),
      propertyTenant: PropertyStore.getPropTenants()
    });
  }

  _fetchPropTenants (propId) {
    PropertyActions.fetchPropTenants(propId);
  }

  render () {
    let { properties, propertyTenant } = this.state;
    console.log('propertyTenant: ', propertyTenant);
    let PropertyTenant = [];

    if (propertyTenant !== undefined) {
      console.log('tenants: ', propertyTenant.tenants);
      PropertyTenant =
      propertyTenant.tenants.map((tenant, i) => {
        return (
          <div key={i}>
            <h4>Tenant: {tenant.name}</h4>
            <h4>Phone: {tenant.phone}</h4>
          </div>
        );
      });
    }
    return (
      <div className='text-center'>
        <h1>Properties</h1>
        {
          properties.map((property) => {
            let roomCost = 300 * property.bedrooms;
            let bathCost = 200 * property.bathrooms;
            let rentTotal = roomCost + bathCost;
            return (
              <div className='propertyCard col-xs-12' key={property._id}>
                <h2>{property.address}</h2>
                <h4>Bedrooms: {property.bedrooms}</h4>
                <h4>Bathrooms: {property.bathrooms}</h4>
                <h4>Rent Base: {property.baseRent}</h4>
                <h3>Total Rent: ${rentTotal}</h3>
                <button data-toggle='modal' data-target={`#modal${property.id}`} onClick={this._fetchPropTenants.bind(this, property._id)}>Tenants</button>

                <div className='modal fade' id={`modal${property.id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                        <h4 className='modal-title' id='myModalLabel'>Tenants Info</h4>
                      </div>
                      <div className='modal-body'>
                        {
                          PropertyTenant
                        }
                      </div>
                      <div className='modal-footer'>
                        <h5>Include drop down list to add a tenant</h5>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel Entry</button>
                        {/* <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this._updateEntry.bind(this, property)}>Update Entry</button> */}
                        {/* <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this._updateEntry.bind(this, animal.id)}>Update Entry</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
