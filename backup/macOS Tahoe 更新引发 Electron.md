macOS Tahoe 更新引发 Electron 应用性能问题，用这个脚本查看 App 是否修复

![IMG_20251018_003110_784.jpg](https://msn.qzz.io/file/1760718800794_IMG_20251018_003110_784.jpg)

🔗：[GitHub](https://gist.github.com/tkafka/e3eb63a5ec448e9be6701bfd1f1b1e58)

❓早在上个月 macOS Tahoe 正式版系统推出后，就有用户发现一些依赖 Electron 的应用 GPU 占用率急剧上升。许多用户在升级系统后明显感受到设备运行变慢、发热加剧等问题，并向 Electron 提了 issue

💡 而后情况也逐渐明了：原因在于这些应用使用了名为“cornerMask”的私有 API，而 Apple 对该私有 API 的底层实现进行了修改，导致了上述问题。对此，Electron 更新了版本，彻底移除了对该私有 API 的调用，部分软件已经通过更新解决了这一问题

👀 今天介绍的这个脚本，正是检测你的 Mac 中还有哪些没有升级到新 Electron 版本，可能会导致你的电脑发热的 App，下载运行后便可一目了然。此外，还有网友专门制作了 页面，展示了部分主流 Electron App 的更新情况，大家也可前往查看

☹️ macOS Tahoe 正式版推出后，从软件适配、性能、UI 圆角到 Launchpad，差评声不绝于耳。但仔细想想，拟物到扁平再到 Big Sur，亦或是 HFS+ 到 APFS，一开始都遭到了大量的反对和批评，如今大家也习惯了。或许我们需要给 macOS Tahoe 一些时间，让更多的方案落地，让主流软件们尽快适配

