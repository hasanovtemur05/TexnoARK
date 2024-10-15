import { Formik, Field, FieldInputProps } from "formik";
// import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { SignUp as SignUpType} from "../types";


const SignUp= () => {

    const initialValues: SignUpType = {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
      };

      function handleSubmit(_values: SignUpType): void {
        console.log(_values);
        
      }

  return (
    <div style={{ margin: "auto", marginTop: "50px" }} className="max-w-64 lg:max-w-[450px]">
      <Formik
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        {() => (
          <Form layout="vertical" >
            <Form.Item
              label="First Name"
            
            >
              <Field name="first_name">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="First Name" />
                )}
              </Field>
            </Form.Item>

            <Form.Item
              label="Last Name"
          
            >
              <Field name="last_name">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Last Name" />
                )}
              </Field>
            </Form.Item>

            <Form.Item
              label="Phone Number"
            
            >
              <Field name="phone_number">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Phone Number" />
                )}
              </Field>
            </Form.Item>

            <Form.Item
              label="Email"
          
            >
              <Field name="email">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} placeholder="Email" />
                )}
              </Field>
            </Form.Item>

            <Form.Item
              label="Password"
            >
              <Field name="password">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input.Password {...field} placeholder="Password" />
                )}
              </Field>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp