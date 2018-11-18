let appRoot = document.getElementById('appRoot') as HTMLDivElement;
if (appRoot === null) {
  appRoot = document.createElement('div');
  appRoot.id = 'appRoot';
  document.body.insertBefore(appRoot, document.body.firstChild);
}

export { appRoot };
