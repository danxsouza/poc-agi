import { test as base} from '@playwright/test';
import { BlogPage} from '../pages/blog-page';

type TestFixtures = {
    blogPage: BlogPage;
};

export const test = base.extend<TestFixtures>({
    blogPage: async ({ page }, use) => {
        await use(new BlogPage(page));
    },
});