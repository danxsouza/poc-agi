import { expect, type Page, type Locator} from '@playwright/test';
import messages  from '../utils/messages';


export class BlogPage {
    readonly page: Page;
    readonly inputSearch: Locator;
    readonly iconSearch: Locator;
    readonly titleSearch: Locator;
    readonly titleResult: Locator;
    readonly articleResult: Locator;
    readonly invalidText: Locator;
    readonly searchByNewValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputSearch = page.locator('(//input[@id="search-field"])');
        this.iconSearch = page.getByLabel("Link do ícone de pesquisa");
        this.titleSearch = page.locator('.page-title.ast-archive-title');
        this.titleResult = page.locator('h1[class="page-title ast-archive-title"] span');
        this.articleResult = page.locator('.ast-row');
        this.invalidText = page.locator('div[class="page-content"] p');
        this.searchByNewValue = page.locator('(//input[@id="search-field"])[2]');

    }

    async searchBlog(data: string) {
        await this.iconSearch.click();
        await expect(this.inputSearch).toBeVisible();
        await expect(this.inputSearch).toBeEmpty();
        await this.inputSearch.fill(data);
        await expect(this.inputSearch).toHaveValue(data);
        await this.inputSearch.press('Enter');
        await this.page.screenshot({path:  `./tests/screenshots/search-blog-page-${data}.png`});
    }

    async checkTitleResult(data: string) {
        await expect(this.titleSearch).toBeVisible();
        await expect(this.titleSearch).toContainText(messages.validSearch.title);
        await this.page.screenshot({path: `./tests/screenshots/show-title-page-${data}.png`});
    }

    async valueInserting(value : string) {
       const result =  this.page.locator('//h1[@class="page-title ast-archive-title"]//span[contains(text(), value)]');
       await expect(result).toHaveText(value);
    }

    async checkArticleResult(data: string) {
       await expect(this.articleResult).toBeVisible();
       await expect(this.articleResult).not.toBeEmpty();
       await this.page.screenshot({path: `./tests/screenshots/article-show-page-${data}.png`});
    }

    async checkInvalidSearch(invalid: string) {
        await this.iconSearch.click();
        await this.inputSearch.fill(invalid);
        await expect(this.inputSearch).toHaveValue(invalid);
        await this.inputSearch.press('Enter');
        await expect(this.invalidText).toBeVisible();
        await expect(this.invalidText).toContainText(messages.invalidSearch.message);
        await expect(this.searchByNewValue).toBeVisible();
        await expect(this.searchByNewValue).toBeEmpty();
        await this.page.screenshot({path: `./tests/screenshots/invalid-search-page.png`});
    }
}