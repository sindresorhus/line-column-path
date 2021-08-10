import {expectType} from 'tsd';
import {parseLineColumnPath, stringifyLineColumnPath, ParsedPath} from './index.js';

const parsed = parseLineColumnPath('unicorn.js:8:14'); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
expectType<ParsedPath>(parsed);
expectType<ParsedPath>(
	parseLineColumnPath({file: 'unicorn.js'}),
);
expectType<ParsedPath>(
	parseLineColumnPath({file: 'unicorn.js', line: 1}),
);
expectType<ParsedPath>(
	parseLineColumnPath({file: 'unicorn.js', column: 1}),
);

expectType<string>(stringifyLineColumnPath(parsed));
expectType<string>(stringifyLineColumnPath({file: 'unicorn.js'}));
expectType<string>(stringifyLineColumnPath({file: 'unicorn.js', line: 1}));
expectType<string>(stringifyLineColumnPath({file: 'unicorn.js', column: 1}));
