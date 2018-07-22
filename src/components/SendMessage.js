import styled from "styled-components";
import React from "react";
import { Input } from "semantic-ui-react";
import { withFormik } from "formik";

const MessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const SendMessage = ({
  placeholder,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <MessageWrapper>
    <Input
      name="message"
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={e => {
        if (e.keyCode === 13 && !isSubmitting) {
          handleSubmit(e);
        }
      }}
      fluid
      placeholder={`Message # ${placeholder}`}
    />
  </MessageWrapper>
);

export default withFormik({
  mapPropsToValues: () => ({ message: "" }),
  handleSubmit: async (
    values,
    { props: { onSubmit }, resetForm, setSubmitting }
  ) => {
    if (!values.message || !values.message.trim()) {
      setSubmitting(false);
      return;
    }
    await onSubmit(values.message);
    resetForm(false);
  }
})(SendMessage);
