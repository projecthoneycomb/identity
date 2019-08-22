import React from 'react';
import './index.css';
import { withRouter } from 'react-router';

interface IModalProps {
  title: string;
  dismissTo: string;
  history: any;
}

interface IModalState {}

export default class Modal extends React.Component<IModalProps, IModalState> {

  dismiss() {
    this.props.history.push(this.props.dismissTo);
  }

  render() {
    return <div className="modal-container" onClick={() => this.dismiss()}>
      <div className="container" onClick={(e) => e.stopPropagation()}>
      <h2>{ this.props.title }</h2>
      <hr></hr>
      { this.props.children }
      </div>
    </div>
  }
}