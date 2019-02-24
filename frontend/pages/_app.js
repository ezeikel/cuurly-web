import App, { Container } from 'next/app';
import { AuthProvider } from '../context/auth';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
//import setupClient from '../apollo/client';

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

  // https://github.com/zeit/next.js/issues/3745
  // async componentDidMount() {
  //   const client = await setupClient();
  //   this.setState({ client });
  // }

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

export default withData(MyApp);
