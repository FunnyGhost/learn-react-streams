import React from 'react';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '835742686156-77jam8dnlgnrh5jk47eejtgg4n43uhrp.apps.googleusercontent.com',
        scope:'email'
      });
    });
  }

  render() {
    return <div>Google Auth</div>;
  }
}

export default GoogleAuth;