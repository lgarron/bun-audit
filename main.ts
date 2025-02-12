#!/usr/bin/env bun

import { cp, mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { exit } from "node:process";
import { $, file, spawn } from "bun";

const tempDir = await mkdtemp("/tmp/bun-audit-temp-");
let exitCode = 0;
try {
	if (!(await file("./package.json").exists())) {
		console.error("No package.json in the current folder.");
		exit(1);
	}
	const bunLockfile = await (async () => {
		for (const path of ["./bun.lock", "./bun.lockb"]) {
			if (await file(path).exists()) {
				return path;
			}
		}
		console.error(
			"No bun lockfile (`bun.lock` or `bun.lockb`) in the current folder.",
		);
		exit(1);
	})();
	await cp("./package.json", join(tempDir, "package.json"));
	await $`bun ${bunLockfile} > ${join(tempDir, "yarn.lock")}`;
	exitCode = await spawn(["bun", "x", "yarn", "--cwd", tempDir, "audit"], {
		stdout: "inherit",
	}).exited;
} finally {
	await rm(tempDir, { force: true, recursive: true });
}
exit(exitCode);
