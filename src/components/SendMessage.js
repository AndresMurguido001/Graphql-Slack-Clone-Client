import styled from "styled-components";
import React from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import { withFormik } from "formik";
import FileUploads from './FileUpload'

const MessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
  display: grid;
  grid-template-columns: 40px auto;
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
      <FileUploads>
        <Button icon>
          <Icon name="plus circle" />
        </Button>
      </FileUploads>
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
