import test from 'ava';
import {parseLineColumnPath, stringifyLineColumnPath} from './index.js';

test('parse string', t => {
	t.deepEqual(parseLineColumnPath('x.js:1:2'), {
		file: 'x.js',
		line: 1,
		column: 2,
	});

	const pathFixture = '/Users/sindresorhus/dev/unicorn/x.js';
	t.deepEqual(parseLineColumnPath(`${pathFixture}:1:2`), {
		file: pathFixture,
		line: 1,
		column: 2,
	});

	t.deepEqual(parseLineColumnPath('x.js:10'), {
		file: 'x.js',
		line: 10,
		column: 1,
	});

	t.deepEqual(parseLineColumnPath('x.js'), {
		file: 'x.js',
		line: 1,
		column: 1,
	});

	t.throws(() => {
		parseLineColumnPath(':1:1');
	}, {
		message: 'Missing file path',
	});
});

test('parse object', t => {
	t.deepEqual(parseLineColumnPath({
		file: 'x.js',
		line: 20,
		column: 10,
	}), {
		file: 'x.js',
		line: 20,
		column: 10,
	});

	t.deepEqual(parseLineColumnPath({
		file: 'x.js',
		line: 20,
	}), {
		file: 'x.js',
		line: 20,
		column: 1,
	});

	t.deepEqual(parseLineColumnPath({
		file: 'x.js',
	}), {
		file: 'x.js',
		line: 1,
		column: 1,
	});

	t.throws(() => {
		parseLineColumnPath({noop: 'x'});
	}, {
		message: 'Missing required `file` property',
	});
});

test('stringify', t => {
	t.is(stringifyLineColumnPath({
		file: 'x.js',
		line: 20,
		column: 10,
	}), 'x.js:20:10');

	t.is(stringifyLineColumnPath({
		file: 'x.js',
		line: 20,
	}), 'x.js:20');

	t.is(stringifyLineColumnPath({
		file: 'x.js',
	}), 'x.js');

	t.throws(() => {
		stringifyLineColumnPath({noop: 'x'});
	}, {
		message: 'Missing required `file` property',
	});

	t.is(stringifyLineColumnPath({
		file: 'x.js',
		line: 20,
		column: 10,
	}, {file: false}), '20:10');

	t.is(stringifyLineColumnPath({
		file: 'x.js',
		line: 20,
		column: 10,
	}, {column: false}), 'x.js:20');
});
