import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 8080,
    open: true,
    cors: true,
    proxy: {
      '^/api': {
        target: 'http://192.168.2.131:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace('^/api/', '/'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      // 全局引入了 scss 的文件
      scss: {
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `,
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        // 移除打包element时的@charset警告
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
});
