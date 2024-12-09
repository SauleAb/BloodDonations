export const REGISTER_FORM_FIELDS = [
    { placeholder: "Username", secureTextEntry: false, stateSetterKey: "setUsername" },
    { placeholder: "Email", secureTextEntry: true, stateSetterKey: "setEmail" },
    { placeholder: "Password", secureTextEntry: false, stateSetterKey: "setPassword" },
    { placeholder: "Confirm Password", secureTextEntry: false, stateSetterKey: "setConfirmPassword" },
];

export const REGISTER_PAGE_TEXT = {
    title: "Register",
    subTitle: "Fill in the fields to create your account",
    buttonText: "Register",
};
