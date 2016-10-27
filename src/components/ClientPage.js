import React, { Component } from 'react';

import PropertyStore from '../stores/PropertyStore';
import PropertyActions from '../actions/PropertyActions';

export default class ClientPage extends Component {
  constructor () {
    super();

    this.state = {
      tenants: PropertyStore.getTenants()
    };

    this._onChange = this._onChange.bind(this);
    this._convertToPhone = this._convertToPhone.bind(this);
  }

  componentWillMount () {
    PropertyActions.fetchTenants();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      tenants: PropertyStore.getTenants()
    });
  }

  _convertToPhone (number) {
    let arr = number.toString().split('');
    arr.splice(0, 0, '(');
    arr.splice(4, 0, ')');
    arr.splice(8, 0, '-');
    let result = arr.join('');
    return result;
  }

  render () {
    let { tenants } = this.state;
    console.log('tenants: ', tenants);
    return (
      <div className='text-center'>
        <h1>Tenants</h1>
        {
          tenants.map((tenant) => {
            let phoneNumber = this._convertToPhone(tenant.phone);
            return (
              <div className='propertyCard col-xs-4' key={tenant._id}>
                <h2>{tenant.name}</h2>
                <h4>Age: {tenant.age}</h4>
                <h4>Email: {tenant.email}</h4>
                <h4>Phone: {phoneNumber}</h4>
                {/* <h4>Phone: {tenant.phone}</h4> */}
                <h3>Rent: ${tenant.rentPay}</h3>
                <button data-toggle='modal' data-target={`#modal${tenant.id}`}>Edit</button>
                {/* <button data-toggle='modal' data-target={`#modal${tenant.id}`} onClick={this._fetchPropTenants.bind(this, tenant._id)}>Tenants</button> */}

                <div className='modal fade' id={`modal${tenant.id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                        <h4 className='modal-title' id='myModalLabel'>Tenants Info</h4>
                      </div>
                        {
                          <div className='modal-body'>
                            <input className='col-xs-12' type='text' ref={tenant.name} defaultValue={tenant.name} />
                            <input className='col-xs-12' type='number' ref={tenant.age} defaultValue={tenant.age} />
                            <input className='col-xs-12' type='number' ref={tenant.email} defaultValue={tenant.email} />
                            <input className='col-xs-12' type='text' ref={tenant.phone} defaultValue={tenant.phone} />
                          </div>
                        }
                      <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel Edit</button>
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
