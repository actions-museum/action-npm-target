# NPM Target
[![CI][CI]][CI-status]
[![GitHub Marketplace][MarketPlace]][MarketPlace-status]
[![Mergify Status][mergify-status]][mergify]

A GitHub Action that adds label based on the label attach.

If you attach label you specifed (or the default `release/{patch,minor,major}` label), the action will add a label that tells the release target.

## Usage

```yml
      - name: Merge
        uses: action-museum/action-npm-target@v1
```

### Custom tag

Specify the target label.

```yml
on: 
  pull_request:
    - types: [labeled]
jobs:
  auto-merge:
    - name: Merge
      uses: action-museum/action-npm-target@v1
      with:
        patchLabel: 'patch'
        minorLabel: 'minor'
        majorLabel: 'major'
        labelSuffix: 'release-
```

Example: This will add `release-patch` if `patch` label is attached. 

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `patchLabel` | Custom label that means patch update and attach the label | `release/patch` |
| `minorLabel` | Custom label that means minor update and attach the label | `release/minor` |
| `majorLabel` | Custom label that means major update and attach the label | `release/major` |
| `labelSuffix` | Suffix to add to the label | `` |
| `labelPrefix` | Prefix to add to the label | `release/` |
| `token` | GitHub token to use | `${{ github.token }}` |
| `refreshLabels` | Remove all labels before attaching or not | `false` |

#### Priority

The priority levels are as follows: the higher the priority level, the higher the priority of the label.

```
patchLabel < minorLabel < majorLabel
```

### Action outputs

| Name | Description | Type |
| --- | --- |  --- |
| `patch` | Is patch update | `boolean` |
| `minor` | Is minor update | `boolean` |
| `major` | Is major update | `boolean` |

## License

[MIT](LICENSE)

<!-- Badge links -->
[CI]: https://github.com/actions-museum/action-npm-target/workflows/Test/badge.svg
[CI-status]: https://github.com/action-museum/action-npm-target/actions?query=workflow%3Abuild-test

[MarketPlace]: https://img.shields.io/badge/Marketplace-Action%20NPM%20Target%20Merge-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=
[MarketPlace-status]: https://github.com/marketplace/actions/action-npm-target

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/action-museum/action-npm-target&style=flat
