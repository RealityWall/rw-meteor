Accounts.onResetPasswordLink((token, done) => {
    done();
    FlowRouter.go('/reset-password/' + token);
});