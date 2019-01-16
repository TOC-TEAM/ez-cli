const downloadGitRepo = require('download-git-repo')
const request = require('request-promise-native')

exports.getBoilerplates = function getBoilerplates(username) {
  return request({
    uri: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': username,
    },
    json: true,
  })
    .then(res => {
      if (Array.isArray(res) && res.length > 0) {
        return res.map(item => {
          return {
            name: item.name + '    ' + item.description,
            value: item.full_name,
          }
        })
      }
    })
    .catch(err => {
      throw err
    })
}

exports.download = function download({ repository, branch, destination }) {
  return new Promise((resolve, reject) => {
    downloadGitRepo(`${repository}#${branch}`, destination, options, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}
