import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '835742686156-77jam8dnlgnrh5jk47eejtgg4n43uhrp.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();

        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
          <button className="ui red google button" onClick={this.signOut}>
            <i className="google icon"/> Sign out
          </button>
      );
    } else {
      return (
          <button className="ui red google button" onClick={this.signIn}>
            <i className="google icon"/> Sign in with Google
          </button>
      );
    }
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  signIn = () => {
    this.auth.signIn();
  };

  signOut = () => {
    this.auth.signOut();
  };
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn};
};
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);