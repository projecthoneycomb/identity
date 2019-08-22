import React from 'react';
import './index.css';

import Modal from '../../shared/modal';
import Form from '../../shared/form';
import Button from '../../shared/button';

interface ICreateOrganisationModalProps {
  history: any;
}

interface ICreateOrganisationModalState {}

export default class CreateOrganisationModal extends React.Component<ICreateOrganisationModalProps, ICreateOrganisationModalState> {

  createOrganisation(result: any) {
    console.log('Here?', result);
  }

  render() {
    return <Modal dismissTo="/organisations" history={this.props.history} title="Create new organisation">
      <Form onSubmit={(result: any) => { this.createOrganisation(result) }}>
        { () => {
          return <React.Fragment>
            <label>Name</label>
            <input required type="text" name="name" placeholder="Mouldy Cheese Ltd"></input>
            <Button type="branded">Create</Button>
          </React.Fragment>
        }}
      </Form>
    </Modal>
  }
}