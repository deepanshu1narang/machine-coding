const packageJSON = require("./package.json");

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJSON.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJSON.module,
                format: 'esm',
                sourcemap: true,
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
            postcss(),
        ],
        external: ["react", "react-dom"],
    },
    {
        input: "src/index.ts",
        output: [{ file: packageJSON.types }],
        plugins: [dts.default()],
        external: [/\.css/]
    }
]