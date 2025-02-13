import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          open: true, // Opens the analysis in your browser after build
        }),
      ],
    },
  },
});
