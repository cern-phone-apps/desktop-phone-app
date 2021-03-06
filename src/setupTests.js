import '@testing-library/jest-dom/extend-expect';

// Make Enzyme functions available in all test files without importing
window.require = require;

global.navigator = {};

global.navigator.mediaDevices = {
  getUserMedia: jest
    .fn()
    .mockResolvedValueOnce({ loggedIn: true })
    .mockRejectedValueOnce(new Error('Async error'))
};
