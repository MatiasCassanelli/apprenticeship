const fs = require('fs');

const filesByExtension = (extension, dir, files = []) => {
  const foundFiles = fs.readdirSync(dir);
  foundFiles.forEach((file) => {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      filesByExtension(extension, name, files);
    } else if (name.match(`${extension}$`)) {
      files.push(name);
    }
  });
  return files;
};


const files = filesByExtension('.asd', __dirname);

console.log(files.length ? files : 'Any file matches that extension');
