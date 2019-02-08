(function () {
    var myConnector = tableau.makeConnector();

myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "mag",
        alias: "magnitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "title",
        alias: "title",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "location",
        dataType: tableau.dataTypeEnum.geometry
    }];

    var tableSchema = {
        id: "RaveFeed",
        alias: "Study BUP14-CN-301",
        columns: cols
    };

    schemaCallback([tableSchema]);
};
myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://mundipharma-clinipace.mdsol.com/ravewebservices/datasets/V_BUP14_CN_301_lab.csv", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "mag": feat[i].properties.mag,
                "title": feat[i].properties.title,
                "location": feat[i].geometry
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Rave EDC Feed";
        tableau.submit();
    });
});
})();

