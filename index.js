const fileExists = require('fs').existsSync;
const fs = require('fs').promises;
const AdmZip = require('adm-zip');

const replaceVars = (obj, variables) => {
  for (const name in obj) {
    if (typeof obj[name] === 'string') {
      if (obj[name].match(/\{\w+\}/)) {
        for (const s in variables) {
          obj[name] = obj[name].replace(`{${s}}`, variables[s]);
        }
      }
    } else {
      replaceVars(obj[name], variables);
    }
  }
};

(async () => {
  const environments = ['Development', 'Staging', 'Production'];
  for (const environment of environments) {
    const config = `./teams-package/${environment}.json`;
    if (fileExists(config)) {
      const variables = JSON.parse(await fs.readFile(config, 'utf8'));
      replaceVars(variables, variables);

      const manifest = JSON.parse(
        await fs.readFile(`./teams-package/manifest.json`, 'utf8')
      );
      replaceVars(manifest, variables);

      const zip = new AdmZip();
      zip.addLocalFile('./teams-package/color.png', '');
      zip.addLocalFile('./teams-package/outline.png', '');
      zip.addFile(
        'manifest.json',
        Buffer.from(JSON.stringify(manifest, null, 2))
      );
      await fs.writeFile(
        `./teams-package/${environment}.zip`,
        zip.toBuffer(),
        'binary'
      );
    }
  }
})();
