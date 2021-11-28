const packages = ['icon1-api'];

const testMatches = []
const testMatchesLint = []

packages.forEach(pkg => {
    testMatches.push(...[
        '<rootDir>/' + pkg + '/src/**/*.(test|spec).(js|ts|tsx)',
        '<rootDir>/' + pkg + '/tests/**/*.(test|spec).(js|ts|tsx)',
    ])
    testMatchesLint.push(...[
        '<rootDir>/' + pkg + '/src/**/*.(js|ts|tsx)',
        // '<rootDir>/' + pkg + '/src/**/*.(test|spec|d).(js|ts|tsx)',
        '<rootDir>/' + pkg + '/tests/**/*.(test|spec|d).(js|ts|tsx)',
    ])
})

const base = {
    transformIgnorePatterns: [
        'node_modules/?!(@icon1)',
    ],
    /*transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },*/
    moduleNameMapper: {
        '^@icon1/core(.*)$': '<rootDir>/icon1-core/src$1',
        '^@icon1/react(.*)$': '<rootDir>/icon1-react/src$1',
        '^@icon1/mui(.*)$': '<rootDir>/icon1-mui/src$1',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '(tests/.*.mock).(jsx?|tsx?)$',
    ],
    verbose: true,
};

module.exports = {
    ...base,
    projects: [
        {
            displayName: 'test',
            ...base,
            testMatch: testMatches,
        },
        {
            displayName: 'lint',
            runner: 'jest-runner-eslint',
            ...base,
            testMatch: testMatchesLint,
        },
    ],
    coverageDirectory: '<rootDir>/../coverage',
};
