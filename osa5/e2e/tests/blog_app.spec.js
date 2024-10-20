const { test, expect, beforeEach, describe } = require("@playwright/test")
const axios = require("axios")
const { loginWith, createBlog, initialBlogs } = require("./helper")
describe("Blog app", () => {
	beforeEach(async ({ page, request }) => {
		await request.post("http:localhost:5173/api/testing/reset")

		await request.post("http:localhost:5173/api/users", {
			data: {
				name: "david",
				username: "e2e_test",
				password: "login",
			},
		})

		await request.post("http:localhost:5173/api/users", {
			data: {
				name: "david",
				username: "e2e_test2",
				password: "login",
			},
		})

		await page.goto("http://localhost:5173")
	})

	test("Login form is shown", async ({ page }) => {
		await page.getByRole("button", { name: "login" }).click()
	})

	describe("Login", () => {
		test("succeeds with correct credentials", async ({ page }) => {
			await page.getByTestId("username").fill("e2e_test")
			await page.getByTestId("password").fill("login")

			await page.getByRole("button", { name: "login" }).click()

			await expect(page.getByText("david logged in")).toBeVisible()
		})

		test("fails with wrong credentials", async ({ page }) => {
			await page.getByTestId("username").fill("e2e_test")
			await page.getByTestId("password").fill("login22")

			await page.getByRole("button", { name: "login" }).click()

			await expect(page.getByText("wrong credentials")).toBeVisible()
		})
	})

	describe("When logged in", () => {
		beforeEach(async ({ page }) => {
			await page.getByTestId("username").fill("e2e_test")
			await page.getByTestId("password").fill("login")

			await page.getByRole("button", { name: "login" }).click()
			await expect(page.getByText("david logged in")).toBeVisible()
		})

		test("blog can be created", async ({ page }) => {
			await page.getByText("david logged in").waitFor()
			await page.getByRole("button", { name: "new blog" }).click()
			await page.getByTestId("title").fill("e2e")
			await page.getByTestId("author").fill("david")
			await page.getByTestId("url").fill("www.hello.com")
			await page.getByRole("button", { name: "create" }).click()

			await expect(page.getByText(`A new blog "e2e" by david added`)).toBeVisible()
		})
	})

	describe("a blog exists", () => {
		beforeEach(async ({ page }) => {
			await page.getByTestId("username").fill("e2e_test")
			await page.getByTestId("password").fill("login")

			await page.getByRole("button", { name: "login" }).click()
			await expect(page.getByText("david logged in")).toBeVisible()

			await page.getByRole("button", { name: "new blog" }).click()
			await page.getByTestId("title").fill("e2e")
			await page.getByTestId("author").fill("david")
			await page.getByTestId("url").fill("www.hello.com")
			await page.getByRole("button", { name: "create" }).click()
		})

		test("a blog can be liked", async ({ page }) => {
			const views = await page.getByRole("button", { name: "View" }).all()
			await views[views.length - 1].click()

			await expect(page.getByText(`likes:0`)).toBeVisible()
			await page.getByRole("button", { name: "like" }).click()
			await expect(page.getByText(`likes:1`)).toBeVisible()
		})

		test("a blog can be deleted after confirmation", async ({ page }) => {
			const views = await page.getByRole("button", { name: "View" }).all()
			const number = views.length
			await views[0].click()
			await page.getByRole("button", { name: "delete" }).click()
			page.once("dialog", async (dialog) => {
				expect(dialog.message()).toBe("remove blog [blog_title] by [author_name]")
				await dialog.accept()
				await expect(number).toBe(number - 1)
			})
		})
	})

	test("only blogcreater can delete", async ({ page }) => {
		await page.goto("http://localhost:5173")
		await page.getByTestId("username").fill("e2e_test")
		await page.getByTestId("password").fill("login")
		await page.getByRole("button", { name: "login" }).click()
		await page.getByText("david logged in").waitFor()
		const views = await page.getByRole("button", { name: "View" }).all()
		await views[0].click()
		await page.getByRole("button", { name: "delete" }).click()
		page.once("dialog", async (dialog) => {
			expect(dialog.message()).toBe("remove blog [blog_title] by [author_name]")
			await dialog.accept()
			await expect(
				page.getByText("Blog deletation wrong, you can only delete your own blogs")
			).toBeVisible()
		})
	})
	test("blogs are sorted correctly", async ({ page }) => {
		// Varmista, että kaikki blogit on ladattu

		// Hanki kaikki blogit
		const blogs = await page.locator(".blogStyle").all()
		const likes = []

		// Käy jokainen blogi läpi ja kerää tykkäykset
		for (let i of blogs) {
			await i.getByRole("button", { name: "View" }).click()
			const likeElement = await i.locator(".blog")
			const text = await likeElement.textContent()

			const likesNum = parseInt(text.replace("likes ", ""))
			if (isNaN(likesNum)) {
				throw new Error(`Failed to parse likes number from text: "${text}"`)
			}
			likes.push(likesNum)
		}

		const isSorted = likes.every((v, i, a) => i === 0 || a[i - 1] >= v)
		expect(isSorted).toBe(true)
	})
})
