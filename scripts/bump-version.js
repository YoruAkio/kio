const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// change the version of package json, example 0.0.1 to 0.0.2 then if the version is above 0.0.9 it will be 0.1.0
const bumpVersion = version => {
    const versionArray = version.split('.');
    const lastVersion = versionArray[versionArray.length - 1];
    if (lastVersion >= 9) {
        versionArray[versionArray.length - 1] = 0;
        versionArray[versionArray.length - 2] =
            parseInt(versionArray[versionArray.length - 2]) + 1;
    } else {
        versionArray[versionArray.length - 1] = parseInt(lastVersion) + 1;
    }

    return versionArray.join('.');
};

// get the version of package json
const getVersion = () => {
    const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../package.json')),
    );
    return packageJson.version;
};

// update the version of package json
const updateVersion = version => {
    const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../package.json')),
    );
    packageJson.version = version;
    fs.writeFileSync(
        path.join(__dirname, '../package.json'),
        JSON.stringify(packageJson, null, 4),
    );
};

// get the version of package json
const version = getVersion();

// bump the version
const bumpedVersion = bumpVersion(version);

// update the version
updateVersion(bumpedVersion);

// commit the changes
exec(
    `git add . && git commit -m "bump version to ${bumpedVersion}" && git push origin master`,
    (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(stdout);
        console.log(stderr);
    },
);
