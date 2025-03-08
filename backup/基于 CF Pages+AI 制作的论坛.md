![](https://pic.superbed.cc/item/67cc5f5cf688033adb1f0021.jpg)

预览: [https://mode.pw](https://mode.pw/)

#### 基于 CF Pages+AI 制作的论坛

耗时 1 天,使用[windsurf](https://codeium.com/windsurf)制作而成.

全程基本没有自己编码,自己编码的部分不超过 10%,样式部分有自己改动.

<!--more-->

技术栈:

1. [honojs.dev](https://hono.dev/)
2. [Cloudflare Pages](https://pages.cloudflare.com/) & [D1 Database](https://developers.cloudflare.com/d1/)
3. [Pico css](https://picocss.com/) & [unocss](https://unocss.dev/)

由于基于了`CF`,流量不大的话,基本可以号称`永不停机`.

目前实现了

- 用户注册/登录
- 发帖/评论,支持 markdown 语法
- 管理员能编辑/删除 帖子/评论/标签
- 用户可以修改自己的帖子/评论,无法删除
- 第一个注册的用户是管理员

#### 部署流程

1. 在 [Cloudflare Pages](https://pages.cloudflare.com/) 中创建 D1 数据库,记下名称和ID.

2. 在项目根目录新增`wrangler.jsonc`文件.内容如下:(自己替换下面的变量)

```jsonc
{
  "name": "项目名称",
  "compatibility_date": "2025-03-04",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "vars": {
    "JWT_SECRET": "jwt密钥",
    "GRAVATAR_BASE_URL": "https://cdn.sep.cc/avatar/"
  },
  "d1_databases": [
     {
       "binding": "DB",
       "database_name": "d1数据库名称",
       "database_id": "d1数据库ID"
     }
  ]
}
```

[jwt 密钥生成器](https://jwt-keys.21no.de/) 加密算法选`HS256`,密钥长度选`32`.

3. 在项目根目录运行

```shell
-- 安装依赖
pnpm install

-- 执行数据库初始化脚本
npx wrangler d1 execute 数据库名 --file ./schema.sql --remote

-- 部署
pnpm run deploy
```
