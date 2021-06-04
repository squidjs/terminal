// import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

export default [
    {
        input: 'src/index.ts',
        plugins: [
            // resolve(),
            commonjs(),
            typescript(),
        ],
        output: {
            file: 'dist/main.js',
            format: 'cjs',
        },
    },
    {
        input: 'ui/index.tsx',
        plugins: [
            // resolve(),
            commonjs(),
            typescript(),
            postcss({
                extract: path.resolve('dist/style.css'),
            }),
        ],
        output: {
            file: 'dist/renderer.js',
            inlineDynamicImports: true,
            format: 'cjs',
        },
    },
]
