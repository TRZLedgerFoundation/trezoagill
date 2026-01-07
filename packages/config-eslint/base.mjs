import trezoaConfig from '@trezoa/eslint-config-trezoa';
import trezoaJestConfig from '@trezoa/eslint-config-trezoa/jest';

export default [
    ...trezoaConfig,
    ...trezoaJestConfig,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            '@typescript-eslint/no-base-to-string': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/only-throw-error': 'off',
            '@typescript-eslint/prefer-promise-reject-errors': 'off',
            '@typescript-eslint/restrict-plus-operands': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/unbound-method': 'off',
            'jest/expect-expect': [
                'error',
                {
                    assertFunctionNames: ['expect', 'expectNewPreOffset', 'expectNewPostOffset'],
                },
            ],
        },
    },
];
