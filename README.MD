# React + TypeScript + Vite

이 템플릿은 Vite에서 HMR(Hot Module Replacement)과 일부 ESLint 규칙을 사용하여 React를 실행할 수 있는 최소한의 설정을 제공합니다.

현재 두 가지 공식 플러그인을 사용할 수 있습니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react): [Oxc](https://oxc.rs)를 사용합니다.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc): [SWC](https://swc.rs/)를 사용합니다.

## React Compiler

React Compiler는 개발 및 빌드 성능에 미치는 영향으로 인해 이 템플릿에서는 활성화되지 않았습니다. 컴파일러를 추가하려면 [이 문서](https://react.dev/learn/react-compiler/installation)를 참조하세요.

## ESLint 설정 확장

프로덕션 애플리케이션을 개발하는 경우, 타입 인식이 가능한 린트 규칙을 활성화하도록 설정을 업데이트하는 것을 권장합니다:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 다른 설정들...

      // tseslint.configs.recommended를 제거하고 아래 설정으로 대체
      tseslint.configs.recommendedTypeChecked,
      // 또는 더 엄격한 규칙을 위해 아래 설정 사용
      tseslint.configs.strictTypeChecked,
      // 선택적으로 스타일 관련 규칙을 위해 아래 설정 추가
      tseslint.configs.stylisticTypeChecked,

      // 다른 설정들...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 다른 옵션들...
    },
  },
])
```

React 전용 린트 규칙을 위해 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)와 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)을 설치할 수도 있습니다:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 다른 설정들...
      // React 린트 규칙 활성화
      reactX.configs['recommended-typescript'],
      // React DOM 린트 규칙 활성화
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 다른 옵션들...
    },
  },
])
```
