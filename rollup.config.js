import babel from "@rollup/plugin-babel";
import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
	input: ["./src/index.js"],
	output: {
		file: "./dist/FloatingPreviewImg.js",
		format: "umd",
		name: "FloatingPreviewImg",
	},
	plugins: [babel(),nodeResolve()],
}