export const isAuthenticatedUser = (email, password, users) => {
    for (let user of users) {
        if (email === user.email && password === user.password) {
            return user;
        }
    }
    return null;
};

export const validateInputsSignUp = (firstName, lastName, email, password) => {
    const errorToAlerts = [];
    if (firstName.length < 2 || !/^[a-zA-Z ]+$/.test(firstName)) {
        errorToAlerts.push("Please fix your first name");
    }
    if (lastName.length < 2 || !/^[a-zA-Z ]+$/.test(lastName)) {
        errorToAlerts.push("Please fix your last name");
    }
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "" || !re.test(String(email).toLowerCase())) {
        errorToAlerts.push("Please fix your emaill address");
    }
    if (password.length < 6) {
        errorToAlerts.push(
            "Please fix your password to contain at least 6 characters"
        );
    }

    return errorToAlerts;
};

export const validateInputsSignIn = (email, password) => {
    const errorToAlerts = [];
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "" || !re.test(String(email).toLowerCase())) {
        errorToAlerts.push("Please fix your emaill address");
    }
    if (password.length < 6) {
        errorToAlerts.push(
            "Please fix your password to contain at least 6 characters"
        );
    }

    return errorToAlerts;
};

export const validateInviter = ({
                                    inviterName,
                                    setInviterName,
                                    quantity,
                                    setQuantity,
                                    phoneNumber,
                                    setPhoneNumber,
                                    email,
                                    setEmail
                                }) => {
    let generalError = false;
    if (!inviterName.value || !(/^([a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?)$/.test(inviterName.value))) {
        setInviterName({
            ...inviterName,
            error: true
        });
        generalError = true;
    } else {
        setInviterName({
            ...inviterName,
            error: false
        });
    }
    if (quantity.value < 1) {
        setQuantity({
            ...quantity,
            error: true
        });
        generalError = true;
    } else {
        setQuantity({
            ...quantity,
            value: parseInt(quantity.value),
            error: false
        });
    }
    let regExp = /^0\d+$/;
    if (phoneNumber.value !== "") {
        if (!regExp.test(phoneNumber.value) || !(phoneNumber.value.length === 10)) {
            setPhoneNumber({
                ...phoneNumber,
                error: true
            });
            generalError = true;
        }
    } else {
        setPhoneNumber({
            ...phoneNumber,
            error: false
        });
    }
    regExp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value !== "") {
        if (!regExp.test(String(email.value).toLowerCase())) {
            setEmail({
                ...email,
                error: true
            });
            generalError = true;
        }
    } else {
        setEmail({
            ...email,
            error: false
        });
    }

    return generalError;
}