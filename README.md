# Causality

This project is my attempt to learn AI-based botting through setting an audio / video stream processing ai. Although eventually to be made general purpose, the initial use case would be to use the AI to play MOBA games such as League of Legends

## Status

WIP

TODO: properly setup, release, and put in badges

## Getting Started

Prerequistes:
- node
- yarn
- python 3.6.x

Run the following to setup:

```zsh
./scripts/bootstrap/python.sh
```

TODO: put together javascript bootstrap script
TODO: put in a better docs

## Structure of the Project

This project divides into two parts:

- AI "brain"
  - Python
  - Uses tensorflow, scikit, etc.,
  - Exposes an web server api
- Client UI interface
  - JavaScript
  - Uses the browser's automation API to send clicks / keystrokes
  - Uses the browser's stream-capture API to get A/V stream
  - Communicates with the python brain via web api

Run the JS side via `yarn run start`
Run the python side via `pipenv run devstart`

## Technical Project Management

The [tpm](./tpm) directory contains documentation, plans, and other such things related to the management of this project itself. In addition, I will use github to track the project's backlog, releases, and progress.
