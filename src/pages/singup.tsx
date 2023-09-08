import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [sign, setSign] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(4).max(32),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")])

      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setErrorMessage(null);
      await axios.post("http://localhost:3000/user/singup", data);
      setSign(true);
    } catch (error) {
      console.error("Signup failed:", error);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <>
      {sign ? (
        <Succes>
          <SuccesOutDiv>
            <SuccessText>Successfully signed up!</SuccessText>
            <SuccesImg src="/check.png" alt="Succes sing icon" />
          </SuccesOutDiv>
        </Succes>
      ) : (
        <Main>
          <LogIn>
            <Header>Sign Up</Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                placeholder="Email address"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <Warn>Please enter an email address</Warn>
              )}

              {errorMessage && <Warn>{errorMessage}</Warn>}
              <InputField
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "min" && (
                <Warn>Password length must be a minimum of 4 digits</Warn>
              )}
              {errors.password?.type === "required" && (
                <Warn>Please enter a password</Warn>
              )}

              <InputField
                placeholder="Confirm Password"
                type="password"
                {...register("repeatPassword", { required: true })}
              />

              {errors.repeatPassword?.type === "required" && (
                <Warn>Please enter a password</Warn>
              )}
              {errors.repeatPassword?.type === "oneOf" && (
                <Warn>Passwords don't match</Warn>
              )}

              <LogDone type="submit">Create an account</LogDone>
              <SingDiv>
                <Question>Already have an account?</Question>
                <SignUp onClick={() => navigate("/login")}>Login</SignUp>
              </SingDiv>
            </Form>
          </LogIn>
        </Main>
      )}
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
    padding: 40px 200px 40px 200px;
  }
  @media (min-width: 1100px) {
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
  font-size: 10px;
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
const Succes = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 150px;
  padding-bottom: 200px;
`;

const SuccesOutDiv = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessText = styled(Typography)`
  font-family: "Ysabeau Office", sans-serif;
  color: #169c69;
  font-weight: 400;
  font-size: 18px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
  @media (min-width: 1440px) {
    font-size: 32px;
  }
`;

const SuccesImg = styled("img")`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
  }
  @media (min-width: 1440px) {
    width: 100px;
    height: 100px;
  }
`;
