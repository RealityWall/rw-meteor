Accounts.onResetPasswordLink((token, done) => {
    done();
    console.log('oklm');
    FlowRouter.go('/reset-password/' + token);
});