import fastXML from "fast-xml-parser";

const soap = require("soap");

const url = 'http://localhost:9080/sct/ejerciciosWS?WSDL';
const soapClient = soap.createClientAsync(url);

let XMLParserOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false
};

export function getXMLMundo(args: any) {
    return soapClient.then((client: any) => {
        return client.getXMLMundoAsync(args)
    }).then((result: any) => {
        let rawResponse = result[1]; //raw data
        let match = rawResponse.replace(/<!--[\s\S]*?-->/g, '').match(/<Mundo>.*<\/Mundo>/i);
        if (match)
            return fastXML.parse(match[0], XMLParserOptions);
        ;
    }).catch((err: any) => {
        return err;
    });
}

export function getLibMundo(cp: boolean) {
    return soapClient.then((client: any) => {
        return client.getSvgMundoAsync({
            arg0: {
                CP: cp,
                nombreFichero: "Lib_symbol.svg"
            }
        })
    }).then((result: any) => {
        let rawResponse = result[1]; //raw data
        let match = rawResponse.match(/<defs.*<\/defs>/ims);
        if (match)
            return match[0];
    }).catch((err: any) => {
        return err;
    });
}

export function getSVGMundo(args: any) {
    return soapClient.then((client: any) => {
        return client.getSvgMundoAsync(args)
    }).then((result: any) => {
        let rawResponse = result[1]; //raw data
        let match = rawResponse.match(/<svg.*<\/svg>/ims);
        if (match)
            return match[0];
    }).catch((err: any) => {
        return err;
    });
}