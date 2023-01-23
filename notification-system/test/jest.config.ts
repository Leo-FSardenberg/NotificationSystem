/* eslint-disable prettier/prettier */
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from '../tsconfig.json';
import {Config} from 'jest'
export default {
  "moduleFileExtensions": ["js", "json", "ts"],
  
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },

  collectCoverageFrom: ['**/*.(tj)s'],
  coverageDirectory: '../coverage',
  testEnviornment: 'node',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}
