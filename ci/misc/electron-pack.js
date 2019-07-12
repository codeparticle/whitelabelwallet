require('babel-register');
const { exec } = require('child_process');

const commands = `
  rm -rf ./installers
  electron-builder build -mwl >&2
`;

const script = exec(`bash -c "${commands}"`);

script.stdout.on('data', (data) => console.log('\x1b[36m%s\x1b[0m', data));
script.stderr.on('data', (data) => console.log('\x1b[36m%s\x1b[0m', data));
