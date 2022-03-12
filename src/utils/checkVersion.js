// // 加载文件

// const filesInDirectory = dir => new Promise(resolve =>
//   dir.createReader().readEntries(entries => {
//     Promise.all(
//       entries
//         .filter(e => e.name[0] !== '.')
//         .map(e =>
//           e.isDirectory ? filesInDirectory(e) : new Promise(resolve => e.file(resolve))
//         )
//     )
//       .then(files => [].concat(...files))
//       .then(resolve)
//   })
// )

// // 遍历插件目录，读取文件信息，组合文件名称和修改时间成数据
// const timestampForFilesInDirectory = dir =>
//   filesInDirectory(dir).then(files => {
//     files.map(f => f.name + f.lastModifiedDate).join()
//   }
//   )

// // // 观察文件改动
// const watchChanges = (dir, lastTimestamp) => {
//   console.log(dir)
//   timestampForFilesInDirectory(dir).then(timestamp => {
//     // // 文件没有改动则循环监听watchChanges方法
//     if (!lastTimestamp || lastTimestamp === timestamp) {
//       // console.log(444)
//       setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s
//     } else {
//       console.log(2222)
//     }
//   })
// }

// const checkVersion = () => {
//   window.chrome.management.getSelf(self => {
//     console.log(self)
//     if (self.installType === 'development') {
//       // 获取插件目录，监听文件变化
//       window.chrome.runtime.getPackageDirectoryEntry(dir =>
//         watchChanges(dir)
//       )
//     }
//   })
// }

// // eslint-disable-next-line no-undef
// console.log(chrome.runtime.getManifest())
// // FilenameConflictAction: 'overwrite'
// // eslint-disable-next-line no-undef
// chrome.downloads.download({ url: 'https://test.negev.cn/brush-beans-ui.crx' }, (id) => {
//   console.log(id, 'sss')
// })

export default function checkVersion () {}
