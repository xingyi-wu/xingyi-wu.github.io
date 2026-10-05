# Resources 页面维护说明

导航顺序：Skills → Resources → Beyond Research（保留原网页现有名称）。

- `resources.html`：APP / Notes / Dataset 展示页面。
- `yaya-daily.html`：芽芽日常独立下载页面。
- `resources.js`：鼠标拖动、滚轮横向滚动、触摸滑动及左右按钮。
- `assets/yaya/preview-1.svg` 至 `preview-5.svg`：明确标注的截图占位图，不是真实 APP 截图。

## 上传真实截图

把 3–5 张截图放进 `assets/yaya/`，推荐命名 `screenshot-1.png` 等。在 `resources.html` 中把相应 `<img src="...">` 改为真实图片路径，并更新 alt 描述，删除多余的 `<figure>` 即可。图片始终保持同一行。真实截图上传后删除提示中的 “Screenshots coming soon.”。

## 添加版本号和下载

在 `resources.html` 和 `yaya-daily.html` 中将 `Version: To be announced` 改为真实版本号。
推荐将 APK 上传到 GitHub Releases，然后把下载页的 `Download coming soon` 元素换为：

```html
<a class="download-link" href="实际的 Release APK 链接">Download for Android (.apk)</a>
```

也可以创建 `downloads/` 文件夹并放入 `YaYa-Daily.apk`，使用下载页 HTML 注释中提供的相对链接。当前没有安装包，不显示可下载按钮。

## 发布

将此压缩包中所有文件上传到现有 GitHub Pages 仓库根目录，覆盖对应文件。原有照片和 CV 已保留。新页面发布后的路径是 `resources.html`，下载介绍页是 `yaya-daily.html`。
