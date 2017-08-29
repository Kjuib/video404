module.exports.load = load;

function load() {
    console.log('process.env["HOME"]', process.env["HOME"]);
    console.log('process.env["USERPROFILE"]', process.env["USERPROFILE"]);
}

load();
