#!/usr/bin/env bash

### About
# Use this script to install pyenv and bootstrap
# get yourself up to speed with python
# 
# Prereqs:
# - zsh
# - mac-os
###

# Installs pyenv
# https://github.com/pyenv/pyenv
if [ -x "$(command -v pyenv)" ]; then
  echo "pyenv already installed!"
else
  echo "Installing pyenv..."
  brew update
  brew install pyenv
fi

# Setups pyenv into your zsh
if [ ! -z "$PYENV_ROOT" ]; then
  echo "PYENV_ROOT already set!"
else
  echo "Setting PYENV_ROOT..."
  echo '### PYENV' >> ~/.zshrc
  echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
  echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
  echo 'eval "$(pyenv init -)"' >> ~/.zshrc
  source ~/.zshrc
fi

# Sets up python 3.6.9 globally
if [[ "$(python --version)" =~ "Python 3.6" ]]; then
  echo "Correct version of python exists!"
else
  echo "Installing python 3.6.9"
  pyenv install 3.6.9
  pyenv global 3.6.9
  pyenv rehash
fi

# Setups pipenv
if [ -x "$(command -v pipenv)" ]; then
  echo "Pipenv already exists!"
else
  echo "Installing pipenv"
  pip install pipenv
fi

echo "Done!"