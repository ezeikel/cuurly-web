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
import heic2any from "heic2any";

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
  "image/heic",
  "video/*",
];

const Upload = ({ router }) => {
  const [files, setFiles] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [convertingImage, setConvertingImage] = useState(false);

  const [createPost, { data, loading, error }] = useMutation(
    CREATE_POST_MUTATION,
    {
      onCompleted({ createPost: { id } }) {
        router.push("/post/[postId]", `/post/${id}`);
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      // make sure to revoke the data uris to avoid memory leaks
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback(async (files) => {
    setFiles(
      await Promise.all(
        files.map(async (file) => {
          let result;
          if (file.type === "image/heic") {
            setConvertingImage(true);
            result = await heic2any({
              blob: file,
              toType: "image/jpeg",
            });
            setConvertingImage(false);
          } else {
            result = file;
          }

          return Object.assign(file, {
            preview: URL.createObjectURL(result),
          });
        })
      )
    );
  }, []);

  // BUG: when dragging a file that has not downloaded from icloud it appends .icloud to the filename and has no type
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.join(","),
    multiple: false,
    maxSize: imageMaxSize,
  });

  return (
    <Wrapper>
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={async (values, { resetForm }) => {
          try {
            // TODO: only one file for now e.g. files[0]
            await createPost({ variables: { ...values, file: files[0] } });
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
                  {files?.length > 0 &&
                    files.map((file, index) => {
                      if (/^video/.test(file.type)) {
                        return (
                          <video width="200" key={file.preview} controls>
                            <source src={file.preview} />
                            Your browser does not support HTML5 video.
                          </video>
                        );
                      } else {
                        return (
                          <img
                            key={file.preview}
                            width="200"
                            src={file.preview}
                            alt="upload preview"
                          />
                        );
                      }
                    })}
                  {convertingImage && <div>Converting image...</div>}
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
