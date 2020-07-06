# Architecture and Specs

The objective of the causality project is to put together a general automation framework where we have:

- input from video / audio stream
- control output in the form of clicks and key strokes

[![initial architecture](./assets/causality-bot-architecture-diagram.svg)](https://docs.google.com/drawings/d/1DxbMOw0euA1VaXwIsjwfVcaSjDMGdqe9DOwypfDv6_I/edit)

## Features

The software here should do the following:

- Provide an UI with which to train the AI
- AI should consume input AV
- AI should be able to interact with clicks and keystrokes
- AI should be able to play LoL
- There should be an intermediate language between AV input and control clicks to the league client
- There should be a way of storing data into a local database

## References

- [drive: structural diagram](https://docs.google.com/drawings/d/1DxbMOw0euA1VaXwIsjwfVcaSjDMGdqe9DOwypfDv6_I/edit)
- [Python Flask: micro web framework](https://flask.palletsprojects.com/en/1.1.x/)