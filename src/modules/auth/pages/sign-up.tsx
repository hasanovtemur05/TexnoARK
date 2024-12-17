import { Input, Button, Form } from "antd";
import { SignUp as SignUpType } from "../types";
import { useSignUpMutation } from "../hooks/mutations";
import { Notification } from "../../../utils/notification";
import { useNavigate } from "react-router-dom";
import erp from "../../../assets/images/erp.jpg";
const SignUp = () => {
  const { mutate } = useSignUpMutation();
  const navigate = useNavigate();
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
        navigate("/");
      },
      onError: (error) => {
        Notification("error", error?.message);
      },
    });
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[50%] h-[100%] hidden md:block">
        <img src={erp} alt="erp" className="h-[100%] object-cover" />
      </div>

      <div className="w-[70%] flex flex-col justify-center items-center md:w-[50%]">
        <div className="w-full md:w-[60%]">
          <h1
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              padding: "10px 10px",
            }}
          >
            Register
          </h1>
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={initialValues}
          >
            <Form.Item
              name="first_name"
              label={<span style={{ fontSize: "14px" }}>first name</span>}
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                placeholder="Enter your first name"
                style={{ padding: "5px 15px", fontSize: "14px" }}
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              label={<span style={{ fontSize: "14px" }}>last name</span>}
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input
                placeholder="Enter your last name"
                style={{ padding: "5px 15px", fontSize: "14px" }}
              />
            </Form.Item>

            <Form.Item
              name="phone_number"
              label={<span style={{ fontSize: "14px" }}>phone number</span>}
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                placeholder="Enter your phone number"
                style={{ padding: "5px 15px", fontSize: "14px" }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span style={{ fontSize: "14px" }}>email</span>}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                style={{ padding: "5px 15px", fontSize: "14px" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ fontSize: "14px" }}>Password</span>}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                style={{ padding: "7px 15px", fontSize: "16px" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="font-medium "
                style={{
                  backgroundColor: "#ffa107",
                  fontSize: "16px",
                  padding: "25px",
                }}
                type="primary"
                htmlType="submit"
                block
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
