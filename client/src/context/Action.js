export const LoginStart = (userCredentials)=>({
      type: "LOGIN_START"
});

export const LoginSucess = (user) => ({
    type : "LOGIN_SUCESS",
    payload : user,
});

export const LoginFailure = (user) =>({
    type: "LOGIN_FALIURE",
}); 