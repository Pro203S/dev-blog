import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { cp, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
);

let temporaryRoot;
let temporaryProject;

const writePost = async ({ id, title, publishDate }) => {
    await writeFile(
        path.join(temporaryProject, "posts", `${id}.md`),
        `---
id: ${id}
title: ${title}
description: navigation test fixture
publishDate: ${publishDate}
tags: ["test"]
---

# ${title}
`,
        "utf8",
    );
};

const readBuiltPost = (id) =>
    readFile(
        path.join(temporaryProject, "dist", "posts", id, "index.html"),
        "utf8",
    );

before(async () => {
    temporaryRoot = await mkdtemp(path.join(tmpdir(), "dev-blog-navigation-"));
    temporaryProject = path.join(temporaryRoot, "project");

    await cp(projectRoot, temporaryProject, {
        recursive: true,
        filter: (source) => {
            const relativePath = path.relative(projectRoot, source);
            const topLevelPath = relativePath.split(path.sep)[0];

            return ![".astro", ".git", "dist", "node_modules"].includes(
                topLevelPath,
            );
        },
    });

    await symlink(
        path.join(projectRoot, "node_modules"),
        path.join(temporaryProject, "node_modules"),
        "junction",
    );

    await Promise.all([
        writePost({
            id: "__navigation_test_older",
            title: "테스트용 오래된 글",
            publishDate: "2026-05-30",
        }),
        writePost({
            id: "__navigation_test_newer",
            title: "테스트용 최신 글",
            publishDate: "2026-06-01",
        }),
    ]);

    await execFileAsync(
        process.execPath,
        [
            path.join(
                temporaryProject,
                "node_modules",
                "astro",
                "bin",
                "astro.mjs",
            ),
            "build",
        ],
        { cwd: temporaryProject },
    );
});

after(async () => {
    if (temporaryRoot) {
        await rm(temporaryRoot, { force: true, recursive: true });
    }
});

test("현재 글에서 발행일 기준 이전 글과 다음 글로 연결한다", async () => {
    const html = await readBuiltPost("build_a_blog_using_astro");

    assert.match(
        html,
        /href="\/posts\/__navigation_test_older"[^>]*>[\s\S]*?이전 글[\s\S]*?테스트용 오래된 글[\s\S]*?<\/a>/,
    );
    assert.match(
        html,
        /href="\/posts\/__navigation_test_newer"[^>]*>[\s\S]*?다음 글[\s\S]*?테스트용 최신 글[\s\S]*?<\/a>/,
    );
});

test("인접 글이 없는 방향의 링크는 렌더링하지 않는다", async () => {
    const [oldestPostHtml, newestPostHtml] = await Promise.all([
        readBuiltPost("__navigation_test_older"),
        readBuiltPost("__navigation_test_newer"),
    ]);

    assert.doesNotMatch(oldestPostHtml, />\s*이전 글\s*</);
    assert.match(oldestPostHtml, />\s*다음 글\s*</);
    assert.match(newestPostHtml, />\s*이전 글\s*</);
    assert.doesNotMatch(newestPostHtml, />\s*다음 글\s*</);
});
