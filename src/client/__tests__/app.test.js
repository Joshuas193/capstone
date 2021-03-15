import { createPost } from "../js/app";

test('createPost is declared', () => {
  expect(createPost).toBeDefined();
});

test('createPost is a function', () => {
  expect(typeof createPost).toBe('function');
});