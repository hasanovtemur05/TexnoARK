
import { useSignInMutation } from "../hooks/mutations"
import { Form, Input, Button } from "antd";  
import erp from "../../../assets/images/erp.jpg";
import { SignIn as SignInType} from "../types";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../utils/notification";


const SignIn = () => {
  const {mutate} = useSignInMutation()
  const navigate = useNavigate();
  const initialValues: SignInType = {
    phone_number: '',
    password: ''
  };


  function handleSubmit(values: SignInType): void {
    mutate(values, {
      onSuccess: (res) => {
        const access_token = res.data?.data?.tokens?.access_token
        console.log(res);
        localStorage.setItem("access_token",access_token );
        navigate("./admin-layout");
      },
      onError: (error) => {
        Notification('error', error.message)
      },
    });
  }
  
    return (
      <>
          <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-[50%] h-[100%] hidden md:block">
          <img src={erp} alt="erp" className="h-[100%] object-cover" />
        </div>
        <div className="w-[70%] flex flex-col justify-center items-center md:w-[50%]">
          <div className="w-full md:w-[60%]">
            <h1 style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold", padding: "10px 10px" }}>Sign-In</h1>
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={initialValues}
            >
              <Form.Item
                name="phone_number"
                label={<span style={{ fontSize: "14px" }}>Phone Number</span>}
                rules={[{ required: true, message: "Please input your phone number!" }]}
              >
                <Input placeholder="Enter your phone number" style={{ padding: "7px 15px", fontSize: "16px" }} />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span style={{ fontSize: "14px" }}>Password</span>}
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Enter your password" style={{ padding: "7px 15px", fontSize: "16px" }} />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ backgroundColor: "#ffa107", fontSize: "16px", padding: "25px" }}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
    )
  }
  export default SignIn