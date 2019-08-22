import React from 'react';
import './index.css';

interface IFormProps {
  onSubmit: Function;
}

interface IFormState {
  errorMessage: string;
}

export default class Form extends React.Component<IFormProps, IFormState> {

  formReference: React.RefObject<HTMLFormElement>

  constructor(props: IFormProps) {
    super(props);
    this.formReference = React.createRef();
  }

  handleChange(event: any) {
    console.log('Handling change', event);
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let form = this.formReference.current as HTMLFormElement;
    let formData = new FormData(form);
    
    let formObject: {[key: string]: any} = {};
    formData.forEach((value: any, key: string) => {
      formObject[key] = value;
    });

    this.props.onSubmit(formObject);
  }

  render() {
    let errorMessage = (this.state || {}).errorMessage;
    let errorBox = errorMessage ? <div className="error-message">{errorMessage}</div> : null;

    return <form ref={this.formReference} onSubmit={this.handleSubmit.bind(this)}>{
      <React.Fragment>
      {errorBox}
      {
        // @ts-ignore
        this.props.children({onChange: (event: any) => this.handleChange(event)})
      }
      </React.Fragment>
    }</form>
  }
}