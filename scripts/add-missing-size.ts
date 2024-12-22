import { argv } from 'yargs';
import * as fs from 'fs';
import * as path from 'path';

function getViewBoxSizes(svgData: string) {
    const viewBoxRegExp = /<svg[^>]*(?:viewBox=\"(?:[0-9]*\ ){2}([0-9]+)\ ([0-9]+))[^>]*>/;

    const match = svgData.match(viewBoxRegExp);

    return (
        match && {
            width: +match[1],
            height: +match[2]
        }
    );
}

function removeSize(svgData: string) {
    const getRegExpType = (type: 'width' | 'height') => new RegExp(`<svg[^>]*((\ )?${type}=\"[0-9]+(?:px)?\"(\ )?)[^>]*>`);

    const replacer = (match: string, size: string) => {
        return match.replace(size, '');
    };

    return svgData.replace(getRegExpType('width'), replacer).replace(getRegExpType('height'), replacer);
}

function addSize(svgData: string, size: { width: number; height: number }) {
    const regexp = /<svg[^>]*>/;

    const replacer = (match: string) => {
        return match.replace(/\s*>$/, ` width="${size.width}px" height="${size.height}px">`);
    };

    return svgData.replace(regexp, replacer);
}

function save(filepath: string, filename: string, data: string) {
    fs.writeFileSync(path.join(filepath, filename), data, 'utf8');
}

const svgFiles = fs.readdirSync(argv.folder);

for (const svgFile of svgFiles) {
    let data = fs.readFileSync(path.join(argv.folder, svgFile), 'utf8');

    const viewBox = getViewBoxSizes(data);

    if (viewBox) {
        data = addSize(removeSize(data), viewBox);

        save(argv.folder, svgFile, data);
    }
}
