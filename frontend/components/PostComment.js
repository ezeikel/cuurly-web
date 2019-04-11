import { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import CurrentUser from "./CurrentUser";
import { SINGLE_POST_QUERY, ADD_COMMENT_MUTATION } from '../apollo/queries';
import Button from './styles/Button';
import Spinner from './Spinner';
import { Fragment } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';

const CommentSchema = Yup.object().shape({
  text: Yup.string()
    .required('Comment can not be blank.')
    //.min(1, 'Comment can not be blank.')
});

const StyledField = styled(Field)`
  border: 0;
  outline: 0;
  font-size: 1.4rem;
  line-height: 1.8rem;
  ::placeholder {
    color: #999999;
  }
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  cursor: pointer;
`;

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <Modal
    className={modalClassName}
    portalClassName={className}
    {...props}
  />
);

const StyledModal = styled(ReactModalAdapter).attrs({ //https://github.com/styled-components/styled-components/issues/1494
  overlayClassName: 'overlay',
  modalClassName: 'modal'
})`
  /* Portal styles here (though usually you will have none) */

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.5);
    display: grid;
    place-items: center;
  }
  .modal {
    display: grid;
    background-color: var(--color-white);
    min-height: 200px;
    max-height: 400px;
    width: 400px;
    border-radius: 4px;
    outline: 0;
  }
`;

if (typeof (window) !== 'undefined') {
  Modal.setAppElement('body');
}

const ModalBody = styled.div`
  overflow-y: scroll;
`;

const PostActions = styled.ul`
  display: grid;
`;

const PostAction = styled.li`
  display: grid;
  place-items: center;
  min-height: 48px;
  padding: 4px 8px;
  line-height: 1.5;
  & + li {
    border-top: 1px solid #efefef;
  }
`;

const PostComment = ({ postId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <CurrentUser>
      {({ data: { currentUser } }) => (
        currentUser && currentUser ?
          <Mutation
            mutation={ADD_COMMENT_MUTATION}
            refetchQueries={[{ query: SINGLE_POST_QUERY, variables: { id: postId } }]}
          >
            {(addComment, { error, loading }) => (
              <Fragment>
                <Formik
                  initialValues={{ text: '' }}
                  validationSchem={CommentSchema}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      await addComment({ variables: { ...values, id: postId }});
                      resetForm();
                    } catch(e) {
                      console.error(`Formik Error: ${e}`);
                    }
                  }}
                >
                  {({
                    isSubmitting
                  }) => (
                    <StyledForm>
                      <StyledField type="text" name="text" placeholder="Add a comment..." />
                      <FontAwesomeIcon onClick={openModal} icon={["far", "ellipsis-h"]} color="var(--color-black)" size="lg" />
                      <StyledModal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        conentLabel="Post Actions"
                      >
                      <ModalBody>
                        <PostActions>
                          <PostAction>Unfollow</PostAction>
                          <PostAction>Go to Post</PostAction>
                          <PostAction>Delete Post</PostAction>
                          <PostAction>Share</PostAction>
                          <PostAction>Copy Post</PostAction>
                          <PostAction>Cancel</PostAction>
                        </PostActions>
                      </ModalBody>
                      </StyledModal>
                      <ErrorMessage name="text" />
                    </StyledForm>
                  )}
                </Formik>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </Fragment>
            )}
          </Mutation>
        : null
      )}
    </CurrentUser>
  );
}

export default PostComment;