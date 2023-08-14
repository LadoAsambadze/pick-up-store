import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post("http://localhost:3000/login", data);
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Main>
        <LogIn>
          <Header>Login</Header>
          <Form>
            <InputField
              placeholder="Email address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <Warn>Please enter email address</Warn> */}
            {/* <Warn>Incorrect email</Warn> */}
            <InputField
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Warn>Please enter password</Warn>
            <Warn>Wrong password</Warn> */}
            <LogDone
              onClick={() => {
                handleLogin();
              }}
            >
              Login to your account
            </LogDone>
            <SingDiv>
              <Question>Don’t have an account?</Question>
              <SignUp onClick={() => navigate("/singup")}>Sing Up</SignUp>
            </SingDiv>
          </Form>
        </LogIn>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: none;
  background: #d4c9c9;
  @media (min-width: 768px) {
    padding: 40px 150px 120px 150px;
  }
  @media (min-width: 900px) {
    padding: 40px 200px 40px 200px;
  }
  @media (min-width: 1440px) {
    padding: 40px 500px 120px 500px;
  }
`;

const LogIn = styled(Box)`
  background: var(--semi-dark-blue, #14181a);
  width: 100%;
  padding: 40px 30px 40px 30px;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    padding: 32px;
    border-radius: 10px;
  }
`;

const Header = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 32px;
  font-family: Outfit;
  font-weight: 300;
  letter-spacing: -0.5px;
`;

const Form = styled(Box)`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const InputField = styled(Input)`
  font-size: 15px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  opacity: 0.5;
  padding: 0px 0px 18px 16px;
  color: var(--pure-white, #fff);
  border: none;
  margin-top: 24px;
  border-bottom: 1px solid #5a698f;
`;

const LogDone = styled(Button)`
  border-radius: 6px;
  background: var(--red, #fc4747);
  color: var(--pure-white, #fff);
  text-align: center;
  font-size: 13px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 14px 30px 15px 30px;
  margin-top: 40px;
`;

const SingDiv = styled(Box)`
  width: 100%;

  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Question = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 15px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const SignUp = styled(Button)`
  color: var(--red, #fc4747);
  font-size: 12px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

// const Warn = styled(Typography)`
//   font-size: 12px;
//   font-family: Outfit;
//   font-style: normal;
//   font-weight: 300;
//   line-height: normal;
//   color: red;
//   margin-top: 5px;
//   margin-left: 3px;
// `;
