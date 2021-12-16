import { ReactElement, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { useCombobox } from "downshift";
import { useRouter } from "next/router";
import { SEARCH_USERS_QUERY } from "../../../../apollo/queries";
import FormWrapper from "../../FormWrapper/FormWrapper";
import TextInput from "../../inputs/TextInput/TextInput";
import SearchDropdown from "../../../SearchDropdown/SearchDropdown";

const SearchSchema = Yup.object().shape({
  query: Yup.string(),
});

type SearchFormProps = {
  className?: string;
};

const SearchForm = ({ className }: SearchFormProps): ReactElement => {
  const router = useRouter();
  const formikRef = useRef(null);
  const [getUsers, { loading, error, data: { users = [] } = {} }] =
    useLazyQuery(SEARCH_USERS_QUERY);

  const itemToString = (user) => (user ? user.username : "");

  console.log({ value: formikRef.current?.values["query-input"] });

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    inputValue,
  } = useCombobox({
    items: users,
    itemToString,
    // TODO: fix issue: A component has changed the uncontrolled prop "selectedItem" to be controlled
    selectedItem: formikRef.current?.values["query-input"], // keep downshift value in sync with formik
    onSelectedItemChange: ({ selectedItem: { username } }) => {
      // reset form before navigating to user profile
      formikRef.current?.resetForm();

      router.push(
        {
          pathname: "/[username]",
        },
        `/${username}`,
      );
    },
    id: "query",
  });

  const wrapperClass = classNames("", {
    [className]: className,
  });

  const listClass = classNames(
    "border border-gray-200 divide-y divide-gray-200 absolute z-10 w-52",
    {
      hidden: !isOpen,
    },
  );

  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className="relative" {...getComboboxProps()}>
      <FormWrapper className={wrapperClass}>
        <Formik
          initialValues={{ "query-input": "" }}
          validationSchema={SearchSchema}
          innerRef={formikRef}
          onSubmit={async ({ "query-input": query }, { setSubmitting }) => {
            try {
              await getUsers({ variables: { query } });
            } catch (e) {
              console.error(e);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form className="flex flex-col w-52">
              <TextInput
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getInputProps({
                  label: "Search",
                  name: "query-input",
                  type: "search",
                })}
                handleChange={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      </FormWrapper>
      <ul
        className={listClass}
        {...getMenuProps()} // eslint-disable-line react/jsx-props-no-spreading
      >
        {isOpen ? (
          <SearchDropdown
            users={users}
            loading={loading}
            getItemProps={getItemProps}
            inputValue={inputValue}
            highlightedIndex={highlightedIndex}
          />
        ) : null}
      </ul>
    </div>
  );
};

export default SearchForm;
