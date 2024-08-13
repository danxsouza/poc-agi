import { test } from '../fixtures/testFixtures';

function getRandom(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}
const randomdata = ['pix', 'cartão', 'seguros'];
const invalidData = ['-----', 'xxxOP@~~', '~//[][[]]|'];

const data = getRandom(randomdata);
const invalid = getRandom(invalidData);


test.beforeEach(' Visit Blog Page', async ({ page }) => {
    await page.goto('/');
});

test('I Should fill input and search a value', async ({ blogPage }) => {
    await blogPage.searchBlog(data);
    await blogPage.checkTitleResult(data);
    await blogPage.valueInserting(data);
    await blogPage.checkArticleResult(data);
});

test('Checking an invalid search result and validate a message warning', async ({ blogPage }) => {
    await blogPage.checkInvalidSearch(invalid);
    await blogPage.valueInserting(invalid);
});