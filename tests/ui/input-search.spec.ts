import { test } from '../myFixtures/myFixtures';

function getRandom(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}
const randomdata = ['pix', 'cartão', 'seguro'];
const invalidData = ['-----', 'xxxOP@~~', '~//[][[]]'];


const data = getRandom(randomdata);
const invalid = getRandom(invalidData);


test.beforeEach(' Visit Blog Page', async ({ page }) => {
    await page.goto('/');
})


test('Fill input Search', async ({ blogPage }) => {
    await blogPage.searchBlog(data);
    await blogPage.checkTitleResult(data);
    await blogPage.checkArticleResult(data);

});

test('Check invalid search result', async ({ blogPage }) => {
   // await blogPage.searchBlog(invalid);
    await blogPage.checkInvalidSearch(invalid);
});




