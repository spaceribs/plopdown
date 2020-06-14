'use strict';
var formats = require('ajv/lib/compile/formats')();
var ucs2length = require('ajv/lib/compile/ucs2length');
var equal = require('ajv/lib/compile/equal');
var validate = (function () {
  var pattern0 = new RegExp(
    '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
  );
  var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
  var pattern2 = new RegExp(
    '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
  );
  var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
  var refVal = [];
  var refVal1 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false ||
              key0 == 'data' ||
              key0 == 'endTime' ||
              key0 == 'id' ||
              key0 == 'startTime'
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            if (data.data === undefined) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'data',
                  },
                  message: "should have required property 'data'",
                },
              ];
              return false;
            } else {
              var errs_1 = errors;
              if (
                !refVal2(
                  data.data,
                  (dataPath || '') + '.data',
                  data,
                  'data',
                  rootData
                )
              ) {
                if (vErrors === null) vErrors = refVal2.errors;
                else vErrors = vErrors.concat(refVal2.errors);
                errors = vErrors.length;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              if (data.endTime === undefined) {
                valid1 = false;
                validate.errors = [
                  {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/required',
                    params: {
                      missingProperty: 'endTime',
                    },
                    message: "should have required property 'endTime'",
                  },
                ];
                return false;
              } else {
                var errs_1 = errors;
                if (typeof data.endTime !== 'number') {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.endTime',
                      schemaPath: '#/properties/endTime/type',
                      params: {
                        type: 'number',
                      },
                      message: 'should be number',
                    },
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                if (data.id === undefined) {
                  valid1 = false;
                  validate.errors = [
                    {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/required',
                      params: {
                        missingProperty: 'id',
                      },
                      message: "should have required property 'id'",
                    },
                  ];
                  return false;
                } else {
                  var errs_1 = errors;
                  if (typeof data.id !== 'string') {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.id',
                        schemaPath: '#/properties/id/type',
                        params: {
                          type: 'string',
                        },
                        message: 'should be string',
                      },
                    ];
                    return false;
                  }
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  if (data.startTime === undefined) {
                    valid1 = false;
                    validate.errors = [
                      {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '',
                        schemaPath: '#/required',
                        params: {
                          missingProperty: 'startTime',
                        },
                        message: "should have required property 'startTime'",
                      },
                    ];
                    return false;
                  } else {
                    var errs_1 = errors;
                    if (typeof data.startTime !== 'number') {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.startTime',
                          schemaPath: '#/properties/startTime/type',
                          params: {
                            type: 'number',
                          },
                          message: 'should be number',
                        },
                      ];
                      return false;
                    }
                    var valid1 = errors === errs_1;
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal1.schema = {
    additionalProperties: false,
    properties: {
      data: {
        $ref: '#/definitions/PlopdownTemplate',
      },
      endTime: {
        type: 'number',
      },
      id: {
        type: 'string',
      },
      startTime: {
        type: 'number',
      },
    },
    required: ['startTime', 'endTime', 'id', 'data'],
    type: 'object',
  };
  refVal1.errors = null;
  refVal[1] = refVal1;
  var refVal2 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      var errs__0 = errors;
      var valid0 = false;
      var errs_1 = errors;
      if (
        !refVal3(data, dataPath || '', parentData, parentDataProperty, rootData)
      ) {
        if (vErrors === null) vErrors = refVal3.errors;
        else vErrors = vErrors.concat(refVal3.errors);
        errors = vErrors.length;
      }
      var valid1 = errors === errs_1;
      valid0 = valid0 || valid1;
      if (!valid0) {
        var errs_1 = errors;
        if (
          !refVal7(
            data,
            dataPath || '',
            parentData,
            parentDataProperty,
            rootData
          )
        ) {
          if (vErrors === null) vErrors = refVal7.errors;
          else vErrors = vErrors.concat(refVal7.errors);
          errors = vErrors.length;
        }
        var valid1 = errors === errs_1;
        valid0 = valid0 || valid1;
        if (!valid0) {
          var errs_1 = errors;
          if (
            !refVal12(
              data,
              dataPath || '',
              parentData,
              parentDataProperty,
              rootData
            )
          ) {
            if (vErrors === null) vErrors = refVal12.errors;
            else vErrors = vErrors.concat(refVal12.errors);
            errors = vErrors.length;
          }
          var valid1 = errors === errs_1;
          valid0 = valid0 || valid1;
          if (!valid0) {
            var errs_1 = errors;
            if (
              !refVal19(
                data,
                dataPath || '',
                parentData,
                parentDataProperty,
                rootData
              )
            ) {
              if (vErrors === null) vErrors = refVal19.errors;
              else vErrors = vErrors.concat(refVal19.errors);
              errors = vErrors.length;
            }
            var valid1 = errors === errs_1;
            valid0 = valid0 || valid1;
          }
        }
      }
      if (!valid0) {
        var err = {
          keyword: 'anyOf',
          dataPath: (dataPath || '') + '',
          schemaPath: '#/anyOf',
          params: {},
          message: 'should match some schema in anyOf',
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
        validate.errors = vErrors;
        return false;
      } else {
        errors = errs__0;
        if (vErrors !== null) {
          if (errs__0) vErrors.length = errs__0;
          else vErrors = null;
        }
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal2.schema = {
    anyOf: [
      {
        $ref: '#/definitions/PlopdownInfo',
      },
      {
        $ref: '#/definitions/PlopdownPlop',
      },
      {
        $ref: '#/definitions/PlopdownAudio',
      },
      {
        $ref: '#/definitions/PlopdownShape',
      },
    ],
  };
  refVal2.errors = null;
  refVal[2] = refVal2;
  var refVal3 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false ||
              key0 == 'authors' ||
              key0 == 'title' ||
              key0 == 'type' ||
              key0 == 'url'
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.authors;
            if (data1 === undefined) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'authors',
                  },
                  message: "should have required property 'authors'",
                },
              ];
              return false;
            } else {
              var errs_1 = errors;
              if (Array.isArray(data1)) {
                var errs__1 = errors;
                var valid1;
                for (var i1 = 0; i1 < data1.length; i1++) {
                  var data2 = data1[i1];
                  var errs_2 = errors;
                  var errs_3 = errors;
                  if (typeof data2 === 'string') {
                    if (ucs2length(data2) > 128) {
                      validate.errors = [
                        {
                          keyword: 'maxLength',
                          dataPath: (dataPath || '') + '.authors[' + i1 + ']',
                          schemaPath: '#/definitions/Author/maxLength',
                          params: {
                            limit: 128,
                          },
                          message: 'should NOT be longer than 128 characters',
                        },
                      ];
                      return false;
                    } else {
                      if (ucs2length(data2) < 2) {
                        validate.errors = [
                          {
                            keyword: 'minLength',
                            dataPath: (dataPath || '') + '.authors[' + i1 + ']',
                            schemaPath: '#/definitions/Author/minLength',
                            params: {
                              limit: 2,
                            },
                            message: 'should NOT be shorter than 2 characters',
                          },
                        ];
                        return false;
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.authors[' + i1 + ']',
                        schemaPath: '#/definitions/Author/type',
                        params: {
                          type: 'string',
                        },
                        message: 'should be string',
                      },
                    ];
                    return false;
                  }
                  var valid3 = errors === errs_3;
                  var valid2 = errors === errs_2;
                  if (!valid2) break;
                }
              } else {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.authors',
                    schemaPath: '#/properties/authors/type',
                    params: {
                      type: 'array',
                    },
                    message: 'should be array',
                  },
                ];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.title;
              if (data1 === undefined) {
                valid1 = false;
                validate.errors = [
                  {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/required',
                    params: {
                      missingProperty: 'title',
                    },
                    message: "should have required property 'title'",
                  },
                ];
                return false;
              } else {
                var errs_1 = errors;
                var errs_2 = errors;
                if (typeof data1 === 'string') {
                  if (ucs2length(data1) > 256) {
                    validate.errors = [
                      {
                        keyword: 'maxLength',
                        dataPath: (dataPath || '') + '.title',
                        schemaPath: '#/definitions/Title/maxLength',
                        params: {
                          limit: 256,
                        },
                        message: 'should NOT be longer than 256 characters',
                      },
                    ];
                    return false;
                  } else {
                    if (ucs2length(data1) < 2) {
                      validate.errors = [
                        {
                          keyword: 'minLength',
                          dataPath: (dataPath || '') + '.title',
                          schemaPath: '#/definitions/Title/minLength',
                          params: {
                            limit: 2,
                          },
                          message: 'should NOT be shorter than 2 characters',
                        },
                      ];
                      return false;
                    }
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.title',
                      schemaPath: '#/definitions/Title/type',
                      params: {
                        type: 'string',
                      },
                      message: 'should be string',
                    },
                  ];
                  return false;
                }
                var valid2 = errors === errs_2;
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.type;
                if (data1 === undefined) {
                  valid1 = false;
                  validate.errors = [
                    {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/required',
                      params: {
                        missingProperty: 'type',
                      },
                      message: "should have required property 'type'",
                    },
                  ];
                  return false;
                } else {
                  var errs_1 = errors;
                  if (typeof data1 !== 'string') {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.type',
                        schemaPath: '#/properties/type/type',
                        params: {
                          type: 'string',
                        },
                        message: 'should be string',
                      },
                    ];
                    return false;
                  }
                  var schema1 = validate.schema.properties.type.enum;
                  var valid1;
                  valid1 = false;
                  for (var i1 = 0; i1 < schema1.length; i1++)
                    if (equal(data1, schema1[i1])) {
                      valid1 = true;
                      break;
                    }
                  if (!valid1) {
                    validate.errors = [
                      {
                        keyword: 'enum',
                        dataPath: (dataPath || '') + '.type',
                        schemaPath: '#/properties/type/enum',
                        params: {
                          allowedValues: schema1,
                        },
                        message: 'should be equal to one of the allowed values',
                      },
                    ];
                    return false;
                  }
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.url;
                  if (data1 === undefined) {
                    valid1 = true;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (errors === errs_2) {
                      if (typeof data1 === 'string') {
                        if (!formats.uri.test(data1)) {
                          validate.errors = [
                            {
                              keyword: 'format',
                              dataPath: (dataPath || '') + '.url',
                              schemaPath: '#/definitions/ExternalLink/format',
                              params: {
                                format: 'uri',
                              },
                              message: 'should match format "uri"',
                            },
                          ];
                          return false;
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.url',
                            schemaPath: '#/definitions/ExternalLink/type',
                            params: {
                              type: 'string',
                            },
                            message: 'should be string',
                          },
                        ];
                        return false;
                      }
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal3.schema = {
    additionalProperties: false,
    properties: {
      authors: {
        items: {
          $ref: '#/definitions/Author',
        },
        type: 'array',
      },
      title: {
        $ref: '#/definitions/Title',
      },
      type: {
        enum: ['INFO'],
        type: 'string',
      },
      url: {
        $ref: '#/definitions/ExternalLink',
      },
    },
    required: ['authors', 'title', 'type'],
    type: 'object',
  };
  refVal3.errors = null;
  refVal[3] = refVal3;
  var refVal4 = {
    description: 'An author to attribute composition to.',
    maxLength: 128,
    minLength: 2,
    type: 'string',
  };
  refVal[4] = refVal4;
  var refVal5 = {
    description: 'A short statement.',
    maxLength: 256,
    minLength: 2,
    type: 'string',
  };
  refVal[5] = refVal5;
  var refVal6 = {
    description: 'An external URL to get more information.',
    format: 'uri',
    type: 'string',
  };
  refVal[6] = refVal6;
  var refVal7 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false ||
              key0 == 'desc' ||
              key0 == 'footnotes' ||
              key0 == 'icons' ||
              key0 == 'left' ||
              key0 == 'top' ||
              key0 == 'type' ||
              key0 == 'width'
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.desc;
            if (data1 === undefined) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'desc',
                  },
                  message: "should have required property 'desc'",
                },
              ];
              return false;
            } else {
              var errs_1 = errors;
              var errs_2 = errors;
              if (typeof data1 === 'string') {
                if (ucs2length(data1) > 1024) {
                  validate.errors = [
                    {
                      keyword: 'maxLength',
                      dataPath: (dataPath || '') + '.desc',
                      schemaPath: '#/definitions/Description/maxLength',
                      params: {
                        limit: 1024,
                      },
                      message: 'should NOT be longer than 1024 characters',
                    },
                  ];
                  return false;
                } else {
                  if (ucs2length(data1) < 2) {
                    validate.errors = [
                      {
                        keyword: 'minLength',
                        dataPath: (dataPath || '') + '.desc',
                        schemaPath: '#/definitions/Description/minLength',
                        params: {
                          limit: 2,
                        },
                        message: 'should NOT be shorter than 2 characters',
                      },
                    ];
                    return false;
                  }
                }
              } else {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.desc',
                    schemaPath: '#/definitions/Description/type',
                    params: {
                      type: 'string',
                    },
                    message: 'should be string',
                  },
                ];
                return false;
              }
              var valid2 = errors === errs_2;
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.footnotes;
              if (data1 === undefined) {
                valid1 = true;
              } else {
                var errs_1 = errors;
                if (Array.isArray(data1)) {
                  var errs__1 = errors;
                  var valid1;
                  for (var i1 = 0; i1 < data1.length; i1++) {
                    var data2 = data1[i1];
                    var errs_2 = errors;
                    if (
                      data2 &&
                      typeof data2 === 'object' &&
                      !Array.isArray(data2)
                    ) {
                      if (true) {
                        var errs__2 = errors;
                        var valid3 = true;
                        for (var key2 in data2) {
                          var isAdditional2 = !(
                            false ||
                            key2 == 'title' ||
                            key2 == 'url'
                          );
                          if (isAdditional2) {
                            valid3 = false;
                            validate.errors = [
                              {
                                keyword: 'additionalProperties',
                                dataPath:
                                  (dataPath || '') + '.footnotes[' + i1 + ']',
                                schemaPath:
                                  '#/properties/footnotes/items/additionalProperties',
                                params: {
                                  additionalProperty: '' + key2 + '',
                                },
                                message:
                                  'should NOT have additional properties',
                              },
                            ];
                            return false;
                            break;
                          }
                        }
                        if (valid3) {
                          var data3 = data2.title;
                          if (data3 === undefined) {
                            valid3 = false;
                            validate.errors = [
                              {
                                keyword: 'required',
                                dataPath:
                                  (dataPath || '') + '.footnotes[' + i1 + ']',
                                schemaPath:
                                  '#/properties/footnotes/items/required',
                                params: {
                                  missingProperty: 'title',
                                },
                                message:
                                  "should have required property 'title'",
                              },
                            ];
                            return false;
                          } else {
                            var errs_3 = errors;
                            var errs_4 = errors;
                            if (typeof data3 === 'string') {
                              if (ucs2length(data3) > 256) {
                                validate.errors = [
                                  {
                                    keyword: 'maxLength',
                                    dataPath:
                                      (dataPath || '') +
                                      '.footnotes[' +
                                      i1 +
                                      '].title',
                                    schemaPath: '#/definitions/Title/maxLength',
                                    params: {
                                      limit: 256,
                                    },
                                    message:
                                      'should NOT be longer than 256 characters',
                                  },
                                ];
                                return false;
                              } else {
                                if (ucs2length(data3) < 2) {
                                  validate.errors = [
                                    {
                                      keyword: 'minLength',
                                      dataPath:
                                        (dataPath || '') +
                                        '.footnotes[' +
                                        i1 +
                                        '].title',
                                      schemaPath:
                                        '#/definitions/Title/minLength',
                                      params: {
                                        limit: 2,
                                      },
                                      message:
                                        'should NOT be shorter than 2 characters',
                                    },
                                  ];
                                  return false;
                                }
                              }
                            } else {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath:
                                    (dataPath || '') +
                                    '.footnotes[' +
                                    i1 +
                                    '].title',
                                  schemaPath: '#/definitions/Title/type',
                                  params: {
                                    type: 'string',
                                  },
                                  message: 'should be string',
                                },
                              ];
                              return false;
                            }
                            var valid4 = errors === errs_4;
                            var valid3 = errors === errs_3;
                          }
                          if (valid3) {
                            var data3 = data2.url;
                            if (data3 === undefined) {
                              valid3 = false;
                              validate.errors = [
                                {
                                  keyword: 'required',
                                  dataPath:
                                    (dataPath || '') + '.footnotes[' + i1 + ']',
                                  schemaPath:
                                    '#/properties/footnotes/items/required',
                                  params: {
                                    missingProperty: 'url',
                                  },
                                  message:
                                    "should have required property 'url'",
                                },
                              ];
                              return false;
                            } else {
                              var errs_3 = errors;
                              var errs_4 = errors;
                              if (errors === errs_4) {
                                if (typeof data3 === 'string') {
                                  if (!formats.uri.test(data3)) {
                                    validate.errors = [
                                      {
                                        keyword: 'format',
                                        dataPath:
                                          (dataPath || '') +
                                          '.footnotes[' +
                                          i1 +
                                          '].url',
                                        schemaPath:
                                          '#/definitions/ExternalLink/format',
                                        params: {
                                          format: 'uri',
                                        },
                                        message: 'should match format "uri"',
                                      },
                                    ];
                                    return false;
                                  }
                                } else {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') +
                                        '.footnotes[' +
                                        i1 +
                                        '].url',
                                      schemaPath:
                                        '#/definitions/ExternalLink/type',
                                      params: {
                                        type: 'string',
                                      },
                                      message: 'should be string',
                                    },
                                  ];
                                  return false;
                                }
                              }
                              var valid4 = errors === errs_4;
                              var valid3 = errors === errs_3;
                            }
                          }
                        }
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.footnotes[' + i1 + ']',
                          schemaPath: '#/properties/footnotes/items/type',
                          params: {
                            type: 'object',
                          },
                          message: 'should be object',
                        },
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    if (!valid2) break;
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.footnotes',
                      schemaPath: '#/properties/footnotes/type',
                      params: {
                        type: 'array',
                      },
                      message: 'should be array',
                    },
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.icons;
                if (data1 === undefined) {
                  valid1 = false;
                  validate.errors = [
                    {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/required',
                      params: {
                        missingProperty: 'icons',
                      },
                      message: "should have required property 'icons'",
                    },
                  ];
                  return false;
                } else {
                  var errs_1 = errors;
                  if (Array.isArray(data1)) {
                    var errs__1 = errors;
                    var valid1;
                    for (var i1 = 0; i1 < data1.length; i1++) {
                      var data2 = data1[i1];
                      var errs_2 = errors;
                      if (
                        data2 &&
                        typeof data2 === 'object' &&
                        !Array.isArray(data2)
                      ) {
                        if (true) {
                          var errs__2 = errors;
                          var valid3 = true;
                          for (var key2 in data2) {
                            var isAdditional2 = !(
                              false ||
                              key2 == 'emoji' ||
                              key2 == 'left' ||
                              key2 == 'rotate' ||
                              key2 == 'size' ||
                              key2 == 'top'
                            );
                            if (isAdditional2) {
                              valid3 = false;
                              validate.errors = [
                                {
                                  keyword: 'additionalProperties',
                                  dataPath:
                                    (dataPath || '') + '.icons[' + i1 + ']',
                                  schemaPath:
                                    '#/properties/icons/items/additionalProperties',
                                  params: {
                                    additionalProperty: '' + key2 + '',
                                  },
                                  message:
                                    'should NOT have additional properties',
                                },
                              ];
                              return false;
                              break;
                            }
                          }
                          if (valid3) {
                            var data3 = data2.emoji;
                            if (data3 === undefined) {
                              valid3 = false;
                              validate.errors = [
                                {
                                  keyword: 'required',
                                  dataPath:
                                    (dataPath || '') + '.icons[' + i1 + ']',
                                  schemaPath:
                                    '#/properties/icons/items/required',
                                  params: {
                                    missingProperty: 'emoji',
                                  },
                                  message:
                                    "should have required property 'emoji'",
                                },
                              ];
                              return false;
                            } else {
                              var errs_3 = errors;
                              var errs_4 = errors;
                              if (typeof data3 === 'string') {
                                if (ucs2length(data3) > 32) {
                                  validate.errors = [
                                    {
                                      keyword: 'maxLength',
                                      dataPath:
                                        (dataPath || '') +
                                        '.icons[' +
                                        i1 +
                                        '].emoji',
                                      schemaPath:
                                        '#/definitions/Emoji/maxLength',
                                      params: {
                                        limit: 32,
                                      },
                                      message:
                                        'should NOT be longer than 32 characters',
                                    },
                                  ];
                                  return false;
                                } else {
                                  if (ucs2length(data3) < 1) {
                                    validate.errors = [
                                      {
                                        keyword: 'minLength',
                                        dataPath:
                                          (dataPath || '') +
                                          '.icons[' +
                                          i1 +
                                          '].emoji',
                                        schemaPath:
                                          '#/definitions/Emoji/minLength',
                                        params: {
                                          limit: 1,
                                        },
                                        message:
                                          'should NOT be shorter than 1 characters',
                                      },
                                    ];
                                    return false;
                                  }
                                }
                              } else {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath:
                                      (dataPath || '') +
                                      '.icons[' +
                                      i1 +
                                      '].emoji',
                                    schemaPath: '#/definitions/Emoji/type',
                                    params: {
                                      type: 'string',
                                    },
                                    message: 'should be string',
                                  },
                                ];
                                return false;
                              }
                              var valid4 = errors === errs_4;
                              var valid3 = errors === errs_3;
                            }
                            if (valid3) {
                              var data3 = data2.left;
                              if (data3 === undefined) {
                                valid3 = false;
                                validate.errors = [
                                  {
                                    keyword: 'required',
                                    dataPath:
                                      (dataPath || '') + '.icons[' + i1 + ']',
                                    schemaPath:
                                      '#/properties/icons/items/required',
                                    params: {
                                      missingProperty: 'left',
                                    },
                                    message:
                                      "should have required property 'left'",
                                  },
                                ];
                                return false;
                              } else {
                                var errs_3 = errors;
                                var errs_4 = errors;
                                if (typeof data3 === 'number') {
                                  if (data3 > 1000 || data3 !== data3) {
                                    validate.errors = [
                                      {
                                        keyword: 'maximum',
                                        dataPath:
                                          (dataPath || '') +
                                          '.icons[' +
                                          i1 +
                                          '].left',
                                        schemaPath:
                                          '#/definitions/Percentage/maximum',
                                        params: {
                                          comparison: '<=',
                                          limit: 1000,
                                          exclusive: false,
                                        },
                                        message: 'should be <= 1000',
                                      },
                                    ];
                                    return false;
                                  } else {
                                    if (data3 < -100 || data3 !== data3) {
                                      validate.errors = [
                                        {
                                          keyword: 'minimum',
                                          dataPath:
                                            (dataPath || '') +
                                            '.icons[' +
                                            i1 +
                                            '].left',
                                          schemaPath:
                                            '#/definitions/Percentage/minimum',
                                          params: {
                                            comparison: '>=',
                                            limit: -100,
                                            exclusive: false,
                                          },
                                          message: 'should be >= -100',
                                        },
                                      ];
                                      return false;
                                    }
                                  }
                                } else {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') +
                                        '.icons[' +
                                        i1 +
                                        '].left',
                                      schemaPath:
                                        '#/definitions/Percentage/type',
                                      params: {
                                        type: 'number',
                                      },
                                      message: 'should be number',
                                    },
                                  ];
                                  return false;
                                }
                                var valid4 = errors === errs_4;
                                var valid3 = errors === errs_3;
                              }
                              if (valid3) {
                                var data3 = data2.rotate;
                                if (data3 === undefined) {
                                  valid3 = false;
                                  validate.errors = [
                                    {
                                      keyword: 'required',
                                      dataPath:
                                        (dataPath || '') + '.icons[' + i1 + ']',
                                      schemaPath:
                                        '#/properties/icons/items/required',
                                      params: {
                                        missingProperty: 'rotate',
                                      },
                                      message:
                                        "should have required property 'rotate'",
                                    },
                                  ];
                                  return false;
                                } else {
                                  var errs_3 = errors;
                                  var errs_4 = errors;
                                  if (typeof data3 === 'number') {
                                    if (data3 > 360 || data3 !== data3) {
                                      validate.errors = [
                                        {
                                          keyword: 'maximum',
                                          dataPath:
                                            (dataPath || '') +
                                            '.icons[' +
                                            i1 +
                                            '].rotate',
                                          schemaPath:
                                            '#/definitions/Degree/maximum',
                                          params: {
                                            comparison: '<=',
                                            limit: 360,
                                            exclusive: false,
                                          },
                                          message: 'should be <= 360',
                                        },
                                      ];
                                      return false;
                                    } else {
                                      if (data3 < -360 || data3 !== data3) {
                                        validate.errors = [
                                          {
                                            keyword: 'minimum',
                                            dataPath:
                                              (dataPath || '') +
                                              '.icons[' +
                                              i1 +
                                              '].rotate',
                                            schemaPath:
                                              '#/definitions/Degree/minimum',
                                            params: {
                                              comparison: '>=',
                                              limit: -360,
                                              exclusive: false,
                                            },
                                            message: 'should be >= -360',
                                          },
                                        ];
                                        return false;
                                      }
                                    }
                                  } else {
                                    validate.errors = [
                                      {
                                        keyword: 'type',
                                        dataPath:
                                          (dataPath || '') +
                                          '.icons[' +
                                          i1 +
                                          '].rotate',
                                        schemaPath: '#/definitions/Degree/type',
                                        params: {
                                          type: 'number',
                                        },
                                        message: 'should be number',
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid4 = errors === errs_4;
                                  var valid3 = errors === errs_3;
                                }
                                if (valid3) {
                                  var data3 = data2.size;
                                  if (data3 === undefined) {
                                    valid3 = false;
                                    validate.errors = [
                                      {
                                        keyword: 'required',
                                        dataPath:
                                          (dataPath || '') +
                                          '.icons[' +
                                          i1 +
                                          ']',
                                        schemaPath:
                                          '#/properties/icons/items/required',
                                        params: {
                                          missingProperty: 'size',
                                        },
                                        message:
                                          "should have required property 'size'",
                                      },
                                    ];
                                    return false;
                                  } else {
                                    var errs_3 = errors;
                                    var errs_4 = errors;
                                    if (typeof data3 === 'number') {
                                      if (data3 > 1000 || data3 !== data3) {
                                        validate.errors = [
                                          {
                                            keyword: 'maximum',
                                            dataPath:
                                              (dataPath || '') +
                                              '.icons[' +
                                              i1 +
                                              '].size',
                                            schemaPath:
                                              '#/definitions/Percentage/maximum',
                                            params: {
                                              comparison: '<=',
                                              limit: 1000,
                                              exclusive: false,
                                            },
                                            message: 'should be <= 1000',
                                          },
                                        ];
                                        return false;
                                      } else {
                                        if (data3 < -100 || data3 !== data3) {
                                          validate.errors = [
                                            {
                                              keyword: 'minimum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.icons[' +
                                                i1 +
                                                '].size',
                                              schemaPath:
                                                '#/definitions/Percentage/minimum',
                                              params: {
                                                comparison: '>=',
                                                limit: -100,
                                                exclusive: false,
                                              },
                                              message: 'should be >= -100',
                                            },
                                          ];
                                          return false;
                                        }
                                      }
                                    } else {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') +
                                            '.icons[' +
                                            i1 +
                                            '].size',
                                          schemaPath:
                                            '#/definitions/Percentage/type',
                                          params: {
                                            type: 'number',
                                          },
                                          message: 'should be number',
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid4 = errors === errs_4;
                                    var valid3 = errors === errs_3;
                                  }
                                  if (valid3) {
                                    var data3 = data2.top;
                                    if (data3 === undefined) {
                                      valid3 = false;
                                      validate.errors = [
                                        {
                                          keyword: 'required',
                                          dataPath:
                                            (dataPath || '') +
                                            '.icons[' +
                                            i1 +
                                            ']',
                                          schemaPath:
                                            '#/properties/icons/items/required',
                                          params: {
                                            missingProperty: 'top',
                                          },
                                          message:
                                            "should have required property 'top'",
                                        },
                                      ];
                                      return false;
                                    } else {
                                      var errs_3 = errors;
                                      var errs_4 = errors;
                                      if (typeof data3 === 'number') {
                                        if (data3 > 1000 || data3 !== data3) {
                                          validate.errors = [
                                            {
                                              keyword: 'maximum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.icons[' +
                                                i1 +
                                                '].top',
                                              schemaPath:
                                                '#/definitions/Percentage/maximum',
                                              params: {
                                                comparison: '<=',
                                                limit: 1000,
                                                exclusive: false,
                                              },
                                              message: 'should be <= 1000',
                                            },
                                          ];
                                          return false;
                                        } else {
                                          if (data3 < -100 || data3 !== data3) {
                                            validate.errors = [
                                              {
                                                keyword: 'minimum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.icons[' +
                                                  i1 +
                                                  '].top',
                                                schemaPath:
                                                  '#/definitions/Percentage/minimum',
                                                params: {
                                                  comparison: '>=',
                                                  limit: -100,
                                                  exclusive: false,
                                                },
                                                message: 'should be >= -100',
                                              },
                                            ];
                                            return false;
                                          }
                                        }
                                      } else {
                                        validate.errors = [
                                          {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.icons[' +
                                              i1 +
                                              '].top',
                                            schemaPath:
                                              '#/definitions/Percentage/type',
                                            params: {
                                              type: 'number',
                                            },
                                            message: 'should be number',
                                          },
                                        ];
                                        return false;
                                      }
                                      var valid4 = errors === errs_4;
                                      var valid3 = errors === errs_3;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.icons[' + i1 + ']',
                            schemaPath: '#/properties/icons/items/type',
                            params: {
                              type: 'object',
                            },
                            message: 'should be object',
                          },
                        ];
                        return false;
                      }
                      var valid2 = errors === errs_2;
                      if (!valid2) break;
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.icons',
                        schemaPath: '#/properties/icons/type',
                        params: {
                          type: 'array',
                        },
                        message: 'should be array',
                      },
                    ];
                    return false;
                  }
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.left;
                  if (data1 === undefined) {
                    valid1 = false;
                    validate.errors = [
                      {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '',
                        schemaPath: '#/required',
                        params: {
                          missingProperty: 'left',
                        },
                        message: "should have required property 'left'",
                      },
                    ];
                    return false;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (typeof data1 === 'number') {
                      if (data1 > 1000 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'maximum',
                            dataPath: (dataPath || '') + '.left',
                            schemaPath: '#/definitions/Percentage/maximum',
                            params: {
                              comparison: '<=',
                              limit: 1000,
                              exclusive: false,
                            },
                            message: 'should be <= 1000',
                          },
                        ];
                        return false;
                      } else {
                        if (data1 < -100 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'minimum',
                              dataPath: (dataPath || '') + '.left',
                              schemaPath: '#/definitions/Percentage/minimum',
                              params: {
                                comparison: '>=',
                                limit: -100,
                                exclusive: false,
                              },
                              message: 'should be >= -100',
                            },
                          ];
                          return false;
                        }
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.left',
                          schemaPath: '#/definitions/Percentage/type',
                          params: {
                            type: 'number',
                          },
                          message: 'should be number',
                        },
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.top;
                    if (data1 === undefined) {
                      valid1 = false;
                      validate.errors = [
                        {
                          keyword: 'required',
                          dataPath: (dataPath || '') + '',
                          schemaPath: '#/required',
                          params: {
                            missingProperty: 'top',
                          },
                          message: "should have required property 'top'",
                        },
                      ];
                      return false;
                    } else {
                      var errs_1 = errors;
                      var errs_2 = errors;
                      if (typeof data1 === 'number') {
                        if (data1 > 1000 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'maximum',
                              dataPath: (dataPath || '') + '.top',
                              schemaPath: '#/definitions/Percentage/maximum',
                              params: {
                                comparison: '<=',
                                limit: 1000,
                                exclusive: false,
                              },
                              message: 'should be <= 1000',
                            },
                          ];
                          return false;
                        } else {
                          if (data1 < -100 || data1 !== data1) {
                            validate.errors = [
                              {
                                keyword: 'minimum',
                                dataPath: (dataPath || '') + '.top',
                                schemaPath: '#/definitions/Percentage/minimum',
                                params: {
                                  comparison: '>=',
                                  limit: -100,
                                  exclusive: false,
                                },
                                message: 'should be >= -100',
                              },
                            ];
                            return false;
                          }
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.top',
                            schemaPath: '#/definitions/Percentage/type',
                            params: {
                              type: 'number',
                            },
                            message: 'should be number',
                          },
                        ];
                        return false;
                      }
                      var valid2 = errors === errs_2;
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      var data1 = data.type;
                      if (data1 === undefined) {
                        valid1 = false;
                        validate.errors = [
                          {
                            keyword: 'required',
                            dataPath: (dataPath || '') + '',
                            schemaPath: '#/required',
                            params: {
                              missingProperty: 'type',
                            },
                            message: "should have required property 'type'",
                          },
                        ];
                        return false;
                      } else {
                        var errs_1 = errors;
                        if (typeof data1 !== 'string') {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.type',
                              schemaPath: '#/properties/type/type',
                              params: {
                                type: 'string',
                              },
                              message: 'should be string',
                            },
                          ];
                          return false;
                        }
                        var schema1 = validate.schema.properties.type.enum;
                        var valid1;
                        valid1 = false;
                        for (var i1 = 0; i1 < schema1.length; i1++)
                          if (equal(data1, schema1[i1])) {
                            valid1 = true;
                            break;
                          }
                        if (!valid1) {
                          validate.errors = [
                            {
                              keyword: 'enum',
                              dataPath: (dataPath || '') + '.type',
                              schemaPath: '#/properties/type/enum',
                              params: {
                                allowedValues: schema1,
                              },
                              message:
                                'should be equal to one of the allowed values',
                            },
                          ];
                          return false;
                        }
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        var data1 = data.width;
                        if (data1 === undefined) {
                          valid1 = false;
                          validate.errors = [
                            {
                              keyword: 'required',
                              dataPath: (dataPath || '') + '',
                              schemaPath: '#/required',
                              params: {
                                missingProperty: 'width',
                              },
                              message: "should have required property 'width'",
                            },
                          ];
                          return false;
                        } else {
                          var errs_1 = errors;
                          var errs_2 = errors;
                          if (typeof data1 === 'number') {
                            if (data1 > 1000 || data1 !== data1) {
                              validate.errors = [
                                {
                                  keyword: 'maximum',
                                  dataPath: (dataPath || '') + '.width',
                                  schemaPath:
                                    '#/definitions/Percentage/maximum',
                                  params: {
                                    comparison: '<=',
                                    limit: 1000,
                                    exclusive: false,
                                  },
                                  message: 'should be <= 1000',
                                },
                              ];
                              return false;
                            } else {
                              if (data1 < -100 || data1 !== data1) {
                                validate.errors = [
                                  {
                                    keyword: 'minimum',
                                    dataPath: (dataPath || '') + '.width',
                                    schemaPath:
                                      '#/definitions/Percentage/minimum',
                                    params: {
                                      comparison: '>=',
                                      limit: -100,
                                      exclusive: false,
                                    },
                                    message: 'should be >= -100',
                                  },
                                ];
                                return false;
                              }
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.width',
                                schemaPath: '#/definitions/Percentage/type',
                                params: {
                                  type: 'number',
                                },
                                message: 'should be number',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                          var valid1 = errors === errs_1;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal7.schema = {
    additionalProperties: false,
    properties: {
      desc: {
        $ref: '#/definitions/Description',
      },
      footnotes: {
        items: {
          additionalProperties: false,
          properties: {
            title: {
              $ref: '#/definitions/Title',
            },
            url: {
              $ref: '#/definitions/ExternalLink',
            },
          },
          required: ['title', 'url'],
          type: 'object',
        },
        type: 'array',
      },
      icons: {
        items: {
          additionalProperties: false,
          properties: {
            emoji: {
              $ref: '#/definitions/Emoji',
            },
            left: {
              $ref: '#/definitions/Percentage',
            },
            rotate: {
              $ref: '#/definitions/Degree',
            },
            size: {
              $ref: '#/definitions/Percentage',
            },
            top: {
              $ref: '#/definitions/Percentage',
            },
          },
          required: ['top', 'left', 'size', 'rotate', 'emoji'],
          type: 'object',
        },
        type: 'array',
      },
      left: {
        $ref: '#/definitions/Percentage',
      },
      top: {
        $ref: '#/definitions/Percentage',
      },
      type: {
        enum: ['PLOP'],
        type: 'string',
      },
      width: {
        $ref: '#/definitions/Percentage',
      },
    },
    required: ['desc', 'icons', 'left', 'top', 'type', 'width'],
    type: 'object',
  };
  refVal7.errors = null;
  refVal[7] = refVal7;
  var refVal8 = {
    description: 'A medium long description',
    maxLength: 1024,
    minLength: 2,
    type: 'string',
  };
  refVal[8] = refVal8;
  var refVal9 = {
    description:
      'A single emoji character, ligatures mean the max length\ncan be up to 3 characters.',
    maxLength: 32,
    minLength: 1,
    type: 'string',
  };
  refVal[9] = refVal9;
  var refVal10 = {
    description: 'A bounded percentage relative to the container.',
    maximum: 1000,
    minimum: -100,
    type: 'number',
  };
  refVal[10] = refVal10;
  var refVal11 = {
    description: 'Degrees for rotation of elements.',
    maximum: 360,
    minimum: -360,
    type: 'number',
  };
  refVal[11] = refVal11;
  var refVal12 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false ||
              key0 == 'edits' ||
              key0 == 'left' ||
              key0 == 'title' ||
              key0 == 'top' ||
              key0 == 'type' ||
              key0 == 'url'
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.edits;
            if (data1 === undefined) {
              valid1 = true;
            } else {
              var errs_1 = errors;
              if (Array.isArray(data1)) {
                var errs__1 = errors;
                var valid1;
                for (var i1 = 0; i1 < data1.length; i1++) {
                  var errs_2 = errors;
                  if (
                    !refVal13(
                      data1[i1],
                      (dataPath || '') + '.edits[' + i1 + ']',
                      data1,
                      i1,
                      rootData
                    )
                  ) {
                    if (vErrors === null) vErrors = refVal13.errors;
                    else vErrors = vErrors.concat(refVal13.errors);
                    errors = vErrors.length;
                  }
                  var valid2 = errors === errs_2;
                  if (!valid2) break;
                }
              } else {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.edits',
                    schemaPath: '#/properties/edits/type',
                    params: {
                      type: 'array',
                    },
                    message: 'should be array',
                  },
                ];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.left;
              if (data1 === undefined) {
                valid1 = false;
                validate.errors = [
                  {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/required',
                    params: {
                      missingProperty: 'left',
                    },
                    message: "should have required property 'left'",
                  },
                ];
                return false;
              } else {
                var errs_1 = errors;
                var errs_2 = errors;
                if (typeof data1 === 'number') {
                  if (data1 > 1000 || data1 !== data1) {
                    validate.errors = [
                      {
                        keyword: 'maximum',
                        dataPath: (dataPath || '') + '.left',
                        schemaPath: '#/definitions/Percentage/maximum',
                        params: {
                          comparison: '<=',
                          limit: 1000,
                          exclusive: false,
                        },
                        message: 'should be <= 1000',
                      },
                    ];
                    return false;
                  } else {
                    if (data1 < -100 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'minimum',
                          dataPath: (dataPath || '') + '.left',
                          schemaPath: '#/definitions/Percentage/minimum',
                          params: {
                            comparison: '>=',
                            limit: -100,
                            exclusive: false,
                          },
                          message: 'should be >= -100',
                        },
                      ];
                      return false;
                    }
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.left',
                      schemaPath: '#/definitions/Percentage/type',
                      params: {
                        type: 'number',
                      },
                      message: 'should be number',
                    },
                  ];
                  return false;
                }
                var valid2 = errors === errs_2;
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.title;
                if (data1 === undefined) {
                  valid1 = false;
                  validate.errors = [
                    {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/required',
                      params: {
                        missingProperty: 'title',
                      },
                      message: "should have required property 'title'",
                    },
                  ];
                  return false;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if (typeof data1 === 'string') {
                    if (ucs2length(data1) > 256) {
                      validate.errors = [
                        {
                          keyword: 'maxLength',
                          dataPath: (dataPath || '') + '.title',
                          schemaPath: '#/definitions/Title/maxLength',
                          params: {
                            limit: 256,
                          },
                          message: 'should NOT be longer than 256 characters',
                        },
                      ];
                      return false;
                    } else {
                      if (ucs2length(data1) < 2) {
                        validate.errors = [
                          {
                            keyword: 'minLength',
                            dataPath: (dataPath || '') + '.title',
                            schemaPath: '#/definitions/Title/minLength',
                            params: {
                              limit: 2,
                            },
                            message: 'should NOT be shorter than 2 characters',
                          },
                        ];
                        return false;
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.title',
                        schemaPath: '#/definitions/Title/type',
                        params: {
                          type: 'string',
                        },
                        message: 'should be string',
                      },
                    ];
                    return false;
                  }
                  var valid2 = errors === errs_2;
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.top;
                  if (data1 === undefined) {
                    valid1 = false;
                    validate.errors = [
                      {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '',
                        schemaPath: '#/required',
                        params: {
                          missingProperty: 'top',
                        },
                        message: "should have required property 'top'",
                      },
                    ];
                    return false;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (typeof data1 === 'number') {
                      if (data1 > 1000 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'maximum',
                            dataPath: (dataPath || '') + '.top',
                            schemaPath: '#/definitions/Percentage/maximum',
                            params: {
                              comparison: '<=',
                              limit: 1000,
                              exclusive: false,
                            },
                            message: 'should be <= 1000',
                          },
                        ];
                        return false;
                      } else {
                        if (data1 < -100 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'minimum',
                              dataPath: (dataPath || '') + '.top',
                              schemaPath: '#/definitions/Percentage/minimum',
                              params: {
                                comparison: '>=',
                                limit: -100,
                                exclusive: false,
                              },
                              message: 'should be >= -100',
                            },
                          ];
                          return false;
                        }
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.top',
                          schemaPath: '#/definitions/Percentage/type',
                          params: {
                            type: 'number',
                          },
                          message: 'should be number',
                        },
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.type;
                    if (data1 === undefined) {
                      valid1 = false;
                      validate.errors = [
                        {
                          keyword: 'required',
                          dataPath: (dataPath || '') + '',
                          schemaPath: '#/required',
                          params: {
                            missingProperty: 'type',
                          },
                          message: "should have required property 'type'",
                        },
                      ];
                      return false;
                    } else {
                      var errs_1 = errors;
                      if (typeof data1 !== 'string') {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.type',
                            schemaPath: '#/properties/type/type',
                            params: {
                              type: 'string',
                            },
                            message: 'should be string',
                          },
                        ];
                        return false;
                      }
                      var schema1 = validate.schema.properties.type.enum;
                      var valid1;
                      valid1 = false;
                      for (var i1 = 0; i1 < schema1.length; i1++)
                        if (equal(data1, schema1[i1])) {
                          valid1 = true;
                          break;
                        }
                      if (!valid1) {
                        validate.errors = [
                          {
                            keyword: 'enum',
                            dataPath: (dataPath || '') + '.type',
                            schemaPath: '#/properties/type/enum',
                            params: {
                              allowedValues: schema1,
                            },
                            message:
                              'should be equal to one of the allowed values',
                          },
                        ];
                        return false;
                      }
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      var data1 = data.url;
                      if (data1 === undefined) {
                        valid1 = false;
                        validate.errors = [
                          {
                            keyword: 'required',
                            dataPath: (dataPath || '') + '',
                            schemaPath: '#/required',
                            params: {
                              missingProperty: 'url',
                            },
                            message: "should have required property 'url'",
                          },
                        ];
                        return false;
                      } else {
                        var errs_1 = errors;
                        var errs_2 = errors;
                        if (errors === errs_2) {
                          if (typeof data1 === 'string') {
                            if (!formats['uri-reference'].test(data1)) {
                              validate.errors = [
                                {
                                  keyword: 'format',
                                  dataPath: (dataPath || '') + '.url',
                                  schemaPath:
                                    '#/definitions/URIReference/format',
                                  params: {
                                    format: 'uri-reference',
                                  },
                                  message:
                                    'should match format "uri-reference"',
                                },
                              ];
                              return false;
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.url',
                                schemaPath: '#/definitions/URIReference/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                        }
                        var valid2 = errors === errs_2;
                        var valid1 = errors === errs_1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal12.schema = {
    additionalProperties: false,
    properties: {
      edits: {
        items: {
          $ref: '#/definitions/AudioEdit',
        },
        type: 'array',
      },
      left: {
        $ref: '#/definitions/Percentage',
      },
      title: {
        $ref: '#/definitions/Title',
      },
      top: {
        $ref: '#/definitions/Percentage',
      },
      type: {
        enum: ['AUDIO'],
        type: 'string',
      },
      url: {
        $ref: '#/definitions/URIReference',
      },
    },
    required: ['left', 'title', 'top', 'type', 'url'],
    type: 'object',
  };
  refVal12.errors = null;
  refVal[12] = refVal12;
  var refVal13 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      var errs__0 = errors;
      var valid0 = false;
      var errs_1 = errors;
      var errs_2 = errors;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__2 = errors;
          var valid3 = true;
          for (var key2 in data) {
            var isAdditional2 = !(
              false ||
              key2 == 'endTime' ||
              key2 == 'startTime' ||
              key2 == 'type'
            );
            if (isAdditional2) {
              valid3 = false;
              var err = {
                keyword: 'additionalProperties',
                dataPath: (dataPath || '') + '',
                schemaPath: '#/definitions/SkipAudio/additionalProperties',
                params: {
                  additionalProperty: '' + key2 + '',
                },
                message: 'should NOT have additional properties',
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
              break;
            }
          }
          if (valid3) {
            if (data.endTime === undefined) {
              valid3 = false;
              var err = {
                keyword: 'required',
                dataPath: (dataPath || '') + '',
                schemaPath: '#/definitions/SkipAudio/required',
                params: {
                  missingProperty: 'endTime',
                },
                message: "should have required property 'endTime'",
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            } else {
              var errs_3 = errors;
              if (typeof data.endTime !== 'number') {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.endTime',
                  schemaPath: '#/definitions/SkipAudio/properties/endTime/type',
                  params: {
                    type: 'number',
                  },
                  message: 'should be number',
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              var valid3 = errors === errs_3;
            }
            if (valid3) {
              if (data.startTime === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/definitions/SkipAudio/required',
                  params: {
                    missingProperty: 'startTime',
                  },
                  message: "should have required property 'startTime'",
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data.startTime !== 'number') {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.startTime',
                    schemaPath:
                      '#/definitions/SkipAudio/properties/startTime/type',
                    params: {
                      type: 'number',
                    },
                    message: 'should be number',
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              if (valid3) {
                var data1 = data.type;
                if (data1 === undefined) {
                  valid3 = false;
                  var err = {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/definitions/SkipAudio/required',
                    params: {
                      missingProperty: 'type',
                    },
                    message: "should have required property 'type'",
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                } else {
                  var errs_3 = errors;
                  if (typeof data1 !== 'string') {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.type',
                      schemaPath:
                        '#/definitions/SkipAudio/properties/type/type',
                      params: {
                        type: 'string',
                      },
                      message: 'should be string',
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var schema3 = refVal14.properties.type.enum;
                  var valid3;
                  valid3 = false;
                  for (var i3 = 0; i3 < schema3.length; i3++)
                    if (equal(data1, schema3[i3])) {
                      valid3 = true;
                      break;
                    }
                  if (!valid3) {
                    var err = {
                      keyword: 'enum',
                      dataPath: (dataPath || '') + '.type',
                      schemaPath:
                        '#/definitions/SkipAudio/properties/type/enum',
                      params: {
                        allowedValues: schema3,
                      },
                      message: 'should be equal to one of the allowed values',
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
              }
            }
          }
        }
      } else {
        var err = {
          keyword: 'type',
          dataPath: (dataPath || '') + '',
          schemaPath: '#/definitions/SkipAudio/type',
          params: {
            type: 'object',
          },
          message: 'should be object',
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      }
      var valid2 = errors === errs_2;
      var valid1 = errors === errs_1;
      valid0 = valid0 || valid1;
      if (!valid0) {
        var errs_1 = errors;
        var errs_2 = errors;
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          if (true) {
            var errs__2 = errors;
            var valid3 = true;
            for (var key2 in data) {
              var isAdditional2 = !(
                false ||
                key2 == 'duration' ||
                key2 == 'startTime' ||
                key2 == 'type'
              );
              if (isAdditional2) {
                valid3 = false;
                var err = {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/definitions/StillAudio/additionalProperties',
                  params: {
                    additionalProperty: '' + key2 + '',
                  },
                  message: 'should NOT have additional properties',
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
                break;
              }
            }
            if (valid3) {
              if (data.duration === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/definitions/StillAudio/required',
                  params: {
                    missingProperty: 'duration',
                  },
                  message: "should have required property 'duration'",
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data.duration !== 'number') {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.duration',
                    schemaPath:
                      '#/definitions/StillAudio/properties/duration/type',
                    params: {
                      type: 'number',
                    },
                    message: 'should be number',
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              if (valid3) {
                if (data.startTime === undefined) {
                  valid3 = false;
                  var err = {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/definitions/StillAudio/required',
                    params: {
                      missingProperty: 'startTime',
                    },
                    message: "should have required property 'startTime'",
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                } else {
                  var errs_3 = errors;
                  if (typeof data.startTime !== 'number') {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.startTime',
                      schemaPath:
                        '#/definitions/StillAudio/properties/startTime/type',
                      params: {
                        type: 'number',
                      },
                      message: 'should be number',
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                if (valid3) {
                  var data1 = data.type;
                  if (data1 === undefined) {
                    valid3 = false;
                    var err = {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/definitions/StillAudio/required',
                      params: {
                        missingProperty: 'type',
                      },
                      message: "should have required property 'type'",
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  } else {
                    var errs_3 = errors;
                    if (typeof data1 !== 'string') {
                      var err = {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.type',
                        schemaPath:
                          '#/definitions/StillAudio/properties/type/type',
                        params: {
                          type: 'string',
                        },
                        message: 'should be string',
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    }
                    var schema3 = refVal15.properties.type.enum;
                    var valid3;
                    valid3 = false;
                    for (var i3 = 0; i3 < schema3.length; i3++)
                      if (equal(data1, schema3[i3])) {
                        valid3 = true;
                        break;
                      }
                    if (!valid3) {
                      var err = {
                        keyword: 'enum',
                        dataPath: (dataPath || '') + '.type',
                        schemaPath:
                          '#/definitions/StillAudio/properties/type/enum',
                        params: {
                          allowedValues: schema3,
                        },
                        message: 'should be equal to one of the allowed values',
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    }
                    var valid3 = errors === errs_3;
                  }
                }
              }
            }
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/definitions/StillAudio/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid2 = errors === errs_2;
        var valid1 = errors === errs_1;
        valid0 = valid0 || valid1;
        if (!valid0) {
          var errs_1 = errors;
          var errs_2 = errors;
          if (data && typeof data === 'object' && !Array.isArray(data)) {
            if (true) {
              var errs__2 = errors;
              var valid3 = true;
              for (var key2 in data) {
                var isAdditional2 = !(
                  false ||
                  key2 == 'duration' ||
                  key2 == 'startTime' ||
                  key2 == 'type'
                );
                if (isAdditional2) {
                  valid3 = false;
                  var err = {
                    keyword: 'additionalProperties',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/definitions/PauseAudio/additionalProperties',
                    params: {
                      additionalProperty: '' + key2 + '',
                    },
                    message: 'should NOT have additional properties',
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                  break;
                }
              }
              if (valid3) {
                if (data.duration === undefined) {
                  valid3 = false;
                  var err = {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/definitions/PauseAudio/required',
                    params: {
                      missingProperty: 'duration',
                    },
                    message: "should have required property 'duration'",
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                } else {
                  var errs_3 = errors;
                  if (typeof data.duration !== 'number') {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.duration',
                      schemaPath:
                        '#/definitions/PauseAudio/properties/duration/type',
                      params: {
                        type: 'number',
                      },
                      message: 'should be number',
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                if (valid3) {
                  if (data.startTime === undefined) {
                    valid3 = false;
                    var err = {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/definitions/PauseAudio/required',
                      params: {
                        missingProperty: 'startTime',
                      },
                      message: "should have required property 'startTime'",
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  } else {
                    var errs_3 = errors;
                    if (typeof data.startTime !== 'number') {
                      var err = {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.startTime',
                        schemaPath:
                          '#/definitions/PauseAudio/properties/startTime/type',
                        params: {
                          type: 'number',
                        },
                        message: 'should be number',
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    }
                    var valid3 = errors === errs_3;
                  }
                  if (valid3) {
                    var data1 = data.type;
                    if (data1 === undefined) {
                      valid3 = false;
                      var err = {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '',
                        schemaPath: '#/definitions/PauseAudio/required',
                        params: {
                          missingProperty: 'type',
                        },
                        message: "should have required property 'type'",
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    } else {
                      var errs_3 = errors;
                      if (typeof data1 !== 'string') {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.type',
                          schemaPath:
                            '#/definitions/PauseAudio/properties/type/type',
                          params: {
                            type: 'string',
                          },
                          message: 'should be string',
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      }
                      var schema3 = refVal16.properties.type.enum;
                      var valid3;
                      valid3 = false;
                      for (var i3 = 0; i3 < schema3.length; i3++)
                        if (equal(data1, schema3[i3])) {
                          valid3 = true;
                          break;
                        }
                      if (!valid3) {
                        var err = {
                          keyword: 'enum',
                          dataPath: (dataPath || '') + '.type',
                          schemaPath:
                            '#/definitions/PauseAudio/properties/type/enum',
                          params: {
                            allowedValues: schema3,
                          },
                          message:
                            'should be equal to one of the allowed values',
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      }
                      var valid3 = errors === errs_3;
                    }
                  }
                }
              }
            }
          } else {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '',
              schemaPath: '#/definitions/PauseAudio/type',
              params: {
                type: 'object',
              },
              message: 'should be object',
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          }
          var valid2 = errors === errs_2;
          var valid1 = errors === errs_1;
          valid0 = valid0 || valid1;
          if (!valid0) {
            var errs_1 = errors;
            var errs_2 = errors;
            if (data && typeof data === 'object' && !Array.isArray(data)) {
              if (true) {
                var errs__2 = errors;
                var valid3 = true;
                for (var key2 in data) {
                  var isAdditional2 = !(
                    false ||
                    key2 == 'audio' ||
                    key2 == 'endTime' ||
                    key2 == 'startTime' ||
                    key2 == 'type' ||
                    key2 == 'video'
                  );
                  if (isAdditional2) {
                    valid3 = false;
                    var err = {
                      keyword: 'additionalProperties',
                      dataPath: (dataPath || '') + '',
                      schemaPath:
                        '#/definitions/AdjustVolumeAudio/additionalProperties',
                      params: {
                        additionalProperty: '' + key2 + '',
                      },
                      message: 'should NOT have additional properties',
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                    break;
                  }
                }
                if (valid3) {
                  if (data.audio === undefined) {
                    valid3 = false;
                    var err = {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/definitions/AdjustVolumeAudio/required',
                      params: {
                        missingProperty: 'audio',
                      },
                      message: "should have required property 'audio'",
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  } else {
                    var errs_3 = errors;
                    if (typeof data.audio !== 'number') {
                      var err = {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.audio',
                        schemaPath:
                          '#/definitions/AdjustVolumeAudio/properties/audio/type',
                        params: {
                          type: 'number',
                        },
                        message: 'should be number',
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    }
                    var valid3 = errors === errs_3;
                  }
                  if (valid3) {
                    if (data.endTime === undefined) {
                      valid3 = false;
                      var err = {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '',
                        schemaPath: '#/definitions/AdjustVolumeAudio/required',
                        params: {
                          missingProperty: 'endTime',
                        },
                        message: "should have required property 'endTime'",
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    } else {
                      var errs_3 = errors;
                      if (typeof data.endTime !== 'number') {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.endTime',
                          schemaPath:
                            '#/definitions/AdjustVolumeAudio/properties/endTime/type',
                          params: {
                            type: 'number',
                          },
                          message: 'should be number',
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      }
                      var valid3 = errors === errs_3;
                    }
                    if (valid3) {
                      if (data.startTime === undefined) {
                        valid3 = false;
                        var err = {
                          keyword: 'required',
                          dataPath: (dataPath || '') + '',
                          schemaPath:
                            '#/definitions/AdjustVolumeAudio/required',
                          params: {
                            missingProperty: 'startTime',
                          },
                          message: "should have required property 'startTime'",
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      } else {
                        var errs_3 = errors;
                        if (typeof data.startTime !== 'number') {
                          var err = {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.startTime',
                            schemaPath:
                              '#/definitions/AdjustVolumeAudio/properties/startTime/type',
                            params: {
                              type: 'number',
                            },
                            message: 'should be number',
                          };
                          if (vErrors === null) vErrors = [err];
                          else vErrors.push(err);
                          errors++;
                        }
                        var valid3 = errors === errs_3;
                      }
                      if (valid3) {
                        var data1 = data.type;
                        if (data1 === undefined) {
                          valid3 = false;
                          var err = {
                            keyword: 'required',
                            dataPath: (dataPath || '') + '',
                            schemaPath:
                              '#/definitions/AdjustVolumeAudio/required',
                            params: {
                              missingProperty: 'type',
                            },
                            message: "should have required property 'type'",
                          };
                          if (vErrors === null) vErrors = [err];
                          else vErrors.push(err);
                          errors++;
                        } else {
                          var errs_3 = errors;
                          if (typeof data1 !== 'string') {
                            var err = {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.type',
                              schemaPath:
                                '#/definitions/AdjustVolumeAudio/properties/type/type',
                              params: {
                                type: 'string',
                              },
                              message: 'should be string',
                            };
                            if (vErrors === null) vErrors = [err];
                            else vErrors.push(err);
                            errors++;
                          }
                          var schema3 = refVal17.properties.type.enum;
                          var valid3;
                          valid3 = false;
                          for (var i3 = 0; i3 < schema3.length; i3++)
                            if (equal(data1, schema3[i3])) {
                              valid3 = true;
                              break;
                            }
                          if (!valid3) {
                            var err = {
                              keyword: 'enum',
                              dataPath: (dataPath || '') + '.type',
                              schemaPath:
                                '#/definitions/AdjustVolumeAudio/properties/type/enum',
                              params: {
                                allowedValues: schema3,
                              },
                              message:
                                'should be equal to one of the allowed values',
                            };
                            if (vErrors === null) vErrors = [err];
                            else vErrors.push(err);
                            errors++;
                          }
                          var valid3 = errors === errs_3;
                        }
                        if (valid3) {
                          if (data.video === undefined) {
                            valid3 = false;
                            var err = {
                              keyword: 'required',
                              dataPath: (dataPath || '') + '',
                              schemaPath:
                                '#/definitions/AdjustVolumeAudio/required',
                              params: {
                                missingProperty: 'video',
                              },
                              message: "should have required property 'video'",
                            };
                            if (vErrors === null) vErrors = [err];
                            else vErrors.push(err);
                            errors++;
                          } else {
                            var errs_3 = errors;
                            if (typeof data.video !== 'number') {
                              var err = {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.video',
                                schemaPath:
                                  '#/definitions/AdjustVolumeAudio/properties/video/type',
                                params: {
                                  type: 'number',
                                },
                                message: 'should be number',
                              };
                              if (vErrors === null) vErrors = [err];
                              else vErrors.push(err);
                              errors++;
                            }
                            var valid3 = errors === errs_3;
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '',
                schemaPath: '#/definitions/AdjustVolumeAudio/type',
                params: {
                  type: 'object',
                },
                message: 'should be object',
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
            var valid1 = errors === errs_1;
            valid0 = valid0 || valid1;
          }
        }
      }
      if (!valid0) {
        var err = {
          keyword: 'anyOf',
          dataPath: (dataPath || '') + '',
          schemaPath: '#/anyOf',
          params: {},
          message: 'should match some schema in anyOf',
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
        validate.errors = vErrors;
        return false;
      } else {
        errors = errs__0;
        if (vErrors !== null) {
          if (errs__0) vErrors.length = errs__0;
          else vErrors = null;
        }
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal13.schema = {
    anyOf: [
      {
        $ref: '#/definitions/SkipAudio',
      },
      {
        $ref: '#/definitions/StillAudio',
      },
      {
        $ref: '#/definitions/PauseAudio',
      },
      {
        $ref: '#/definitions/AdjustVolumeAudio',
      },
    ],
  };
  refVal13.errors = null;
  refVal[13] = refVal13;
  var refVal14 = {
    additionalProperties: false,
    properties: {
      endTime: {
        type: 'number',
      },
      startTime: {
        type: 'number',
      },
      type: {
        enum: ['SKIP'],
        type: 'string',
      },
    },
    required: ['type', 'startTime', 'endTime'],
    type: 'object',
  };
  refVal[14] = refVal14;
  var refVal15 = {
    additionalProperties: false,
    properties: {
      duration: {
        type: 'number',
      },
      startTime: {
        type: 'number',
      },
      type: {
        enum: ['STILL'],
        type: 'string',
      },
    },
    required: ['type', 'startTime', 'duration'],
    type: 'object',
  };
  refVal[15] = refVal15;
  var refVal16 = {
    additionalProperties: false,
    properties: {
      duration: {
        type: 'number',
      },
      startTime: {
        type: 'number',
      },
      type: {
        enum: ['PAUSE'],
        type: 'string',
      },
    },
    required: ['type', 'startTime', 'duration'],
    type: 'object',
  };
  refVal[16] = refVal16;
  var refVal17 = {
    additionalProperties: false,
    properties: {
      audio: {
        type: 'number',
      },
      endTime: {
        type: 'number',
      },
      startTime: {
        type: 'number',
      },
      type: {
        enum: ['VOLUME'],
        type: 'string',
      },
      video: {
        type: 'number',
      },
    },
    required: ['type', 'startTime', 'endTime', 'audio', 'video'],
    type: 'object',
  };
  refVal[17] = refVal17;
  var refVal18 = {
    description: 'The location of a file.',
    format: 'uri-reference',
    type: 'string',
  };
  refVal[18] = refVal18;
  var refVal19 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (rootData === undefined) rootData = data;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false || validate.schema.properties.hasOwnProperty(key0)
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.blend;
            if (data1 === undefined) {
              valid1 = true;
            } else {
              var errs_1 = errors;
              if (typeof data1 !== 'string') {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.blend',
                    schemaPath: '#/properties/blend/type',
                    params: {
                      type: 'string',
                    },
                    message: 'should be string',
                  },
                ];
                return false;
              }
              var schema1 = validate.schema.properties.blend.enum;
              var valid1;
              valid1 = false;
              for (var i1 = 0; i1 < schema1.length; i1++)
                if (equal(data1, schema1[i1])) {
                  valid1 = true;
                  break;
                }
              if (!valid1) {
                validate.errors = [
                  {
                    keyword: 'enum',
                    dataPath: (dataPath || '') + '.blend',
                    schemaPath: '#/properties/blend/enum',
                    params: {
                      allowedValues: schema1,
                    },
                    message: 'should be equal to one of the allowed values',
                  },
                ];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.elements;
              if (data1 === undefined) {
                valid1 = false;
                validate.errors = [
                  {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/required',
                    params: {
                      missingProperty: 'elements',
                    },
                    message: "should have required property 'elements'",
                  },
                ];
                return false;
              } else {
                var errs_1 = errors;
                if (Array.isArray(data1)) {
                  var errs__1 = errors;
                  var valid1;
                  for (var i1 = 0; i1 < data1.length; i1++) {
                    var data2 = data1[i1];
                    var errs_2 = errors;
                    var errs__2 = errors;
                    var valid2 = false;
                    var errs_3 = errors;
                    if (
                      !refVal20(
                        data2,
                        (dataPath || '') + '.elements[' + i1 + ']',
                        data1,
                        i1,
                        rootData
                      )
                    ) {
                      if (vErrors === null) vErrors = refVal20.errors;
                      else vErrors = vErrors.concat(refVal20.errors);
                      errors = vErrors.length;
                    }
                    var valid3 = errors === errs_3;
                    valid2 = valid2 || valid3;
                    if (!valid2) {
                      var errs_3 = errors;
                      if (
                        !refVal28(
                          data2,
                          (dataPath || '') + '.elements[' + i1 + ']',
                          data1,
                          i1,
                          rootData
                        )
                      ) {
                        if (vErrors === null) vErrors = refVal28.errors;
                        else vErrors = vErrors.concat(refVal28.errors);
                        errors = vErrors.length;
                      }
                      var valid3 = errors === errs_3;
                      valid2 = valid2 || valid3;
                      if (!valid2) {
                        var errs_3 = errors;
                        if (
                          !refVal29(
                            data2,
                            (dataPath || '') + '.elements[' + i1 + ']',
                            data1,
                            i1,
                            rootData
                          )
                        ) {
                          if (vErrors === null) vErrors = refVal29.errors;
                          else vErrors = vErrors.concat(refVal29.errors);
                          errors = vErrors.length;
                        }
                        var valid3 = errors === errs_3;
                        valid2 = valid2 || valid3;
                        if (!valid2) {
                          var errs_3 = errors;
                          if (
                            !refVal31(
                              data2,
                              (dataPath || '') + '.elements[' + i1 + ']',
                              data1,
                              i1,
                              rootData
                            )
                          ) {
                            if (vErrors === null) vErrors = refVal31.errors;
                            else vErrors = vErrors.concat(refVal31.errors);
                            errors = vErrors.length;
                          }
                          var valid3 = errors === errs_3;
                          valid2 = valid2 || valid3;
                          if (!valid2) {
                            var errs_3 = errors;
                            if (
                              !refVal33(
                                data2,
                                (dataPath || '') + '.elements[' + i1 + ']',
                                data1,
                                i1,
                                rootData
                              )
                            ) {
                              if (vErrors === null) vErrors = refVal33.errors;
                              else vErrors = vErrors.concat(refVal33.errors);
                              errors = vErrors.length;
                            }
                            var valid3 = errors === errs_3;
                            valid2 = valid2 || valid3;
                          }
                        }
                      }
                    }
                    if (!valid2) {
                      var err = {
                        keyword: 'anyOf',
                        dataPath: (dataPath || '') + '.elements[' + i1 + ']',
                        schemaPath: '#/properties/elements/items/anyOf',
                        params: {},
                        message: 'should match some schema in anyOf',
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                      validate.errors = vErrors;
                      return false;
                    } else {
                      errors = errs__2;
                      if (vErrors !== null) {
                        if (errs__2) vErrors.length = errs__2;
                        else vErrors = null;
                      }
                    }
                    var valid2 = errors === errs_2;
                    if (!valid2) break;
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.elements',
                      schemaPath: '#/properties/elements/type',
                      params: {
                        type: 'array',
                      },
                      message: 'should be array',
                    },
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.height;
                if (data1 === undefined) {
                  valid1 = false;
                  validate.errors = [
                    {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/required',
                      params: {
                        missingProperty: 'height',
                      },
                      message: "should have required property 'height'",
                    },
                  ];
                  return false;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if (typeof data1 === 'number') {
                    if (data1 > 1000 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'maximum',
                          dataPath: (dataPath || '') + '.height',
                          schemaPath: '#/definitions/Percentage/maximum',
                          params: {
                            comparison: '<=',
                            limit: 1000,
                            exclusive: false,
                          },
                          message: 'should be <= 1000',
                        },
                      ];
                      return false;
                    } else {
                      if (data1 < -100 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'minimum',
                            dataPath: (dataPath || '') + '.height',
                            schemaPath: '#/definitions/Percentage/minimum',
                            params: {
                              comparison: '>=',
                              limit: -100,
                              exclusive: false,
                            },
                            message: 'should be >= -100',
                          },
                        ];
                        return false;
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.height',
                        schemaPath: '#/definitions/Percentage/type',
                        params: {
                          type: 'number',
                        },
                        message: 'should be number',
                      },
                    ];
                    return false;
                  }
                  var valid2 = errors === errs_2;
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.left;
                  if (data1 === undefined) {
                    valid1 = false;
                    validate.errors = [
                      {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '',
                        schemaPath: '#/required',
                        params: {
                          missingProperty: 'left',
                        },
                        message: "should have required property 'left'",
                      },
                    ];
                    return false;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (typeof data1 === 'number') {
                      if (data1 > 1000 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'maximum',
                            dataPath: (dataPath || '') + '.left',
                            schemaPath: '#/definitions/Percentage/maximum',
                            params: {
                              comparison: '<=',
                              limit: 1000,
                              exclusive: false,
                            },
                            message: 'should be <= 1000',
                          },
                        ];
                        return false;
                      } else {
                        if (data1 < -100 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'minimum',
                              dataPath: (dataPath || '') + '.left',
                              schemaPath: '#/definitions/Percentage/minimum',
                              params: {
                                comparison: '>=',
                                limit: -100,
                                exclusive: false,
                              },
                              message: 'should be >= -100',
                            },
                          ];
                          return false;
                        }
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.left',
                          schemaPath: '#/definitions/Percentage/type',
                          params: {
                            type: 'number',
                          },
                          message: 'should be number',
                        },
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.title;
                    if (data1 === undefined) {
                      valid1 = false;
                      validate.errors = [
                        {
                          keyword: 'required',
                          dataPath: (dataPath || '') + '',
                          schemaPath: '#/required',
                          params: {
                            missingProperty: 'title',
                          },
                          message: "should have required property 'title'",
                        },
                      ];
                      return false;
                    } else {
                      var errs_1 = errors;
                      if (
                        data1 &&
                        typeof data1 === 'object' &&
                        !Array.isArray(data1)
                      ) {
                        if (true) {
                          var errs__1 = errors;
                          var valid2 = true;
                          for (var key1 in data1) {
                            var isAdditional1 = !(
                              false ||
                              key1 == 'show' ||
                              key1 == 'text'
                            );
                            if (isAdditional1) {
                              valid2 = false;
                              validate.errors = [
                                {
                                  keyword: 'additionalProperties',
                                  dataPath: (dataPath || '') + '.title',
                                  schemaPath:
                                    '#/properties/title/additionalProperties',
                                  params: {
                                    additionalProperty: '' + key1 + '',
                                  },
                                  message:
                                    'should NOT have additional properties',
                                },
                              ];
                              return false;
                              break;
                            }
                          }
                          if (valid2) {
                            if (data1.show === undefined) {
                              valid2 = false;
                              validate.errors = [
                                {
                                  keyword: 'required',
                                  dataPath: (dataPath || '') + '.title',
                                  schemaPath: '#/properties/title/required',
                                  params: {
                                    missingProperty: 'show',
                                  },
                                  message:
                                    "should have required property 'show'",
                                },
                              ];
                              return false;
                            } else {
                              var errs_2 = errors;
                              if (typeof data1.show !== 'boolean') {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath: (dataPath || '') + '.title.show',
                                    schemaPath:
                                      '#/properties/title/properties/show/type',
                                    params: {
                                      type: 'boolean',
                                    },
                                    message: 'should be boolean',
                                  },
                                ];
                                return false;
                              }
                              var valid2 = errors === errs_2;
                            }
                            if (valid2) {
                              var data2 = data1.text;
                              if (data2 === undefined) {
                                valid2 = false;
                                validate.errors = [
                                  {
                                    keyword: 'required',
                                    dataPath: (dataPath || '') + '.title',
                                    schemaPath: '#/properties/title/required',
                                    params: {
                                      missingProperty: 'text',
                                    },
                                    message:
                                      "should have required property 'text'",
                                  },
                                ];
                                return false;
                              } else {
                                var errs_2 = errors;
                                var errs_3 = errors;
                                if (typeof data2 === 'string') {
                                  if (ucs2length(data2) > 256) {
                                    validate.errors = [
                                      {
                                        keyword: 'maxLength',
                                        dataPath:
                                          (dataPath || '') + '.title.text',
                                        schemaPath:
                                          '#/definitions/Title/maxLength',
                                        params: {
                                          limit: 256,
                                        },
                                        message:
                                          'should NOT be longer than 256 characters',
                                      },
                                    ];
                                    return false;
                                  } else {
                                    if (ucs2length(data2) < 2) {
                                      validate.errors = [
                                        {
                                          keyword: 'minLength',
                                          dataPath:
                                            (dataPath || '') + '.title.text',
                                          schemaPath:
                                            '#/definitions/Title/minLength',
                                          params: {
                                            limit: 2,
                                          },
                                          message:
                                            'should NOT be shorter than 2 characters',
                                        },
                                      ];
                                      return false;
                                    }
                                  }
                                } else {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') + '.title.text',
                                      schemaPath: '#/definitions/Title/type',
                                      params: {
                                        type: 'string',
                                      },
                                      message: 'should be string',
                                    },
                                  ];
                                  return false;
                                }
                                var valid3 = errors === errs_3;
                                var valid2 = errors === errs_2;
                              }
                            }
                          }
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.title',
                            schemaPath: '#/properties/title/type',
                            params: {
                              type: 'object',
                            },
                            message: 'should be object',
                          },
                        ];
                        return false;
                      }
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      var data1 = data.top;
                      if (data1 === undefined) {
                        valid1 = false;
                        validate.errors = [
                          {
                            keyword: 'required',
                            dataPath: (dataPath || '') + '',
                            schemaPath: '#/required',
                            params: {
                              missingProperty: 'top',
                            },
                            message: "should have required property 'top'",
                          },
                        ];
                        return false;
                      } else {
                        var errs_1 = errors;
                        var errs_2 = errors;
                        if (typeof data1 === 'number') {
                          if (data1 > 1000 || data1 !== data1) {
                            validate.errors = [
                              {
                                keyword: 'maximum',
                                dataPath: (dataPath || '') + '.top',
                                schemaPath: '#/definitions/Percentage/maximum',
                                params: {
                                  comparison: '<=',
                                  limit: 1000,
                                  exclusive: false,
                                },
                                message: 'should be <= 1000',
                              },
                            ];
                            return false;
                          } else {
                            if (data1 < -100 || data1 !== data1) {
                              validate.errors = [
                                {
                                  keyword: 'minimum',
                                  dataPath: (dataPath || '') + '.top',
                                  schemaPath:
                                    '#/definitions/Percentage/minimum',
                                  params: {
                                    comparison: '>=',
                                    limit: -100,
                                    exclusive: false,
                                  },
                                  message: 'should be >= -100',
                                },
                              ];
                              return false;
                            }
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.top',
                              schemaPath: '#/definitions/Percentage/type',
                              params: {
                                type: 'number',
                              },
                              message: 'should be number',
                            },
                          ];
                          return false;
                        }
                        var valid2 = errors === errs_2;
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        var data1 = data.type;
                        if (data1 === undefined) {
                          valid1 = false;
                          validate.errors = [
                            {
                              keyword: 'required',
                              dataPath: (dataPath || '') + '',
                              schemaPath: '#/required',
                              params: {
                                missingProperty: 'type',
                              },
                              message: "should have required property 'type'",
                            },
                          ];
                          return false;
                        } else {
                          var errs_1 = errors;
                          if (typeof data1 !== 'string') {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.type',
                                schemaPath: '#/properties/type/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var schema1 = validate.schema.properties.type.enum;
                          var valid1;
                          valid1 = false;
                          for (var i1 = 0; i1 < schema1.length; i1++)
                            if (equal(data1, schema1[i1])) {
                              valid1 = true;
                              break;
                            }
                          if (!valid1) {
                            validate.errors = [
                              {
                                keyword: 'enum',
                                dataPath: (dataPath || '') + '.type',
                                schemaPath: '#/properties/type/enum',
                                params: {
                                  allowedValues: schema1,
                                },
                                message:
                                  'should be equal to one of the allowed values',
                              },
                            ];
                            return false;
                          }
                          var valid1 = errors === errs_1;
                        }
                        if (valid1) {
                          var data1 = data.viewBox;
                          if (data1 === undefined) {
                            valid1 = false;
                            validate.errors = [
                              {
                                keyword: 'required',
                                dataPath: (dataPath || '') + '',
                                schemaPath: '#/required',
                                params: {
                                  missingProperty: 'viewBox',
                                },
                                message:
                                  "should have required property 'viewBox'",
                              },
                            ];
                            return false;
                          } else {
                            var errs_1 = errors;
                            var errs_2 = errors;
                            if (typeof data1 === 'string') {
                              if (!pattern3.test(data1)) {
                                validate.errors = [
                                  {
                                    keyword: 'pattern',
                                    dataPath: (dataPath || '') + '.viewBox',
                                    schemaPath: '#/definitions/ViewBox/pattern',
                                    params: {
                                      pattern: '^([0-9]+\\s){3}[0-9]+$',
                                    },
                                    message:
                                      'should match pattern "^([0-9]+\\s){3}[0-9]+$"',
                                  },
                                ];
                                return false;
                              }
                            } else {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.viewBox',
                                  schemaPath: '#/definitions/ViewBox/type',
                                  params: {
                                    type: 'string',
                                  },
                                  message: 'should be string',
                                },
                              ];
                              return false;
                            }
                            var valid2 = errors === errs_2;
                            var valid1 = errors === errs_1;
                          }
                          if (valid1) {
                            var data1 = data.width;
                            if (data1 === undefined) {
                              valid1 = false;
                              validate.errors = [
                                {
                                  keyword: 'required',
                                  dataPath: (dataPath || '') + '',
                                  schemaPath: '#/required',
                                  params: {
                                    missingProperty: 'width',
                                  },
                                  message:
                                    "should have required property 'width'",
                                },
                              ];
                              return false;
                            } else {
                              var errs_1 = errors;
                              var errs_2 = errors;
                              if (typeof data1 === 'number') {
                                if (data1 > 1000 || data1 !== data1) {
                                  validate.errors = [
                                    {
                                      keyword: 'maximum',
                                      dataPath: (dataPath || '') + '.width',
                                      schemaPath:
                                        '#/definitions/Percentage/maximum',
                                      params: {
                                        comparison: '<=',
                                        limit: 1000,
                                        exclusive: false,
                                      },
                                      message: 'should be <= 1000',
                                    },
                                  ];
                                  return false;
                                } else {
                                  if (data1 < -100 || data1 !== data1) {
                                    validate.errors = [
                                      {
                                        keyword: 'minimum',
                                        dataPath: (dataPath || '') + '.width',
                                        schemaPath:
                                          '#/definitions/Percentage/minimum',
                                        params: {
                                          comparison: '>=',
                                          limit: -100,
                                          exclusive: false,
                                        },
                                        message: 'should be >= -100',
                                      },
                                    ];
                                    return false;
                                  }
                                }
                              } else {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath: (dataPath || '') + '.width',
                                    schemaPath: '#/definitions/Percentage/type',
                                    params: {
                                      type: 'number',
                                    },
                                    message: 'should be number',
                                  },
                                ];
                                return false;
                              }
                              var valid2 = errors === errs_2;
                              var valid1 = errors === errs_1;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal19.schema = {
    additionalProperties: false,
    properties: {
      blend: {
        enum: [
          'normal',
          'multiply',
          'screen',
          'overlay',
          'darken',
          'lighten',
          'color-dodge',
          'color-burn',
          'hard-light',
          'soft-light',
          'difference',
          'exclusion',
          'hue',
          'saturation',
          'color',
          'luminosity',
        ],
        type: 'string',
      },
      elements: {
        items: {
          anyOf: [
            {
              $ref: '#/definitions/PlopdownShapeEllipse',
            },
            {
              $ref: '#/definitions/PlopdownShapeRect',
            },
            {
              $ref: '#/definitions/PlopdownShapePath',
            },
            {
              $ref: '#/definitions/PlopdownShapePolygon',
            },
            {
              $ref: '#/definitions/PlopdownShapePolyline',
            },
          ],
        },
        type: 'array',
      },
      height: {
        $ref: '#/definitions/Percentage',
      },
      left: {
        $ref: '#/definitions/Percentage',
      },
      title: {
        additionalProperties: false,
        properties: {
          show: {
            type: 'boolean',
          },
          text: {
            $ref: '#/definitions/Title',
          },
        },
        required: ['text', 'show'],
        type: 'object',
      },
      top: {
        $ref: '#/definitions/Percentage',
      },
      type: {
        enum: ['SHAPE'],
        type: 'string',
      },
      viewBox: {
        $ref: '#/definitions/ViewBox',
      },
      width: {
        $ref: '#/definitions/Percentage',
      },
    },
    required: [
      'elements',
      'height',
      'left',
      'title',
      'top',
      'type',
      'viewBox',
      'width',
    ],
    type: 'object',
  };
  refVal19.errors = null;
  refVal[19] = refVal19;
  var refVal20 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false || validate.schema.properties.hasOwnProperty(key0)
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.cx;
            if (data1 === undefined) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'cx',
                  },
                  message: "should have required property 'cx'",
                },
              ];
              return false;
            } else {
              var errs_1 = errors;
              var errs_2 = errors;
              if (typeof data1 === 'number') {
                if (data1 < 0 || data1 !== data1) {
                  validate.errors = [
                    {
                      keyword: 'minimum',
                      dataPath: (dataPath || '') + '.cx',
                      schemaPath: '#/definitions/ViewportCoordinate/minimum',
                      params: {
                        comparison: '>=',
                        limit: 0,
                        exclusive: false,
                      },
                      message: 'should be >= 0',
                    },
                  ];
                  return false;
                }
              } else {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.cx',
                    schemaPath: '#/definitions/ViewportCoordinate/type',
                    params: {
                      type: 'number',
                    },
                    message: 'should be number',
                  },
                ];
                return false;
              }
              var valid2 = errors === errs_2;
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.cy;
              if (data1 === undefined) {
                valid1 = false;
                validate.errors = [
                  {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/required',
                    params: {
                      missingProperty: 'cy',
                    },
                    message: "should have required property 'cy'",
                  },
                ];
                return false;
              } else {
                var errs_1 = errors;
                var errs_2 = errors;
                if (typeof data1 === 'number') {
                  if (data1 < 0 || data1 !== data1) {
                    validate.errors = [
                      {
                        keyword: 'minimum',
                        dataPath: (dataPath || '') + '.cy',
                        schemaPath: '#/definitions/ViewportCoordinate/minimum',
                        params: {
                          comparison: '>=',
                          limit: 0,
                          exclusive: false,
                        },
                        message: 'should be >= 0',
                      },
                    ];
                    return false;
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.cy',
                      schemaPath: '#/definitions/ViewportCoordinate/type',
                      params: {
                        type: 'number',
                      },
                      message: 'should be number',
                    },
                  ];
                  return false;
                }
                var valid2 = errors === errs_2;
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.element;
                if (data1 === undefined) {
                  valid1 = false;
                  validate.errors = [
                    {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/required',
                      params: {
                        missingProperty: 'element',
                      },
                      message: "should have required property 'element'",
                    },
                  ];
                  return false;
                } else {
                  var errs_1 = errors;
                  if (typeof data1 !== 'string') {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.element',
                        schemaPath: '#/properties/element/type',
                        params: {
                          type: 'string',
                        },
                        message: 'should be string',
                      },
                    ];
                    return false;
                  }
                  var schema1 = validate.schema.properties.element.enum;
                  var valid1;
                  valid1 = false;
                  for (var i1 = 0; i1 < schema1.length; i1++)
                    if (equal(data1, schema1[i1])) {
                      valid1 = true;
                      break;
                    }
                  if (!valid1) {
                    validate.errors = [
                      {
                        keyword: 'enum',
                        dataPath: (dataPath || '') + '.element',
                        schemaPath: '#/properties/element/enum',
                        params: {
                          allowedValues: schema1,
                        },
                        message: 'should be equal to one of the allowed values',
                      },
                    ];
                    return false;
                  }
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.fill;
                  if (data1 === undefined) {
                    valid1 = true;
                  } else {
                    var errs_1 = errors;
                    if (
                      data1 &&
                      typeof data1 === 'object' &&
                      !Array.isArray(data1)
                    ) {
                      var errs__1 = errors;
                      var valid2 = true;
                      for (var key1 in data1) {
                        var isAdditional1 = !(
                          false ||
                          key1 == 'color' ||
                          key1 == 'opacity' ||
                          key1 == 'rule'
                        );
                        if (isAdditional1) {
                          valid2 = false;
                          validate.errors = [
                            {
                              keyword: 'additionalProperties',
                              dataPath: (dataPath || '') + '.fill',
                              schemaPath:
                                '#/properties/fill/additionalProperties',
                              params: {
                                additionalProperty: '' + key1 + '',
                              },
                              message: 'should NOT have additional properties',
                            },
                          ];
                          return false;
                          break;
                        }
                      }
                      if (valid2) {
                        var data2 = data1.color;
                        if (data2 === undefined) {
                          valid2 = true;
                        } else {
                          var errs_2 = errors;
                          var errs_3 = errors;
                          if (typeof data2 === 'string') {
                            if (!pattern0.test(data2)) {
                              validate.errors = [
                                {
                                  keyword: 'pattern',
                                  dataPath: (dataPath || '') + '.fill.color',
                                  schemaPath: '#/definitions/Color/pattern',
                                  params: {
                                    pattern:
                                      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                                  },
                                  message:
                                    'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                                },
                              ];
                              return false;
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.fill.color',
                                schemaPath: '#/definitions/Color/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var valid3 = errors === errs_3;
                          var valid2 = errors === errs_2;
                        }
                        if (valid2) {
                          var data2 = data1.opacity;
                          if (data2 === undefined) {
                            valid2 = true;
                          } else {
                            var errs_2 = errors;
                            var errs_3 = errors;
                            if (typeof data2 === 'number') {
                              if (data2 > 1 || data2 !== data2) {
                                validate.errors = [
                                  {
                                    keyword: 'maximum',
                                    dataPath:
                                      (dataPath || '') + '.fill.opacity',
                                    schemaPath: '#/definitions/Opacity/maximum',
                                    params: {
                                      comparison: '<=',
                                      limit: 1,
                                      exclusive: false,
                                    },
                                    message: 'should be <= 1',
                                  },
                                ];
                                return false;
                              } else {
                                if (data2 < 0 || data2 !== data2) {
                                  validate.errors = [
                                    {
                                      keyword: 'minimum',
                                      dataPath:
                                        (dataPath || '') + '.fill.opacity',
                                      schemaPath:
                                        '#/definitions/Opacity/minimum',
                                      params: {
                                        comparison: '>=',
                                        limit: 0,
                                        exclusive: false,
                                      },
                                      message: 'should be >= 0',
                                    },
                                  ];
                                  return false;
                                }
                              }
                            } else {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.fill.opacity',
                                  schemaPath: '#/definitions/Opacity/type',
                                  params: {
                                    type: 'number',
                                  },
                                  message: 'should be number',
                                },
                              ];
                              return false;
                            }
                            var valid3 = errors === errs_3;
                            var valid2 = errors === errs_2;
                          }
                          if (valid2) {
                            var data2 = data1.rule;
                            if (data2 === undefined) {
                              valid2 = true;
                            } else {
                              var errs_2 = errors;
                              if (typeof data2 !== 'string') {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath: (dataPath || '') + '.fill.rule',
                                    schemaPath:
                                      '#/properties/fill/properties/rule/type',
                                    params: {
                                      type: 'string',
                                    },
                                    message: 'should be string',
                                  },
                                ];
                                return false;
                              }
                              var schema2 =
                                validate.schema.properties.fill.properties.rule
                                  .enum;
                              var valid2;
                              valid2 = false;
                              for (var i2 = 0; i2 < schema2.length; i2++)
                                if (equal(data2, schema2[i2])) {
                                  valid2 = true;
                                  break;
                                }
                              if (!valid2) {
                                validate.errors = [
                                  {
                                    keyword: 'enum',
                                    dataPath: (dataPath || '') + '.fill.rule',
                                    schemaPath:
                                      '#/properties/fill/properties/rule/enum',
                                    params: {
                                      allowedValues: schema2,
                                    },
                                    message:
                                      'should be equal to one of the allowed values',
                                  },
                                ];
                                return false;
                              }
                              var valid2 = errors === errs_2;
                            }
                          }
                        }
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.fill',
                          schemaPath: '#/properties/fill/type',
                          params: {
                            type: 'object',
                          },
                          message: 'should be object',
                        },
                      ];
                      return false;
                    }
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.opacity;
                    if (data1 === undefined) {
                      valid1 = true;
                    } else {
                      var errs_1 = errors;
                      var errs_2 = errors;
                      if (typeof data1 === 'number') {
                        if (data1 > 1 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'maximum',
                              dataPath: (dataPath || '') + '.opacity',
                              schemaPath: '#/definitions/Opacity/maximum',
                              params: {
                                comparison: '<=',
                                limit: 1,
                                exclusive: false,
                              },
                              message: 'should be <= 1',
                            },
                          ];
                          return false;
                        } else {
                          if (data1 < 0 || data1 !== data1) {
                            validate.errors = [
                              {
                                keyword: 'minimum',
                                dataPath: (dataPath || '') + '.opacity',
                                schemaPath: '#/definitions/Opacity/minimum',
                                params: {
                                  comparison: '>=',
                                  limit: 0,
                                  exclusive: false,
                                },
                                message: 'should be >= 0',
                              },
                            ];
                            return false;
                          }
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.opacity',
                            schemaPath: '#/definitions/Opacity/type',
                            params: {
                              type: 'number',
                            },
                            message: 'should be number',
                          },
                        ];
                        return false;
                      }
                      var valid2 = errors === errs_2;
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      var data1 = data.rx;
                      if (data1 === undefined) {
                        valid1 = false;
                        validate.errors = [
                          {
                            keyword: 'required',
                            dataPath: (dataPath || '') + '',
                            schemaPath: '#/required',
                            params: {
                              missingProperty: 'rx',
                            },
                            message: "should have required property 'rx'",
                          },
                        ];
                        return false;
                      } else {
                        var errs_1 = errors;
                        var errs_2 = errors;
                        if (typeof data1 === 'number') {
                          if (data1 < 0 || data1 !== data1) {
                            validate.errors = [
                              {
                                keyword: 'minimum',
                                dataPath: (dataPath || '') + '.rx',
                                schemaPath:
                                  '#/definitions/ViewportCoordinate/minimum',
                                params: {
                                  comparison: '>=',
                                  limit: 0,
                                  exclusive: false,
                                },
                                message: 'should be >= 0',
                              },
                            ];
                            return false;
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.rx',
                              schemaPath:
                                '#/definitions/ViewportCoordinate/type',
                              params: {
                                type: 'number',
                              },
                              message: 'should be number',
                            },
                          ];
                          return false;
                        }
                        var valid2 = errors === errs_2;
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        var data1 = data.ry;
                        if (data1 === undefined) {
                          valid1 = false;
                          validate.errors = [
                            {
                              keyword: 'required',
                              dataPath: (dataPath || '') + '',
                              schemaPath: '#/required',
                              params: {
                                missingProperty: 'ry',
                              },
                              message: "should have required property 'ry'",
                            },
                          ];
                          return false;
                        } else {
                          var errs_1 = errors;
                          var errs_2 = errors;
                          if (typeof data1 === 'number') {
                            if (data1 < 0 || data1 !== data1) {
                              validate.errors = [
                                {
                                  keyword: 'minimum',
                                  dataPath: (dataPath || '') + '.ry',
                                  schemaPath:
                                    '#/definitions/ViewportCoordinate/minimum',
                                  params: {
                                    comparison: '>=',
                                    limit: 0,
                                    exclusive: false,
                                  },
                                  message: 'should be >= 0',
                                },
                              ];
                              return false;
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.ry',
                                schemaPath:
                                  '#/definitions/ViewportCoordinate/type',
                                params: {
                                  type: 'number',
                                },
                                message: 'should be number',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                          var valid1 = errors === errs_1;
                        }
                        if (valid1) {
                          var data1 = data.stroke;
                          if (data1 === undefined) {
                            valid1 = true;
                          } else {
                            var errs_1 = errors;
                            if (
                              data1 &&
                              typeof data1 === 'object' &&
                              !Array.isArray(data1)
                            ) {
                              var errs__1 = errors;
                              var valid2 = true;
                              for (var key1 in data1) {
                                var isAdditional1 = !(
                                  false ||
                                  key1 == 'color' ||
                                  key1 == 'dasharray' ||
                                  key1 == 'dashoffset' ||
                                  key1 == 'linecap' ||
                                  key1 == 'linejoin' ||
                                  key1 == 'opacity' ||
                                  key1 == 'width'
                                );
                                if (isAdditional1) {
                                  valid2 = false;
                                  validate.errors = [
                                    {
                                      keyword: 'additionalProperties',
                                      dataPath: (dataPath || '') + '.stroke',
                                      schemaPath:
                                        '#/properties/stroke/additionalProperties',
                                      params: {
                                        additionalProperty: '' + key1 + '',
                                      },
                                      message:
                                        'should NOT have additional properties',
                                    },
                                  ];
                                  return false;
                                  break;
                                }
                              }
                              if (valid2) {
                                var data2 = data1.color;
                                if (data2 === undefined) {
                                  valid2 = true;
                                } else {
                                  var errs_2 = errors;
                                  var errs_3 = errors;
                                  if (typeof data2 === 'string') {
                                    if (!pattern0.test(data2)) {
                                      validate.errors = [
                                        {
                                          keyword: 'pattern',
                                          dataPath:
                                            (dataPath || '') + '.stroke.color',
                                          schemaPath:
                                            '#/definitions/Color/pattern',
                                          params: {
                                            pattern:
                                              '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                                          },
                                          message:
                                            'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                                        },
                                      ];
                                      return false;
                                    }
                                  } else {
                                    validate.errors = [
                                      {
                                        keyword: 'type',
                                        dataPath:
                                          (dataPath || '') + '.stroke.color',
                                        schemaPath: '#/definitions/Color/type',
                                        params: {
                                          type: 'string',
                                        },
                                        message: 'should be string',
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid3 = errors === errs_3;
                                  var valid2 = errors === errs_2;
                                }
                                if (valid2) {
                                  var data2 = data1.dasharray;
                                  if (data2 === undefined) {
                                    valid2 = true;
                                  } else {
                                    var errs_2 = errors;
                                    var errs_3 = errors;
                                    if (typeof data2 === 'string') {
                                      if (!pattern1.test(data2)) {
                                        validate.errors = [
                                          {
                                            keyword: 'pattern',
                                            dataPath:
                                              (dataPath || '') +
                                              '.stroke.dasharray',
                                            schemaPath:
                                              '#/definitions/DashArray/pattern',
                                            params: {
                                              pattern: '^([0-9]+\\s)+[0-9]+$',
                                            },
                                            message:
                                              'should match pattern "^([0-9]+\\s)+[0-9]+$"',
                                          },
                                        ];
                                        return false;
                                      }
                                    } else {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.dasharray',
                                          schemaPath:
                                            '#/definitions/DashArray/type',
                                          params: {
                                            type: 'string',
                                          },
                                          message: 'should be string',
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid3 = errors === errs_3;
                                    var valid2 = errors === errs_2;
                                  }
                                  if (valid2) {
                                    var data2 = data1.dashoffset;
                                    if (data2 === undefined) {
                                      valid2 = true;
                                    } else {
                                      var errs_2 = errors;
                                      var errs_3 = errors;
                                      if (
                                        typeof data2 !== 'number' ||
                                        data2 % 1 ||
                                        data2 !== data2
                                      ) {
                                        validate.errors = [
                                          {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.stroke.dashoffset',
                                            schemaPath:
                                              '#/definitions/DashOffset/type',
                                            params: {
                                              type: 'integer',
                                            },
                                            message: 'should be integer',
                                          },
                                        ];
                                        return false;
                                      }
                                      if (typeof data2 === 'number') {
                                        if (data2 > 100 || data2 !== data2) {
                                          validate.errors = [
                                            {
                                              keyword: 'maximum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.dashoffset',
                                              schemaPath:
                                                '#/definitions/DashOffset/maximum',
                                              params: {
                                                comparison: '<=',
                                                limit: 100,
                                                exclusive: false,
                                              },
                                              message: 'should be <= 100',
                                            },
                                          ];
                                          return false;
                                        } else {
                                          if (data2 < -100 || data2 !== data2) {
                                            validate.errors = [
                                              {
                                                keyword: 'minimum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.dashoffset',
                                                schemaPath:
                                                  '#/definitions/DashOffset/minimum',
                                                params: {
                                                  comparison: '>=',
                                                  limit: -100,
                                                  exclusive: false,
                                                },
                                                message: 'should be >= -100',
                                              },
                                            ];
                                            return false;
                                          }
                                        }
                                      }
                                      var valid3 = errors === errs_3;
                                      var valid2 = errors === errs_2;
                                    }
                                    if (valid2) {
                                      var data2 = data1.linecap;
                                      if (data2 === undefined) {
                                        valid2 = true;
                                      } else {
                                        var errs_2 = errors;
                                        if (typeof data2 !== 'string') {
                                          validate.errors = [
                                            {
                                              keyword: 'type',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.linecap',
                                              schemaPath:
                                                '#/properties/stroke/properties/linecap/type',
                                              params: {
                                                type: 'string',
                                              },
                                              message: 'should be string',
                                            },
                                          ];
                                          return false;
                                        }
                                        var schema2 =
                                          validate.schema.properties.stroke
                                            .properties.linecap.enum;
                                        var valid2;
                                        valid2 = false;
                                        for (
                                          var i2 = 0;
                                          i2 < schema2.length;
                                          i2++
                                        )
                                          if (equal(data2, schema2[i2])) {
                                            valid2 = true;
                                            break;
                                          }
                                        if (!valid2) {
                                          validate.errors = [
                                            {
                                              keyword: 'enum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.linecap',
                                              schemaPath:
                                                '#/properties/stroke/properties/linecap/enum',
                                              params: {
                                                allowedValues: schema2,
                                              },
                                              message:
                                                'should be equal to one of the allowed values',
                                            },
                                          ];
                                          return false;
                                        }
                                        var valid2 = errors === errs_2;
                                      }
                                      if (valid2) {
                                        var data2 = data1.linejoin;
                                        if (data2 === undefined) {
                                          valid2 = true;
                                        } else {
                                          var errs_2 = errors;
                                          if (typeof data2 !== 'string') {
                                            validate.errors = [
                                              {
                                                keyword: 'type',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.linejoin',
                                                schemaPath:
                                                  '#/properties/stroke/properties/linejoin/type',
                                                params: {
                                                  type: 'string',
                                                },
                                                message: 'should be string',
                                              },
                                            ];
                                            return false;
                                          }
                                          var schema2 =
                                            validate.schema.properties.stroke
                                              .properties.linejoin.enum;
                                          var valid2;
                                          valid2 = false;
                                          for (
                                            var i2 = 0;
                                            i2 < schema2.length;
                                            i2++
                                          )
                                            if (equal(data2, schema2[i2])) {
                                              valid2 = true;
                                              break;
                                            }
                                          if (!valid2) {
                                            validate.errors = [
                                              {
                                                keyword: 'enum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.linejoin',
                                                schemaPath:
                                                  '#/properties/stroke/properties/linejoin/enum',
                                                params: {
                                                  allowedValues: schema2,
                                                },
                                                message:
                                                  'should be equal to one of the allowed values',
                                              },
                                            ];
                                            return false;
                                          }
                                          var valid2 = errors === errs_2;
                                        }
                                        if (valid2) {
                                          var data2 = data1.opacity;
                                          if (data2 === undefined) {
                                            valid2 = true;
                                          } else {
                                            var errs_2 = errors;
                                            var errs_3 = errors;
                                            if (typeof data2 === 'number') {
                                              if (
                                                data2 > 1 ||
                                                data2 !== data2
                                              ) {
                                                validate.errors = [
                                                  {
                                                    keyword: 'maximum',
                                                    dataPath:
                                                      (dataPath || '') +
                                                      '.stroke.opacity',
                                                    schemaPath:
                                                      '#/definitions/Opacity/maximum',
                                                    params: {
                                                      comparison: '<=',
                                                      limit: 1,
                                                      exclusive: false,
                                                    },
                                                    message: 'should be <= 1',
                                                  },
                                                ];
                                                return false;
                                              } else {
                                                if (
                                                  data2 < 0 ||
                                                  data2 !== data2
                                                ) {
                                                  validate.errors = [
                                                    {
                                                      keyword: 'minimum',
                                                      dataPath:
                                                        (dataPath || '') +
                                                        '.stroke.opacity',
                                                      schemaPath:
                                                        '#/definitions/Opacity/minimum',
                                                      params: {
                                                        comparison: '>=',
                                                        limit: 0,
                                                        exclusive: false,
                                                      },
                                                      message: 'should be >= 0',
                                                    },
                                                  ];
                                                  return false;
                                                }
                                              }
                                            } else {
                                              validate.errors = [
                                                {
                                                  keyword: 'type',
                                                  dataPath:
                                                    (dataPath || '') +
                                                    '.stroke.opacity',
                                                  schemaPath:
                                                    '#/definitions/Opacity/type',
                                                  params: {
                                                    type: 'number',
                                                  },
                                                  message: 'should be number',
                                                },
                                              ];
                                              return false;
                                            }
                                            var valid3 = errors === errs_3;
                                            var valid2 = errors === errs_2;
                                          }
                                          if (valid2) {
                                            var data2 = data1.width;
                                            if (data2 === undefined) {
                                              valid2 = true;
                                            } else {
                                              var errs_2 = errors;
                                              var errs_3 = errors;
                                              if (typeof data2 === 'number') {
                                                if (
                                                  data2 < 0 ||
                                                  data2 !== data2
                                                ) {
                                                  validate.errors = [
                                                    {
                                                      keyword: 'minimum',
                                                      dataPath:
                                                        (dataPath || '') +
                                                        '.stroke.width',
                                                      schemaPath:
                                                        '#/definitions/ViewportCoordinate/minimum',
                                                      params: {
                                                        comparison: '>=',
                                                        limit: 0,
                                                        exclusive: false,
                                                      },
                                                      message: 'should be >= 0',
                                                    },
                                                  ];
                                                  return false;
                                                }
                                              } else {
                                                validate.errors = [
                                                  {
                                                    keyword: 'type',
                                                    dataPath:
                                                      (dataPath || '') +
                                                      '.stroke.width',
                                                    schemaPath:
                                                      '#/definitions/ViewportCoordinate/type',
                                                    params: {
                                                      type: 'number',
                                                    },
                                                    message: 'should be number',
                                                  },
                                                ];
                                                return false;
                                              }
                                              var valid3 = errors === errs_3;
                                              var valid2 = errors === errs_2;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            } else {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.stroke',
                                  schemaPath: '#/properties/stroke/type',
                                  params: {
                                    type: 'object',
                                  },
                                  message: 'should be object',
                                },
                              ];
                              return false;
                            }
                            var valid1 = errors === errs_1;
                          }
                          if (valid1) {
                            var data1 = data.transform;
                            if (data1 === undefined) {
                              valid1 = true;
                            } else {
                              var errs_1 = errors;
                              var errs_2 = errors;
                              if (typeof data1 === 'string') {
                                if (ucs2length(data1) > 128) {
                                  validate.errors = [
                                    {
                                      keyword: 'maxLength',
                                      dataPath: (dataPath || '') + '.transform',
                                      schemaPath:
                                        '#/definitions/Transform/maxLength',
                                      params: {
                                        limit: 128,
                                      },
                                      message:
                                        'should NOT be longer than 128 characters',
                                    },
                                  ];
                                  return false;
                                } else {
                                  if (ucs2length(data1) < 2) {
                                    validate.errors = [
                                      {
                                        keyword: 'minLength',
                                        dataPath:
                                          (dataPath || '') + '.transform',
                                        schemaPath:
                                          '#/definitions/Transform/minLength',
                                        params: {
                                          limit: 2,
                                        },
                                        message:
                                          'should NOT be shorter than 2 characters',
                                      },
                                    ];
                                    return false;
                                  }
                                }
                              } else {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath: (dataPath || '') + '.transform',
                                    schemaPath: '#/definitions/Transform/type',
                                    params: {
                                      type: 'string',
                                    },
                                    message: 'should be string',
                                  },
                                ];
                                return false;
                              }
                              var valid2 = errors === errs_2;
                              var valid1 = errors === errs_1;
                            }
                            if (valid1) {
                              var data1 = data.transformOrigin;
                              if (data1 === undefined) {
                                valid1 = true;
                              } else {
                                var errs_1 = errors;
                                var errs_2 = errors;
                                if (typeof data1 === 'string') {
                                  if (ucs2length(data1) > 128) {
                                    validate.errors = [
                                      {
                                        keyword: 'maxLength',
                                        dataPath:
                                          (dataPath || '') + '.transformOrigin',
                                        schemaPath:
                                          '#/definitions/TransformOrigin/maxLength',
                                        params: {
                                          limit: 128,
                                        },
                                        message:
                                          'should NOT be longer than 128 characters',
                                      },
                                    ];
                                    return false;
                                  } else {
                                    if (ucs2length(data1) < 2) {
                                      validate.errors = [
                                        {
                                          keyword: 'minLength',
                                          dataPath:
                                            (dataPath || '') +
                                            '.transformOrigin',
                                          schemaPath:
                                            '#/definitions/TransformOrigin/minLength',
                                          params: {
                                            limit: 2,
                                          },
                                          message:
                                            'should NOT be shorter than 2 characters',
                                        },
                                      ];
                                      return false;
                                    }
                                  }
                                } else {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') + '.transformOrigin',
                                      schemaPath:
                                        '#/definitions/TransformOrigin/type',
                                      params: {
                                        type: 'string',
                                      },
                                      message: 'should be string',
                                    },
                                  ];
                                  return false;
                                }
                                var valid2 = errors === errs_2;
                                var valid1 = errors === errs_1;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal20.schema = {
    additionalProperties: false,
    properties: {
      cx: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      cy: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      element: {
        enum: ['ellipse'],
        type: 'string',
      },
      fill: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          rule: {
            enum: ['nonzero', 'evenodd'],
            type: 'string',
          },
        },
        type: 'object',
      },
      opacity: {
        $ref: '#/definitions/Opacity',
      },
      rx: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      ry: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      stroke: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          dasharray: {
            $ref: '#/definitions/DashArray',
          },
          dashoffset: {
            $ref: '#/definitions/DashOffset',
          },
          linecap: {
            enum: ['butt', 'square', 'round'],
            type: 'string',
          },
          linejoin: {
            enum: ['miter', 'round', 'bevel'],
            type: 'string',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          width: {
            $ref: '#/definitions/ViewportCoordinate',
          },
        },
        type: 'object',
      },
      transform: {
        $ref: '#/definitions/Transform',
      },
      transformOrigin: {
        $ref: '#/definitions/TransformOrigin',
      },
    },
    required: ['cx', 'cy', 'element', 'rx', 'ry'],
    type: 'object',
  };
  refVal20.errors = null;
  refVal[20] = refVal20;
  var refVal21 = {
    description: 'An integer representing the dash offset of a stroke.',
    minimum: 0,
    type: 'number',
  };
  refVal[21] = refVal21;
  var refVal22 = {
    description:
      'A hex, hsl, hsla or rgba color string:\n#FA9, #FFAA99, rgba(1, 1, 2, 0.5)',
    pattern:
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
    type: 'string',
  };
  refVal[22] = refVal22;
  var refVal23 = {
    description: 'A normalized opacity ranged between 0.0 and 1.0',
    maximum: 1,
    minimum: 0,
    type: 'number',
  };
  refVal[23] = refVal23;
  var refVal24 = {
    description: 'A dash array in the form of "2 3 4"',
    pattern: '^([0-9]+\\s)+[0-9]+$',
    type: 'string',
  };
  refVal[24] = refVal24;
  var refVal25 = {
    description: 'An integer representing the dash offset of a stroke.',
    maximum: 100,
    minimum: -100,
    type: 'integer',
  };
  refVal[25] = refVal25;
  var refVal26 = {
    description: 'A short css transform string.',
    maxLength: 128,
    minLength: 2,
    type: 'string',
  };
  refVal[26] = refVal26;
  var refVal27 = {
    description: 'A transform origin string.',
    maxLength: 128,
    minLength: 2,
    type: 'string',
  };
  refVal[27] = refVal27;
  var refVal28 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false || validate.schema.properties.hasOwnProperty(key0)
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.element;
            if (data1 === undefined) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'element',
                  },
                  message: "should have required property 'element'",
                },
              ];
              return false;
            } else {
              var errs_1 = errors;
              if (typeof data1 !== 'string') {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.element',
                    schemaPath: '#/properties/element/type',
                    params: {
                      type: 'string',
                    },
                    message: 'should be string',
                  },
                ];
                return false;
              }
              var schema1 = validate.schema.properties.element.enum;
              var valid1;
              valid1 = false;
              for (var i1 = 0; i1 < schema1.length; i1++)
                if (equal(data1, schema1[i1])) {
                  valid1 = true;
                  break;
                }
              if (!valid1) {
                validate.errors = [
                  {
                    keyword: 'enum',
                    dataPath: (dataPath || '') + '.element',
                    schemaPath: '#/properties/element/enum',
                    params: {
                      allowedValues: schema1,
                    },
                    message: 'should be equal to one of the allowed values',
                  },
                ];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.fill;
              if (data1 === undefined) {
                valid1 = true;
              } else {
                var errs_1 = errors;
                if (
                  data1 &&
                  typeof data1 === 'object' &&
                  !Array.isArray(data1)
                ) {
                  var errs__1 = errors;
                  var valid2 = true;
                  for (var key1 in data1) {
                    var isAdditional1 = !(
                      false ||
                      key1 == 'color' ||
                      key1 == 'opacity' ||
                      key1 == 'rule'
                    );
                    if (isAdditional1) {
                      valid2 = false;
                      validate.errors = [
                        {
                          keyword: 'additionalProperties',
                          dataPath: (dataPath || '') + '.fill',
                          schemaPath: '#/properties/fill/additionalProperties',
                          params: {
                            additionalProperty: '' + key1 + '',
                          },
                          message: 'should NOT have additional properties',
                        },
                      ];
                      return false;
                      break;
                    }
                  }
                  if (valid2) {
                    var data2 = data1.color;
                    if (data2 === undefined) {
                      valid2 = true;
                    } else {
                      var errs_2 = errors;
                      var errs_3 = errors;
                      if (typeof data2 === 'string') {
                        if (!pattern0.test(data2)) {
                          validate.errors = [
                            {
                              keyword: 'pattern',
                              dataPath: (dataPath || '') + '.fill.color',
                              schemaPath: '#/definitions/Color/pattern',
                              params: {
                                pattern:
                                  '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                              },
                              message:
                                'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                            },
                          ];
                          return false;
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.fill.color',
                            schemaPath: '#/definitions/Color/type',
                            params: {
                              type: 'string',
                            },
                            message: 'should be string',
                          },
                        ];
                        return false;
                      }
                      var valid3 = errors === errs_3;
                      var valid2 = errors === errs_2;
                    }
                    if (valid2) {
                      var data2 = data1.opacity;
                      if (data2 === undefined) {
                        valid2 = true;
                      } else {
                        var errs_2 = errors;
                        var errs_3 = errors;
                        if (typeof data2 === 'number') {
                          if (data2 > 1 || data2 !== data2) {
                            validate.errors = [
                              {
                                keyword: 'maximum',
                                dataPath: (dataPath || '') + '.fill.opacity',
                                schemaPath: '#/definitions/Opacity/maximum',
                                params: {
                                  comparison: '<=',
                                  limit: 1,
                                  exclusive: false,
                                },
                                message: 'should be <= 1',
                              },
                            ];
                            return false;
                          } else {
                            if (data2 < 0 || data2 !== data2) {
                              validate.errors = [
                                {
                                  keyword: 'minimum',
                                  dataPath: (dataPath || '') + '.fill.opacity',
                                  schemaPath: '#/definitions/Opacity/minimum',
                                  params: {
                                    comparison: '>=',
                                    limit: 0,
                                    exclusive: false,
                                  },
                                  message: 'should be >= 0',
                                },
                              ];
                              return false;
                            }
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.fill.opacity',
                              schemaPath: '#/definitions/Opacity/type',
                              params: {
                                type: 'number',
                              },
                              message: 'should be number',
                            },
                          ];
                          return false;
                        }
                        var valid3 = errors === errs_3;
                        var valid2 = errors === errs_2;
                      }
                      if (valid2) {
                        var data2 = data1.rule;
                        if (data2 === undefined) {
                          valid2 = true;
                        } else {
                          var errs_2 = errors;
                          if (typeof data2 !== 'string') {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.fill.rule',
                                schemaPath:
                                  '#/properties/fill/properties/rule/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var schema2 =
                            validate.schema.properties.fill.properties.rule
                              .enum;
                          var valid2;
                          valid2 = false;
                          for (var i2 = 0; i2 < schema2.length; i2++)
                            if (equal(data2, schema2[i2])) {
                              valid2 = true;
                              break;
                            }
                          if (!valid2) {
                            validate.errors = [
                              {
                                keyword: 'enum',
                                dataPath: (dataPath || '') + '.fill.rule',
                                schemaPath:
                                  '#/properties/fill/properties/rule/enum',
                                params: {
                                  allowedValues: schema2,
                                },
                                message:
                                  'should be equal to one of the allowed values',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                        }
                      }
                    }
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.fill',
                      schemaPath: '#/properties/fill/type',
                      params: {
                        type: 'object',
                      },
                      message: 'should be object',
                    },
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.height;
                if (data1 === undefined) {
                  valid1 = false;
                  validate.errors = [
                    {
                      keyword: 'required',
                      dataPath: (dataPath || '') + '',
                      schemaPath: '#/required',
                      params: {
                        missingProperty: 'height',
                      },
                      message: "should have required property 'height'",
                    },
                  ];
                  return false;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if (typeof data1 === 'number') {
                    if (data1 < 0 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'minimum',
                          dataPath: (dataPath || '') + '.height',
                          schemaPath:
                            '#/definitions/ViewportCoordinate/minimum',
                          params: {
                            comparison: '>=',
                            limit: 0,
                            exclusive: false,
                          },
                          message: 'should be >= 0',
                        },
                      ];
                      return false;
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.height',
                        schemaPath: '#/definitions/ViewportCoordinate/type',
                        params: {
                          type: 'number',
                        },
                        message: 'should be number',
                      },
                    ];
                    return false;
                  }
                  var valid2 = errors === errs_2;
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.opacity;
                  if (data1 === undefined) {
                    valid1 = true;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (typeof data1 === 'number') {
                      if (data1 > 1 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'maximum',
                            dataPath: (dataPath || '') + '.opacity',
                            schemaPath: '#/definitions/Opacity/maximum',
                            params: {
                              comparison: '<=',
                              limit: 1,
                              exclusive: false,
                            },
                            message: 'should be <= 1',
                          },
                        ];
                        return false;
                      } else {
                        if (data1 < 0 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'minimum',
                              dataPath: (dataPath || '') + '.opacity',
                              schemaPath: '#/definitions/Opacity/minimum',
                              params: {
                                comparison: '>=',
                                limit: 0,
                                exclusive: false,
                              },
                              message: 'should be >= 0',
                            },
                          ];
                          return false;
                        }
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.opacity',
                          schemaPath: '#/definitions/Opacity/type',
                          params: {
                            type: 'number',
                          },
                          message: 'should be number',
                        },
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.rx;
                    if (data1 === undefined) {
                      valid1 = true;
                    } else {
                      var errs_1 = errors;
                      var errs_2 = errors;
                      if (typeof data1 === 'number') {
                        if (data1 < 0 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'minimum',
                              dataPath: (dataPath || '') + '.rx',
                              schemaPath:
                                '#/definitions/ViewportCoordinate/minimum',
                              params: {
                                comparison: '>=',
                                limit: 0,
                                exclusive: false,
                              },
                              message: 'should be >= 0',
                            },
                          ];
                          return false;
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.rx',
                            schemaPath: '#/definitions/ViewportCoordinate/type',
                            params: {
                              type: 'number',
                            },
                            message: 'should be number',
                          },
                        ];
                        return false;
                      }
                      var valid2 = errors === errs_2;
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      var data1 = data.ry;
                      if (data1 === undefined) {
                        valid1 = true;
                      } else {
                        var errs_1 = errors;
                        var errs_2 = errors;
                        if (typeof data1 === 'number') {
                          if (data1 < 0 || data1 !== data1) {
                            validate.errors = [
                              {
                                keyword: 'minimum',
                                dataPath: (dataPath || '') + '.ry',
                                schemaPath:
                                  '#/definitions/ViewportCoordinate/minimum',
                                params: {
                                  comparison: '>=',
                                  limit: 0,
                                  exclusive: false,
                                },
                                message: 'should be >= 0',
                              },
                            ];
                            return false;
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.ry',
                              schemaPath:
                                '#/definitions/ViewportCoordinate/type',
                              params: {
                                type: 'number',
                              },
                              message: 'should be number',
                            },
                          ];
                          return false;
                        }
                        var valid2 = errors === errs_2;
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        var data1 = data.stroke;
                        if (data1 === undefined) {
                          valid1 = true;
                        } else {
                          var errs_1 = errors;
                          if (
                            data1 &&
                            typeof data1 === 'object' &&
                            !Array.isArray(data1)
                          ) {
                            var errs__1 = errors;
                            var valid2 = true;
                            for (var key1 in data1) {
                              var isAdditional1 = !(
                                false ||
                                key1 == 'color' ||
                                key1 == 'dasharray' ||
                                key1 == 'dashoffset' ||
                                key1 == 'linecap' ||
                                key1 == 'linejoin' ||
                                key1 == 'opacity' ||
                                key1 == 'width'
                              );
                              if (isAdditional1) {
                                valid2 = false;
                                validate.errors = [
                                  {
                                    keyword: 'additionalProperties',
                                    dataPath: (dataPath || '') + '.stroke',
                                    schemaPath:
                                      '#/properties/stroke/additionalProperties',
                                    params: {
                                      additionalProperty: '' + key1 + '',
                                    },
                                    message:
                                      'should NOT have additional properties',
                                  },
                                ];
                                return false;
                                break;
                              }
                            }
                            if (valid2) {
                              var data2 = data1.color;
                              if (data2 === undefined) {
                                valid2 = true;
                              } else {
                                var errs_2 = errors;
                                var errs_3 = errors;
                                if (typeof data2 === 'string') {
                                  if (!pattern0.test(data2)) {
                                    validate.errors = [
                                      {
                                        keyword: 'pattern',
                                        dataPath:
                                          (dataPath || '') + '.stroke.color',
                                        schemaPath:
                                          '#/definitions/Color/pattern',
                                        params: {
                                          pattern:
                                            '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                                        },
                                        message:
                                          'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                                      },
                                    ];
                                    return false;
                                  }
                                } else {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') + '.stroke.color',
                                      schemaPath: '#/definitions/Color/type',
                                      params: {
                                        type: 'string',
                                      },
                                      message: 'should be string',
                                    },
                                  ];
                                  return false;
                                }
                                var valid3 = errors === errs_3;
                                var valid2 = errors === errs_2;
                              }
                              if (valid2) {
                                var data2 = data1.dasharray;
                                if (data2 === undefined) {
                                  valid2 = true;
                                } else {
                                  var errs_2 = errors;
                                  var errs_3 = errors;
                                  if (typeof data2 === 'string') {
                                    if (!pattern1.test(data2)) {
                                      validate.errors = [
                                        {
                                          keyword: 'pattern',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.dasharray',
                                          schemaPath:
                                            '#/definitions/DashArray/pattern',
                                          params: {
                                            pattern: '^([0-9]+\\s)+[0-9]+$',
                                          },
                                          message:
                                            'should match pattern "^([0-9]+\\s)+[0-9]+$"',
                                        },
                                      ];
                                      return false;
                                    }
                                  } else {
                                    validate.errors = [
                                      {
                                        keyword: 'type',
                                        dataPath:
                                          (dataPath || '') +
                                          '.stroke.dasharray',
                                        schemaPath:
                                          '#/definitions/DashArray/type',
                                        params: {
                                          type: 'string',
                                        },
                                        message: 'should be string',
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid3 = errors === errs_3;
                                  var valid2 = errors === errs_2;
                                }
                                if (valid2) {
                                  var data2 = data1.dashoffset;
                                  if (data2 === undefined) {
                                    valid2 = true;
                                  } else {
                                    var errs_2 = errors;
                                    var errs_3 = errors;
                                    if (
                                      typeof data2 !== 'number' ||
                                      data2 % 1 ||
                                      data2 !== data2
                                    ) {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.dashoffset',
                                          schemaPath:
                                            '#/definitions/DashOffset/type',
                                          params: {
                                            type: 'integer',
                                          },
                                          message: 'should be integer',
                                        },
                                      ];
                                      return false;
                                    }
                                    if (typeof data2 === 'number') {
                                      if (data2 > 100 || data2 !== data2) {
                                        validate.errors = [
                                          {
                                            keyword: 'maximum',
                                            dataPath:
                                              (dataPath || '') +
                                              '.stroke.dashoffset',
                                            schemaPath:
                                              '#/definitions/DashOffset/maximum',
                                            params: {
                                              comparison: '<=',
                                              limit: 100,
                                              exclusive: false,
                                            },
                                            message: 'should be <= 100',
                                          },
                                        ];
                                        return false;
                                      } else {
                                        if (data2 < -100 || data2 !== data2) {
                                          validate.errors = [
                                            {
                                              keyword: 'minimum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.dashoffset',
                                              schemaPath:
                                                '#/definitions/DashOffset/minimum',
                                              params: {
                                                comparison: '>=',
                                                limit: -100,
                                                exclusive: false,
                                              },
                                              message: 'should be >= -100',
                                            },
                                          ];
                                          return false;
                                        }
                                      }
                                    }
                                    var valid3 = errors === errs_3;
                                    var valid2 = errors === errs_2;
                                  }
                                  if (valid2) {
                                    var data2 = data1.linecap;
                                    if (data2 === undefined) {
                                      valid2 = true;
                                    } else {
                                      var errs_2 = errors;
                                      if (typeof data2 !== 'string') {
                                        validate.errors = [
                                          {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.stroke.linecap',
                                            schemaPath:
                                              '#/properties/stroke/properties/linecap/type',
                                            params: {
                                              type: 'string',
                                            },
                                            message: 'should be string',
                                          },
                                        ];
                                        return false;
                                      }
                                      var schema2 =
                                        validate.schema.properties.stroke
                                          .properties.linecap.enum;
                                      var valid2;
                                      valid2 = false;
                                      for (
                                        var i2 = 0;
                                        i2 < schema2.length;
                                        i2++
                                      )
                                        if (equal(data2, schema2[i2])) {
                                          valid2 = true;
                                          break;
                                        }
                                      if (!valid2) {
                                        validate.errors = [
                                          {
                                            keyword: 'enum',
                                            dataPath:
                                              (dataPath || '') +
                                              '.stroke.linecap',
                                            schemaPath:
                                              '#/properties/stroke/properties/linecap/enum',
                                            params: {
                                              allowedValues: schema2,
                                            },
                                            message:
                                              'should be equal to one of the allowed values',
                                          },
                                        ];
                                        return false;
                                      }
                                      var valid2 = errors === errs_2;
                                    }
                                    if (valid2) {
                                      var data2 = data1.linejoin;
                                      if (data2 === undefined) {
                                        valid2 = true;
                                      } else {
                                        var errs_2 = errors;
                                        if (typeof data2 !== 'string') {
                                          validate.errors = [
                                            {
                                              keyword: 'type',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.linejoin',
                                              schemaPath:
                                                '#/properties/stroke/properties/linejoin/type',
                                              params: {
                                                type: 'string',
                                              },
                                              message: 'should be string',
                                            },
                                          ];
                                          return false;
                                        }
                                        var schema2 =
                                          validate.schema.properties.stroke
                                            .properties.linejoin.enum;
                                        var valid2;
                                        valid2 = false;
                                        for (
                                          var i2 = 0;
                                          i2 < schema2.length;
                                          i2++
                                        )
                                          if (equal(data2, schema2[i2])) {
                                            valid2 = true;
                                            break;
                                          }
                                        if (!valid2) {
                                          validate.errors = [
                                            {
                                              keyword: 'enum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.linejoin',
                                              schemaPath:
                                                '#/properties/stroke/properties/linejoin/enum',
                                              params: {
                                                allowedValues: schema2,
                                              },
                                              message:
                                                'should be equal to one of the allowed values',
                                            },
                                          ];
                                          return false;
                                        }
                                        var valid2 = errors === errs_2;
                                      }
                                      if (valid2) {
                                        var data2 = data1.opacity;
                                        if (data2 === undefined) {
                                          valid2 = true;
                                        } else {
                                          var errs_2 = errors;
                                          var errs_3 = errors;
                                          if (typeof data2 === 'number') {
                                            if (data2 > 1 || data2 !== data2) {
                                              validate.errors = [
                                                {
                                                  keyword: 'maximum',
                                                  dataPath:
                                                    (dataPath || '') +
                                                    '.stroke.opacity',
                                                  schemaPath:
                                                    '#/definitions/Opacity/maximum',
                                                  params: {
                                                    comparison: '<=',
                                                    limit: 1,
                                                    exclusive: false,
                                                  },
                                                  message: 'should be <= 1',
                                                },
                                              ];
                                              return false;
                                            } else {
                                              if (
                                                data2 < 0 ||
                                                data2 !== data2
                                              ) {
                                                validate.errors = [
                                                  {
                                                    keyword: 'minimum',
                                                    dataPath:
                                                      (dataPath || '') +
                                                      '.stroke.opacity',
                                                    schemaPath:
                                                      '#/definitions/Opacity/minimum',
                                                    params: {
                                                      comparison: '>=',
                                                      limit: 0,
                                                      exclusive: false,
                                                    },
                                                    message: 'should be >= 0',
                                                  },
                                                ];
                                                return false;
                                              }
                                            }
                                          } else {
                                            validate.errors = [
                                              {
                                                keyword: 'type',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.opacity',
                                                schemaPath:
                                                  '#/definitions/Opacity/type',
                                                params: {
                                                  type: 'number',
                                                },
                                                message: 'should be number',
                                              },
                                            ];
                                            return false;
                                          }
                                          var valid3 = errors === errs_3;
                                          var valid2 = errors === errs_2;
                                        }
                                        if (valid2) {
                                          var data2 = data1.width;
                                          if (data2 === undefined) {
                                            valid2 = true;
                                          } else {
                                            var errs_2 = errors;
                                            var errs_3 = errors;
                                            if (typeof data2 === 'number') {
                                              if (
                                                data2 < 0 ||
                                                data2 !== data2
                                              ) {
                                                validate.errors = [
                                                  {
                                                    keyword: 'minimum',
                                                    dataPath:
                                                      (dataPath || '') +
                                                      '.stroke.width',
                                                    schemaPath:
                                                      '#/definitions/ViewportCoordinate/minimum',
                                                    params: {
                                                      comparison: '>=',
                                                      limit: 0,
                                                      exclusive: false,
                                                    },
                                                    message: 'should be >= 0',
                                                  },
                                                ];
                                                return false;
                                              }
                                            } else {
                                              validate.errors = [
                                                {
                                                  keyword: 'type',
                                                  dataPath:
                                                    (dataPath || '') +
                                                    '.stroke.width',
                                                  schemaPath:
                                                    '#/definitions/ViewportCoordinate/type',
                                                  params: {
                                                    type: 'number',
                                                  },
                                                  message: 'should be number',
                                                },
                                              ];
                                              return false;
                                            }
                                            var valid3 = errors === errs_3;
                                            var valid2 = errors === errs_2;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.stroke',
                                schemaPath: '#/properties/stroke/type',
                                params: {
                                  type: 'object',
                                },
                                message: 'should be object',
                              },
                            ];
                            return false;
                          }
                          var valid1 = errors === errs_1;
                        }
                        if (valid1) {
                          var data1 = data.transform;
                          if (data1 === undefined) {
                            valid1 = true;
                          } else {
                            var errs_1 = errors;
                            var errs_2 = errors;
                            if (typeof data1 === 'string') {
                              if (ucs2length(data1) > 128) {
                                validate.errors = [
                                  {
                                    keyword: 'maxLength',
                                    dataPath: (dataPath || '') + '.transform',
                                    schemaPath:
                                      '#/definitions/Transform/maxLength',
                                    params: {
                                      limit: 128,
                                    },
                                    message:
                                      'should NOT be longer than 128 characters',
                                  },
                                ];
                                return false;
                              } else {
                                if (ucs2length(data1) < 2) {
                                  validate.errors = [
                                    {
                                      keyword: 'minLength',
                                      dataPath: (dataPath || '') + '.transform',
                                      schemaPath:
                                        '#/definitions/Transform/minLength',
                                      params: {
                                        limit: 2,
                                      },
                                      message:
                                        'should NOT be shorter than 2 characters',
                                    },
                                  ];
                                  return false;
                                }
                              }
                            } else {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.transform',
                                  schemaPath: '#/definitions/Transform/type',
                                  params: {
                                    type: 'string',
                                  },
                                  message: 'should be string',
                                },
                              ];
                              return false;
                            }
                            var valid2 = errors === errs_2;
                            var valid1 = errors === errs_1;
                          }
                          if (valid1) {
                            var data1 = data.transformOrigin;
                            if (data1 === undefined) {
                              valid1 = true;
                            } else {
                              var errs_1 = errors;
                              var errs_2 = errors;
                              if (typeof data1 === 'string') {
                                if (ucs2length(data1) > 128) {
                                  validate.errors = [
                                    {
                                      keyword: 'maxLength',
                                      dataPath:
                                        (dataPath || '') + '.transformOrigin',
                                      schemaPath:
                                        '#/definitions/TransformOrigin/maxLength',
                                      params: {
                                        limit: 128,
                                      },
                                      message:
                                        'should NOT be longer than 128 characters',
                                    },
                                  ];
                                  return false;
                                } else {
                                  if (ucs2length(data1) < 2) {
                                    validate.errors = [
                                      {
                                        keyword: 'minLength',
                                        dataPath:
                                          (dataPath || '') + '.transformOrigin',
                                        schemaPath:
                                          '#/definitions/TransformOrigin/minLength',
                                        params: {
                                          limit: 2,
                                        },
                                        message:
                                          'should NOT be shorter than 2 characters',
                                      },
                                    ];
                                    return false;
                                  }
                                }
                              } else {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath:
                                      (dataPath || '') + '.transformOrigin',
                                    schemaPath:
                                      '#/definitions/TransformOrigin/type',
                                    params: {
                                      type: 'string',
                                    },
                                    message: 'should be string',
                                  },
                                ];
                                return false;
                              }
                              var valid2 = errors === errs_2;
                              var valid1 = errors === errs_1;
                            }
                            if (valid1) {
                              var data1 = data.width;
                              if (data1 === undefined) {
                                valid1 = false;
                                validate.errors = [
                                  {
                                    keyword: 'required',
                                    dataPath: (dataPath || '') + '',
                                    schemaPath: '#/required',
                                    params: {
                                      missingProperty: 'width',
                                    },
                                    message:
                                      "should have required property 'width'",
                                  },
                                ];
                                return false;
                              } else {
                                var errs_1 = errors;
                                var errs_2 = errors;
                                if (typeof data1 === 'number') {
                                  if (data1 < 0 || data1 !== data1) {
                                    validate.errors = [
                                      {
                                        keyword: 'minimum',
                                        dataPath: (dataPath || '') + '.width',
                                        schemaPath:
                                          '#/definitions/ViewportCoordinate/minimum',
                                        params: {
                                          comparison: '>=',
                                          limit: 0,
                                          exclusive: false,
                                        },
                                        message: 'should be >= 0',
                                      },
                                    ];
                                    return false;
                                  }
                                } else {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath: (dataPath || '') + '.width',
                                      schemaPath:
                                        '#/definitions/ViewportCoordinate/type',
                                      params: {
                                        type: 'number',
                                      },
                                      message: 'should be number',
                                    },
                                  ];
                                  return false;
                                }
                                var valid2 = errors === errs_2;
                                var valid1 = errors === errs_1;
                              }
                              if (valid1) {
                                var data1 = data.x;
                                if (data1 === undefined) {
                                  valid1 = false;
                                  validate.errors = [
                                    {
                                      keyword: 'required',
                                      dataPath: (dataPath || '') + '',
                                      schemaPath: '#/required',
                                      params: {
                                        missingProperty: 'x',
                                      },
                                      message:
                                        "should have required property 'x'",
                                    },
                                  ];
                                  return false;
                                } else {
                                  var errs_1 = errors;
                                  var errs_2 = errors;
                                  if (typeof data1 === 'number') {
                                    if (data1 < 0 || data1 !== data1) {
                                      validate.errors = [
                                        {
                                          keyword: 'minimum',
                                          dataPath: (dataPath || '') + '.x',
                                          schemaPath:
                                            '#/definitions/ViewportCoordinate/minimum',
                                          params: {
                                            comparison: '>=',
                                            limit: 0,
                                            exclusive: false,
                                          },
                                          message: 'should be >= 0',
                                        },
                                      ];
                                      return false;
                                    }
                                  } else {
                                    validate.errors = [
                                      {
                                        keyword: 'type',
                                        dataPath: (dataPath || '') + '.x',
                                        schemaPath:
                                          '#/definitions/ViewportCoordinate/type',
                                        params: {
                                          type: 'number',
                                        },
                                        message: 'should be number',
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid2 = errors === errs_2;
                                  var valid1 = errors === errs_1;
                                }
                                if (valid1) {
                                  var data1 = data.y;
                                  if (data1 === undefined) {
                                    valid1 = false;
                                    validate.errors = [
                                      {
                                        keyword: 'required',
                                        dataPath: (dataPath || '') + '',
                                        schemaPath: '#/required',
                                        params: {
                                          missingProperty: 'y',
                                        },
                                        message:
                                          "should have required property 'y'",
                                      },
                                    ];
                                    return false;
                                  } else {
                                    var errs_1 = errors;
                                    var errs_2 = errors;
                                    if (typeof data1 === 'number') {
                                      if (data1 < 0 || data1 !== data1) {
                                        validate.errors = [
                                          {
                                            keyword: 'minimum',
                                            dataPath: (dataPath || '') + '.y',
                                            schemaPath:
                                              '#/definitions/ViewportCoordinate/minimum',
                                            params: {
                                              comparison: '>=',
                                              limit: 0,
                                              exclusive: false,
                                            },
                                            message: 'should be >= 0',
                                          },
                                        ];
                                        return false;
                                      }
                                    } else {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath: (dataPath || '') + '.y',
                                          schemaPath:
                                            '#/definitions/ViewportCoordinate/type',
                                          params: {
                                            type: 'number',
                                          },
                                          message: 'should be number',
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid2 = errors === errs_2;
                                    var valid1 = errors === errs_1;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal28.schema = {
    additionalProperties: false,
    properties: {
      element: {
        enum: ['rect'],
        type: 'string',
      },
      fill: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          rule: {
            enum: ['nonzero', 'evenodd'],
            type: 'string',
          },
        },
        type: 'object',
      },
      height: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      opacity: {
        $ref: '#/definitions/Opacity',
      },
      rx: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      ry: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      stroke: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          dasharray: {
            $ref: '#/definitions/DashArray',
          },
          dashoffset: {
            $ref: '#/definitions/DashOffset',
          },
          linecap: {
            enum: ['butt', 'square', 'round'],
            type: 'string',
          },
          linejoin: {
            enum: ['miter', 'round', 'bevel'],
            type: 'string',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          width: {
            $ref: '#/definitions/ViewportCoordinate',
          },
        },
        type: 'object',
      },
      transform: {
        $ref: '#/definitions/Transform',
      },
      transformOrigin: {
        $ref: '#/definitions/TransformOrigin',
      },
      width: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      x: {
        $ref: '#/definitions/ViewportCoordinate',
      },
      y: {
        $ref: '#/definitions/ViewportCoordinate',
      },
    },
    required: ['element', 'height', 'width', 'x', 'y'],
    type: 'object',
  };
  refVal28.errors = null;
  refVal[28] = refVal28;
  var refVal29 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false ||
              key0 == 'd' ||
              key0 == 'element' ||
              key0 == 'fill' ||
              key0 == 'opacity' ||
              key0 == 'stroke' ||
              key0 == 'transform' ||
              key0 == 'transformOrigin'
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.d;
            if (data1 === undefined) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'd',
                  },
                  message: "should have required property 'd'",
                },
              ];
              return false;
            } else {
              var errs_1 = errors;
              var errs_2 = errors;
              if (typeof data1 === 'string') {
                if (ucs2length(data1) > 1024) {
                  validate.errors = [
                    {
                      keyword: 'maxLength',
                      dataPath: (dataPath || '') + '.d',
                      schemaPath: '#/definitions/ViewportPath/maxLength',
                      params: {
                        limit: 1024,
                      },
                      message: 'should NOT be longer than 1024 characters',
                    },
                  ];
                  return false;
                } else {
                  if (ucs2length(data1) < 2) {
                    validate.errors = [
                      {
                        keyword: 'minLength',
                        dataPath: (dataPath || '') + '.d',
                        schemaPath: '#/definitions/ViewportPath/minLength',
                        params: {
                          limit: 2,
                        },
                        message: 'should NOT be shorter than 2 characters',
                      },
                    ];
                    return false;
                  }
                }
              } else {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.d',
                    schemaPath: '#/definitions/ViewportPath/type',
                    params: {
                      type: 'string',
                    },
                    message: 'should be string',
                  },
                ];
                return false;
              }
              var valid2 = errors === errs_2;
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.element;
              if (data1 === undefined) {
                valid1 = false;
                validate.errors = [
                  {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/required',
                    params: {
                      missingProperty: 'element',
                    },
                    message: "should have required property 'element'",
                  },
                ];
                return false;
              } else {
                var errs_1 = errors;
                if (typeof data1 !== 'string') {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.element',
                      schemaPath: '#/properties/element/type',
                      params: {
                        type: 'string',
                      },
                      message: 'should be string',
                    },
                  ];
                  return false;
                }
                var schema1 = validate.schema.properties.element.enum;
                var valid1;
                valid1 = false;
                for (var i1 = 0; i1 < schema1.length; i1++)
                  if (equal(data1, schema1[i1])) {
                    valid1 = true;
                    break;
                  }
                if (!valid1) {
                  validate.errors = [
                    {
                      keyword: 'enum',
                      dataPath: (dataPath || '') + '.element',
                      schemaPath: '#/properties/element/enum',
                      params: {
                        allowedValues: schema1,
                      },
                      message: 'should be equal to one of the allowed values',
                    },
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.fill;
                if (data1 === undefined) {
                  valid1 = true;
                } else {
                  var errs_1 = errors;
                  if (
                    data1 &&
                    typeof data1 === 'object' &&
                    !Array.isArray(data1)
                  ) {
                    var errs__1 = errors;
                    var valid2 = true;
                    for (var key1 in data1) {
                      var isAdditional1 = !(
                        false ||
                        key1 == 'color' ||
                        key1 == 'opacity' ||
                        key1 == 'rule'
                      );
                      if (isAdditional1) {
                        valid2 = false;
                        validate.errors = [
                          {
                            keyword: 'additionalProperties',
                            dataPath: (dataPath || '') + '.fill',
                            schemaPath:
                              '#/properties/fill/additionalProperties',
                            params: {
                              additionalProperty: '' + key1 + '',
                            },
                            message: 'should NOT have additional properties',
                          },
                        ];
                        return false;
                        break;
                      }
                    }
                    if (valid2) {
                      var data2 = data1.color;
                      if (data2 === undefined) {
                        valid2 = true;
                      } else {
                        var errs_2 = errors;
                        var errs_3 = errors;
                        if (typeof data2 === 'string') {
                          if (!pattern0.test(data2)) {
                            validate.errors = [
                              {
                                keyword: 'pattern',
                                dataPath: (dataPath || '') + '.fill.color',
                                schemaPath: '#/definitions/Color/pattern',
                                params: {
                                  pattern:
                                    '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                                },
                                message:
                                  'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                              },
                            ];
                            return false;
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.fill.color',
                              schemaPath: '#/definitions/Color/type',
                              params: {
                                type: 'string',
                              },
                              message: 'should be string',
                            },
                          ];
                          return false;
                        }
                        var valid3 = errors === errs_3;
                        var valid2 = errors === errs_2;
                      }
                      if (valid2) {
                        var data2 = data1.opacity;
                        if (data2 === undefined) {
                          valid2 = true;
                        } else {
                          var errs_2 = errors;
                          var errs_3 = errors;
                          if (typeof data2 === 'number') {
                            if (data2 > 1 || data2 !== data2) {
                              validate.errors = [
                                {
                                  keyword: 'maximum',
                                  dataPath: (dataPath || '') + '.fill.opacity',
                                  schemaPath: '#/definitions/Opacity/maximum',
                                  params: {
                                    comparison: '<=',
                                    limit: 1,
                                    exclusive: false,
                                  },
                                  message: 'should be <= 1',
                                },
                              ];
                              return false;
                            } else {
                              if (data2 < 0 || data2 !== data2) {
                                validate.errors = [
                                  {
                                    keyword: 'minimum',
                                    dataPath:
                                      (dataPath || '') + '.fill.opacity',
                                    schemaPath: '#/definitions/Opacity/minimum',
                                    params: {
                                      comparison: '>=',
                                      limit: 0,
                                      exclusive: false,
                                    },
                                    message: 'should be >= 0',
                                  },
                                ];
                                return false;
                              }
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.fill.opacity',
                                schemaPath: '#/definitions/Opacity/type',
                                params: {
                                  type: 'number',
                                },
                                message: 'should be number',
                              },
                            ];
                            return false;
                          }
                          var valid3 = errors === errs_3;
                          var valid2 = errors === errs_2;
                        }
                        if (valid2) {
                          var data2 = data1.rule;
                          if (data2 === undefined) {
                            valid2 = true;
                          } else {
                            var errs_2 = errors;
                            if (typeof data2 !== 'string') {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.fill.rule',
                                  schemaPath:
                                    '#/properties/fill/properties/rule/type',
                                  params: {
                                    type: 'string',
                                  },
                                  message: 'should be string',
                                },
                              ];
                              return false;
                            }
                            var schema2 =
                              validate.schema.properties.fill.properties.rule
                                .enum;
                            var valid2;
                            valid2 = false;
                            for (var i2 = 0; i2 < schema2.length; i2++)
                              if (equal(data2, schema2[i2])) {
                                valid2 = true;
                                break;
                              }
                            if (!valid2) {
                              validate.errors = [
                                {
                                  keyword: 'enum',
                                  dataPath: (dataPath || '') + '.fill.rule',
                                  schemaPath:
                                    '#/properties/fill/properties/rule/enum',
                                  params: {
                                    allowedValues: schema2,
                                  },
                                  message:
                                    'should be equal to one of the allowed values',
                                },
                              ];
                              return false;
                            }
                            var valid2 = errors === errs_2;
                          }
                        }
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.fill',
                        schemaPath: '#/properties/fill/type',
                        params: {
                          type: 'object',
                        },
                        message: 'should be object',
                      },
                    ];
                    return false;
                  }
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.opacity;
                  if (data1 === undefined) {
                    valid1 = true;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (typeof data1 === 'number') {
                      if (data1 > 1 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'maximum',
                            dataPath: (dataPath || '') + '.opacity',
                            schemaPath: '#/definitions/Opacity/maximum',
                            params: {
                              comparison: '<=',
                              limit: 1,
                              exclusive: false,
                            },
                            message: 'should be <= 1',
                          },
                        ];
                        return false;
                      } else {
                        if (data1 < 0 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'minimum',
                              dataPath: (dataPath || '') + '.opacity',
                              schemaPath: '#/definitions/Opacity/minimum',
                              params: {
                                comparison: '>=',
                                limit: 0,
                                exclusive: false,
                              },
                              message: 'should be >= 0',
                            },
                          ];
                          return false;
                        }
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.opacity',
                          schemaPath: '#/definitions/Opacity/type',
                          params: {
                            type: 'number',
                          },
                          message: 'should be number',
                        },
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.stroke;
                    if (data1 === undefined) {
                      valid1 = true;
                    } else {
                      var errs_1 = errors;
                      if (
                        data1 &&
                        typeof data1 === 'object' &&
                        !Array.isArray(data1)
                      ) {
                        var errs__1 = errors;
                        var valid2 = true;
                        for (var key1 in data1) {
                          var isAdditional1 = !(
                            false ||
                            key1 == 'color' ||
                            key1 == 'dasharray' ||
                            key1 == 'dashoffset' ||
                            key1 == 'linecap' ||
                            key1 == 'linejoin' ||
                            key1 == 'opacity' ||
                            key1 == 'width'
                          );
                          if (isAdditional1) {
                            valid2 = false;
                            validate.errors = [
                              {
                                keyword: 'additionalProperties',
                                dataPath: (dataPath || '') + '.stroke',
                                schemaPath:
                                  '#/properties/stroke/additionalProperties',
                                params: {
                                  additionalProperty: '' + key1 + '',
                                },
                                message:
                                  'should NOT have additional properties',
                              },
                            ];
                            return false;
                            break;
                          }
                        }
                        if (valid2) {
                          var data2 = data1.color;
                          if (data2 === undefined) {
                            valid2 = true;
                          } else {
                            var errs_2 = errors;
                            var errs_3 = errors;
                            if (typeof data2 === 'string') {
                              if (!pattern0.test(data2)) {
                                validate.errors = [
                                  {
                                    keyword: 'pattern',
                                    dataPath:
                                      (dataPath || '') + '.stroke.color',
                                    schemaPath: '#/definitions/Color/pattern',
                                    params: {
                                      pattern:
                                        '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                                    },
                                    message:
                                      'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                                  },
                                ];
                                return false;
                              }
                            } else {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.stroke.color',
                                  schemaPath: '#/definitions/Color/type',
                                  params: {
                                    type: 'string',
                                  },
                                  message: 'should be string',
                                },
                              ];
                              return false;
                            }
                            var valid3 = errors === errs_3;
                            var valid2 = errors === errs_2;
                          }
                          if (valid2) {
                            var data2 = data1.dasharray;
                            if (data2 === undefined) {
                              valid2 = true;
                            } else {
                              var errs_2 = errors;
                              var errs_3 = errors;
                              if (typeof data2 === 'string') {
                                if (!pattern1.test(data2)) {
                                  validate.errors = [
                                    {
                                      keyword: 'pattern',
                                      dataPath:
                                        (dataPath || '') + '.stroke.dasharray',
                                      schemaPath:
                                        '#/definitions/DashArray/pattern',
                                      params: {
                                        pattern: '^([0-9]+\\s)+[0-9]+$',
                                      },
                                      message:
                                        'should match pattern "^([0-9]+\\s)+[0-9]+$"',
                                    },
                                  ];
                                  return false;
                                }
                              } else {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath:
                                      (dataPath || '') + '.stroke.dasharray',
                                    schemaPath: '#/definitions/DashArray/type',
                                    params: {
                                      type: 'string',
                                    },
                                    message: 'should be string',
                                  },
                                ];
                                return false;
                              }
                              var valid3 = errors === errs_3;
                              var valid2 = errors === errs_2;
                            }
                            if (valid2) {
                              var data2 = data1.dashoffset;
                              if (data2 === undefined) {
                                valid2 = true;
                              } else {
                                var errs_2 = errors;
                                var errs_3 = errors;
                                if (
                                  typeof data2 !== 'number' ||
                                  data2 % 1 ||
                                  data2 !== data2
                                ) {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') + '.stroke.dashoffset',
                                      schemaPath:
                                        '#/definitions/DashOffset/type',
                                      params: {
                                        type: 'integer',
                                      },
                                      message: 'should be integer',
                                    },
                                  ];
                                  return false;
                                }
                                if (typeof data2 === 'number') {
                                  if (data2 > 100 || data2 !== data2) {
                                    validate.errors = [
                                      {
                                        keyword: 'maximum',
                                        dataPath:
                                          (dataPath || '') +
                                          '.stroke.dashoffset',
                                        schemaPath:
                                          '#/definitions/DashOffset/maximum',
                                        params: {
                                          comparison: '<=',
                                          limit: 100,
                                          exclusive: false,
                                        },
                                        message: 'should be <= 100',
                                      },
                                    ];
                                    return false;
                                  } else {
                                    if (data2 < -100 || data2 !== data2) {
                                      validate.errors = [
                                        {
                                          keyword: 'minimum',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.dashoffset',
                                          schemaPath:
                                            '#/definitions/DashOffset/minimum',
                                          params: {
                                            comparison: '>=',
                                            limit: -100,
                                            exclusive: false,
                                          },
                                          message: 'should be >= -100',
                                        },
                                      ];
                                      return false;
                                    }
                                  }
                                }
                                var valid3 = errors === errs_3;
                                var valid2 = errors === errs_2;
                              }
                              if (valid2) {
                                var data2 = data1.linecap;
                                if (data2 === undefined) {
                                  valid2 = true;
                                } else {
                                  var errs_2 = errors;
                                  if (typeof data2 !== 'string') {
                                    validate.errors = [
                                      {
                                        keyword: 'type',
                                        dataPath:
                                          (dataPath || '') + '.stroke.linecap',
                                        schemaPath:
                                          '#/properties/stroke/properties/linecap/type',
                                        params: {
                                          type: 'string',
                                        },
                                        message: 'should be string',
                                      },
                                    ];
                                    return false;
                                  }
                                  var schema2 =
                                    validate.schema.properties.stroke.properties
                                      .linecap.enum;
                                  var valid2;
                                  valid2 = false;
                                  for (var i2 = 0; i2 < schema2.length; i2++)
                                    if (equal(data2, schema2[i2])) {
                                      valid2 = true;
                                      break;
                                    }
                                  if (!valid2) {
                                    validate.errors = [
                                      {
                                        keyword: 'enum',
                                        dataPath:
                                          (dataPath || '') + '.stroke.linecap',
                                        schemaPath:
                                          '#/properties/stroke/properties/linecap/enum',
                                        params: {
                                          allowedValues: schema2,
                                        },
                                        message:
                                          'should be equal to one of the allowed values',
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid2 = errors === errs_2;
                                }
                                if (valid2) {
                                  var data2 = data1.linejoin;
                                  if (data2 === undefined) {
                                    valid2 = true;
                                  } else {
                                    var errs_2 = errors;
                                    if (typeof data2 !== 'string') {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.linejoin',
                                          schemaPath:
                                            '#/properties/stroke/properties/linejoin/type',
                                          params: {
                                            type: 'string',
                                          },
                                          message: 'should be string',
                                        },
                                      ];
                                      return false;
                                    }
                                    var schema2 =
                                      validate.schema.properties.stroke
                                        .properties.linejoin.enum;
                                    var valid2;
                                    valid2 = false;
                                    for (var i2 = 0; i2 < schema2.length; i2++)
                                      if (equal(data2, schema2[i2])) {
                                        valid2 = true;
                                        break;
                                      }
                                    if (!valid2) {
                                      validate.errors = [
                                        {
                                          keyword: 'enum',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.linejoin',
                                          schemaPath:
                                            '#/properties/stroke/properties/linejoin/enum',
                                          params: {
                                            allowedValues: schema2,
                                          },
                                          message:
                                            'should be equal to one of the allowed values',
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid2 = errors === errs_2;
                                  }
                                  if (valid2) {
                                    var data2 = data1.opacity;
                                    if (data2 === undefined) {
                                      valid2 = true;
                                    } else {
                                      var errs_2 = errors;
                                      var errs_3 = errors;
                                      if (typeof data2 === 'number') {
                                        if (data2 > 1 || data2 !== data2) {
                                          validate.errors = [
                                            {
                                              keyword: 'maximum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.opacity',
                                              schemaPath:
                                                '#/definitions/Opacity/maximum',
                                              params: {
                                                comparison: '<=',
                                                limit: 1,
                                                exclusive: false,
                                              },
                                              message: 'should be <= 1',
                                            },
                                          ];
                                          return false;
                                        } else {
                                          if (data2 < 0 || data2 !== data2) {
                                            validate.errors = [
                                              {
                                                keyword: 'minimum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.opacity',
                                                schemaPath:
                                                  '#/definitions/Opacity/minimum',
                                                params: {
                                                  comparison: '>=',
                                                  limit: 0,
                                                  exclusive: false,
                                                },
                                                message: 'should be >= 0',
                                              },
                                            ];
                                            return false;
                                          }
                                        }
                                      } else {
                                        validate.errors = [
                                          {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.stroke.opacity',
                                            schemaPath:
                                              '#/definitions/Opacity/type',
                                            params: {
                                              type: 'number',
                                            },
                                            message: 'should be number',
                                          },
                                        ];
                                        return false;
                                      }
                                      var valid3 = errors === errs_3;
                                      var valid2 = errors === errs_2;
                                    }
                                    if (valid2) {
                                      var data2 = data1.width;
                                      if (data2 === undefined) {
                                        valid2 = true;
                                      } else {
                                        var errs_2 = errors;
                                        var errs_3 = errors;
                                        if (typeof data2 === 'number') {
                                          if (data2 < 0 || data2 !== data2) {
                                            validate.errors = [
                                              {
                                                keyword: 'minimum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.width',
                                                schemaPath:
                                                  '#/definitions/ViewportCoordinate/minimum',
                                                params: {
                                                  comparison: '>=',
                                                  limit: 0,
                                                  exclusive: false,
                                                },
                                                message: 'should be >= 0',
                                              },
                                            ];
                                            return false;
                                          }
                                        } else {
                                          validate.errors = [
                                            {
                                              keyword: 'type',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.width',
                                              schemaPath:
                                                '#/definitions/ViewportCoordinate/type',
                                              params: {
                                                type: 'number',
                                              },
                                              message: 'should be number',
                                            },
                                          ];
                                          return false;
                                        }
                                        var valid3 = errors === errs_3;
                                        var valid2 = errors === errs_2;
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.stroke',
                            schemaPath: '#/properties/stroke/type',
                            params: {
                              type: 'object',
                            },
                            message: 'should be object',
                          },
                        ];
                        return false;
                      }
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      var data1 = data.transform;
                      if (data1 === undefined) {
                        valid1 = true;
                      } else {
                        var errs_1 = errors;
                        var errs_2 = errors;
                        if (typeof data1 === 'string') {
                          if (ucs2length(data1) > 128) {
                            validate.errors = [
                              {
                                keyword: 'maxLength',
                                dataPath: (dataPath || '') + '.transform',
                                schemaPath: '#/definitions/Transform/maxLength',
                                params: {
                                  limit: 128,
                                },
                                message:
                                  'should NOT be longer than 128 characters',
                              },
                            ];
                            return false;
                          } else {
                            if (ucs2length(data1) < 2) {
                              validate.errors = [
                                {
                                  keyword: 'minLength',
                                  dataPath: (dataPath || '') + '.transform',
                                  schemaPath:
                                    '#/definitions/Transform/minLength',
                                  params: {
                                    limit: 2,
                                  },
                                  message:
                                    'should NOT be shorter than 2 characters',
                                },
                              ];
                              return false;
                            }
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.transform',
                              schemaPath: '#/definitions/Transform/type',
                              params: {
                                type: 'string',
                              },
                              message: 'should be string',
                            },
                          ];
                          return false;
                        }
                        var valid2 = errors === errs_2;
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        var data1 = data.transformOrigin;
                        if (data1 === undefined) {
                          valid1 = true;
                        } else {
                          var errs_1 = errors;
                          var errs_2 = errors;
                          if (typeof data1 === 'string') {
                            if (ucs2length(data1) > 128) {
                              validate.errors = [
                                {
                                  keyword: 'maxLength',
                                  dataPath:
                                    (dataPath || '') + '.transformOrigin',
                                  schemaPath:
                                    '#/definitions/TransformOrigin/maxLength',
                                  params: {
                                    limit: 128,
                                  },
                                  message:
                                    'should NOT be longer than 128 characters',
                                },
                              ];
                              return false;
                            } else {
                              if (ucs2length(data1) < 2) {
                                validate.errors = [
                                  {
                                    keyword: 'minLength',
                                    dataPath:
                                      (dataPath || '') + '.transformOrigin',
                                    schemaPath:
                                      '#/definitions/TransformOrigin/minLength',
                                    params: {
                                      limit: 2,
                                    },
                                    message:
                                      'should NOT be shorter than 2 characters',
                                  },
                                ];
                                return false;
                              }
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.transformOrigin',
                                schemaPath:
                                  '#/definitions/TransformOrigin/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                          var valid1 = errors === errs_1;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal29.schema = {
    additionalProperties: false,
    properties: {
      d: {
        $ref: '#/definitions/ViewportPath',
      },
      element: {
        enum: ['path'],
        type: 'string',
      },
      fill: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          rule: {
            enum: ['nonzero', 'evenodd'],
            type: 'string',
          },
        },
        type: 'object',
      },
      opacity: {
        $ref: '#/definitions/Opacity',
      },
      stroke: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          dasharray: {
            $ref: '#/definitions/DashArray',
          },
          dashoffset: {
            $ref: '#/definitions/DashOffset',
          },
          linecap: {
            enum: ['butt', 'square', 'round'],
            type: 'string',
          },
          linejoin: {
            enum: ['miter', 'round', 'bevel'],
            type: 'string',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          width: {
            $ref: '#/definitions/ViewportCoordinate',
          },
        },
        type: 'object',
      },
      transform: {
        $ref: '#/definitions/Transform',
      },
      transformOrigin: {
        $ref: '#/definitions/TransformOrigin',
      },
    },
    required: ['d', 'element'],
    type: 'object',
  };
  refVal29.errors = null;
  refVal[29] = refVal29;
  var refVal30 = {
    description: 'The "d" parameter of an svg path.',
    maxLength: 1024,
    minLength: 2,
    type: 'string',
  };
  refVal[30] = refVal30;
  var refVal31 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false ||
              key0 == 'element' ||
              key0 == 'fill' ||
              key0 == 'opacity' ||
              key0 == 'points' ||
              key0 == 'stroke' ||
              key0 == 'transform' ||
              key0 == 'transformOrigin'
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.element;
            if (data1 === undefined) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'element',
                  },
                  message: "should have required property 'element'",
                },
              ];
              return false;
            } else {
              var errs_1 = errors;
              if (typeof data1 !== 'string') {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.element',
                    schemaPath: '#/properties/element/type',
                    params: {
                      type: 'string',
                    },
                    message: 'should be string',
                  },
                ];
                return false;
              }
              var schema1 = validate.schema.properties.element.enum;
              var valid1;
              valid1 = false;
              for (var i1 = 0; i1 < schema1.length; i1++)
                if (equal(data1, schema1[i1])) {
                  valid1 = true;
                  break;
                }
              if (!valid1) {
                validate.errors = [
                  {
                    keyword: 'enum',
                    dataPath: (dataPath || '') + '.element',
                    schemaPath: '#/properties/element/enum',
                    params: {
                      allowedValues: schema1,
                    },
                    message: 'should be equal to one of the allowed values',
                  },
                ];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.fill;
              if (data1 === undefined) {
                valid1 = true;
              } else {
                var errs_1 = errors;
                if (
                  data1 &&
                  typeof data1 === 'object' &&
                  !Array.isArray(data1)
                ) {
                  var errs__1 = errors;
                  var valid2 = true;
                  for (var key1 in data1) {
                    var isAdditional1 = !(
                      false ||
                      key1 == 'color' ||
                      key1 == 'opacity' ||
                      key1 == 'rule'
                    );
                    if (isAdditional1) {
                      valid2 = false;
                      validate.errors = [
                        {
                          keyword: 'additionalProperties',
                          dataPath: (dataPath || '') + '.fill',
                          schemaPath: '#/properties/fill/additionalProperties',
                          params: {
                            additionalProperty: '' + key1 + '',
                          },
                          message: 'should NOT have additional properties',
                        },
                      ];
                      return false;
                      break;
                    }
                  }
                  if (valid2) {
                    var data2 = data1.color;
                    if (data2 === undefined) {
                      valid2 = true;
                    } else {
                      var errs_2 = errors;
                      var errs_3 = errors;
                      if (typeof data2 === 'string') {
                        if (!pattern0.test(data2)) {
                          validate.errors = [
                            {
                              keyword: 'pattern',
                              dataPath: (dataPath || '') + '.fill.color',
                              schemaPath: '#/definitions/Color/pattern',
                              params: {
                                pattern:
                                  '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                              },
                              message:
                                'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                            },
                          ];
                          return false;
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.fill.color',
                            schemaPath: '#/definitions/Color/type',
                            params: {
                              type: 'string',
                            },
                            message: 'should be string',
                          },
                        ];
                        return false;
                      }
                      var valid3 = errors === errs_3;
                      var valid2 = errors === errs_2;
                    }
                    if (valid2) {
                      var data2 = data1.opacity;
                      if (data2 === undefined) {
                        valid2 = true;
                      } else {
                        var errs_2 = errors;
                        var errs_3 = errors;
                        if (typeof data2 === 'number') {
                          if (data2 > 1 || data2 !== data2) {
                            validate.errors = [
                              {
                                keyword: 'maximum',
                                dataPath: (dataPath || '') + '.fill.opacity',
                                schemaPath: '#/definitions/Opacity/maximum',
                                params: {
                                  comparison: '<=',
                                  limit: 1,
                                  exclusive: false,
                                },
                                message: 'should be <= 1',
                              },
                            ];
                            return false;
                          } else {
                            if (data2 < 0 || data2 !== data2) {
                              validate.errors = [
                                {
                                  keyword: 'minimum',
                                  dataPath: (dataPath || '') + '.fill.opacity',
                                  schemaPath: '#/definitions/Opacity/minimum',
                                  params: {
                                    comparison: '>=',
                                    limit: 0,
                                    exclusive: false,
                                  },
                                  message: 'should be >= 0',
                                },
                              ];
                              return false;
                            }
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.fill.opacity',
                              schemaPath: '#/definitions/Opacity/type',
                              params: {
                                type: 'number',
                              },
                              message: 'should be number',
                            },
                          ];
                          return false;
                        }
                        var valid3 = errors === errs_3;
                        var valid2 = errors === errs_2;
                      }
                      if (valid2) {
                        var data2 = data1.rule;
                        if (data2 === undefined) {
                          valid2 = true;
                        } else {
                          var errs_2 = errors;
                          if (typeof data2 !== 'string') {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.fill.rule',
                                schemaPath:
                                  '#/properties/fill/properties/rule/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var schema2 =
                            validate.schema.properties.fill.properties.rule
                              .enum;
                          var valid2;
                          valid2 = false;
                          for (var i2 = 0; i2 < schema2.length; i2++)
                            if (equal(data2, schema2[i2])) {
                              valid2 = true;
                              break;
                            }
                          if (!valid2) {
                            validate.errors = [
                              {
                                keyword: 'enum',
                                dataPath: (dataPath || '') + '.fill.rule',
                                schemaPath:
                                  '#/properties/fill/properties/rule/enum',
                                params: {
                                  allowedValues: schema2,
                                },
                                message:
                                  'should be equal to one of the allowed values',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                        }
                      }
                    }
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.fill',
                      schemaPath: '#/properties/fill/type',
                      params: {
                        type: 'object',
                      },
                      message: 'should be object',
                    },
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.opacity;
                if (data1 === undefined) {
                  valid1 = true;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if (typeof data1 === 'number') {
                    if (data1 > 1 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'maximum',
                          dataPath: (dataPath || '') + '.opacity',
                          schemaPath: '#/definitions/Opacity/maximum',
                          params: {
                            comparison: '<=',
                            limit: 1,
                            exclusive: false,
                          },
                          message: 'should be <= 1',
                        },
                      ];
                      return false;
                    } else {
                      if (data1 < 0 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'minimum',
                            dataPath: (dataPath || '') + '.opacity',
                            schemaPath: '#/definitions/Opacity/minimum',
                            params: {
                              comparison: '>=',
                              limit: 0,
                              exclusive: false,
                            },
                            message: 'should be >= 0',
                          },
                        ];
                        return false;
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.opacity',
                        schemaPath: '#/definitions/Opacity/type',
                        params: {
                          type: 'number',
                        },
                        message: 'should be number',
                      },
                    ];
                    return false;
                  }
                  var valid2 = errors === errs_2;
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.points;
                  if (data1 === undefined) {
                    valid1 = false;
                    validate.errors = [
                      {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '',
                        schemaPath: '#/required',
                        params: {
                          missingProperty: 'points',
                        },
                        message: "should have required property 'points'",
                      },
                    ];
                    return false;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (typeof data1 === 'string') {
                      if (!pattern2.test(data1)) {
                        validate.errors = [
                          {
                            keyword: 'pattern',
                            dataPath: (dataPath || '') + '.points',
                            schemaPath:
                              '#/definitions/ViewportCoordinatePairs/pattern',
                            params: {
                              pattern:
                                '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$',
                            },
                            message:
                              'should match pattern "^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$"',
                          },
                        ];
                        return false;
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.points',
                          schemaPath:
                            '#/definitions/ViewportCoordinatePairs/type',
                          params: {
                            type: 'string',
                          },
                          message: 'should be string',
                        },
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.stroke;
                    if (data1 === undefined) {
                      valid1 = true;
                    } else {
                      var errs_1 = errors;
                      if (
                        data1 &&
                        typeof data1 === 'object' &&
                        !Array.isArray(data1)
                      ) {
                        var errs__1 = errors;
                        var valid2 = true;
                        for (var key1 in data1) {
                          var isAdditional1 = !(
                            false ||
                            key1 == 'color' ||
                            key1 == 'dasharray' ||
                            key1 == 'dashoffset' ||
                            key1 == 'linecap' ||
                            key1 == 'linejoin' ||
                            key1 == 'opacity' ||
                            key1 == 'width'
                          );
                          if (isAdditional1) {
                            valid2 = false;
                            validate.errors = [
                              {
                                keyword: 'additionalProperties',
                                dataPath: (dataPath || '') + '.stroke',
                                schemaPath:
                                  '#/properties/stroke/additionalProperties',
                                params: {
                                  additionalProperty: '' + key1 + '',
                                },
                                message:
                                  'should NOT have additional properties',
                              },
                            ];
                            return false;
                            break;
                          }
                        }
                        if (valid2) {
                          var data2 = data1.color;
                          if (data2 === undefined) {
                            valid2 = true;
                          } else {
                            var errs_2 = errors;
                            var errs_3 = errors;
                            if (typeof data2 === 'string') {
                              if (!pattern0.test(data2)) {
                                validate.errors = [
                                  {
                                    keyword: 'pattern',
                                    dataPath:
                                      (dataPath || '') + '.stroke.color',
                                    schemaPath: '#/definitions/Color/pattern',
                                    params: {
                                      pattern:
                                        '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                                    },
                                    message:
                                      'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                                  },
                                ];
                                return false;
                              }
                            } else {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.stroke.color',
                                  schemaPath: '#/definitions/Color/type',
                                  params: {
                                    type: 'string',
                                  },
                                  message: 'should be string',
                                },
                              ];
                              return false;
                            }
                            var valid3 = errors === errs_3;
                            var valid2 = errors === errs_2;
                          }
                          if (valid2) {
                            var data2 = data1.dasharray;
                            if (data2 === undefined) {
                              valid2 = true;
                            } else {
                              var errs_2 = errors;
                              var errs_3 = errors;
                              if (typeof data2 === 'string') {
                                if (!pattern1.test(data2)) {
                                  validate.errors = [
                                    {
                                      keyword: 'pattern',
                                      dataPath:
                                        (dataPath || '') + '.stroke.dasharray',
                                      schemaPath:
                                        '#/definitions/DashArray/pattern',
                                      params: {
                                        pattern: '^([0-9]+\\s)+[0-9]+$',
                                      },
                                      message:
                                        'should match pattern "^([0-9]+\\s)+[0-9]+$"',
                                    },
                                  ];
                                  return false;
                                }
                              } else {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath:
                                      (dataPath || '') + '.stroke.dasharray',
                                    schemaPath: '#/definitions/DashArray/type',
                                    params: {
                                      type: 'string',
                                    },
                                    message: 'should be string',
                                  },
                                ];
                                return false;
                              }
                              var valid3 = errors === errs_3;
                              var valid2 = errors === errs_2;
                            }
                            if (valid2) {
                              var data2 = data1.dashoffset;
                              if (data2 === undefined) {
                                valid2 = true;
                              } else {
                                var errs_2 = errors;
                                var errs_3 = errors;
                                if (
                                  typeof data2 !== 'number' ||
                                  data2 % 1 ||
                                  data2 !== data2
                                ) {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') + '.stroke.dashoffset',
                                      schemaPath:
                                        '#/definitions/DashOffset/type',
                                      params: {
                                        type: 'integer',
                                      },
                                      message: 'should be integer',
                                    },
                                  ];
                                  return false;
                                }
                                if (typeof data2 === 'number') {
                                  if (data2 > 100 || data2 !== data2) {
                                    validate.errors = [
                                      {
                                        keyword: 'maximum',
                                        dataPath:
                                          (dataPath || '') +
                                          '.stroke.dashoffset',
                                        schemaPath:
                                          '#/definitions/DashOffset/maximum',
                                        params: {
                                          comparison: '<=',
                                          limit: 100,
                                          exclusive: false,
                                        },
                                        message: 'should be <= 100',
                                      },
                                    ];
                                    return false;
                                  } else {
                                    if (data2 < -100 || data2 !== data2) {
                                      validate.errors = [
                                        {
                                          keyword: 'minimum',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.dashoffset',
                                          schemaPath:
                                            '#/definitions/DashOffset/minimum',
                                          params: {
                                            comparison: '>=',
                                            limit: -100,
                                            exclusive: false,
                                          },
                                          message: 'should be >= -100',
                                        },
                                      ];
                                      return false;
                                    }
                                  }
                                }
                                var valid3 = errors === errs_3;
                                var valid2 = errors === errs_2;
                              }
                              if (valid2) {
                                var data2 = data1.linecap;
                                if (data2 === undefined) {
                                  valid2 = true;
                                } else {
                                  var errs_2 = errors;
                                  if (typeof data2 !== 'string') {
                                    validate.errors = [
                                      {
                                        keyword: 'type',
                                        dataPath:
                                          (dataPath || '') + '.stroke.linecap',
                                        schemaPath:
                                          '#/properties/stroke/properties/linecap/type',
                                        params: {
                                          type: 'string',
                                        },
                                        message: 'should be string',
                                      },
                                    ];
                                    return false;
                                  }
                                  var schema2 =
                                    validate.schema.properties.stroke.properties
                                      .linecap.enum;
                                  var valid2;
                                  valid2 = false;
                                  for (var i2 = 0; i2 < schema2.length; i2++)
                                    if (equal(data2, schema2[i2])) {
                                      valid2 = true;
                                      break;
                                    }
                                  if (!valid2) {
                                    validate.errors = [
                                      {
                                        keyword: 'enum',
                                        dataPath:
                                          (dataPath || '') + '.stroke.linecap',
                                        schemaPath:
                                          '#/properties/stroke/properties/linecap/enum',
                                        params: {
                                          allowedValues: schema2,
                                        },
                                        message:
                                          'should be equal to one of the allowed values',
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid2 = errors === errs_2;
                                }
                                if (valid2) {
                                  var data2 = data1.linejoin;
                                  if (data2 === undefined) {
                                    valid2 = true;
                                  } else {
                                    var errs_2 = errors;
                                    if (typeof data2 !== 'string') {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.linejoin',
                                          schemaPath:
                                            '#/properties/stroke/properties/linejoin/type',
                                          params: {
                                            type: 'string',
                                          },
                                          message: 'should be string',
                                        },
                                      ];
                                      return false;
                                    }
                                    var schema2 =
                                      validate.schema.properties.stroke
                                        .properties.linejoin.enum;
                                    var valid2;
                                    valid2 = false;
                                    for (var i2 = 0; i2 < schema2.length; i2++)
                                      if (equal(data2, schema2[i2])) {
                                        valid2 = true;
                                        break;
                                      }
                                    if (!valid2) {
                                      validate.errors = [
                                        {
                                          keyword: 'enum',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.linejoin',
                                          schemaPath:
                                            '#/properties/stroke/properties/linejoin/enum',
                                          params: {
                                            allowedValues: schema2,
                                          },
                                          message:
                                            'should be equal to one of the allowed values',
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid2 = errors === errs_2;
                                  }
                                  if (valid2) {
                                    var data2 = data1.opacity;
                                    if (data2 === undefined) {
                                      valid2 = true;
                                    } else {
                                      var errs_2 = errors;
                                      var errs_3 = errors;
                                      if (typeof data2 === 'number') {
                                        if (data2 > 1 || data2 !== data2) {
                                          validate.errors = [
                                            {
                                              keyword: 'maximum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.opacity',
                                              schemaPath:
                                                '#/definitions/Opacity/maximum',
                                              params: {
                                                comparison: '<=',
                                                limit: 1,
                                                exclusive: false,
                                              },
                                              message: 'should be <= 1',
                                            },
                                          ];
                                          return false;
                                        } else {
                                          if (data2 < 0 || data2 !== data2) {
                                            validate.errors = [
                                              {
                                                keyword: 'minimum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.opacity',
                                                schemaPath:
                                                  '#/definitions/Opacity/minimum',
                                                params: {
                                                  comparison: '>=',
                                                  limit: 0,
                                                  exclusive: false,
                                                },
                                                message: 'should be >= 0',
                                              },
                                            ];
                                            return false;
                                          }
                                        }
                                      } else {
                                        validate.errors = [
                                          {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.stroke.opacity',
                                            schemaPath:
                                              '#/definitions/Opacity/type',
                                            params: {
                                              type: 'number',
                                            },
                                            message: 'should be number',
                                          },
                                        ];
                                        return false;
                                      }
                                      var valid3 = errors === errs_3;
                                      var valid2 = errors === errs_2;
                                    }
                                    if (valid2) {
                                      var data2 = data1.width;
                                      if (data2 === undefined) {
                                        valid2 = true;
                                      } else {
                                        var errs_2 = errors;
                                        var errs_3 = errors;
                                        if (typeof data2 === 'number') {
                                          if (data2 < 0 || data2 !== data2) {
                                            validate.errors = [
                                              {
                                                keyword: 'minimum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.width',
                                                schemaPath:
                                                  '#/definitions/ViewportCoordinate/minimum',
                                                params: {
                                                  comparison: '>=',
                                                  limit: 0,
                                                  exclusive: false,
                                                },
                                                message: 'should be >= 0',
                                              },
                                            ];
                                            return false;
                                          }
                                        } else {
                                          validate.errors = [
                                            {
                                              keyword: 'type',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.width',
                                              schemaPath:
                                                '#/definitions/ViewportCoordinate/type',
                                              params: {
                                                type: 'number',
                                              },
                                              message: 'should be number',
                                            },
                                          ];
                                          return false;
                                        }
                                        var valid3 = errors === errs_3;
                                        var valid2 = errors === errs_2;
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.stroke',
                            schemaPath: '#/properties/stroke/type',
                            params: {
                              type: 'object',
                            },
                            message: 'should be object',
                          },
                        ];
                        return false;
                      }
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      var data1 = data.transform;
                      if (data1 === undefined) {
                        valid1 = true;
                      } else {
                        var errs_1 = errors;
                        var errs_2 = errors;
                        if (typeof data1 === 'string') {
                          if (ucs2length(data1) > 128) {
                            validate.errors = [
                              {
                                keyword: 'maxLength',
                                dataPath: (dataPath || '') + '.transform',
                                schemaPath: '#/definitions/Transform/maxLength',
                                params: {
                                  limit: 128,
                                },
                                message:
                                  'should NOT be longer than 128 characters',
                              },
                            ];
                            return false;
                          } else {
                            if (ucs2length(data1) < 2) {
                              validate.errors = [
                                {
                                  keyword: 'minLength',
                                  dataPath: (dataPath || '') + '.transform',
                                  schemaPath:
                                    '#/definitions/Transform/minLength',
                                  params: {
                                    limit: 2,
                                  },
                                  message:
                                    'should NOT be shorter than 2 characters',
                                },
                              ];
                              return false;
                            }
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.transform',
                              schemaPath: '#/definitions/Transform/type',
                              params: {
                                type: 'string',
                              },
                              message: 'should be string',
                            },
                          ];
                          return false;
                        }
                        var valid2 = errors === errs_2;
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        var data1 = data.transformOrigin;
                        if (data1 === undefined) {
                          valid1 = true;
                        } else {
                          var errs_1 = errors;
                          var errs_2 = errors;
                          if (typeof data1 === 'string') {
                            if (ucs2length(data1) > 128) {
                              validate.errors = [
                                {
                                  keyword: 'maxLength',
                                  dataPath:
                                    (dataPath || '') + '.transformOrigin',
                                  schemaPath:
                                    '#/definitions/TransformOrigin/maxLength',
                                  params: {
                                    limit: 128,
                                  },
                                  message:
                                    'should NOT be longer than 128 characters',
                                },
                              ];
                              return false;
                            } else {
                              if (ucs2length(data1) < 2) {
                                validate.errors = [
                                  {
                                    keyword: 'minLength',
                                    dataPath:
                                      (dataPath || '') + '.transformOrigin',
                                    schemaPath:
                                      '#/definitions/TransformOrigin/minLength',
                                    params: {
                                      limit: 2,
                                    },
                                    message:
                                      'should NOT be shorter than 2 characters',
                                  },
                                ];
                                return false;
                              }
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.transformOrigin',
                                schemaPath:
                                  '#/definitions/TransformOrigin/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                          var valid1 = errors === errs_1;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal31.schema = {
    additionalProperties: false,
    properties: {
      element: {
        enum: ['polygon'],
        type: 'string',
      },
      fill: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          rule: {
            enum: ['nonzero', 'evenodd'],
            type: 'string',
          },
        },
        type: 'object',
      },
      opacity: {
        $ref: '#/definitions/Opacity',
      },
      points: {
        $ref: '#/definitions/ViewportCoordinatePairs',
      },
      stroke: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          dasharray: {
            $ref: '#/definitions/DashArray',
          },
          dashoffset: {
            $ref: '#/definitions/DashOffset',
          },
          linecap: {
            enum: ['butt', 'square', 'round'],
            type: 'string',
          },
          linejoin: {
            enum: ['miter', 'round', 'bevel'],
            type: 'string',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          width: {
            $ref: '#/definitions/ViewportCoordinate',
          },
        },
        type: 'object',
      },
      transform: {
        $ref: '#/definitions/Transform',
      },
      transformOrigin: {
        $ref: '#/definitions/TransformOrigin',
      },
    },
    required: ['element', 'points'],
    type: 'object',
  };
  refVal31.errors = null;
  refVal[31] = refVal31;
  var refVal32 = {
    description: 'A dash array in the form of "2 3 4"',
    pattern: '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$',
    type: 'string',
  };
  refVal[32] = refVal32;
  var refVal33 = (function () {
    var pattern0 = new RegExp(
      '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$'
    );
    var pattern1 = new RegExp('^([0-9]+\\s)+[0-9]+$');
    var pattern2 = new RegExp(
      '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$'
    );
    var pattern3 = new RegExp('^([0-9]+\\s){3}[0-9]+$');
    return function validate(
      data,
      dataPath,
      parentData,
      parentDataProperty,
      rootData
    ) {
      'use strict';
      var vErrors = null;
      var errors = 0;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (true) {
          var errs__0 = errors;
          var valid1 = true;
          for (var key0 in data) {
            var isAdditional0 = !(
              false ||
              key0 == 'element' ||
              key0 == 'fill' ||
              key0 == 'opacity' ||
              key0 == 'points' ||
              key0 == 'stroke' ||
              key0 == 'transform' ||
              key0 == 'transformOrigin'
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + '',
                  },
                  message: 'should NOT have additional properties',
                },
              ];
              return false;
              break;
            }
          }
          if (valid1) {
            var data1 = data.element;
            if (data1 === undefined) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'element',
                  },
                  message: "should have required property 'element'",
                },
              ];
              return false;
            } else {
              var errs_1 = errors;
              if (typeof data1 !== 'string') {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.element',
                    schemaPath: '#/properties/element/type',
                    params: {
                      type: 'string',
                    },
                    message: 'should be string',
                  },
                ];
                return false;
              }
              var schema1 = validate.schema.properties.element.enum;
              var valid1;
              valid1 = false;
              for (var i1 = 0; i1 < schema1.length; i1++)
                if (equal(data1, schema1[i1])) {
                  valid1 = true;
                  break;
                }
              if (!valid1) {
                validate.errors = [
                  {
                    keyword: 'enum',
                    dataPath: (dataPath || '') + '.element',
                    schemaPath: '#/properties/element/enum',
                    params: {
                      allowedValues: schema1,
                    },
                    message: 'should be equal to one of the allowed values',
                  },
                ];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.fill;
              if (data1 === undefined) {
                valid1 = true;
              } else {
                var errs_1 = errors;
                if (
                  data1 &&
                  typeof data1 === 'object' &&
                  !Array.isArray(data1)
                ) {
                  var errs__1 = errors;
                  var valid2 = true;
                  for (var key1 in data1) {
                    var isAdditional1 = !(
                      false ||
                      key1 == 'color' ||
                      key1 == 'opacity' ||
                      key1 == 'rule'
                    );
                    if (isAdditional1) {
                      valid2 = false;
                      validate.errors = [
                        {
                          keyword: 'additionalProperties',
                          dataPath: (dataPath || '') + '.fill',
                          schemaPath: '#/properties/fill/additionalProperties',
                          params: {
                            additionalProperty: '' + key1 + '',
                          },
                          message: 'should NOT have additional properties',
                        },
                      ];
                      return false;
                      break;
                    }
                  }
                  if (valid2) {
                    var data2 = data1.color;
                    if (data2 === undefined) {
                      valid2 = true;
                    } else {
                      var errs_2 = errors;
                      var errs_3 = errors;
                      if (typeof data2 === 'string') {
                        if (!pattern0.test(data2)) {
                          validate.errors = [
                            {
                              keyword: 'pattern',
                              dataPath: (dataPath || '') + '.fill.color',
                              schemaPath: '#/definitions/Color/pattern',
                              params: {
                                pattern:
                                  '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                              },
                              message:
                                'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                            },
                          ];
                          return false;
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.fill.color',
                            schemaPath: '#/definitions/Color/type',
                            params: {
                              type: 'string',
                            },
                            message: 'should be string',
                          },
                        ];
                        return false;
                      }
                      var valid3 = errors === errs_3;
                      var valid2 = errors === errs_2;
                    }
                    if (valid2) {
                      var data2 = data1.opacity;
                      if (data2 === undefined) {
                        valid2 = true;
                      } else {
                        var errs_2 = errors;
                        var errs_3 = errors;
                        if (typeof data2 === 'number') {
                          if (data2 > 1 || data2 !== data2) {
                            validate.errors = [
                              {
                                keyword: 'maximum',
                                dataPath: (dataPath || '') + '.fill.opacity',
                                schemaPath: '#/definitions/Opacity/maximum',
                                params: {
                                  comparison: '<=',
                                  limit: 1,
                                  exclusive: false,
                                },
                                message: 'should be <= 1',
                              },
                            ];
                            return false;
                          } else {
                            if (data2 < 0 || data2 !== data2) {
                              validate.errors = [
                                {
                                  keyword: 'minimum',
                                  dataPath: (dataPath || '') + '.fill.opacity',
                                  schemaPath: '#/definitions/Opacity/minimum',
                                  params: {
                                    comparison: '>=',
                                    limit: 0,
                                    exclusive: false,
                                  },
                                  message: 'should be >= 0',
                                },
                              ];
                              return false;
                            }
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.fill.opacity',
                              schemaPath: '#/definitions/Opacity/type',
                              params: {
                                type: 'number',
                              },
                              message: 'should be number',
                            },
                          ];
                          return false;
                        }
                        var valid3 = errors === errs_3;
                        var valid2 = errors === errs_2;
                      }
                      if (valid2) {
                        var data2 = data1.rule;
                        if (data2 === undefined) {
                          valid2 = true;
                        } else {
                          var errs_2 = errors;
                          if (typeof data2 !== 'string') {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.fill.rule',
                                schemaPath:
                                  '#/properties/fill/properties/rule/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var schema2 =
                            validate.schema.properties.fill.properties.rule
                              .enum;
                          var valid2;
                          valid2 = false;
                          for (var i2 = 0; i2 < schema2.length; i2++)
                            if (equal(data2, schema2[i2])) {
                              valid2 = true;
                              break;
                            }
                          if (!valid2) {
                            validate.errors = [
                              {
                                keyword: 'enum',
                                dataPath: (dataPath || '') + '.fill.rule',
                                schemaPath:
                                  '#/properties/fill/properties/rule/enum',
                                params: {
                                  allowedValues: schema2,
                                },
                                message:
                                  'should be equal to one of the allowed values',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                        }
                      }
                    }
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.fill',
                      schemaPath: '#/properties/fill/type',
                      params: {
                        type: 'object',
                      },
                      message: 'should be object',
                    },
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.opacity;
                if (data1 === undefined) {
                  valid1 = true;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if (typeof data1 === 'number') {
                    if (data1 > 1 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'maximum',
                          dataPath: (dataPath || '') + '.opacity',
                          schemaPath: '#/definitions/Opacity/maximum',
                          params: {
                            comparison: '<=',
                            limit: 1,
                            exclusive: false,
                          },
                          message: 'should be <= 1',
                        },
                      ];
                      return false;
                    } else {
                      if (data1 < 0 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'minimum',
                            dataPath: (dataPath || '') + '.opacity',
                            schemaPath: '#/definitions/Opacity/minimum',
                            params: {
                              comparison: '>=',
                              limit: 0,
                              exclusive: false,
                            },
                            message: 'should be >= 0',
                          },
                        ];
                        return false;
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.opacity',
                        schemaPath: '#/definitions/Opacity/type',
                        params: {
                          type: 'number',
                        },
                        message: 'should be number',
                      },
                    ];
                    return false;
                  }
                  var valid2 = errors === errs_2;
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  var data1 = data.points;
                  if (data1 === undefined) {
                    valid1 = false;
                    validate.errors = [
                      {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '',
                        schemaPath: '#/required',
                        params: {
                          missingProperty: 'points',
                        },
                        message: "should have required property 'points'",
                      },
                    ];
                    return false;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (typeof data1 === 'string') {
                      if (!pattern2.test(data1)) {
                        validate.errors = [
                          {
                            keyword: 'pattern',
                            dataPath: (dataPath || '') + '.points',
                            schemaPath:
                              '#/definitions/ViewportCoordinatePairs/pattern',
                            params: {
                              pattern:
                                '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$',
                            },
                            message:
                              'should match pattern "^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$"',
                          },
                        ];
                        return false;
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.points',
                          schemaPath:
                            '#/definitions/ViewportCoordinatePairs/type',
                          params: {
                            type: 'string',
                          },
                          message: 'should be string',
                        },
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    var data1 = data.stroke;
                    if (data1 === undefined) {
                      valid1 = true;
                    } else {
                      var errs_1 = errors;
                      if (
                        data1 &&
                        typeof data1 === 'object' &&
                        !Array.isArray(data1)
                      ) {
                        var errs__1 = errors;
                        var valid2 = true;
                        for (var key1 in data1) {
                          var isAdditional1 = !(
                            false ||
                            key1 == 'color' ||
                            key1 == 'dasharray' ||
                            key1 == 'dashoffset' ||
                            key1 == 'linecap' ||
                            key1 == 'linejoin' ||
                            key1 == 'opacity' ||
                            key1 == 'width'
                          );
                          if (isAdditional1) {
                            valid2 = false;
                            validate.errors = [
                              {
                                keyword: 'additionalProperties',
                                dataPath: (dataPath || '') + '.stroke',
                                schemaPath:
                                  '#/properties/stroke/additionalProperties',
                                params: {
                                  additionalProperty: '' + key1 + '',
                                },
                                message:
                                  'should NOT have additional properties',
                              },
                            ];
                            return false;
                            break;
                          }
                        }
                        if (valid2) {
                          var data2 = data1.color;
                          if (data2 === undefined) {
                            valid2 = true;
                          } else {
                            var errs_2 = errors;
                            var errs_3 = errors;
                            if (typeof data2 === 'string') {
                              if (!pattern0.test(data2)) {
                                validate.errors = [
                                  {
                                    keyword: 'pattern',
                                    dataPath:
                                      (dataPath || '') + '.stroke.color',
                                    schemaPath: '#/definitions/Color/pattern',
                                    params: {
                                      pattern:
                                        '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
                                    },
                                    message:
                                      'should match pattern "^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$"',
                                  },
                                ];
                                return false;
                              }
                            } else {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.stroke.color',
                                  schemaPath: '#/definitions/Color/type',
                                  params: {
                                    type: 'string',
                                  },
                                  message: 'should be string',
                                },
                              ];
                              return false;
                            }
                            var valid3 = errors === errs_3;
                            var valid2 = errors === errs_2;
                          }
                          if (valid2) {
                            var data2 = data1.dasharray;
                            if (data2 === undefined) {
                              valid2 = true;
                            } else {
                              var errs_2 = errors;
                              var errs_3 = errors;
                              if (typeof data2 === 'string') {
                                if (!pattern1.test(data2)) {
                                  validate.errors = [
                                    {
                                      keyword: 'pattern',
                                      dataPath:
                                        (dataPath || '') + '.stroke.dasharray',
                                      schemaPath:
                                        '#/definitions/DashArray/pattern',
                                      params: {
                                        pattern: '^([0-9]+\\s)+[0-9]+$',
                                      },
                                      message:
                                        'should match pattern "^([0-9]+\\s)+[0-9]+$"',
                                    },
                                  ];
                                  return false;
                                }
                              } else {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath:
                                      (dataPath || '') + '.stroke.dasharray',
                                    schemaPath: '#/definitions/DashArray/type',
                                    params: {
                                      type: 'string',
                                    },
                                    message: 'should be string',
                                  },
                                ];
                                return false;
                              }
                              var valid3 = errors === errs_3;
                              var valid2 = errors === errs_2;
                            }
                            if (valid2) {
                              var data2 = data1.dashoffset;
                              if (data2 === undefined) {
                                valid2 = true;
                              } else {
                                var errs_2 = errors;
                                var errs_3 = errors;
                                if (
                                  typeof data2 !== 'number' ||
                                  data2 % 1 ||
                                  data2 !== data2
                                ) {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') + '.stroke.dashoffset',
                                      schemaPath:
                                        '#/definitions/DashOffset/type',
                                      params: {
                                        type: 'integer',
                                      },
                                      message: 'should be integer',
                                    },
                                  ];
                                  return false;
                                }
                                if (typeof data2 === 'number') {
                                  if (data2 > 100 || data2 !== data2) {
                                    validate.errors = [
                                      {
                                        keyword: 'maximum',
                                        dataPath:
                                          (dataPath || '') +
                                          '.stroke.dashoffset',
                                        schemaPath:
                                          '#/definitions/DashOffset/maximum',
                                        params: {
                                          comparison: '<=',
                                          limit: 100,
                                          exclusive: false,
                                        },
                                        message: 'should be <= 100',
                                      },
                                    ];
                                    return false;
                                  } else {
                                    if (data2 < -100 || data2 !== data2) {
                                      validate.errors = [
                                        {
                                          keyword: 'minimum',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.dashoffset',
                                          schemaPath:
                                            '#/definitions/DashOffset/minimum',
                                          params: {
                                            comparison: '>=',
                                            limit: -100,
                                            exclusive: false,
                                          },
                                          message: 'should be >= -100',
                                        },
                                      ];
                                      return false;
                                    }
                                  }
                                }
                                var valid3 = errors === errs_3;
                                var valid2 = errors === errs_2;
                              }
                              if (valid2) {
                                var data2 = data1.linecap;
                                if (data2 === undefined) {
                                  valid2 = true;
                                } else {
                                  var errs_2 = errors;
                                  if (typeof data2 !== 'string') {
                                    validate.errors = [
                                      {
                                        keyword: 'type',
                                        dataPath:
                                          (dataPath || '') + '.stroke.linecap',
                                        schemaPath:
                                          '#/properties/stroke/properties/linecap/type',
                                        params: {
                                          type: 'string',
                                        },
                                        message: 'should be string',
                                      },
                                    ];
                                    return false;
                                  }
                                  var schema2 =
                                    validate.schema.properties.stroke.properties
                                      .linecap.enum;
                                  var valid2;
                                  valid2 = false;
                                  for (var i2 = 0; i2 < schema2.length; i2++)
                                    if (equal(data2, schema2[i2])) {
                                      valid2 = true;
                                      break;
                                    }
                                  if (!valid2) {
                                    validate.errors = [
                                      {
                                        keyword: 'enum',
                                        dataPath:
                                          (dataPath || '') + '.stroke.linecap',
                                        schemaPath:
                                          '#/properties/stroke/properties/linecap/enum',
                                        params: {
                                          allowedValues: schema2,
                                        },
                                        message:
                                          'should be equal to one of the allowed values',
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid2 = errors === errs_2;
                                }
                                if (valid2) {
                                  var data2 = data1.linejoin;
                                  if (data2 === undefined) {
                                    valid2 = true;
                                  } else {
                                    var errs_2 = errors;
                                    if (typeof data2 !== 'string') {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.linejoin',
                                          schemaPath:
                                            '#/properties/stroke/properties/linejoin/type',
                                          params: {
                                            type: 'string',
                                          },
                                          message: 'should be string',
                                        },
                                      ];
                                      return false;
                                    }
                                    var schema2 =
                                      validate.schema.properties.stroke
                                        .properties.linejoin.enum;
                                    var valid2;
                                    valid2 = false;
                                    for (var i2 = 0; i2 < schema2.length; i2++)
                                      if (equal(data2, schema2[i2])) {
                                        valid2 = true;
                                        break;
                                      }
                                    if (!valid2) {
                                      validate.errors = [
                                        {
                                          keyword: 'enum',
                                          dataPath:
                                            (dataPath || '') +
                                            '.stroke.linejoin',
                                          schemaPath:
                                            '#/properties/stroke/properties/linejoin/enum',
                                          params: {
                                            allowedValues: schema2,
                                          },
                                          message:
                                            'should be equal to one of the allowed values',
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid2 = errors === errs_2;
                                  }
                                  if (valid2) {
                                    var data2 = data1.opacity;
                                    if (data2 === undefined) {
                                      valid2 = true;
                                    } else {
                                      var errs_2 = errors;
                                      var errs_3 = errors;
                                      if (typeof data2 === 'number') {
                                        if (data2 > 1 || data2 !== data2) {
                                          validate.errors = [
                                            {
                                              keyword: 'maximum',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.opacity',
                                              schemaPath:
                                                '#/definitions/Opacity/maximum',
                                              params: {
                                                comparison: '<=',
                                                limit: 1,
                                                exclusive: false,
                                              },
                                              message: 'should be <= 1',
                                            },
                                          ];
                                          return false;
                                        } else {
                                          if (data2 < 0 || data2 !== data2) {
                                            validate.errors = [
                                              {
                                                keyword: 'minimum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.opacity',
                                                schemaPath:
                                                  '#/definitions/Opacity/minimum',
                                                params: {
                                                  comparison: '>=',
                                                  limit: 0,
                                                  exclusive: false,
                                                },
                                                message: 'should be >= 0',
                                              },
                                            ];
                                            return false;
                                          }
                                        }
                                      } else {
                                        validate.errors = [
                                          {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.stroke.opacity',
                                            schemaPath:
                                              '#/definitions/Opacity/type',
                                            params: {
                                              type: 'number',
                                            },
                                            message: 'should be number',
                                          },
                                        ];
                                        return false;
                                      }
                                      var valid3 = errors === errs_3;
                                      var valid2 = errors === errs_2;
                                    }
                                    if (valid2) {
                                      var data2 = data1.width;
                                      if (data2 === undefined) {
                                        valid2 = true;
                                      } else {
                                        var errs_2 = errors;
                                        var errs_3 = errors;
                                        if (typeof data2 === 'number') {
                                          if (data2 < 0 || data2 !== data2) {
                                            validate.errors = [
                                              {
                                                keyword: 'minimum',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.stroke.width',
                                                schemaPath:
                                                  '#/definitions/ViewportCoordinate/minimum',
                                                params: {
                                                  comparison: '>=',
                                                  limit: 0,
                                                  exclusive: false,
                                                },
                                                message: 'should be >= 0',
                                              },
                                            ];
                                            return false;
                                          }
                                        } else {
                                          validate.errors = [
                                            {
                                              keyword: 'type',
                                              dataPath:
                                                (dataPath || '') +
                                                '.stroke.width',
                                              schemaPath:
                                                '#/definitions/ViewportCoordinate/type',
                                              params: {
                                                type: 'number',
                                              },
                                              message: 'should be number',
                                            },
                                          ];
                                          return false;
                                        }
                                        var valid3 = errors === errs_3;
                                        var valid2 = errors === errs_2;
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      } else {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.stroke',
                            schemaPath: '#/properties/stroke/type',
                            params: {
                              type: 'object',
                            },
                            message: 'should be object',
                          },
                        ];
                        return false;
                      }
                      var valid1 = errors === errs_1;
                    }
                    if (valid1) {
                      var data1 = data.transform;
                      if (data1 === undefined) {
                        valid1 = true;
                      } else {
                        var errs_1 = errors;
                        var errs_2 = errors;
                        if (typeof data1 === 'string') {
                          if (ucs2length(data1) > 128) {
                            validate.errors = [
                              {
                                keyword: 'maxLength',
                                dataPath: (dataPath || '') + '.transform',
                                schemaPath: '#/definitions/Transform/maxLength',
                                params: {
                                  limit: 128,
                                },
                                message:
                                  'should NOT be longer than 128 characters',
                              },
                            ];
                            return false;
                          } else {
                            if (ucs2length(data1) < 2) {
                              validate.errors = [
                                {
                                  keyword: 'minLength',
                                  dataPath: (dataPath || '') + '.transform',
                                  schemaPath:
                                    '#/definitions/Transform/minLength',
                                  params: {
                                    limit: 2,
                                  },
                                  message:
                                    'should NOT be shorter than 2 characters',
                                },
                              ];
                              return false;
                            }
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.transform',
                              schemaPath: '#/definitions/Transform/type',
                              params: {
                                type: 'string',
                              },
                              message: 'should be string',
                            },
                          ];
                          return false;
                        }
                        var valid2 = errors === errs_2;
                        var valid1 = errors === errs_1;
                      }
                      if (valid1) {
                        var data1 = data.transformOrigin;
                        if (data1 === undefined) {
                          valid1 = true;
                        } else {
                          var errs_1 = errors;
                          var errs_2 = errors;
                          if (typeof data1 === 'string') {
                            if (ucs2length(data1) > 128) {
                              validate.errors = [
                                {
                                  keyword: 'maxLength',
                                  dataPath:
                                    (dataPath || '') + '.transformOrigin',
                                  schemaPath:
                                    '#/definitions/TransformOrigin/maxLength',
                                  params: {
                                    limit: 128,
                                  },
                                  message:
                                    'should NOT be longer than 128 characters',
                                },
                              ];
                              return false;
                            } else {
                              if (ucs2length(data1) < 2) {
                                validate.errors = [
                                  {
                                    keyword: 'minLength',
                                    dataPath:
                                      (dataPath || '') + '.transformOrigin',
                                    schemaPath:
                                      '#/definitions/TransformOrigin/minLength',
                                    params: {
                                      limit: 2,
                                    },
                                    message:
                                      'should NOT be shorter than 2 characters',
                                  },
                                ];
                                return false;
                              }
                            }
                          } else {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.transformOrigin',
                                schemaPath:
                                  '#/definitions/TransformOrigin/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                          var valid1 = errors === errs_1;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object',
            },
            message: 'should be object',
          },
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal33.schema = {
    additionalProperties: false,
    properties: {
      element: {
        enum: ['polyline'],
        type: 'string',
      },
      fill: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          rule: {
            enum: ['nonzero', 'evenodd'],
            type: 'string',
          },
        },
        type: 'object',
      },
      opacity: {
        $ref: '#/definitions/Opacity',
      },
      points: {
        $ref: '#/definitions/ViewportCoordinatePairs',
      },
      stroke: {
        additionalProperties: false,
        properties: {
          color: {
            $ref: '#/definitions/Color',
          },
          dasharray: {
            $ref: '#/definitions/DashArray',
          },
          dashoffset: {
            $ref: '#/definitions/DashOffset',
          },
          linecap: {
            enum: ['butt', 'square', 'round'],
            type: 'string',
          },
          linejoin: {
            enum: ['miter', 'round', 'bevel'],
            type: 'string',
          },
          opacity: {
            $ref: '#/definitions/Opacity',
          },
          width: {
            $ref: '#/definitions/ViewportCoordinate',
          },
        },
        type: 'object',
      },
      transform: {
        $ref: '#/definitions/Transform',
      },
      transformOrigin: {
        $ref: '#/definitions/TransformOrigin',
      },
    },
    required: ['element', 'points'],
    type: 'object',
  };
  refVal33.errors = null;
  refVal[33] = refVal33;
  var refVal34 = {
    description: 'An svg viewbox in the form of "0 0 100 100"',
    pattern: '^([0-9]+\\s){3}[0-9]+$',
    type: 'string',
  };
  refVal[34] = refVal34;
  return function validate(
    data,
    dataPath,
    parentData,
    parentDataProperty,
    rootData
  ) {
    'use strict';
    var vErrors = null;
    var errors = 0;
    if (rootData === undefined) rootData = data;
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      if (true) {
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(
            false ||
            key0 == 'cues' ||
            key0 == 'files' ||
            key0 == 'headers'
          );
          if (isAdditional0) {
            valid1 = false;
            validate.errors = [
              {
                keyword: 'additionalProperties',
                dataPath: (dataPath || '') + '',
                schemaPath: '#/additionalProperties',
                params: {
                  additionalProperty: '' + key0 + '',
                },
                message: 'should NOT have additional properties',
              },
            ];
            return false;
            break;
          }
        }
        if (valid1) {
          var data1 = data.cues;
          if (data1 === undefined) {
            valid1 = false;
            validate.errors = [
              {
                keyword: 'required',
                dataPath: (dataPath || '') + '',
                schemaPath: '#/required',
                params: {
                  missingProperty: 'cues',
                },
                message: "should have required property 'cues'",
              },
            ];
            return false;
          } else {
            var errs_1 = errors;
            if (Array.isArray(data1)) {
              var errs__1 = errors;
              var valid1;
              for (var i1 = 0; i1 < data1.length; i1++) {
                var errs_2 = errors;
                if (
                  !refVal1(
                    data1[i1],
                    (dataPath || '') + '.cues[' + i1 + ']',
                    data1,
                    i1,
                    rootData
                  )
                ) {
                  if (vErrors === null) vErrors = refVal1.errors;
                  else vErrors = vErrors.concat(refVal1.errors);
                  errors = vErrors.length;
                }
                var valid2 = errors === errs_2;
                if (!valid2) break;
              }
            } else {
              validate.errors = [
                {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.cues',
                  schemaPath: '#/properties/cues/type',
                  params: {
                    type: 'array',
                  },
                  message: 'should be array',
                },
              ];
              return false;
            }
            var valid1 = errors === errs_1;
          }
          if (valid1) {
            var data1 = data.files;
            if (data1 === undefined) {
              valid1 = true;
            } else {
              var errs_1 = errors;
              if (Array.isArray(data1)) {
                var errs__1 = errors;
                var valid1;
                for (var i1 = 0; i1 < data1.length; i1++) {
                  var errs_2 = errors;
                  if (typeof data1[i1] !== 'string') {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.files[' + i1 + ']',
                        schemaPath: '#/properties/files/items/type',
                        params: {
                          type: 'string',
                        },
                        message: 'should be string',
                      },
                    ];
                    return false;
                  }
                  var valid2 = errors === errs_2;
                  if (!valid2) break;
                }
              } else {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.files',
                    schemaPath: '#/properties/files/type',
                    params: {
                      type: 'array',
                    },
                    message: 'should be array',
                  },
                ];
                return false;
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.headers;
              if (data1 === undefined) {
                valid1 = false;
                validate.errors = [
                  {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '',
                    schemaPath: '#/required',
                    params: {
                      missingProperty: 'headers',
                    },
                    message: "should have required property 'headers'",
                  },
                ];
                return false;
              } else {
                var errs_1 = errors;
                if (
                  data1 &&
                  typeof data1 === 'object' &&
                  !Array.isArray(data1)
                ) {
                  if (true) {
                    var errs__1 = errors;
                    var valid2 = true;
                    for (var key1 in data1) {
                      var isAdditional1 = !(
                        false ||
                        validate.schema.properties.headers.properties.hasOwnProperty(
                          key1
                        )
                      );
                      if (isAdditional1) {
                        valid2 = false;
                        validate.errors = [
                          {
                            keyword: 'additionalProperties',
                            dataPath: (dataPath || '') + '.headers',
                            schemaPath:
                              '#/properties/headers/additionalProperties',
                            params: {
                              additionalProperty: '' + key1 + '',
                            },
                            message: 'should NOT have additional properties',
                          },
                        ];
                        return false;
                        break;
                      }
                    }
                    if (valid2) {
                      if (data1.authors === undefined) {
                        valid2 = true;
                      } else {
                        var errs_2 = errors;
                        if (typeof data1.authors !== 'string') {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.headers.authors',
                              schemaPath:
                                '#/properties/headers/properties/authors/type',
                              params: {
                                type: 'string',
                              },
                              message: 'should be string',
                            },
                          ];
                          return false;
                        }
                        var valid2 = errors === errs_2;
                      }
                      if (valid2) {
                        if (data1.created === undefined) {
                          valid2 = false;
                          validate.errors = [
                            {
                              keyword: 'required',
                              dataPath: (dataPath || '') + '.headers',
                              schemaPath: '#/properties/headers/required',
                              params: {
                                missingProperty: 'created',
                              },
                              message:
                                "should have required property 'created'",
                            },
                          ];
                          return false;
                        } else {
                          var errs_2 = errors;
                          if (typeof data1.created !== 'string') {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath: (dataPath || '') + '.headers.created',
                                schemaPath:
                                  '#/properties/headers/properties/created/type',
                                params: {
                                  type: 'string',
                                },
                                message: 'should be string',
                              },
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                        }
                        if (valid2) {
                          if (data1.for === undefined) {
                            valid2 = false;
                            validate.errors = [
                              {
                                keyword: 'required',
                                dataPath: (dataPath || '') + '.headers',
                                schemaPath: '#/properties/headers/required',
                                params: {
                                  missingProperty: 'for',
                                },
                                message: "should have required property 'for'",
                              },
                            ];
                            return false;
                          } else {
                            var errs_2 = errors;
                            if (typeof data1.for !== 'string') {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath: (dataPath || '') + '.headers.for',
                                  schemaPath:
                                    '#/properties/headers/properties/for/type',
                                  params: {
                                    type: 'string',
                                  },
                                  message: 'should be string',
                                },
                              ];
                              return false;
                            }
                            var valid2 = errors === errs_2;
                          }
                          if (valid2) {
                            if (data1.language === undefined) {
                              valid2 = true;
                            } else {
                              var errs_2 = errors;
                              if (typeof data1.language !== 'string') {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath:
                                      (dataPath || '') + '.headers.language',
                                    schemaPath:
                                      '#/properties/headers/properties/language/type',
                                    params: {
                                      type: 'string',
                                    },
                                    message: 'should be string',
                                  },
                                ];
                                return false;
                              }
                              var valid2 = errors === errs_2;
                            }
                            if (valid2) {
                              if (data1.license === undefined) {
                                valid2 = true;
                              } else {
                                var errs_2 = errors;
                                if (typeof data1.license !== 'string') {
                                  validate.errors = [
                                    {
                                      keyword: 'type',
                                      dataPath:
                                        (dataPath || '') + '.headers.license',
                                      schemaPath:
                                        '#/properties/headers/properties/license/type',
                                      params: {
                                        type: 'string',
                                      },
                                      message: 'should be string',
                                    },
                                  ];
                                  return false;
                                }
                                var valid2 = errors === errs_2;
                              }
                              if (valid2) {
                                if (data1.origin === undefined) {
                                  valid2 = true;
                                } else {
                                  var errs_2 = errors;
                                  if (typeof data1.origin !== 'string') {
                                    validate.errors = [
                                      {
                                        keyword: 'type',
                                        dataPath:
                                          (dataPath || '') + '.headers.origin',
                                        schemaPath:
                                          '#/properties/headers/properties/origin/type',
                                        params: {
                                          type: 'string',
                                        },
                                        message: 'should be string',
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid2 = errors === errs_2;
                                }
                                if (valid2) {
                                  var data2 = data1.path;
                                  if (data2 === undefined) {
                                    valid2 = true;
                                  } else {
                                    var errs_2 = errors;
                                    if (
                                      typeof data2 !== 'string' &&
                                      data2 !== null
                                    ) {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') + '.headers.path',
                                          schemaPath:
                                            '#/properties/headers/properties/path/type',
                                          params: {
                                            type: 'string,null',
                                          },
                                          message: 'should be string,null',
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid2 = errors === errs_2;
                                  }
                                  if (valid2) {
                                    var data2 = data1.search;
                                    if (data2 === undefined) {
                                      valid2 = true;
                                    } else {
                                      var errs_2 = errors;
                                      if (
                                        typeof data2 !== 'string' &&
                                        data2 !== null
                                      ) {
                                        validate.errors = [
                                          {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.headers.search',
                                            schemaPath:
                                              '#/properties/headers/properties/search/type',
                                            params: {
                                              type: 'string,null',
                                            },
                                            message: 'should be string,null',
                                          },
                                        ];
                                        return false;
                                      }
                                      var valid2 = errors === errs_2;
                                    }
                                    if (valid2) {
                                      if (data1.thumbnail === undefined) {
                                        valid2 = true;
                                      } else {
                                        var errs_2 = errors;
                                        if (
                                          typeof data1.thumbnail !== 'string'
                                        ) {
                                          validate.errors = [
                                            {
                                              keyword: 'type',
                                              dataPath:
                                                (dataPath || '') +
                                                '.headers.thumbnail',
                                              schemaPath:
                                                '#/properties/headers/properties/thumbnail/type',
                                              params: {
                                                type: 'string',
                                              },
                                              message: 'should be string',
                                            },
                                          ];
                                          return false;
                                        }
                                        var valid2 = errors === errs_2;
                                      }
                                      if (valid2) {
                                        if (data1.title === undefined) {
                                          valid2 = false;
                                          validate.errors = [
                                            {
                                              keyword: 'required',
                                              dataPath:
                                                (dataPath || '') + '.headers',
                                              schemaPath:
                                                '#/properties/headers/required',
                                              params: {
                                                missingProperty: 'title',
                                              },
                                              message:
                                                "should have required property 'title'",
                                            },
                                          ];
                                          return false;
                                        } else {
                                          var errs_2 = errors;
                                          if (typeof data1.title !== 'string') {
                                            validate.errors = [
                                              {
                                                keyword: 'type',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.headers.title',
                                                schemaPath:
                                                  '#/properties/headers/properties/title/type',
                                                params: {
                                                  type: 'string',
                                                },
                                                message: 'should be string',
                                              },
                                            ];
                                            return false;
                                          }
                                          var valid2 = errors === errs_2;
                                        }
                                        if (valid2) {
                                          var data2 = data1.type;
                                          if (data2 === undefined) {
                                            valid2 = false;
                                            validate.errors = [
                                              {
                                                keyword: 'required',
                                                dataPath:
                                                  (dataPath || '') + '.headers',
                                                schemaPath:
                                                  '#/properties/headers/required',
                                                params: {
                                                  missingProperty: 'type',
                                                },
                                                message:
                                                  "should have required property 'type'",
                                              },
                                            ];
                                            return false;
                                          } else {
                                            var errs_2 = errors;
                                            if (typeof data2 !== 'string') {
                                              validate.errors = [
                                                {
                                                  keyword: 'type',
                                                  dataPath:
                                                    (dataPath || '') +
                                                    '.headers.type',
                                                  schemaPath:
                                                    '#/properties/headers/properties/type/type',
                                                  params: {
                                                    type: 'string',
                                                  },
                                                  message: 'should be string',
                                                },
                                              ];
                                              return false;
                                            }
                                            var schema2 =
                                              validate.schema.properties.headers
                                                .properties.type.enum;
                                            var valid2;
                                            valid2 = false;
                                            for (
                                              var i2 = 0;
                                              i2 < schema2.length;
                                              i2++
                                            )
                                              if (equal(data2, schema2[i2])) {
                                                valid2 = true;
                                                break;
                                              }
                                            if (!valid2) {
                                              validate.errors = [
                                                {
                                                  keyword: 'enum',
                                                  dataPath:
                                                    (dataPath || '') +
                                                    '.headers.type',
                                                  schemaPath:
                                                    '#/properties/headers/properties/type/enum',
                                                  params: {
                                                    allowedValues: schema2,
                                                  },
                                                  message:
                                                    'should be equal to one of the allowed values',
                                                },
                                              ];
                                              return false;
                                            }
                                            var valid2 = errors === errs_2;
                                          }
                                          if (valid2) {
                                            if (data1.updated === undefined) {
                                              valid2 = true;
                                            } else {
                                              var errs_2 = errors;
                                              if (
                                                typeof data1.updated !==
                                                'string'
                                              ) {
                                                validate.errors = [
                                                  {
                                                    keyword: 'type',
                                                    dataPath:
                                                      (dataPath || '') +
                                                      '.headers.updated',
                                                    schemaPath:
                                                      '#/properties/headers/properties/updated/type',
                                                    params: {
                                                      type: 'string',
                                                    },
                                                    message: 'should be string',
                                                  },
                                                ];
                                                return false;
                                              }
                                              var valid2 = errors === errs_2;
                                            }
                                            if (valid2) {
                                              if (data1.url === undefined) {
                                                valid2 = true;
                                              } else {
                                                var errs_2 = errors;
                                                if (
                                                  typeof data1.url !== 'string'
                                                ) {
                                                  validate.errors = [
                                                    {
                                                      keyword: 'type',
                                                      dataPath:
                                                        (dataPath || '') +
                                                        '.headers.url',
                                                      schemaPath:
                                                        '#/properties/headers/properties/url/type',
                                                      params: {
                                                        type: 'string',
                                                      },
                                                      message:
                                                        'should be string',
                                                    },
                                                  ];
                                                  return false;
                                                }
                                                var valid2 = errors === errs_2;
                                              }
                                              if (valid2) {
                                                if (data1.xpath === undefined) {
                                                  valid2 = true;
                                                } else {
                                                  var errs_2 = errors;
                                                  if (
                                                    typeof data1.xpath !==
                                                    'string'
                                                  ) {
                                                    validate.errors = [
                                                      {
                                                        keyword: 'type',
                                                        dataPath:
                                                          (dataPath || '') +
                                                          '.headers.xpath',
                                                        schemaPath:
                                                          '#/properties/headers/properties/xpath/type',
                                                        params: {
                                                          type: 'string',
                                                        },
                                                        message:
                                                          'should be string',
                                                      },
                                                    ];
                                                    return false;
                                                  }
                                                  var valid2 =
                                                    errors === errs_2;
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.headers',
                      schemaPath: '#/properties/headers/type',
                      params: {
                        type: 'object',
                      },
                      message: 'should be object',
                    },
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
            }
          }
        }
      }
    } else {
      validate.errors = [
        {
          keyword: 'type',
          dataPath: (dataPath || '') + '',
          schemaPath: '#/type',
          params: {
            type: 'object',
          },
          message: 'should be object',
        },
      ];
      return false;
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
  definitions: {
    AdjustVolumeAudio: {
      additionalProperties: false,
      properties: {
        audio: {
          type: 'number',
        },
        endTime: {
          type: 'number',
        },
        startTime: {
          type: 'number',
        },
        type: {
          enum: ['VOLUME'],
          type: 'string',
        },
        video: {
          type: 'number',
        },
      },
      required: ['type', 'startTime', 'endTime', 'audio', 'video'],
      type: 'object',
    },
    AudioEdit: {
      anyOf: [
        {
          $ref: '#/definitions/SkipAudio',
        },
        {
          $ref: '#/definitions/StillAudio',
        },
        {
          $ref: '#/definitions/PauseAudio',
        },
        {
          $ref: '#/definitions/AdjustVolumeAudio',
        },
      ],
    },
    Author: {
      description: 'An author to attribute composition to.',
      maxLength: 128,
      minLength: 2,
      type: 'string',
    },
    Color: {
      description:
        'A hex, hsl, hsla or rgba color string:\n#FA9, #FFAA99, rgba(1, 1, 2, 0.5)',
      pattern:
        '^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$',
      type: 'string',
    },
    Cue: {
      additionalProperties: false,
      properties: {
        data: {
          $ref: '#/definitions/PlopdownTemplate',
        },
        endTime: {
          type: 'number',
        },
        id: {
          type: 'string',
        },
        startTime: {
          type: 'number',
        },
      },
      required: ['startTime', 'endTime', 'id', 'data'],
      type: 'object',
    },
    DashArray: {
      description: 'A dash array in the form of "2 3 4"',
      pattern: '^([0-9]+\\s)+[0-9]+$',
      type: 'string',
    },
    DashOffset: {
      description: 'An integer representing the dash offset of a stroke.',
      maximum: 100,
      minimum: -100,
      type: 'integer',
    },
    Degree: {
      description: 'Degrees for rotation of elements.',
      maximum: 360,
      minimum: -360,
      type: 'number',
    },
    Description: {
      description: 'A medium long description',
      maxLength: 1024,
      minLength: 2,
      type: 'string',
    },
    Emoji: {
      description:
        'A single emoji character, ligatures mean the max length\ncan be up to 3 characters.',
      maxLength: 32,
      minLength: 1,
      type: 'string',
    },
    ExternalLink: {
      description: 'An external URL to get more information.',
      format: 'uri',
      type: 'string',
    },
    Opacity: {
      description: 'A normalized opacity ranged between 0.0 and 1.0',
      maximum: 1,
      minimum: 0,
      type: 'number',
    },
    PauseAudio: {
      additionalProperties: false,
      properties: {
        duration: {
          type: 'number',
        },
        startTime: {
          type: 'number',
        },
        type: {
          enum: ['PAUSE'],
          type: 'string',
        },
      },
      required: ['type', 'startTime', 'duration'],
      type: 'object',
    },
    Percentage: {
      description: 'A bounded percentage relative to the container.',
      maximum: 1000,
      minimum: -100,
      type: 'number',
    },
    PlopdownAudio: {
      additionalProperties: false,
      properties: {
        edits: {
          items: {
            $ref: '#/definitions/AudioEdit',
          },
          type: 'array',
        },
        left: {
          $ref: '#/definitions/Percentage',
        },
        title: {
          $ref: '#/definitions/Title',
        },
        top: {
          $ref: '#/definitions/Percentage',
        },
        type: {
          enum: ['AUDIO'],
          type: 'string',
        },
        url: {
          $ref: '#/definitions/URIReference',
        },
      },
      required: ['left', 'title', 'top', 'type', 'url'],
      type: 'object',
    },
    PlopdownInfo: {
      additionalProperties: false,
      properties: {
        authors: {
          items: {
            $ref: '#/definitions/Author',
          },
          type: 'array',
        },
        title: {
          $ref: '#/definitions/Title',
        },
        type: {
          enum: ['INFO'],
          type: 'string',
        },
        url: {
          $ref: '#/definitions/ExternalLink',
        },
      },
      required: ['authors', 'title', 'type'],
      type: 'object',
    },
    PlopdownPlop: {
      additionalProperties: false,
      properties: {
        desc: {
          $ref: '#/definitions/Description',
        },
        footnotes: {
          items: {
            additionalProperties: false,
            properties: {
              title: {
                $ref: '#/definitions/Title',
              },
              url: {
                $ref: '#/definitions/ExternalLink',
              },
            },
            required: ['title', 'url'],
            type: 'object',
          },
          type: 'array',
        },
        icons: {
          items: {
            additionalProperties: false,
            properties: {
              emoji: {
                $ref: '#/definitions/Emoji',
              },
              left: {
                $ref: '#/definitions/Percentage',
              },
              rotate: {
                $ref: '#/definitions/Degree',
              },
              size: {
                $ref: '#/definitions/Percentage',
              },
              top: {
                $ref: '#/definitions/Percentage',
              },
            },
            required: ['top', 'left', 'size', 'rotate', 'emoji'],
            type: 'object',
          },
          type: 'array',
        },
        left: {
          $ref: '#/definitions/Percentage',
        },
        top: {
          $ref: '#/definitions/Percentage',
        },
        type: {
          enum: ['PLOP'],
          type: 'string',
        },
        width: {
          $ref: '#/definitions/Percentage',
        },
      },
      required: ['desc', 'icons', 'left', 'top', 'type', 'width'],
      type: 'object',
    },
    PlopdownShape: {
      additionalProperties: false,
      properties: {
        blend: {
          enum: [
            'normal',
            'multiply',
            'screen',
            'overlay',
            'darken',
            'lighten',
            'color-dodge',
            'color-burn',
            'hard-light',
            'soft-light',
            'difference',
            'exclusion',
            'hue',
            'saturation',
            'color',
            'luminosity',
          ],
          type: 'string',
        },
        elements: {
          items: {
            anyOf: [
              {
                $ref: '#/definitions/PlopdownShapeEllipse',
              },
              {
                $ref: '#/definitions/PlopdownShapeRect',
              },
              {
                $ref: '#/definitions/PlopdownShapePath',
              },
              {
                $ref: '#/definitions/PlopdownShapePolygon',
              },
              {
                $ref: '#/definitions/PlopdownShapePolyline',
              },
            ],
          },
          type: 'array',
        },
        height: {
          $ref: '#/definitions/Percentage',
        },
        left: {
          $ref: '#/definitions/Percentage',
        },
        title: {
          additionalProperties: false,
          properties: {
            show: {
              type: 'boolean',
            },
            text: {
              $ref: '#/definitions/Title',
            },
          },
          required: ['text', 'show'],
          type: 'object',
        },
        top: {
          $ref: '#/definitions/Percentage',
        },
        type: {
          enum: ['SHAPE'],
          type: 'string',
        },
        viewBox: {
          $ref: '#/definitions/ViewBox',
        },
        width: {
          $ref: '#/definitions/Percentage',
        },
      },
      required: [
        'elements',
        'height',
        'left',
        'title',
        'top',
        'type',
        'viewBox',
        'width',
      ],
      type: 'object',
    },
    PlopdownShapeEllipse: {
      additionalProperties: false,
      properties: {
        cx: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        cy: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        element: {
          enum: ['ellipse'],
          type: 'string',
        },
        fill: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            rule: {
              enum: ['nonzero', 'evenodd'],
              type: 'string',
            },
          },
          type: 'object',
        },
        opacity: {
          $ref: '#/definitions/Opacity',
        },
        rx: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        ry: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        stroke: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            dasharray: {
              $ref: '#/definitions/DashArray',
            },
            dashoffset: {
              $ref: '#/definitions/DashOffset',
            },
            linecap: {
              enum: ['butt', 'square', 'round'],
              type: 'string',
            },
            linejoin: {
              enum: ['miter', 'round', 'bevel'],
              type: 'string',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            width: {
              $ref: '#/definitions/ViewportCoordinate',
            },
          },
          type: 'object',
        },
        transform: {
          $ref: '#/definitions/Transform',
        },
        transformOrigin: {
          $ref: '#/definitions/TransformOrigin',
        },
      },
      required: ['cx', 'cy', 'element', 'rx', 'ry'],
      type: 'object',
    },
    PlopdownShapePath: {
      additionalProperties: false,
      properties: {
        d: {
          $ref: '#/definitions/ViewportPath',
        },
        element: {
          enum: ['path'],
          type: 'string',
        },
        fill: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            rule: {
              enum: ['nonzero', 'evenodd'],
              type: 'string',
            },
          },
          type: 'object',
        },
        opacity: {
          $ref: '#/definitions/Opacity',
        },
        stroke: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            dasharray: {
              $ref: '#/definitions/DashArray',
            },
            dashoffset: {
              $ref: '#/definitions/DashOffset',
            },
            linecap: {
              enum: ['butt', 'square', 'round'],
              type: 'string',
            },
            linejoin: {
              enum: ['miter', 'round', 'bevel'],
              type: 'string',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            width: {
              $ref: '#/definitions/ViewportCoordinate',
            },
          },
          type: 'object',
        },
        transform: {
          $ref: '#/definitions/Transform',
        },
        transformOrigin: {
          $ref: '#/definitions/TransformOrigin',
        },
      },
      required: ['d', 'element'],
      type: 'object',
    },
    PlopdownShapePolygon: {
      additionalProperties: false,
      properties: {
        element: {
          enum: ['polygon'],
          type: 'string',
        },
        fill: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            rule: {
              enum: ['nonzero', 'evenodd'],
              type: 'string',
            },
          },
          type: 'object',
        },
        opacity: {
          $ref: '#/definitions/Opacity',
        },
        points: {
          $ref: '#/definitions/ViewportCoordinatePairs',
        },
        stroke: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            dasharray: {
              $ref: '#/definitions/DashArray',
            },
            dashoffset: {
              $ref: '#/definitions/DashOffset',
            },
            linecap: {
              enum: ['butt', 'square', 'round'],
              type: 'string',
            },
            linejoin: {
              enum: ['miter', 'round', 'bevel'],
              type: 'string',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            width: {
              $ref: '#/definitions/ViewportCoordinate',
            },
          },
          type: 'object',
        },
        transform: {
          $ref: '#/definitions/Transform',
        },
        transformOrigin: {
          $ref: '#/definitions/TransformOrigin',
        },
      },
      required: ['element', 'points'],
      type: 'object',
    },
    PlopdownShapePolyline: {
      additionalProperties: false,
      properties: {
        element: {
          enum: ['polyline'],
          type: 'string',
        },
        fill: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            rule: {
              enum: ['nonzero', 'evenodd'],
              type: 'string',
            },
          },
          type: 'object',
        },
        opacity: {
          $ref: '#/definitions/Opacity',
        },
        points: {
          $ref: '#/definitions/ViewportCoordinatePairs',
        },
        stroke: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            dasharray: {
              $ref: '#/definitions/DashArray',
            },
            dashoffset: {
              $ref: '#/definitions/DashOffset',
            },
            linecap: {
              enum: ['butt', 'square', 'round'],
              type: 'string',
            },
            linejoin: {
              enum: ['miter', 'round', 'bevel'],
              type: 'string',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            width: {
              $ref: '#/definitions/ViewportCoordinate',
            },
          },
          type: 'object',
        },
        transform: {
          $ref: '#/definitions/Transform',
        },
        transformOrigin: {
          $ref: '#/definitions/TransformOrigin',
        },
      },
      required: ['element', 'points'],
      type: 'object',
    },
    PlopdownShapeRect: {
      additionalProperties: false,
      properties: {
        element: {
          enum: ['rect'],
          type: 'string',
        },
        fill: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            rule: {
              enum: ['nonzero', 'evenodd'],
              type: 'string',
            },
          },
          type: 'object',
        },
        height: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        opacity: {
          $ref: '#/definitions/Opacity',
        },
        rx: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        ry: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        stroke: {
          additionalProperties: false,
          properties: {
            color: {
              $ref: '#/definitions/Color',
            },
            dasharray: {
              $ref: '#/definitions/DashArray',
            },
            dashoffset: {
              $ref: '#/definitions/DashOffset',
            },
            linecap: {
              enum: ['butt', 'square', 'round'],
              type: 'string',
            },
            linejoin: {
              enum: ['miter', 'round', 'bevel'],
              type: 'string',
            },
            opacity: {
              $ref: '#/definitions/Opacity',
            },
            width: {
              $ref: '#/definitions/ViewportCoordinate',
            },
          },
          type: 'object',
        },
        transform: {
          $ref: '#/definitions/Transform',
        },
        transformOrigin: {
          $ref: '#/definitions/TransformOrigin',
        },
        width: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        x: {
          $ref: '#/definitions/ViewportCoordinate',
        },
        y: {
          $ref: '#/definitions/ViewportCoordinate',
        },
      },
      required: ['element', 'height', 'width', 'x', 'y'],
      type: 'object',
    },
    PlopdownTemplate: {
      anyOf: [
        {
          $ref: '#/definitions/PlopdownInfo',
        },
        {
          $ref: '#/definitions/PlopdownPlop',
        },
        {
          $ref: '#/definitions/PlopdownAudio',
        },
        {
          $ref: '#/definitions/PlopdownShape',
        },
      ],
    },
    SkipAudio: {
      additionalProperties: false,
      properties: {
        endTime: {
          type: 'number',
        },
        startTime: {
          type: 'number',
        },
        type: {
          enum: ['SKIP'],
          type: 'string',
        },
      },
      required: ['type', 'startTime', 'endTime'],
      type: 'object',
    },
    StillAudio: {
      additionalProperties: false,
      properties: {
        duration: {
          type: 'number',
        },
        startTime: {
          type: 'number',
        },
        type: {
          enum: ['STILL'],
          type: 'string',
        },
      },
      required: ['type', 'startTime', 'duration'],
      type: 'object',
    },
    Title: {
      description: 'A short statement.',
      maxLength: 256,
      minLength: 2,
      type: 'string',
    },
    Transform: {
      description: 'A short css transform string.',
      maxLength: 128,
      minLength: 2,
      type: 'string',
    },
    TransformOrigin: {
      description: 'A transform origin string.',
      maxLength: 128,
      minLength: 2,
      type: 'string',
    },
    URIReference: {
      description: 'The location of a file.',
      format: 'uri-reference',
      type: 'string',
    },
    ViewBox: {
      description: 'An svg viewbox in the form of "0 0 100 100"',
      pattern: '^([0-9]+\\s){3}[0-9]+$',
      type: 'string',
    },
    ViewportCoordinate: {
      description: 'An integer representing the dash offset of a stroke.',
      minimum: 0,
      type: 'number',
    },
    ViewportCoordinatePairs: {
      description: 'A dash array in the form of "2 3 4"',
      pattern: '^((-?[0-9]+),(-?[0-9]+)\\s)+(-?[0-9]+),(-?[0-9]+)$',
      type: 'string',
    },
    ViewportPath: {
      description: 'The "d" parameter of an svg path.',
      maxLength: 1024,
      minLength: 2,
      type: 'string',
    },
  },
  description:
    'File containing an exported plopdown video reference and track.',
  properties: {
    cues: {
      description: 'The cues associated with this track.',
      items: {
        $ref: '#/definitions/Cue',
      },
      type: 'array',
    },
    files: {
      items: {
        type: 'string',
      },
      type: 'array',
    },
    headers: {
      additionalProperties: false,
      description:
        'Unofficially, WebVTT supports simple key/value storage at the top\nof the file. We use that to allow creators to hint which video the\nplopdown should be overlayed to, as well as other authorship info.',
      properties: {
        authors: {
          description: 'Author names in whatever form makes sense',
          type: 'string',
        },
        created: {
          description: 'The date in which this track was created.',
          type: 'string',
        },
        for: {
          description: 'Name of the video this track was intended for.',
          type: 'string',
        },
        language: {
          description:
            'Language of the track in "en-US" format\nSee: https://gist.github.com/ndbroadbent/588fefab8e0f1b459fcec8181b41b39c',
          type: 'string',
        },
        license: {
          description: 'Capitalized license associated with this file',
          type: 'string',
        },
        origin: {
          type: 'string',
        },
        path: {
          type: ['string', 'null'],
        },
        search: {
          type: ['string', 'null'],
        },
        thumbnail: {
          description:
            'The thumbnail image of the track, usually packaged alongside\nthe track or fetched remotely.',
          type: 'string',
        },
        title: {
          description: 'Name of the plopdown',
          type: 'string',
        },
        type: {
          description: 'Schema version number',
          enum: ['plopdown_v1'],
          type: 'string',
        },
        updated: {
          description: 'The date in which this track was last updated.',
          type: 'string',
        },
        url: {
          description: "URL of this track's homepage.",
          type: 'string',
        },
        xpath: {
          type: 'string',
        },
      },
      required: ['type', 'title', 'for', 'created'],
      type: 'object',
    },
  },
  required: ['headers', 'cues'],
  type: 'object',
};
validate.errors = null;
module.exports = validate;
