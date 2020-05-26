import { useCallback, useState, Fragment, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { Formik, Form, ErrorMessage } from "formik";
import { CREATE_POST_MUTATION, CURRENT_USER_QUERY } from "../apollo/queries";
import { withRouter } from "next/router";
import Spinner from "./Spinner";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextBox from "./styles/TextBox";
import Button from "./styles/Button";

const Wrapper = styled.div`
  display: grid;
  background-color: var(--color-white);
  border-radius: 10px;
`;

const FormWrapper = styled.div`
  display: grid;
`;

const Dropzone = styled.section`
  display: grid;
  place-items: center;
  border: 1px dashed
    ${({ isDragActive }) => (isDragActive ? "var(--color-white)" : "#efefef")};
  transition: background-color 0.2s ease-in-out;
  background-color: ${({ isDragActive }) =>
    isDragActive ? "var(--color-primary-lighter)" : "var(--color-white)"};
  padding: var(--spacing-gargantuan);
  outline: 0;
`;

const StyledInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  overflow: 0;
  z-index: -1;
`;

const DropzoneText = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  color: var(--color-white);
  text-align: center;
  span:first-of-type {
    font-size: 3.6rem;
  }
`;

const FormDetails = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 375px 1fr 1fr 1fr;
  grid-gap: var(--spacing-medium);
  padding: var(--spacing-medium);
`;

const Preview = styled.div`
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  display: grid;
  place-items: center;
  border: 1px solid #efefef;
  background-color: #efefef;
  img {
    max-height: 100%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StyledTextBox = styled(TextBox)`
  grid-row: 1 / span 3;
  grid-column: 2 / -1;
  height: 100%;
  display: grid;
  place-items: center;
  padding: var(--spacing-medium);
  border: 1px solid #efefef;
  font-size: 1.8rem;
`;

const StyledButton = styled(Button)`
  grid-column: 2 / -1;
  grid-row: 4 / -1;
  justify-self: center;
`;

const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes = [
  "image/x-png",
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
];

const Upload = ({ router }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [mounted, setMounted] = useState(false);

  const [createPost, { data, loading, error }] = useMutation(
    CREATE_POST_MUTATION,
    {
      onCompleted({ createPost: { id } }) {
        router.push("/post/[postId]", `/post/${id}`);
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  useEffect(() => setMounted(true), []);

  const verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      console.log({ currentFile });
      if (currentFile.size > imageMaxSize) {
        alert(
          "This file is not allowed. " +
            currentFile.size +
            " bytes is too large"
        );
        return false;
      }
      if (!acceptedFileTypes.includes(currentFile.type)) {
        alert("This file is not allowed. Only images are allowed.");
        return false;
      }
      return true;
    }
  };

  // const onDrop = useCallback((files) => {
  //   setFileUrl(URL.createObjectURL(files[0]));
  //   setFile(files[0]);
  //   const fileUrl = URL.createObjectURL(files[0]);
  //   const file = files[0];

  //   console.log({ fileUrl, file });

  //   setFileUrl(fileUrl);
  //   setFile(file);
  // }, []);

  const onDrop = useCallback((files) => {
    debugger;

    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const base64 = reader.result;
            setFileUrl(base64);
            setFile(currentFile);
          },
          false
        );

        reader.readAsDataURL(currentFile);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log({ isDragActive });

  return (
    <Wrapper>
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createPost({ variables: { ...values, file } });
            resetForm();
          } catch (e) {
            console.error(`Formik Error: ${e}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <FormWrapper>
            <Form>
              {mounted ? ( // https://stackoverflow.com/questions/55342614/using-react-dropzone-with-nextjs-input-with-type-file-multiple-property-stuc
                <Fragment>
                  <Dropzone isDragActive={isDragActive} {...getRootProps()}>
                    <FontAwesomeIcon
                      icon={["far", "inbox-out"]}
                      color={
                        isDragActive
                          ? "var(--color-white)"
                          : "var(--color-black)"
                      }
                      size="5x"
                    />
                    <StyledInput {...getInputProps()} />
                    {isDragActive ? (
                      <DropzoneText>
                        <span>Drop it like it's hot</span>
                        <span>
                          Add your files by dropping them in this window
                        </span>
                      </DropzoneText>
                    ) : (
                      <span>Click here or drag some files over.</span>
                    )}
                  </Dropzone>
                  <ErrorMessage name="image" component="div" />
                </Fragment>
              ) : null}
              <FormDetails>
                <Preview>
                  {file && (
                    <img width="200" src={fileUrl} alt="upload preview" />
                  )}
                </Preview>
                <StyledTextBox
                  component="textarea"
                  id="caption"
                  name="caption"
                  placeholder="Write a caption..."
                />
                <ErrorMessage name="caption" component="div" />
                <StyledButton type="submit" disabled={isSubmitting}>
                  Share {isSubmitting ? <Spinner /> : null}
                </StyledButton>
              </FormDetails>
            </Form>
          </FormWrapper>
        )}
      </Formik>
      {loading && <p>Loading...</p>}
      {error && <p>{`Error: ${error}`}. Please try again</p>}
    </Wrapper>
  );
};

export default withRouter(Upload);
