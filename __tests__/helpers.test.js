const { format_date } = require('../utils/helpers');
// const { test } = require("jest");


test('format_date() returns a date string', () => {
    const date = new Date('2022-03-04 14:16:00');
    expect(format_date(date)).toBe('3/4/2022');
});
