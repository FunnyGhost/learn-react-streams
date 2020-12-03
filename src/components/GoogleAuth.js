import React from 'react';

class GoogleAuth extends React.Component {
  state = {isSignedIn: null};

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '835742686156-77jam8dnlgnrh5jk47eejtgg4n43uhrp.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
          <button className="ui red google button">
            <i className="google icon"/> Sign out
          </button>
      )
    } else {
      return (
          <button className="ui red google button">
            <i className="google icon"/> Sign in with Google
          </button>
      )
    }
  }

  onAuthChange = () => {
    this.setState({isSignedIn: this.auth.isSignedIn.get()});
  };
}

export default GoogleAuth;