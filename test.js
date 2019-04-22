import path from 'path';
import test from 'ava';
import lineColumnPath from '.';

test('parse string', t => {
	t.deepEqual(lineColumnPath.parse('x.js:1:2'), {
		file: 'x.js',
		line: 1,
		column: 2
	});

	t.deepEqual(lineColumnPath.parse(path.join(__dirname, 'x.js') + ':1:2'), {
		file: path.join(__dirname, 'x.js'),
		line: 1,
		column: 2
	});

	t.deepEqual(lineColumnPath.parse('x.js:10'), {
		file: 'x.js',
		line: 10,
		column: 1
	});

	t.deepEqual(lineColumnPath.parse('x.js'), {
		file: 'x.js',
		line: 1,
		column: 1
	});

	t.throws(() => {
		lineColumnPath.parse(':1:1');
	}, 'Missing file path');
});

test('parse object', t => {
	t.deepEqual(lineColumnPath.parse({
		file: 'x.js',
		line: 20,
		column: 10
	}), {
		file: 'x.js',
		line: 20,
		column: 10
	});

	t.deepEqual(lineColumnPath.parse({
		file: 'x.js',
		line: 20
	}), {
		file: 'x.js',
		line: 20,
		column: 1
	});

	t.deepEqual(lineColumnPath.parse({
		file: 'x.js'
	}), {
		file: 'x.js',
		line: 1,
		column: 1
	});

	t.throws(() => {
		lineColumnPath.parse({noop: 'x'});
	}, 'Missing required `file` property');
});

test('stringify', t => {
	t.is(lineColumnPath.stringify({
		file: 'x.js',
		line: 20,
		column: 10
	}), 'x.js:20:10');

	t.is(lineColumnPath.stringify({
		file: 'x.js',
		line: 20
	}), 'x.js:20');

	t.is(lineColumnPath.stringify({
		file: 'x.js'
	}), 'x.js');

	t.throws(() => {
		lineColumnPath.stringify({noop: 'x'});
	}, 'Missing required `file` property');

	t.is(lineColumnPath.stringify({
		file: 'x.js',
		line: 20,
		column: 10
	}, {file: false}), '20:10');

	t.is(lineColumnPath.stringify({
		file: 'x.js',
		line: 20,
		column: 10
	}, {column: false}), 'x.js:20');
});
