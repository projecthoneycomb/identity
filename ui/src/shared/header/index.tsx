import React from 'react';
import './index.css';

export default class Header extends React.Component {
  render() {
    return <header>
      <div className="central-header-container">
        <a className="hero-logo-container">
          <svg className="hero-logo" viewBox="0 0 32.289 42.583" xmlns="http://www.w3.org/2000/svg">
            <path transform="translate(-60.487 -33.778)" d="M70.434,58.709l1.341.837,11.13-6.518-.076-12.884L71.617,33.778,60.487,40.3l.076,12.884,6.274,3.388.041-1.644,1.283-.854-4.733-2.557-.076-9.59,8.265-4.85,8.342,4.739.047,9.578L71.74,56.24l-1.312.872" fill="#fff" data-name="Path 37"/>
            <path transform="translate(-105.1 -109.82)" d="M127.432,127.609l-1.324-.977-11.13,6.518.076,12.884,11.206,6.372,11.13-6.518L137.314,133l-5.606-3.1V131.3l-1.388.749,4.13,2.627.047,9.578-8.265,4.85-8.318-4.728-.076-9.59,8.306-5.032,1.283-.749" fill="#fff" data-name="Path 38"/>
          </svg>
        </a>
        <h2 className="hero-title">Project <strong>Identity</strong></h2>
      </div>
    </header>
  }
}