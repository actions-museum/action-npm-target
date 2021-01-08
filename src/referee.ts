import * as github from '@actions/github'
import * as core from '@actions/core'

export interface Inputs {
  patchLabel?: string
  minorLabel?: string
  majorLabel?: string
  labelSuffix?: string
  labelPrefix: string
  token: string
  owner: string
  repo: string
  pullNumber: number
  refreshLabels: boolean
}

export class Referee {
  constructor(private cfg: Inputs) {}

  async judge(): Promise<void> {
    const {owner, repo} = this.cfg

    const client = github.getOctokit(this.cfg.token)
    const {data: pr} = await client.pulls.get({
      owner,
      repo,
      pull_number: this.cfg.pullNumber
    })

    if (
      this.cfg.majorLabel &&
      pr.labels.find(label => label.name === this.cfg.majorLabel)
    ) {
      if (this.cfg.refreshLabels) await client.issues.removeAllLabels()
      await client.issues.addLabels({
        owner,
        repo,
        labels: [this.cfg.majorLabel],
        issue_number: pr.number
      })
      core.setOutput('major', true)
      core.setOutput('minor', false)
      core.setOutput('patch', false)
      return
    }

    if (
      this.cfg.minorLabel &&
      pr.labels.find(label => label.name === this.cfg.minorLabel)
    ) {
      if (this.cfg.refreshLabels) await client.issues.removeAllLabels()

      await client.issues.addLabels({
        owner,
        repo,
        labels: [this.cfg.minorLabel],
        issue_number: pr.number
      })
      core.setOutput('major', false)
      core.setOutput('minor', true)
      core.setOutput('patch', false)
      return
    }

    if (
      this.cfg.patchLabel &&
      pr.labels.find(label => label.name === this.cfg.patchLabel)
    ) {
      if (this.cfg.refreshLabels) await client.issues.removeAllLabels()
      await client.issues.addLabels({
        owner,
        repo,
        labels: [this.cfg.patchLabel],
        issue_number: pr.number
      })
      core.setOutput('major', false)
      core.setOutput('minor', false)
      core.setOutput('patch', true)
      return
    }
  }
}

export default {
  Referee
}
