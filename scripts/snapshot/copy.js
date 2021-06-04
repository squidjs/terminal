const path = require('path')
const fs = require('fs')

const baseDirPath = path.resolve(__dirname, '..', '..')
const snapshotName = 'snapshot_blob.bin'
const v8snapshotName = require('os').arch === 'arm64' ? 'v8_context_snapshot.bin' : 'v8_context_snapshot.arm64.bin';
const pathToBlob = path.join(baseDirPath, snapshotName)
const pathToV8Blob = path.join(baseDirPath, v8snapshotName)

switch (process.platform) {
  case 'darwin': {
    const pathToElectron = path.resolve(
      __dirname,
      '..',
      '..',
      'node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources'
    )
    fs.copyFileSync(pathToBlob, path.join(pathToElectron, snapshotName))
    fs.copyFileSync(pathToV8Blob, path.join(pathToElectron, v8snapshotName))
    break
  }
  case 'win32':
  case 'linux': {
    const pathToElectron = path.resolve(
      __dirname,
      '..',
      '..',
      'node_modules',
      'electron',
      'dist'
    )
    fs.copyFileSync(pathToBlob, path.join(pathToElectron, snapshotName))
    fs.copyFileSync(pathToV8Blob, path.join(pathToElectron, v8snapshotName))
    break
  }
}
