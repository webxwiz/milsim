module.exports = {
    apps: [
      {
        name: 'MilsimFront',
        exec_mode: 'fork',
        instances: '1', // Or a number of instances
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        env_local: {
          APP_ENV: 'local' // APP_ENV=local
        },
        env_development: {
          APP_ENV: 'dev' // APP_ENV=dev
        },
        env_production: {
          APP_ENV: 'prod', // APP_ENV=prod
          NEXTAUTH_URL: 'https://combinedinitiative.com',
          HOST_NAME_SERVER: 'https://api.combinedinitiative.com/graphql',
          DISCORD_CLIENT_ID: '1153033502468608090',
          DISCORD_CLIENT_SECRET: 'MakB7F_PNVjmkWE2UvyPqqxBhHPuwAIA',
          NEXTAUTH_SECRET: 'a_random_string_of_jumbo',
          NEXT_PUBLIC_GRAPHQL_URL: 'https://api.combinedinitiative.com/graphql',
          NEXT_PUBLIC_UPLOAD_URL: 'https://api.combinedinitiative.com'
        }
      }
    ]
  }
