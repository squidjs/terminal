module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/app/$1',
        '^@common/(.*)$': '<rootDir>/common/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@ui/(.*)$': '<rootDir>/ui/$1',
    },
};
