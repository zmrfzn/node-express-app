/**
 * WARNING: This script will only work when
 * local SSH key is authorized for the user/repo
 */
const path = require("path");
const os = require("os")

const { execSync, exec } = require("child_process");
const fs = require("fs"); // Or `import fs from "fs";` with ESM

const repoName = "react-tutorials-crud";
const repoLink = `git@github.com:zmrfzn/${repoName}.git`;

const repoPath = path.join(os.tmpdir(),repoName);
const repoBuildLocation = `${repoPath}/build`;

const syscall = (command, stdOutLevel, cwd, execLog) => {
  console.log(execLog);
  execSync(command, {
    stdio: stdOutLevel,
    cwd: path.resolve(__dirname, cwd),
  });
};

// Switch to required branch
const switchBranch = () => {
  syscall(`git checkout otel`, [2], repoPath, "SWITCHING BRANCH to otel");
}

// Clone repo if not exists
if (!fs.existsSync(repoPath)) {
  // if(!fs.existsSync(path.resolve(__dirname, '../tmp'))) fs.mkdirSync(path.resolve(__dirname, '../tmp'))

  syscall(
    `git clone ${repoLink}`,
    [0, 1, 2],
    os.tmpdir(),
    "Repo doesn't exist,  cloning fresh"
  );
} else {
  switchBranch()
  syscall(
    `git pull`,
    [0,1,2],
    repoPath,
    "Repo exists, pulling latest")
}

// Run npm install
syscall(
  `npm install`,
  [2],
  repoPath,
  `INSTALLING PACKAGES`
);

// Build react app
syscall(
  `npm run build-otel`,
  [0,2],
  repoPath,
  `BUILDING APP..`
);

// Copy react build files to node app path
syscall(
  `cp -r ${repoBuildLocation} .`,
  [0,1,2],
  "",
  `COPYING BUILD FILES.. from ${path.resolve(
    __dirname,
    `${repoBuildLocation}`
  )}`
);

// clean up
if (fs.existsSync(repoBuildLocation)) {

  syscall(
    `rm -rf ${repoBuildLocation}`,
    [0, 1, 2],
    "",
    `CLEANING BUILD FILES..`
  );
}
console.log(`COMPLETE!!`);
