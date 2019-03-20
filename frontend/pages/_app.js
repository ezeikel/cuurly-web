import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../apollo/client';
import Page from '../components/Page';
import GlobalStyle from "../GlobalStyle";

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
