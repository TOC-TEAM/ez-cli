// module.exports = {
//   apps: [
//     {
//       name: "union_website",
//       script: "yarn run deploy",

//       // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
//       args: "one two",
//       instances: 1,
//       autorestart: true,
//       watch: false,
//       max_memory_restart: "1G",
//       env: {
//         NODE_ENV: "development",
//       },
//       env_test: {
//         PORT: 3099,
//         NODE_ENV: "test",
//       },
//       env_production: {
//         NODE_ENV: "production",
//       },
//     },
//   ],
//   deploy: {
//     production: {
//       user: "node",
//       host: "212.83.163.1",
//       ref: "origin/master",
//       repo: "git@github.com:repo.git",
//       path: "/var/www/production",
//       "post-deploy":
//         "npm install && pm2 reload ecosystem.config.js --env production",
//     },
//   },
// };

module.exports = {
  apps: [
    {
      name: 'union_website',
      script: 'yarn run deploy',
      // 开发环境变量
      env: {
        NODE_ENV: 'development',
      },
      // 测试环境变量
      env_test: {
        NODE_ENV: 'test',
      },
      // 生产环境变量
      env_production: {
        NODE_ENV: 'production',
      },
      // 实例个数
      // instances: 2,
      // 集群模式
      // exec_mode: 'cluster',
      // 完整日志路径
      // output: '/opt/log/tob/node/output.log',
      // 错误日志路径
      // error: '/opt/log/tob/node/error.log',
      // 访问日志路径
      // log: '/opt/log/tob/node/tob-log.log',
      // 日志格式
      // log_type: 'json',
      // 合并日志
      // merge_logs: true,
      // 日志日期格式
      // log_date_format: 'YYYY-MM-DD HH:mm:ss'
    },
  ],
}
