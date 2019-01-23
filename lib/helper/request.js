const request = require('request-promise-native')
const execa = require('execa')

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
exports.getBranchList = function(repo, projectname) {
  return request({
    uri: `https://api.github.com/repos/${projectname}/branches`,
    headers: {
      'User-Agent': `${repo}`,
    },
    json: true,
  })
    .then(res => {
      if (Array.isArray(res) && res.length > 0) {
        return res.map(item => {
          return {
            name: item.name,
            value: item.name,
          }
        })
      }
    })
    .catch(err => {
      throw err
    })
}

exports.download = function download({ repository, branch, destination }) {
  const args = ['clone', `https://github.com/${repository}`, '-b', branch]
  if (destination) {
    args.push(destination)
  }
  return execa('git', args, { stdio: 'inherit' })
}
