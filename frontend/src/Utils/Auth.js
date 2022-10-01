const Auth = {
    isAuthenticated: false,
    authenticate() {
        if (localStorage.getItem('authKey')) {
            this.isAuthenticated = true;
        }
    },
    checkAuth() {
        this.authenticate();
        return this.isAuthenticated;
    }
}

export default Auth;