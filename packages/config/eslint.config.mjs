export default [
  {
    ignores: ["dist/**", "build/**", "node_modules/**"]
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    rules: {
      "no-console": "warn"
    }
  }
];
