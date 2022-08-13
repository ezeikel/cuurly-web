import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import classNames from "classnames";
import { CREATE_POST_MUTATION, CURRENT_USER_QUERY } from "../../apollo/queries";
import Spinner from "../Spinner/Spinner";
import UploadMedia from "../UploadMedia/UploadMedia";
import TextareaInput from "../form/inputs/TextareaInput/TextareaInput";
import Button from "../Button/Button";

const NUMBER_OF_STEPS = 2;

const CreatePostForm = () => {
  const router = useRouter();
  const [files, setFiles] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted({ createPost: { id } }) {
      router.push("/post/[postId]", `/post/${id}`);
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const nextStep = () => setCurrentStep((step) => step + 1);
  const previousStep = () => setCurrentStep((step) => step - 1);

  useEffect(() => {
    return () => {
      // make sure to revoke the data uris to avoid memory leaks
      files?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{`Error: ${error}`}</p>;
  }

  return (
    <div className="flex bg-white h-full w-full">
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={async ({ caption }, { resetForm }) => {
          try {
            // TODO: only one file for now e.g. files[0]
            await createPost({ variables: { caption, file: files[0] } });
            resetForm();
          } catch (e) {
            console.error(`Formik Error: ${e}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            <div className="w-full h-[calc(100%_-_32px_-_32px)] flex flex-col gap-y-8">
              {currentStep === 0 ? (
                <UploadMedia files={files} setFiles={setFiles} />
              ) : (
                <TextareaInput
                  name="caption"
                  placeholder="Write a caption..."
                  minRows={6}
                  autoFocus
                  autoResize
                />
              )}
              <div className="flex justify-between">
                {currentStep !== 0 ? (
                  <Button text="Back" onClick={previousStep} variant="link" />
                ) : null}
                {files?.length > 0 && currentStep !== NUMBER_OF_STEPS - 1 ? (
                  <Button
                    text="Next"
                    onClick={nextStep}
                    variant="link"
                    className={classNames({
                      "ml-auto": currentStep === 0,
                    })}
                  />
                ) : null}
                {currentStep === NUMBER_OF_STEPS - 1 ? (
                  <Button
                    text="Share"
                    type="submit"
                    isLoading={isSubmitting}
                    variant="link"
                  />
                ) : null}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePostForm;
