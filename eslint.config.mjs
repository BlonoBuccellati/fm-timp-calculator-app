import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      "semi": ["error"],

      // eslint-plugin-import のルール
      "import/order": [
        "error",
        {
          // アルファベット順に並べるかどうかを指定
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: [
            'builtin',//	Node.js の組み込みモジュール
            'external',//	外部ライブラリ
            'internal',//	自分のプロジェクト内
            'parent',//	../ を含む親ディレクトリからの import
            'sibling',// 同階層のファイルからの import
            'index', // index ファイル
          ],
          // グループごとに1行空ける
          'newlines-between': 'always',
        },
      ],
    },
  },
];

export default eslintConfig;
