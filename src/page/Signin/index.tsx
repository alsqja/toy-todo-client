import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import theme from "../../styled/theme";
import { ILoginValues } from "./index.d";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userSelector, userState } from "../../store/user";
// import { useLogin } from "../../hooks/session";

export const Signin = () => {
  const [values, setValues] = useState<ILoginValues>({
    email: "",
    password: "",
  });
  // const [login, {called, data, loading, error}] = useLogin();
  const setUser = useSetRecoilState(userSelector);
  const setUserInfo = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      let value = e.target.value;

      setValues({
        ...values,
        [name]: value,
      });
    },
    [values]
  );

  const LoginClickHandler = () => {
    // TODO : 로그인 요청 보내기
    axios
      .post("http://localhost:4000/auth/signin", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setUser({ id: res.data.id });
        setUserInfo(res.data);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // LoginClickHandler();
    }
  };

  return (
    <LoginContainer>
      <Body style={{ marginTop: "30vh" }}>
        <StyledDiv>
          <KeyInput>이메일 :</KeyInput>
          <InputBox>
            <ValueInput
              type="text"
              placeholder="이메일 주소를 입력해 주세요."
              value={values.email}
              name="email"
              onChange={handleChange}
            />
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={values.password}
              placeholder="비밀번호를 입력해 주세요."
              onChange={handleChange}
              name="password"
              onKeyUp={handleKeyPress}
            />
          </InputBox>
        </StyledDiv>
        <ButtonBox>
          {/* <StyledButton>비밀번호 찾기</StyledButton> */}
          <NavLink to="/signup">
            <StyledButton>회원가입</StyledButton>
          </NavLink>
          <StyledButton onClick={LoginClickHandler}>로그인</StyledButton>
        </ButtonBox>
      </Body>
    </LoginContainer>
  );
};

const LoginContainer = styled.div``;

const Body = styled.div`
  margin: 15vh 0;
  height: 100%;
  width: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  margin-top: 5vh;
`;

const KeyInput = styled.div`
  font-size: 18px;
  padding-left: 160px;
  width: 200px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

const InputBox = styled.div`
  width: 360px;
`;

const ValueInput = styled.input`
  border: none;
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  border-radius: 13px;
  font-size: 17px;
  height: 40px;
  width: 230px;
  padding: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.div`
  &:hover {
    background: ${theme.palette.primaryLighter};
  }
  box-shadow: ${theme.palette.shadow01};
  border: none;
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  background: ${theme.palette.primary};
  width: 100px;
  height: 50px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
  color: white;
`;
