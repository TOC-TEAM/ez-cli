import ask from '../lib/action/init/ask'
import initAction from '../lib/action/init'
import { expectPrompts } from 'inquirer'
import parseArgv from '../lib/argv'
import { tildify } from '../lib/helper'
import request from '../lib/helper/request'
import path from 'path'

jest.spyOn(request, 'getBoilerplates').mockImplementation(() => [
  {
    name: 'egg-mpa',
    value: 'toc-boilerplate/egg-mpa',
  },
  {
    name: 'egg-react-ssr',
    value: 'toc-boilerplate/egg-react-ssr',
  },
])
jest.spyOn(request, 'getBranchList').mockImplementation(() => [
  {
    name: 'master',
    value: 'master',
  },
  {
    name: 'xl',
    value: 'xl',
  },
])
jest.spyOn(request, 'download').mockImplementation(() => true)

describe('ez init', async () => {
  it('should call getBoilerplates and download', async () => {
    const argv = await setPrompts()
    await initAction(argv)
    expect(request.getBoilerplates).toHaveBeenCalled()
    expect(request.getBoilerplates.mock.results[0].value).toHaveLength(2)
    expect(request.download).toHaveBeenCalled()
  })
})

async function setPrompts(dir = path.join(process.cwd(), 'exists')) {
  const argv = parseArgv(
    '--branch',
    'master',
    '--repo',
    'toc-boilerplate/egg-mpa'
  )
  await expectPrompts([
    {
      type: 'list',
      name: 'boilerplate',
      message: 'available boilerplates',
      choices: request.getBoilerplates(),
      choose: 0,
    },
    {
      type: 'list',
      name: 'branch',
      message: 'github branch will be fetched',
      choices: request.getBranchList(),
      choose: 0,
    },
  ])
  return argv
}
