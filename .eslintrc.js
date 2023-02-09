module.exports = {
    root: true,
    extends: ['infojr-ts'],
    ignorePatterns: ['**/*.js'],
    rules: {
        'jsx-a11y/label-has-associated-control': [
            'error',
            { assert: 'either' },
        ],
    },
}
