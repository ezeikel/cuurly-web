import { useCallback, useState, Fragment, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form, ErrorMessage } from "formik";
import { withRouter } from "next/router";
import heic2any from "heic2any";
import { CREATE_POST_MUTATION, CURRENT_USER_QUERY } from "../../apollo/queries";
import Spinner from "../svgs/Spinner";
import {
  Wrapper,
  FormWrapper,
  FormDetails,
  Preview,
  StyledButton,
  StyledTextareaInput,
} from "./Upload.styled";
import Dropzone from "../Dropzone/Dropzone";

const Upload = ({ router }) => {
  const [files, setFiles] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [convertingImage, setConvertingImage] = useState(false);

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted({ createPost: { id } }) {
      router.push("/post/[postId]", `/post/${id}`);
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      // make sure to revoke the data uris to avoid memory leaks
      files?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback(async (droppedFiles) => {
    setFiles(
      await Promise.all(
        droppedFiles.map(async (file) => {
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
                  <Dropzone onDrop={onDrop} />
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
                            <track kind="captions" />
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
                <StyledTextareaInput
                  name="caption"
                  placeholder="Write a caption..."
                  label="Summary"
                  autoFocus
                />
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
