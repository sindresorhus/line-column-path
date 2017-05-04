import path from 'path';
import test from 'ava';
import m from '.';

test('parse string', t => {
	t.deepEqual(m.parse('x.js:1:2'), {
		file: 'x.js',
		line: 1,
		column: 2
	});

	t.deepEqual(m.parse(path.join(__dirname, 'x.js') + ':1:2'), {
		file: path.join(__dirname, 'x.js'),
		line: 1,
		column: 2
	});

	t.deepEqual(m.parse('x.js:10'), {
		file: 'x.js',
		line: 10,
		column: 1
	});

	t.deepEqual(m.parse('x.js'), {
		file: 'x.js',
		line: 1,
		column: 1
	});

	t.throws(() => {
		m.parse(':1:1');
	}, 'Missing file path');
});

test('parse object', t => {
	t.deepEqual(m.parse({
		file: 'x.js',
		line: 20,
		column: 10
	}), {
		file: 'x.js',
		line: 20,
		column: 10
	});

	t.deepEqual(m.parse({
		file: 'x.js',
		line: 20
	}), {
		file: 'x.js',
		line: 20,
		column: 1
	});

	t.deepEqual(m.parse({
		file: 'x.js'
	}), {
		file: 'x.js',
		line: 1,
		column: 1
	});

	t.throws(() => {
		m.parse({noop: 'x'});
	}, 'Missing required `file` property');
});

test('stringify', t => {
	t.is(m.stringify({
		file: 'x.js',
		line: 20,
		column: 10
	}), 'x.js:20:10');

	t.is(m.stringify({
		file: 'x.js',
		line: 20
	}), 'x.js:20');

	t.is(m.stringify({
		file: 'x.js'
	}), 'x.js');

	t.throws(() => {
		m.stringify({noop: 'x'});
	}, 'Missing required `file` property');

	t.is(m.stringify({
		file: 'x.js',
		line: 20,
		column: 10
	}, {file: false}), '20:10');

	t.is(m.stringify({
		file: 'x.js',
		line: 20,
		column: 10
	}, {column: false}), 'x.js:20');
});
