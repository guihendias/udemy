export const reducer = (state, action) => {
    const { validationResult, inputId } = action;
  
    const updatedInputValidities = {
      ...state.inputValidities,
      [inputId]: validationResult,
    };
  
    let formIsValid = true;
  
    for (const key in updatedInputValidities) {
      if (updatedInputValidities[key] !== undefined) {
        formIsValid = false;
        break;
      }
    }
  
    return {
      inputValidities: updatedInputValidities,
      formIsValid,
    };
  };