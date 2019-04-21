import {expectType} from 'tsd';
import lineColumnPath = require('.');

const parsed = lineColumnPath.parse('unicorn.js:8:14');
expectType<lineColumnPath.ParsedPath>(parsed);
expectType<lineColumnPath.ParsedPath>(
	lineColumnPath.parse({file: 'unicorn.js'})
);
expectType<lineColumnPath.ParsedPath>(
	lineColumnPath.parse({file: 'unicorn.js', line: 1})
);
expectType<lineColumnPath.ParsedPath>(
	lineColumnPath.parse({file: 'unicorn.js', column: 1})
);

expectType<string>(lineColumnPath.stringify(parsed));
expectType<string>(lineColumnPath.stringify({file: 'unicorn.js'}));
expectType<string>(lineColumnPath.stringify({file: 'unicorn.js', line: 1}));
expectType<string>(lineColumnPath.stringify({file: 'unicorn.js', column: 1}));
