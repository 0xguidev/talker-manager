const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const writeContentFile = async (path, content) => {
  try {
    const arrContent = await readContentFile(path);

    arrContent.push(content);
    await fs.writeFile(path, JSON.stringify(arrContent));

    return content;
  } catch (error) {
    return null;
  }
};

const updateContentFile = async (path, content) => {
  try {
    await fs.writeFile(path, JSON.stringify(content));

    return content;
  } catch (err) {
    return null;
  }
};

const deleteContentFile = async (path, ID) => {
  try {
  const talkers = await readContentFile(path);
        
  const newTalkers = talkers.filter((t) => t.id !== parseInt(ID, 10));

  await fs.writeFile(path, JSON.stringify(newTalkers));
  } catch (err) {
    return null;
  }
};

module.exports = {
  readContentFile,
  writeContentFile,
  updateContentFile,
  deleteContentFile,
};
