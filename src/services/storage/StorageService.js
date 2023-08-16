const fs = require('fs');
const { Pool } = require('pg');

class StorageService {
  constructor(folder) {
    this._pool = new Pool();
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  async writeFile(file, meta, id) {
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    const query = {
      text: 'UPDATE albums SET cover = $1 WHERE id = $2',
      values: [filename, id],
    };

    await this._pool.query(query);

    return new Promise((resolve, rejects) => {
      fileStream.on('error', (error) => rejects(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
