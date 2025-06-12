import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path"; // 导入 path 模块

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
  build: {
    // 打包结果的存放路径
    outDir: path.resolve(__dirname, "../server/public"),
    // 如果您的后端需要处理 history 模式的路由，可能需要设置这个
    // 但通常在后端进行 fallback 处理更常见
    // assetsDir: '', // 保持默认即可，或根据需要配置
    emptyOutDir: true, // 每次打包前清空 outDir 目录
  },
  server: {
    // 开发服务器配置
    port: 5173, // 默认端口，可以修改
    open: true, // 启动时自动打开浏览器
    // 可以配置代理，如果前端需要请求后端 API
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000', // 后端服务器地址
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
});
