;(function() {
  var myConnector = tableau.makeConnector()

  myConnector.getSchema = function(schemaCallback) {
    // https://tableau.github.io/webdataconnector/docs/api_ref.html#webdataconnectorapi.datatypeenum
    var cols = [
      {
        id: 'projectname',
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: 'viewname',
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: 'ordinal',
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: 'varname',
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: 'vartype',
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: 'varlength',
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: 'varformat',
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: 'varlabel',
        dataType: tableau.dataTypeEnum.string,
      },
    ]

    var tableSchema = {
      id: 'RaveFeed',
      alias: 'Study BUP14-CN-301',
      columns: cols,
    }

    schemaCallback([tableSchema])
  }

  myConnector.getData = function(table, doneCallback) {
    var userObj = JSON.parse(tableau.connectionData)

    var corsApiUrl = 'https://cors-anywhere.herokuapp.com/'
    var requestUrl =
      'https://mundipharma-clinipace.mdsol.com/ravewebservices/datasets/Clinicalviewmetadata.csv?projectname=BUP14-CN-301'

    function setHeader(xhr) {
      xhr.setRequestHeader(
        'Authorization',
        'Basic ' + btoa(userObj.username + ':' + userObj.password),
      )
    }

    function csvToJson(csvString) {
      tableau.log('converting CSV to JSON ...')
      /* https://www.papaparse.com/docs#config */
      var config = {
        delimiter: ',', // auto-detect
        newline: '', // auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: true,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        encoding: '',
        worker: false,
        comments: false,
        step: undefined,
        complete: undefined,
        error: undefined,
        download: false,
        skipEmptyLines: false,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
        delimitersToGuess: [
          ',',
          '\t',
          '|',
          ';',
          Papa.RECORD_SEP,
          Papa.UNIT_SEP,
        ],
      }
      var result = Papa.parse(csvString, config)
      return result.data
    }

    tableau.log('retrieving the csv file from remote server ...')
    $.ajax({
      url: corsApiUrl + requestUrl,
      type: 'GET',
      beforeSend: setHeader,
      success: function(data) {
        tableau.log('downloaded the csv file!')
        var json = csvToJson(data)
        // tableau.log(JSON.stringify(json.data))
        var tableData = []
        for (var i = 0, len = json.length; i < len; i++) {
          tableData.push({
            projectname: json[i].projectname,
            viewname: json[i].viewname,
            ordinal: json[i].ordinal,
            varname: json[i].varname,
            vartype: json[i].vartype,
            varlength: json[i].varlength,
            varformat: json[i].varformat,
            varlabel: json[i].varlabel,
          })
        }
        table.appendRows(tableData)
        doneCallback()
      },
      error: function() {
        alert('failed to download csv files from the remote server!')
      },
    })
  }

  tableau.registerConnector(myConnector)

  $(document).ready(function() {
    $('#submitButton').click(function() {
      var userObj = {
        username: $('#username')
          .val()
          .trim(),
        password: $('#password')
          .val()
          .trim(),
      }
      tableau.connectionData = JSON.stringify(userObj)
      tableau.connectionName = 'Rave EDC Feed'
      tableau.submit()
    })
  })
})()
