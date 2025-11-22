import {expectType} from 'tsd';
import {parseLineColumnPath, stringifyLineColumnPath, type ParsedPath} from './index.js';

const parsed: ParsedPath = parseLineColumnPath('unicorn.js:8:14');
expectType<ParsedPath>(parsed);
expectType<ParsedPath>(parseLineColumnPath({file: 'unicorn.js'}));
expectType<ParsedPath>(parseLineColumnPath({file: 'unicorn.js', line: 1}));
expectType<ParsedPath>(parseLineColumnPath({file: 'unicorn.js', column: 1}));
expectType<ParsedPath>(parseLineColumnPath({file: new URL('file://path/to/unicorn.js')}));
expectType<ParsedPath>(parseLineColumnPath(new URL('file://path/to/unicorn.js')));

expectType<string>(stringifyLineColumnPath(parsed));
expectType<string>(stringifyLineColumnPath({file: 'unicorn.js'}));
expectType<string>(stringifyLineColumnPath({file: 'unicorn.js', line: 1}));
expectType<string>(stringifyLineColumnPath({file: 'unicorn.js', column: 1}));
