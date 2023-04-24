import React, { useReducer } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { Feather } from "@expo/vector-icons";
import {
  validateEmail,
  validatePassword,
} from "../utils/validationConstraints";
import { reducer } from "../utils/reducers/formReducer";

const initialState = {
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = (inputId, inputValue) => {
    let result;
    if (inputId === "email") {
      result = validateEmail(inputId, inputValue);
    } else if (inputId === "password") {
      result = validatePassword(inputId, inputValue);
    }

    dispatchFormState({
      validationResult: result,
      inputId,
    });
  };

  return (
    <>
      <Input
        id="email"
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        icon="mail"
        iconPack={Feather}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities.email}
      />

      <Input
        id="password"
        label="Password"
        autoCapitalize="none"
        secureTextEntry
        icon="lock"
        iconPack={Feather}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities.password}
      />

      <SubmitButton
        title="Sign in"
        onPress={() => console.log("Button pressed")}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignInForm;
