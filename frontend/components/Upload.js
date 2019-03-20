import { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CREATE_POST_MUTATION, CURRENT_USER_QUERY } from '../apollo/queries';
import { withRouter } from 'next/router';

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
        onCompleted={({ createPost: { id } }) => {
          // TODO: Get access to Formik methods here
          //resetForm();

          // redirect to post
          router.push(`/post?id=${id}`);
        }}
      >
        {(createPost, { error, loading }) => (
          <Formik
            initialValues={{ caption: '' }}
            onSubmit={async (values, actions) => {
              // const data = new FormData();

              // data.append('file', this.state.file);
              // data.append('upload_preset', 'crownd');

              // const res = await fetch('https://api.cloudinary.com/v1_1/crowndapp/image/upload', {
              //   method: 'POST',
              //   body: data
              // });

              // const file = await res.json();

              // values.image = file.secure_url;
              // TODO: Removing largeImage for now
              // values.largeImage = file.eager[0].secure_url;

              await createPost({ variables: { ...values, file: this.state.file } });
            }}
          >
            {({
              isSubmitting,
              errors,
              touched,
              values,
              handleChange
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
                <button type="submit" disabled={isSubmitting}>Submit</button>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
};

export default withRouter(Upload);

