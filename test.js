import url from 'node:url';
import path from 'node:path';
import test from 'ava';
import {parseLineColumnPath, stringifyLineColumnPath} from './index.js';

const fixturePath = path.resolve('/Users/sindresorhus/dev/unicorn/x.js');
const fixtureUrl = url.pathToFileURL(fixturePath);

test('parse string', t => {
	t.deepEqual(parseLineColumnPath('x.js:1:2'), {
		file: 'x.js',
		line: 1,
		column: 2,
	});

	t.deepEqual(parseLineColumnPath(`${fixturePath}:1:2`), {
		file: fixturePath,
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

test('parse URL', t => {
	t.deepEqual(parseLineColumnPath(fixtureUrl), {
		file: fixturePath,
		line: 1,
		column: 1,
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

	t.deepEqual(parseLineColumnPath({
		file: fixtureUrl,
	}), {
		file: fixturePath,
		line: 1,
		column: 1,
	});

	t.deepEqual(parseLineColumnPath({
		file: fixtureUrl,
		line: 20,
		column: 10,
	}), {
		file: fixturePath,
		line: 20,
		column: 10,
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
