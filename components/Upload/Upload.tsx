import { useCallback, useState, Fragment, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { Formik, Form, ErrorMessage } from "formik";
import { withRouter } from "next/router";
import heic2any from "heic2any";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CREATE_POST_MUTATION, CURRENT_USER_QUERY } from "../../apollo/queries";
import Spinner from "../svgs/Spinner";
import {
  Wrapper,
  FormWrapper,
  Dropzone,
  StyledInput,
  DropzoneText,
  FormDetails,
  Preview,
  StyledTextBox,
  StyledButton,
} from "./Upload.styled";

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
    },
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      // make sure to revoke the data uris to avoid memory leaks
      files?.forEach((file) => URL.revokeObjectURL(file.preview));
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
        }),
      ),
    );
  }, []);

  // BUG: when dragging a file that has not downloaded from icloud it appends .icloud to the filename and has no type
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.join(","),
    multiple: false,
    maxSize: imageMaxSize,
    name: "image", // TODO: this was uncommitted change?
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
                <>
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
                    {/* TODO: this was uncommitted change? */}
                    <StyledInput {...getInputProps()} name="image" />
                    {isDragActive ? (
                      <DropzoneText>
                        <span>Drop it like it&apos;s hot</span>
                        <span>
                          Add your files by dropping them in this window
                        </span>
                      </DropzoneText>
                    ) : (
                      <span>Click here or drag some files over.</span>
                    )}
                  </Dropzone>
                  <ErrorMessage name="image" component="div" />
                </>
              ) : null}
              <FormDetails>
                <Preview>
                  {files?.length > 0 &&
                    files.map((file) => {
                      if (/^video/.test(file.type)) {
                        return (
                          <video width="200" key={file.preview} controls>
                            <source src={file.preview} />
                            Your browser does not support HTML5 video.
                          </video>
                        );
                      }

                      return (
                        <img
                          key={file.preview}
                          width="200"
                          src={file.preview}
                          alt="upload preview"
                        />
                      );
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
