import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { AuthProvider } from '../context/auth';
import withApolloClient from '../apollo/withApolloClient';
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
          <AuthProvider>
            <GlobalStyle />
            <Page>
              <Component {...pageProps}/>
            </Page>
          </AuthProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp);
