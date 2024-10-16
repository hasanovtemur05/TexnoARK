import { Formik, Field, FieldInputProps, Form as FormikForm } from "formik";
import { Input, Button } from "antd";
import { SignUp as SignUpType } from "../types";
import { useSignUpMutation } from "../hooks/mutations";
import { Notification } from "../../../utils/notification";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { mutate } = useSignUpMutation();
  const navigate = useNavigate()
  const initialValues: SignUpType = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };

  function handleSubmit(values: SignUpType): void {
    const payload = { ...values };
    mutate(payload, {
      onSuccess: (res) => {
        console.log(res);
        navigate("/")
      },
      onError:(error) => {
        Notification('error', error?.message)
      }
    });
  }

  return (
    <div style={{ margin: "auto", marginTop: "50px" }} className="max-w-64 lg:max-w-[450px]">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <FormikForm onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <Field name="first_name">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="First Name" />
                )}
              </Field>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <Field name="last_name">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Last Name" />
                )}
              </Field>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <Field name="phone_number">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Phone Number" />
                )}
              </Field>
            </div>

            <div className="form-group">
              <label>Email</label>
              <Field name="email">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Email" />
                )}
              </Field>
            </div>

            <div className="form-group">
              <label>Password</label>
              <Field name="password">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input.Password {...field} placeholder="Password" />
                )}
              </Field>
            </div>

            <div className="form-group">
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
