import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
			include: ["src/lib-ts"],
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/lib-ts/index.tsx"),
			name: "ReactStepBuilder",
			formats: ["es", "umd"],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
		outDir: "dist",
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
	},
});
