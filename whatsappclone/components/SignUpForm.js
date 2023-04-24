import React, { useReducer } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { Feather, FontAwesome } from "@expo/vector-icons";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "../utils/validationConstraints";

import { reducer } from "../utils/reducers/formReducer";

const initialState = {
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = (inputId, inputValue) => {
    let result;
    if (inputId === "firstName" || inputId === "lastName") {
      result = validateString(inputId, inputValue);
    } else if (inputId === "email") {
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
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities.firstName}
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities.lastName}
      />

      <Input
        id="email"
        label="Email"
        icon="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        iconPack={Feather}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities.email}
      />

      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCapitalize="none"
        secureTextEntry
        iconPack={Feather}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities.password}
      />

      <SubmitButton
        title="Sign up"
        onPress={() => console.log("Button pressed")}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignUpForm;
