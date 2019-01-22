const pEachSeries = require('p-each-series')

let pendingAssertions

exports.prompt = async prompts => {
  if (!pendingAssertions) {
    throw new Error(
      `inquirer was mocked and used without pending assertions: ${prompts}`
    )
  }

  const answers = {}
  let skipped = 0
  pEachSeries(async (prompt, i) => {
    if (prompt.when && !prompt.when(answers)) {
      console.log('=====', prompt.name)
      skipped++
      return
    }

    const setValue = val => {
      if (prompt.validate) {
        const res = prompt.validate(val)
        if (res !== true) {
          throw new Error(`validation failed for prompt: ${prompt}`)
        }
      }
      answers[prompt.name] = prompt.filter ? prompt.filter(val) : val
    }

    const a = pendingAssertions[i - skipped]
    if (!a) {
      console.error(`no matching assertion for prompt:`, prompt)
      console.log(prompts)
      console.log(pendingAssertions)
    }

    if (a.message) {
      const message =
        typeof prompt.message === 'function'
          ? prompt.message(answers)
          : prompt.message
      expect(message).toMatch(a.message)
    }

    let choices = ''
    if (prompt.choices === 'function') {
      choices = await prompt.choices(answers)
    } else {
      choices = prompt.choices
    }
    if (a.choices) {
      expect(choices.length).toBe(a.choices.length)
      a.choices.forEach((c, i) => {
        const expected = a.choices[i].value || a.choices[i]
        if (expected) {
          expect(choices[i].value || choices[i]).toMatch(expected)
        }
      })
    }

    if (a.input != null) {
      expect(prompt.type).toBe('input')
      setValue(a.input)
    }

    if (a.choose != null) {
      expect(prompt.type === 'list' || prompt.type === 'rawList').toBe(true)
      setValue(choices[a.choose])
    }

    if (a.check != null) {
      expect(prompt.type).toBe('checkbox')
      setValue(a.check.map(i => choices[i]))
    }

    if (a.confirm != null) {
      expect(prompt.type).toBe('confirm')
      setValue(a.confirm)
    }

    if (a.useDefault) {
      expect('default' in prompt).toBe(true)
      setValue(
        typeof prompt.default === 'function'
          ? prompt.default(answers)
          : prompt.default
      )
    }
  })

  expect(prompts.length).toBe(pendingAssertions.length + skipped)
  pendingAssertions = null

  return Promise.resolve(answers)
}

exports.expectPrompts = assertions => {
  pendingAssertions = assertions
}
