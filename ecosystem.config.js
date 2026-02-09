module.exports = {
    apps: [
        {
            name: 'gratuity-client',
            cwd: './apps/client',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 3000',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        },
        {
            name: 'gratuity-admin',
            cwd: './apps/admin',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 3001',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 3001
            }
        }
    ]
};
