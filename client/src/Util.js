
function getAssetsUrl(path, withUrl=false) {
  if (withUrl) {
    return 'url(' + process.env.PUBLIC_URL + '/assets/' + path + ')';
  }
  return process.env.PUBLIC_URL + '/assets/' + path;
}

function resolveFilename(name) {
  return name.replace(" ", "_");
}

export default {
  getAssetsUrl,
  resolveFilename
};