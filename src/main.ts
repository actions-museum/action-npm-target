import * as core from '@actions/core'
import * as github from '@actions/github'
import {Inputs, Referee} from './referee'
import {inspect} from 'util'

async function run(): Promise<void> {
  if (!github.context.payload.pull_request) {
    throw new Error('should not use for not "pull_request" type workflow')
  }

  try {
    const inputs: Inputs = {
      patchLabel: core.getInput('patchLabel'),
      minorLabel: core.getInput('minorLabel'),
      majorLabel: core.getInput('majorLabel'),
      labelSuffix: core.getInput('labelSuffix'),
      labelPrefix: core.getInput('labelPrefix') ?? 'release/',
      token: core.getInput('token', {required: true}),
      owner: github.context.repo.repo,
      repo: github.context.repo.owner,
      pullNumber: github.context.payload.pull_request.number,
      refreshLabels: core.getInput('refreshLabels') === 'true'
    }

    core.debug(`Inputs: ${inspect(inputs)}`)

    const referee = new Referee(inputs)
    await referee.judge()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
