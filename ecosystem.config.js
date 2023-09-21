module.exports = {
    apps: [
      {
        name: 'MilsimFront',
        exec_mode: 'fork',
        instances: '1', // Or a number of instances
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 40104',
        env_local: {
          APP_ENV: 'local' // APP_ENV=local
        },
        env_development: {
          APP_ENV: 'dev' // APP_ENV=dev
        },
        env_production: {
          NODE_ENV: 'production',
          APP_ENV: 'prod', // APP_ENV=prod
        }
      }
    ]
  }
