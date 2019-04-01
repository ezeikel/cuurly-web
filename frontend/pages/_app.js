import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../apollo/client';
import Page from '../components/Page';
import GlobalStyle from "../GlobalStyle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import {
  faSearch,
  faCompass,
  faHeart,
  faUser,
  faPlus,
  faTimes,
  faCog
} from "@fortawesome/pro-regular-svg-icons";

library.add(fab, fas, far, fal, faSearch, faCompass, faHeart, faUser, faPlus, faTimes, faCog);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <GlobalStyle />
          <Page>
            <Component {...pageProps}/>
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp);
