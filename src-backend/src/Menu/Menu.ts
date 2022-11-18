import {shell} from "electron";

const isMac = process.platform === 'darwin'

export const appMainMenu = [
  ...(isMac ? [{
    label: 'Media Manager',
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      // {role: 'services'},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideOthers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  }] : []),
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Report a bug...',
        click() {
          openUrl('https://github.com/Media-Manager-Soft/media-manager/issues/new')
        }
      },
      {
        label: 'Learn more...',
        click() {
          openUrl('https://github.com/Media-Manager-Soft/media-manager')
        }
      },
      {
        label: 'Discussion...',
        click() {
          openUrl('https://github.com/Media-Manager-Soft/media-manager/discussions')
        }
      },
    ]
  },
]

async function openUrl(url: string) {
  const {shell} = require('electron')
  await shell.openExternal(url)
}
