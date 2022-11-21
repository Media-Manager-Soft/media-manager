import { shell } from "electron";
import openAboutWindow from "about-window";

const isMac = process.platform === 'darwin'

export const appMainMenu = [
  ...(isMac ? [{
    label: 'Media Manager',
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      // {role: 'services'}
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
      {role: 'minimize'},
      {role: 'zoom'},
      ...(isMac ? [
        {type: 'separator'},
        {role: 'front'},
        {type: 'separator'},
      ] : [
        {role: 'close'}
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
      {type: 'separator'},
      {
        label: 'About',
        click() {
          openAboutWindow({
              icon_path: __dirname + "\\..\\..\\icon.png",
              product_name: 'Media Manager',
              bug_report_url: 'https://github.com/Media-Manager-Soft/media-manager/issues/new',
              homepage: 'https://github.com/Media-Manager-Soft/media-manager',
              license: 'MIT',
              description: "By using this application, you accept that we are not responsible for the operation of the application.",
              adjust_window_size: false,
              win_options: {
                minimizable: false,
                fullscreenable: false,
                resizable: false,
                maximizable: false,
              }
            }
          );
        }
      }
    ]
  },
]

async function openUrl(url: string) {
  const {shell} = require('electron')
  await shell.openExternal(url)
}
