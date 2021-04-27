### Hexlet tests and linter status:
[![Actions Status](https://github.com/malevka/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/malevka/frontend-project-lvl2/actions)

### Code Coverage by CodeClimate
[![Maintainability](https://api.codeclimate.com/v1/badges/da3979974696718a255a/maintainability)](https://codeclimate.com/github/malevka/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/da3979974696718a255a/test_coverage)](https://codeclimate.com/github/malevka/frontend-project-lvl2/test_coverage)

### Description
Compares two configuration files and shows a difference.

### Installation
    $ make install

### Usage
    $ gendiff [options] <filepath1> <filepath2>
      
      Options:
      -V, --version        output the version number
      -f, --format [type]  output format (default: "stylish")
      -h, --help           display help for command


### Examples
  * [Compare plain json structure](https://asciinema.org/a/405102)
  * [Compare plain yaml structure](https://asciinema.org/a/405103)
  * [Compare complex structure with default formatter stylish](https://asciinema.org/a/405104)
  * [Compare complex structure with formatter plain](https://asciinema.org/a/405105)
  * [Compare complex structure with formatter json](https://asciinema.org/a/405107)
