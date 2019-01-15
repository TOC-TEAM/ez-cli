import generate from '../lib/generate'
import { expectPrompts } from 'inquirer'
import ask from '../lib/ask'
import { vol } from 'memfs'

describe('generate web directories based on egg project', () => {
  let answers = {}
  beforeAll(async () => {
    expectPrompts([
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Your project contained modules',
        choices: ['account', 'position', 'resume', 'candidate'],
        check: [0, 1],
      },
      {
        type: 'list',
        name: 'jsAsset',
        message: 'Name of js asset directory',
        choices: ['js', 'javascript'],
        choose: 0,
      },
      {
        type: 'list',
        name: 'imgAsset',
        message: 'Name of image asset directory',
        choices: ['img', 'imgs', 'image', 'images'],
        choose: 0,
      },
      {
        type: 'list',
        name: 'fontAsset',
        message: 'Name of font asset directory',
        choices: ['font', 'fonts', 'iconfont', 'iconfonts'],
        choose: 0,
      },
    ])

    answers = await ask()
  })
  afterAll(() => {
    vol.reset()
  })
  it('should create directories correctly', async () => {
    await generate(answers)
    const directoryJson = vol.toJSON()
    expect(Object.keys(directoryJson)).toHaveLength(5)
  })
})
