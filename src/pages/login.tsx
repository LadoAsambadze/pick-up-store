import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { setUser } from "../store/user-slice";
import { setAuth } from "../store/extra-slice";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(1).max(32).required(),
});

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const getUserInfo = async () => {
    const cookieToken = getCookie("token");
    if (cookieToken) {
      const response = await axios.get("http://localhost:3000/user/profile", {
        headers: {
          authorization: `Bearer ${cookieToken}`,
        },
      });
      dispatch(setUser(response.data.useData));
      dispatch(setAuth(true));
    }
  };
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    if (!errors.email) {
      try {
        const response = await axios.post(
          "http://localhost:3000/user/login",
          data
        );
        Cookies.set("token", response.data.token);
        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Login failed:", error);
          console.log(error.response?.data);
          setErrorMessage(error.response?.data.message);
        }
      }
    }
    getUserInfo();
  };

  return (
    <>
      <Main>
        <LogIn>
          <Header>Welcome back!</Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              placeholder="Email address"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && <Warn>Please enter email address</Warn>}
            {errorMessage && <Warn>{errorMessage}</Warn>}
            <InputField
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <Warn>Please enter password</Warn>}
            {errorMessage && <Warn>{errorMessage}</Warn>}
            <Forgot>Forgot Password?</Forgot>
            <LogDone type="submit">Login to your account</LogDone>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: none;
  background: #d4c9c9;
  @media (min-width: 768px) {
    padding: 40px 150px 40px 150px;
  }
  @media (min-width: 900px) {
    padding: 40px 350px 40px 350px;
  }
  @media (min-width: 1440px) {
    padding: 40px 500px 40px 500px;
  }
`;
const LogIn = styled(Box)`
  background: white;
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
  font-family: "Ysabeau Office", sans-serif;
  color: #169c89;
  font-size: 32px;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Form = styled("form")`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const InputField = styled("input")`
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #ddd;
  background: #f8f8f8;
  font-family: "Ysabeau Office", sans-serif;
  color: black;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 24px;
`;
const LogDone = styled(Button)`
  border-radius: 10px;
  background: #169c89;
  color: white;
  text-align: center;
  font-size: 13px;
  font-family: "Ysabeau Office", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 14px 30px 15px 30px;
  margin-top: 40px;
  &:hover {
    background: #30a167;
  }
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
  color: #169c89;
  font-size: 15px;
  font-family: "Ysabeau Office", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SignUp = styled(Button)`
  background: #169c89;
  color: white;
  font-size: 14px;
  font-family: "Ysabeau Office", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 10px;
  &:hover {
    background: #30a167;
  }
`;

const Warn = styled(Typography)`
  font-family: "Ysabeau Office", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: red;
  margin-top: 5px;
  margin-left: 3px;
`;

const Forgot = styled(Typography)`
  font-family: "Ysabeau Office", sans-serif;
  color: #169c89;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 18px;
  margin-left: 3px;
  cursor: pointer;
`;
