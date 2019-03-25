import { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CREATE_POST_MUTATION, CURRENT_USER_QUERY } from '../apollo/queries';
import { withRouter } from 'next/router';
import Spinner from './Spinner';

class Upload extends Component {
  state = {
    fileUrl: null,
    file: null
  };

  render() {
    const { router } = this.props;

    return (
      <Mutation
        mutation={CREATE_POST_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={({ createPost: { id } }) => router.push(`/post?id=${id}`)}
      >
        {(createPost, { error, loading }) => (
          <Fragment>
            <Formik
              initialValues={{ caption: '' }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  await createPost({ variables: { ...values, file: this.state.file } });
                  resetForm();
                } catch(e) {
                  console.error(`Formik Error: ${e}`);
                }
              }}
            >
              {({
                isSubmitting
              }) => (
                <Form>
                  <label htmlFor="file">Image</label>
                  <input type="file" name="image" placeholder="Upload an image" required onChange={e => {
                    this.setState({
                      fileUrl: URL.createObjectURL(e.target.files[0]),
                      file: e.target.files[0]
                    });
                  }} />
                  {this.state.file && <img width="200" src={this.state.fileUrl} alt="upload preview" />}
                  <ErrorMessage name="image" component="div" />
                  <label htmlFor="caption">Caption</label>
                  <Field component="textarea" name="caption" />
                  <ErrorMessage name="caption" component="div" />
                  <button type="submit" disabled={isSubmitting}>Submit {isSubmitting ? <Spinner /> : null }</button>
                </Form>
              )}
            </Formik>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </Fragment>
        )}
      </Mutation>
    );
  }
};

export default withRouter(Upload);

