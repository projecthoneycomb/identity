import React from 'react';
import './index.css';

interface IModalProps {
  title: string;
}

interface IModalState {}

export default class Modal extends React.Component<IModalProps, IModalState> {
  render() {
    return <div className="modal-container">
      <div className="container">
      <h2>{ this.props.title }</h2>
      <hr></hr>
      { this.props.children }
      </div>
    </div>
  }
}