import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';
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
  faCog,
  faComment,
  faBadgeCheck,
  faInboxOut,
  faEllipsisH
} from "@fortawesome/pro-regular-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import withApolloClient from '../apollo/client';
import Page from '../components/Page';
import GlobalStyle from "../GlobalStyle";
import 'react-toastify/dist/ReactToastify.min.css';

library.add(fab, fas, far, fal, faSearch, faCompass, faHeart, faUser, faPlus, faTimes, faCog, faComment, faBadgeCheck, faInboxOut, faEllipsisH);

// const ReactToastAdapter = ({ className, bodyClassName, progressClassName, ...props }) => {
//   return  (
//     <ToastContainer
//       className={bodyClassName}
//       bodyClassName={bodyClassName}
//       progressClassName={progressClassName}
//       {...props}
//     />
//   )
// };

const StyledToastContainer = styled(ToastContainer).attrs({
  bodyClassName: 'body',
  progressClassName: 'progress'
})`
  background-color: 'brown';
  .toast {
    background-color: var(--color-black);
  }
  .body {
    background-color: var(--color-black);
    color: var(--color-white);
  }
  .progress {
    background-color: pink;
  }
`;

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
          <StyledToastContainer />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp);
