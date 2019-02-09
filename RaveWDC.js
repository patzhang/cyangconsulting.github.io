(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "userid",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "projectid",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "project",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "studyid",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "RaveFeed",
            alias: "Study BUP14-CN-301",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
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

