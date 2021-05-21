module.exports = {
    commands: 'weather',
    expectedArgs: '<location',
    permissionError: 'You need admin permissions to run this command.',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        // API call 
    },
    requiredRoles: '',
    permissions: ''
}