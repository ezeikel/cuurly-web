import App, { Container } from 'next/app';
import { AuthProvider } from '../context/auth';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../apollo/withApolloClient';

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
