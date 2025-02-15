import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ),
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // JSX에서 React import 필요 제거
      'import/order': [
        'error', // 경고 대신 오류로 처리
        {
          groups: [
            'builtin', // node 내장 모듈 (fs, path 등)
            'external', // 외부 패키지 (react 등)
            'internal', // 내부 경로에서 가져온 파일
            ['sibling', 'parent'], // 같은 폴더나 부모 폴더
            'index', // index.js (폴더 내 index 파일)
            'unknown', // 알 수 없는 타입
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before', // React는 항상 최상단에 배치
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always', // 그룹 간 공백 추가
          alphabetize: {
            order: 'asc', // 알파벳 순서로 정렬 (오름차순)
            caseInsensitive: true, // 대소문자 구분 없음
          },
        },
      ],
    },
  },
];

export default eslintConfig;
