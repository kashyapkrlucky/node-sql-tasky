exports.passwordGenerator = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$";
    let pass = '';
    for (let i = 0; i < length; i++) {
        pass += charset.charAt(Math.round(Math.random() * length));
    }
    return pass;
}