import { readdirSync, statSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const filesByExtension = (extension, dir, files = []) => {
  const foundFiles = readdirSync(dir);
  foundFiles.forEach((file) => {
    const name = dir + '/' + file;
    if (statSync(name).isDirectory()) {
      filesByExtension(extension, name, files);
    } else if (name.match(`${extension}$`)) {
      files.push(name);
    }
  });
  return files;
};


const files = filesByExtension(process.argv[2], __dirname);

console.log(files.length ? files : 'Any file matches that extension');
