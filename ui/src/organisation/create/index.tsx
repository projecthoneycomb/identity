import React from 'react';
import './index.css';

import Modal from '../../shared/modal';
import Form from '../../shared/form';
import Button from '../../shared/button';

interface ICreateOrganisationModalProps {}

interface ICreateOrganisationModalState {}

export default class CreateOrganisationModal extends React.Component<ICreateOrganisationModalProps, ICreateOrganisationModalState> {

  createOrganisation(result: any) {
    console.log('Here?');
  }

  render() {
    return <Modal title="Create new organisation">
      <Form onSubmit={(result: any) => { this.createOrganisation(result) }}>
        { ({ onChange }: any) => {
          return <React.Fragment>
            <label>Name</label>
            <input type="text" name="name" placeholder="Mouldy Cheese Ltd" onChange={onChange}></input>
            <Button type="branded">Create</Button>
          </React.Fragment>
        }}
      </Form>
    </Modal>
  }
}