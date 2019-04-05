import { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CREATE_POST_MUTATION, CURRENT_USER_QUERY } from '../apollo/queries';
import { withRouter } from 'next/router';
import Spinner from './Spinner';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  display: grid;
`;

const Dropzone = styled.section`
  display: grid;
  place-items: center;
  background-color: var(--color-primary-lighter);
`;

const StyledInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  overflow: 0;
  z-index: -1;
`;

const UploadIcon = styled.label`
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--color-primary);
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: var(--color-primary-darker);
  }
`;

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
          <Wrapper>
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
                <Dropzone>
                  <Form>
                    <UploadIcon htmlFor="image">
                      <FontAwesomeIcon icon={["far", "inbox-out"]} color="var(--color-white)" size="3x" />
                    </UploadIcon>
                    <StyledInput type="file" id="image" name="image" accept="image/png, image/jpeg" placeholder="Upload an image" required onChange={e => {
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
                  <span>Choose a file or drag one here..</span>
                </Dropzone>
              )}
            </Formik>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </Wrapper>
        )}
      </Mutation>
    );
  }
};

export default withRouter(Upload);

