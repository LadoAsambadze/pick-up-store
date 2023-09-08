import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState(null);
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
              <Warn>Please enter email address</Warn>
            )}

            {errorMessage && <Warn>{errorMessage}</Warn>}
            <InputField
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "min" && (
              <Warn>Password length must be minimum 4 digits</Warn>
            )}
            {errors.password?.type === "required" && (
              <Warn>Please enter password</Warn>
            )}

            <InputField
              placeholder="Confirm Password"
              type="password"
              {...register("repeatPassword", { required: true })}
            />

            {errors.repeatPassword?.type === "required" && (
              <Warn>Please enter password</Warn>
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
  backdrop-filter: blur(26.5px);
  @media (min-width: 768px) {
    padding: 32px;
    border-radius: 10px;
  }
  @media (min-width: 1440x) {
  }
`;

const Header = styled(Typography)`
  color: #169c89;
  font-size: 32px;
  font-family: Outfit;
  font-weight: 300;
  letter-spacing: -0.5px;
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
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: black;

  margin-top: 24px;
`;

const LogDone = styled(Button)`
  border-radius: 6px;
  background: #169c89;
  color: white;
  text-align: center;
  font-size: 13px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 14px 30px 15px 30px;
  margin-top: 40px;
  &:hover {
    background: #546b67;
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

const Warn = styled(Typography)`
  font-size: 12px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: red;
  margin-top: 5px;
  margin-left: 3px;
`;
