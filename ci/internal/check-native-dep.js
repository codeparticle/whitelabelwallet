/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
import fs from 'fs';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { dependencies } from '../../package.json';

(() => {
  if (!dependencies) {
    return;
  }

  const dependenciesKeys = Object.keys(dependencies);
  const nativeDeps = fs
    .readdirSync('node_modules')
    .filter(folder => fs.existsSync(`node_modules/${folder}/binding.gyp`));

  try {
    // Find the reason for why the dependency is installed. If it is installed
    // because of a devDependency then that is okay. Warn when it is installed
    // because of a dependency
    const dependenciesObject = JSON.parse(
      execSync(`npm ls ${nativeDeps.join(' ')} --json`).toString()
    );
    const rootDependencies = Object.keys(dependenciesObject.dependencies);
    const filteredRootDependencies = rootDependencies.filter((rootDependency) =>
      dependenciesKeys.includes(rootDependency)
    );

    if (filteredRootDependencies.length > 0) {
      const plural = filteredRootDependencies.length > 1;

      /* eslint-disable */
      console.log(`
${chalk.whiteBright.bgYellow.bold(
        'Webpack does not work with native dependencies.'
      )}
${chalk.bold(filteredRootDependencies.join(', '))} ${
        plural ? 'are native dependencies' : 'is a native dependency'
      } and should be installed inside of the "./app" folder.
First uninstall the packages from "./package.json":
${chalk.whiteBright.bgGreen.bold('npm uninstall your-package')}
${chalk.bold(
        'Then, instead of installing the package to the root "./package.json":'
      )}
${chalk.whiteBright.bgRed.bold('npm install your-package --save')}
${chalk.bold('Install the package to "./app/package.json"')}
${chalk.whiteBright.bgGreen.bold('cd ./app && npm install your-package --save')}
Read more about native dependencies at:
${chalk.bold(
        'https://github.com/chentsulin/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure'
      )}
`
      );
      /* eslint-disable */

      process.exit(1);
    }
  } catch (e) {
    console.log('Native dependencies could not be checked');
  }
})();