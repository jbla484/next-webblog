export const validateFullname = (fullname: string): RegExpMatchArray | null => {
    return fullname.match("^[A-Za-zs ']{1,}[.]{0,1}[A-Za-zs]{0,}$");
};

export const validateEmail = (email: string): RegExpMatchArray | null => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password: string): RegExpMatchArray | null => {
    return password.match(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    );
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword?: string
): boolean => {
    return password === confirmPassword;
};
