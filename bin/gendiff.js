#!/usr/bin/env node
import { Command } from "commander/esm.mjs";

const program = new Command();

program.arguments("<filepath1> <filepath2>");
program.description("Compares two configuration files and shows a difference.");
program.version("1.0.0", "-V, --version", "output the version number");

program
  .option("-h, --help", "output usage information")
  .option("-f, --format [type]", "output format");

program.parse();
const options = program.opts();
if (options.help) program.help();
