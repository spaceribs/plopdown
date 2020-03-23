'use strict';
var formats = require('ajv/lib/compile/formats')();
var equal = require('ajv/lib/compile/equal');
var validate = (function() {
  var pattern0 = new RegExp(
    '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
  );
  var refVal = [];
  var refVal1 = {
    type: 'object',
    additionalProperties: false,
    description: 'Information card displayed on the top left.',
    required: ['type', 'title', 'authors'],
    properties: {
      type: {
        type: 'string',
        const: 'INFO'
      },
      title: {
        type: 'string'
      },
      url: {
        type: 'string',
        format: 'uri'
      },
      authors: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  };
  refVal[1] = refVal1;
  var refVal2 = (function() {
    var pattern0 = new RegExp(
      '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
    );
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
              key0 == 'type' ||
              key0 == 'top' ||
              key0 == 'left' ||
              key0 == 'width' ||
              key0 == 'desc' ||
              key0 == 'icons'
            );
            if (isAdditional0) {
              valid1 = false;
              validate.errors = [
                {
                  keyword: 'additionalProperties',
                  dataPath: (dataPath || '') + '',
                  schemaPath: '#/additionalProperties',
                  params: {
                    additionalProperty: '' + key0 + ''
                  },
                  message: 'should NOT have additional properties'
                }
              ];
              return false;
              break;
            }
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
                    missingProperty: 'type'
                  },
                  message: "should have required property 'type'"
                }
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
                      type: 'string'
                    },
                    message: 'should be string'
                  }
                ];
                return false;
              }
              var schema1 = validate.schema.properties.type.const;
              var valid1 = equal(data1, schema1);
              if (!valid1) {
                validate.errors = [
                  {
                    keyword: 'const',
                    dataPath: (dataPath || '') + '.type',
                    schemaPath: '#/properties/type/const',
                    params: {
                      allowedValue: schema1
                    },
                    message: 'should be equal to constant'
                  }
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
                      missingProperty: 'top'
                    },
                    message: "should have required property 'top'"
                  }
                ];
                return false;
              } else {
                var errs_1 = errors;
                var errs_2 = errors;
                if (typeof data1 === 'number') {
                  if (data1 > 100 || data1 !== data1) {
                    validate.errors = [
                      {
                        keyword: 'maximum',
                        dataPath: (dataPath || '') + '.top',
                        schemaPath: '#/definitions/percentage/maximum',
                        params: {
                          comparison: '<=',
                          limit: 100,
                          exclusive: false
                        },
                        message: 'should be <= 100'
                      }
                    ];
                    return false;
                  } else {
                    if (data1 < 0 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'minimum',
                          dataPath: (dataPath || '') + '.top',
                          schemaPath: '#/definitions/percentage/minimum',
                          params: {
                            comparison: '>=',
                            limit: 0,
                            exclusive: false
                          },
                          message: 'should be >= 0'
                        }
                      ];
                      return false;
                    }
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.top',
                      schemaPath: '#/definitions/percentage/type',
                      params: {
                        type: 'number'
                      },
                      message: 'should be number'
                    }
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
                        missingProperty: 'left'
                      },
                      message: "should have required property 'left'"
                    }
                  ];
                  return false;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if (typeof data1 === 'number') {
                    if (data1 > 100 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'maximum',
                          dataPath: (dataPath || '') + '.left',
                          schemaPath: '#/definitions/percentage/maximum',
                          params: {
                            comparison: '<=',
                            limit: 100,
                            exclusive: false
                          },
                          message: 'should be <= 100'
                        }
                      ];
                      return false;
                    } else {
                      if (data1 < 0 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'minimum',
                            dataPath: (dataPath || '') + '.left',
                            schemaPath: '#/definitions/percentage/minimum',
                            params: {
                              comparison: '>=',
                              limit: 0,
                              exclusive: false
                            },
                            message: 'should be >= 0'
                          }
                        ];
                        return false;
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.left',
                        schemaPath: '#/definitions/percentage/type',
                        params: {
                          type: 'number'
                        },
                        message: 'should be number'
                      }
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
                          missingProperty: 'width'
                        },
                        message: "should have required property 'width'"
                      }
                    ];
                    return false;
                  } else {
                    var errs_1 = errors;
                    var errs_2 = errors;
                    if (typeof data1 === 'number') {
                      if (data1 > 100 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'maximum',
                            dataPath: (dataPath || '') + '.width',
                            schemaPath: '#/definitions/percentage/maximum',
                            params: {
                              comparison: '<=',
                              limit: 100,
                              exclusive: false
                            },
                            message: 'should be <= 100'
                          }
                        ];
                        return false;
                      } else {
                        if (data1 < 0 || data1 !== data1) {
                          validate.errors = [
                            {
                              keyword: 'minimum',
                              dataPath: (dataPath || '') + '.width',
                              schemaPath: '#/definitions/percentage/minimum',
                              params: {
                                comparison: '>=',
                                limit: 0,
                                exclusive: false
                              },
                              message: 'should be >= 0'
                            }
                          ];
                          return false;
                        }
                      }
                    } else {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.width',
                          schemaPath: '#/definitions/percentage/type',
                          params: {
                            type: 'number'
                          },
                          message: 'should be number'
                        }
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                    var valid1 = errors === errs_1;
                  }
                  if (valid1) {
                    if (data.desc === undefined) {
                      valid1 = false;
                      validate.errors = [
                        {
                          keyword: 'required',
                          dataPath: (dataPath || '') + '',
                          schemaPath: '#/required',
                          params: {
                            missingProperty: 'desc'
                          },
                          message: "should have required property 'desc'"
                        }
                      ];
                      return false;
                    } else {
                      var errs_1 = errors;
                      if (typeof data.desc !== 'string') {
                        validate.errors = [
                          {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.desc',
                            schemaPath: '#/properties/desc/type',
                            params: {
                              type: 'string'
                            },
                            message: 'should be string'
                          }
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
                              missingProperty: 'icons'
                            },
                            message: "should have required property 'icons'"
                          }
                        ];
                        return false;
                      } else {
                        var errs_1 = errors;
                        if (Array.isArray(data1)) {
                          var errs__1 = errors;
                          var valid1;
                          valid2 = true;
                          if (data1.length > 0) {
                            var errs_2 = errors;
                            if (
                              !refVal4(
                                data1[0],
                                (dataPath || '') + '.icons[' + 0 + ']',
                                data1,
                                0,
                                rootData
                              )
                            ) {
                              if (vErrors === null) vErrors = refVal4.errors;
                              else vErrors = vErrors.concat(refVal4.errors);
                              errors = vErrors.length;
                            }
                            var valid2 = errors === errs_2;
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.icons',
                              schemaPath: '#/properties/icons/type',
                              params: {
                                type: 'array'
                              },
                              message: 'should be array'
                            }
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
          }
        }
      } else {
        validate.errors = [
          {
            keyword: 'type',
            dataPath: (dataPath || '') + '',
            schemaPath: '#/type',
            params: {
              type: 'object'
            },
            message: 'should be object'
          }
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal2.schema = {
    type: 'object',
    additionalProperties: false,
    description: 'A simple plopdown annotation with text and an icon.',
    required: ['type', 'top', 'left', 'width', 'desc', 'icons'],
    properties: {
      type: {
        type: 'string',
        const: 'PLOP'
      },
      top: {
        $ref: '#/definitions/percentage'
      },
      left: {
        $ref: '#/definitions/percentage'
      },
      width: {
        $ref: '#/definitions/percentage'
      },
      desc: {
        type: 'string'
      },
      icons: {
        type: 'array',
        items: [
          {
            $ref: '#/definitions/icon'
          }
        ]
      }
    }
  };
  refVal2.errors = null;
  refVal[2] = refVal2;
  var refVal3 = {
    type: 'number',
    minimum: 0,
    maximum: 100
  };
  refVal[3] = refVal3;
  var refVal4 = (function() {
    var pattern0 = new RegExp(
      '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
    );
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
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(
            false ||
            key0 == 'top' ||
            key0 == 'left' ||
            key0 == 'size' ||
            key0 == 'rotate' ||
            key0 == 'emoji'
          );
          if (isAdditional0) {
            valid1 = false;
            validate.errors = [
              {
                keyword: 'additionalProperties',
                dataPath: (dataPath || '') + '',
                schemaPath: '#/additionalProperties',
                params: {
                  additionalProperty: '' + key0 + ''
                },
                message: 'should NOT have additional properties'
              }
            ];
            return false;
            break;
          }
        }
        if (valid1) {
          var data1 = data.top;
          if (data1 === undefined) {
            valid1 = true;
          } else {
            var errs_1 = errors;
            var errs_2 = errors;
            if (typeof data1 === 'number') {
              if (data1 > 100 || data1 !== data1) {
                validate.errors = [
                  {
                    keyword: 'maximum',
                    dataPath: (dataPath || '') + '.top',
                    schemaPath: '#/definitions/percentage/maximum',
                    params: {
                      comparison: '<=',
                      limit: 100,
                      exclusive: false
                    },
                    message: 'should be <= 100'
                  }
                ];
                return false;
              } else {
                if (data1 < 0 || data1 !== data1) {
                  validate.errors = [
                    {
                      keyword: 'minimum',
                      dataPath: (dataPath || '') + '.top',
                      schemaPath: '#/definitions/percentage/minimum',
                      params: {
                        comparison: '>=',
                        limit: 0,
                        exclusive: false
                      },
                      message: 'should be >= 0'
                    }
                  ];
                  return false;
                }
              }
            } else {
              validate.errors = [
                {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.top',
                  schemaPath: '#/definitions/percentage/type',
                  params: {
                    type: 'number'
                  },
                  message: 'should be number'
                }
              ];
              return false;
            }
            var valid2 = errors === errs_2;
            var valid1 = errors === errs_1;
          }
          if (valid1) {
            var data1 = data.left;
            if (data1 === undefined) {
              valid1 = true;
            } else {
              var errs_1 = errors;
              var errs_2 = errors;
              if (typeof data1 === 'number') {
                if (data1 > 100 || data1 !== data1) {
                  validate.errors = [
                    {
                      keyword: 'maximum',
                      dataPath: (dataPath || '') + '.left',
                      schemaPath: '#/definitions/percentage/maximum',
                      params: {
                        comparison: '<=',
                        limit: 100,
                        exclusive: false
                      },
                      message: 'should be <= 100'
                    }
                  ];
                  return false;
                } else {
                  if (data1 < 0 || data1 !== data1) {
                    validate.errors = [
                      {
                        keyword: 'minimum',
                        dataPath: (dataPath || '') + '.left',
                        schemaPath: '#/definitions/percentage/minimum',
                        params: {
                          comparison: '>=',
                          limit: 0,
                          exclusive: false
                        },
                        message: 'should be >= 0'
                      }
                    ];
                    return false;
                  }
                }
              } else {
                validate.errors = [
                  {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.left',
                    schemaPath: '#/definitions/percentage/type',
                    params: {
                      type: 'number'
                    },
                    message: 'should be number'
                  }
                ];
                return false;
              }
              var valid2 = errors === errs_2;
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.size;
              if (data1 === undefined) {
                valid1 = true;
              } else {
                var errs_1 = errors;
                if (typeof data1 === 'number') {
                  if (data1 > 500 || data1 !== data1) {
                    validate.errors = [
                      {
                        keyword: 'maximum',
                        dataPath: (dataPath || '') + '.size',
                        schemaPath: '#/properties/size/maximum',
                        params: {
                          comparison: '<=',
                          limit: 500,
                          exclusive: false
                        },
                        message: 'should be <= 500'
                      }
                    ];
                    return false;
                  } else {
                    if (data1 < 0 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'minimum',
                          dataPath: (dataPath || '') + '.size',
                          schemaPath: '#/properties/size/minimum',
                          params: {
                            comparison: '>=',
                            limit: 0,
                            exclusive: false
                          },
                          message: 'should be >= 0'
                        }
                      ];
                      return false;
                    }
                  }
                } else {
                  validate.errors = [
                    {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.size',
                      schemaPath: '#/properties/size/type',
                      params: {
                        type: 'number'
                      },
                      message: 'should be number'
                    }
                  ];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                var data1 = data.rotate;
                if (data1 === undefined) {
                  valid1 = true;
                } else {
                  var errs_1 = errors;
                  var errs_2 = errors;
                  if (typeof data1 === 'number') {
                    if (data1 > 360 || data1 !== data1) {
                      validate.errors = [
                        {
                          keyword: 'maximum',
                          dataPath: (dataPath || '') + '.rotate',
                          schemaPath: '#/definitions/degree/maximum',
                          params: {
                            comparison: '<=',
                            limit: 360,
                            exclusive: false
                          },
                          message: 'should be <= 360'
                        }
                      ];
                      return false;
                    } else {
                      if (data1 < 0 || data1 !== data1) {
                        validate.errors = [
                          {
                            keyword: 'minimum',
                            dataPath: (dataPath || '') + '.rotate',
                            schemaPath: '#/definitions/degree/minimum',
                            params: {
                              comparison: '>=',
                              limit: 0,
                              exclusive: false
                            },
                            message: 'should be >= 0'
                          }
                        ];
                        return false;
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.rotate',
                        schemaPath: '#/definitions/degree/type',
                        params: {
                          type: 'number'
                        },
                        message: 'should be number'
                      }
                    ];
                    return false;
                  }
                  var valid2 = errors === errs_2;
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  if (data.emoji === undefined) {
                    valid1 = true;
                  } else {
                    var errs_1 = errors;
                    if (typeof data.emoji !== 'string') {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.emoji',
                          schemaPath: '#/properties/emoji/type',
                          params: {
                            type: 'string'
                          },
                          message: 'should be string'
                        }
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
              type: 'object'
            },
            message: 'should be object'
          }
        ];
        return false;
      }
      validate.errors = vErrors;
      return errors === 0;
    };
  })();
  refVal4.schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      top: {
        $ref: '#/definitions/percentage'
      },
      left: {
        $ref: '#/definitions/percentage'
      },
      size: {
        type: 'number',
        minimum: 0,
        maximum: 500
      },
      rotate: {
        $ref: '#/definitions/degree'
      },
      emoji: {
        type: 'string'
      }
    }
  };
  refVal4.errors = null;
  refVal[4] = refVal4;
  var refVal5 = {
    type: 'number',
    minimum: 0,
    maximum: 360
  };
  refVal[5] = refVal5;
  return function validate(
    data,
    dataPath,
    parentData,
    parentDataProperty,
    rootData
  ) {
    'use strict' /*# sourceURL=plopdown_v1 */;
    var vErrors = null;
    var errors = 0;
    if (rootData === undefined) rootData = data;
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      if (true) {
        var errs__0 = errors;
        var valid1 = true;
        for (var key0 in data) {
          var isAdditional0 = !(false || key0 == 'headers' || key0 == 'cues');
          if (isAdditional0) {
            valid1 = false;
            validate.errors = [
              {
                keyword: 'additionalProperties',
                dataPath: (dataPath || '') + '',
                schemaPath: '#/additionalProperties',
                params: {
                  additionalProperty: '' + key0 + ''
                },
                message: 'should NOT have additional properties'
              }
            ];
            return false;
            break;
          }
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
                  missingProperty: 'headers'
                },
                message: "should have required property 'headers'"
              }
            ];
            return false;
          } else {
            var errs_1 = errors;
            if (data1 && typeof data1 === 'object' && !Array.isArray(data1)) {
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
                        schemaPath: '#/properties/headers/additionalProperties',
                        params: {
                          additionalProperty: '' + key1 + ''
                        },
                        message: 'should NOT have additional properties'
                      }
                    ];
                    return false;
                    break;
                  }
                }
                if (valid2) {
                  var data2 = data1.type;
                  if (data2 === undefined) {
                    valid2 = false;
                    validate.errors = [
                      {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '.headers',
                        schemaPath: '#/properties/headers/required',
                        params: {
                          missingProperty: 'type'
                        },
                        message: "should have required property 'type'"
                      }
                    ];
                    return false;
                  } else {
                    var errs_2 = errors;
                    if (typeof data2 !== 'string') {
                      validate.errors = [
                        {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.headers.type',
                          schemaPath:
                            '#/properties/headers/properties/type/type',
                          params: {
                            type: 'string'
                          },
                          message: 'should be string'
                        }
                      ];
                      return false;
                    }
                    var schema2 =
                      validate.schema.properties.headers.properties.type.const;
                    var valid2 = equal(data2, schema2);
                    if (!valid2) {
                      validate.errors = [
                        {
                          keyword: 'const',
                          dataPath: (dataPath || '') + '.headers.type',
                          schemaPath:
                            '#/properties/headers/properties/type/const',
                          params: {
                            allowedValue: schema2
                          },
                          message: 'should be equal to constant'
                        }
                      ];
                      return false;
                    }
                    var valid2 = errors === errs_2;
                  }
                  if (valid2) {
                    var data2 = data1.id;
                    if (data2 === undefined) {
                      valid2 = false;
                      validate.errors = [
                        {
                          keyword: 'required',
                          dataPath: (dataPath || '') + '.headers',
                          schemaPath: '#/properties/headers/required',
                          params: {
                            missingProperty: 'id'
                          },
                          message: "should have required property 'id'"
                        }
                      ];
                      return false;
                    } else {
                      var errs_2 = errors;
                      if (errors === errs_2) {
                        if (typeof data2 === 'string') {
                          if (!pattern0.test(data2)) {
                            validate.errors = [
                              {
                                keyword: 'pattern',
                                dataPath: (dataPath || '') + '.headers.id',
                                schemaPath:
                                  '#/properties/headers/properties/id/pattern',
                                params: {
                                  pattern:
                                    '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
                                },
                                message:
                                  'should match pattern "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"'
                              }
                            ];
                            return false;
                          } else {
                            if (!formats.uuid.test(data2)) {
                              validate.errors = [
                                {
                                  keyword: 'format',
                                  dataPath: (dataPath || '') + '.headers.id',
                                  schemaPath:
                                    '#/properties/headers/properties/id/format',
                                  params: {
                                    format: 'uuid'
                                  },
                                  message: 'should match format "uuid"'
                                }
                              ];
                              return false;
                            }
                          }
                        } else {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.headers.id',
                              schemaPath:
                                '#/properties/headers/properties/id/type',
                              params: {
                                type: 'string'
                              },
                              message: 'should be string'
                            }
                          ];
                          return false;
                        }
                      }
                      var valid2 = errors === errs_2;
                    }
                    if (valid2) {
                      if (data1.title === undefined) {
                        valid2 = false;
                        validate.errors = [
                          {
                            keyword: 'required',
                            dataPath: (dataPath || '') + '.headers',
                            schemaPath: '#/properties/headers/required',
                            params: {
                              missingProperty: 'title'
                            },
                            message: "should have required property 'title'"
                          }
                        ];
                        return false;
                      } else {
                        var errs_2 = errors;
                        if (typeof data1.title !== 'string') {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath: (dataPath || '') + '.headers.title',
                              schemaPath:
                                '#/properties/headers/properties/title/type',
                              params: {
                                type: 'string'
                              },
                              message: 'should be string'
                            }
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
                                missingProperty: 'for'
                              },
                              message: "should have required property 'for'"
                            }
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
                                  type: 'string'
                                },
                                message: 'should be string'
                              }
                            ];
                            return false;
                          }
                          var valid2 = errors === errs_2;
                        }
                        if (valid2) {
                          var data2 = data1.url;
                          if (data2 === undefined) {
                            valid2 = true;
                          } else {
                            var errs_2 = errors;
                            if (errors === errs_2) {
                              if (typeof data2 === 'string') {
                                if (!formats.uri.test(data2)) {
                                  validate.errors = [
                                    {
                                      keyword: 'format',
                                      dataPath:
                                        (dataPath || '') + '.headers.url',
                                      schemaPath:
                                        '#/properties/headers/properties/url/format',
                                      params: {
                                        format: 'uri'
                                      },
                                      message: 'should match format "uri"'
                                    }
                                  ];
                                  return false;
                                }
                              } else {
                                validate.errors = [
                                  {
                                    keyword: 'type',
                                    dataPath: (dataPath || '') + '.headers.url',
                                    schemaPath:
                                      '#/properties/headers/properties/url/type',
                                    params: {
                                      type: 'string'
                                    },
                                    message: 'should be string'
                                  }
                                ];
                                return false;
                              }
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
                                      type: 'string'
                                    },
                                    message: 'should be string'
                                  }
                                ];
                                return false;
                              }
                              var valid2 = errors === errs_2;
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
                                      dataPath:
                                        (dataPath || '') + '.headers.authors',
                                      schemaPath:
                                        '#/properties/headers/properties/authors/type',
                                      params: {
                                        type: 'string'
                                      },
                                      message: 'should be string'
                                    }
                                  ];
                                  return false;
                                }
                                var valid2 = errors === errs_2;
                              }
                              if (valid2) {
                                var data2 = data1.created;
                                if (data2 === undefined) {
                                  valid2 = false;
                                  validate.errors = [
                                    {
                                      keyword: 'required',
                                      dataPath: (dataPath || '') + '.headers',
                                      schemaPath:
                                        '#/properties/headers/required',
                                      params: {
                                        missingProperty: 'created'
                                      },
                                      message:
                                        "should have required property 'created'"
                                    }
                                  ];
                                  return false;
                                } else {
                                  var errs_2 = errors;
                                  if (errors === errs_2) {
                                    if (typeof data2 === 'string') {
                                      if (!formats['date-time'].test(data2)) {
                                        validate.errors = [
                                          {
                                            keyword: 'format',
                                            dataPath:
                                              (dataPath || '') +
                                              '.headers.created',
                                            schemaPath:
                                              '#/properties/headers/properties/created/format',
                                            params: {
                                              format: 'date-time'
                                            },
                                            message:
                                              'should match format "date-time"'
                                          }
                                        ];
                                        return false;
                                      }
                                    } else {
                                      validate.errors = [
                                        {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') +
                                            '.headers.created',
                                          schemaPath:
                                            '#/properties/headers/properties/created/type',
                                          params: {
                                            type: 'string'
                                          },
                                          message: 'should be string'
                                        }
                                      ];
                                      return false;
                                    }
                                  }
                                  var valid2 = errors === errs_2;
                                }
                                if (valid2) {
                                  var data2 = data1.updated;
                                  if (data2 === undefined) {
                                    valid2 = true;
                                  } else {
                                    var errs_2 = errors;
                                    if (errors === errs_2) {
                                      if (typeof data2 === 'string') {
                                        if (!formats['date-time'].test(data2)) {
                                          validate.errors = [
                                            {
                                              keyword: 'format',
                                              dataPath:
                                                (dataPath || '') +
                                                '.headers.updated',
                                              schemaPath:
                                                '#/properties/headers/properties/updated/format',
                                              params: {
                                                format: 'date-time'
                                              },
                                              message:
                                                'should match format "date-time"'
                                            }
                                          ];
                                          return false;
                                        }
                                      } else {
                                        validate.errors = [
                                          {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.headers.updated',
                                            schemaPath:
                                              '#/properties/headers/properties/updated/type',
                                            params: {
                                              type: 'string'
                                            },
                                            message: 'should be string'
                                          }
                                        ];
                                        return false;
                                      }
                                    }
                                    var valid2 = errors === errs_2;
                                  }
                                  if (valid2) {
                                    var data2 = data1.origin;
                                    if (data2 === undefined) {
                                      valid2 = true;
                                    } else {
                                      var errs_2 = errors;
                                      if (errors === errs_2) {
                                        if (typeof data2 === 'string') {
                                          if (!formats.uri.test(data2)) {
                                            validate.errors = [
                                              {
                                                keyword: 'format',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.headers.origin',
                                                schemaPath:
                                                  '#/properties/headers/properties/origin/format',
                                                params: {
                                                  format: 'uri'
                                                },
                                                message:
                                                  'should match format "uri"'
                                              }
                                            ];
                                            return false;
                                          }
                                        } else {
                                          validate.errors = [
                                            {
                                              keyword: 'type',
                                              dataPath:
                                                (dataPath || '') +
                                                '.headers.origin',
                                              schemaPath:
                                                '#/properties/headers/properties/origin/type',
                                              params: {
                                                type: 'string'
                                              },
                                              message: 'should be string'
                                            }
                                          ];
                                          return false;
                                        }
                                      }
                                      var valid2 = errors === errs_2;
                                    }
                                    if (valid2) {
                                      var data2 = data1.path;
                                      if (data2 === undefined) {
                                        valid2 = true;
                                      } else {
                                        var errs_2 = errors;
                                        if (errors === errs_2) {
                                          if (typeof data2 === 'string') {
                                            if (
                                              !formats['uri-reference'].test(
                                                data2
                                              )
                                            ) {
                                              validate.errors = [
                                                {
                                                  keyword: 'format',
                                                  dataPath:
                                                    (dataPath || '') +
                                                    '.headers.path',
                                                  schemaPath:
                                                    '#/properties/headers/properties/path/format',
                                                  params: {
                                                    format: 'uri-reference'
                                                  },
                                                  message:
                                                    'should match format "uri-reference"'
                                                }
                                              ];
                                              return false;
                                            }
                                          } else {
                                            validate.errors = [
                                              {
                                                keyword: 'type',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.headers.path',
                                                schemaPath:
                                                  '#/properties/headers/properties/path/type',
                                                params: {
                                                  type: 'string'
                                                },
                                                message: 'should be string'
                                              }
                                            ];
                                            return false;
                                          }
                                        }
                                        var valid2 = errors === errs_2;
                                      }
                                      if (valid2) {
                                        var data2 = data1.search;
                                        if (data2 === undefined) {
                                          valid2 = true;
                                        } else {
                                          var errs_2 = errors;
                                          if (errors === errs_2) {
                                            if (typeof data2 === 'string') {
                                              if (
                                                !formats['uri-reference'].test(
                                                  data2
                                                )
                                              ) {
                                                validate.errors = [
                                                  {
                                                    keyword: 'format',
                                                    dataPath:
                                                      (dataPath || '') +
                                                      '.headers.search',
                                                    schemaPath:
                                                      '#/properties/headers/properties/search/format',
                                                    params: {
                                                      format: 'uri-reference'
                                                    },
                                                    message:
                                                      'should match format "uri-reference"'
                                                  }
                                                ];
                                                return false;
                                              }
                                            } else {
                                              validate.errors = [
                                                {
                                                  keyword: 'type',
                                                  dataPath:
                                                    (dataPath || '') +
                                                    '.headers.search',
                                                  schemaPath:
                                                    '#/properties/headers/properties/search/type',
                                                  params: {
                                                    type: 'string'
                                                  },
                                                  message: 'should be string'
                                                }
                                              ];
                                              return false;
                                            }
                                          }
                                          var valid2 = errors === errs_2;
                                        }
                                        if (valid2) {
                                          if (data1.xpath === undefined) {
                                            valid2 = true;
                                          } else {
                                            var errs_2 = errors;
                                            if (
                                              typeof data1.xpath !== 'string'
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
                                                    type: 'string'
                                                  },
                                                  message: 'should be string'
                                                }
                                              ];
                                              return false;
                                            }
                                            var valid2 = errors === errs_2;
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
                    type: 'object'
                  },
                  message: 'should be object'
                }
              ];
              return false;
            }
            var valid1 = errors === errs_1;
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
                    missingProperty: 'cues'
                  },
                  message: "should have required property 'cues'"
                }
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
                      if (data2.id === undefined) {
                        valid3 = true;
                      } else {
                        var errs_3 = errors;
                        if (typeof data2.id !== 'string') {
                          validate.errors = [
                            {
                              keyword: 'type',
                              dataPath:
                                (dataPath || '') + '.cues[' + i1 + '].id',
                              schemaPath:
                                '#/properties/cues/items/properties/id/type',
                              params: {
                                type: 'string'
                              },
                              message: 'should be string'
                            }
                          ];
                          return false;
                        }
                        var valid3 = errors === errs_3;
                      }
                      if (valid3) {
                        if (data2.startTime === undefined) {
                          valid3 = false;
                          validate.errors = [
                            {
                              keyword: 'required',
                              dataPath: (dataPath || '') + '.cues[' + i1 + ']',
                              schemaPath: '#/properties/cues/items/required',
                              params: {
                                missingProperty: 'startTime'
                              },
                              message:
                                "should have required property 'startTime'"
                            }
                          ];
                          return false;
                        } else {
                          var errs_3 = errors;
                          if (typeof data2.startTime !== 'number') {
                            validate.errors = [
                              {
                                keyword: 'type',
                                dataPath:
                                  (dataPath || '') +
                                  '.cues[' +
                                  i1 +
                                  '].startTime',
                                schemaPath:
                                  '#/properties/cues/items/properties/startTime/type',
                                params: {
                                  type: 'number'
                                },
                                message: 'should be number'
                              }
                            ];
                            return false;
                          }
                          var valid3 = errors === errs_3;
                        }
                        if (valid3) {
                          if (data2.endTime === undefined) {
                            valid3 = false;
                            validate.errors = [
                              {
                                keyword: 'required',
                                dataPath:
                                  (dataPath || '') + '.cues[' + i1 + ']',
                                schemaPath: '#/properties/cues/items/required',
                                params: {
                                  missingProperty: 'endTime'
                                },
                                message:
                                  "should have required property 'endTime'"
                              }
                            ];
                            return false;
                          } else {
                            var errs_3 = errors;
                            if (typeof data2.endTime !== 'number') {
                              validate.errors = [
                                {
                                  keyword: 'type',
                                  dataPath:
                                    (dataPath || '') +
                                    '.cues[' +
                                    i1 +
                                    '].endTime',
                                  schemaPath:
                                    '#/properties/cues/items/properties/endTime/type',
                                  params: {
                                    type: 'number'
                                  },
                                  message: 'should be number'
                                }
                              ];
                              return false;
                            }
                            var valid3 = errors === errs_3;
                          }
                          if (valid3) {
                            var data3 = data2.data;
                            if (data3 === undefined) {
                              valid3 = false;
                              validate.errors = [
                                {
                                  keyword: 'required',
                                  dataPath:
                                    (dataPath || '') + '.cues[' + i1 + ']',
                                  schemaPath:
                                    '#/properties/cues/items/required',
                                  params: {
                                    missingProperty: 'data'
                                  },
                                  message:
                                    "should have required property 'data'"
                                }
                              ];
                              return false;
                            } else {
                              var errs_3 = errors;
                              var errs__3 = errors,
                                prevValid3 = false,
                                valid3 = false,
                                passingSchemas3 = null;
                              var errs_4 = errors;
                              var errs_5 = errors;
                              if (
                                data3 &&
                                typeof data3 === 'object' &&
                                !Array.isArray(data3)
                              ) {
                                if (true) {
                                  var errs__5 = errors;
                                  var valid6 = true;
                                  for (var key5 in data3) {
                                    var isAdditional5 = !(
                                      false ||
                                      key5 == 'type' ||
                                      key5 == 'title' ||
                                      key5 == 'url' ||
                                      key5 == 'authors'
                                    );
                                    if (isAdditional5) {
                                      valid6 = false;
                                      var err = {
                                        keyword: 'additionalProperties',
                                        dataPath:
                                          (dataPath || '') +
                                          '.cues[' +
                                          i1 +
                                          '].data',
                                        schemaPath:
                                          '#/definitions/annotation-info/additionalProperties',
                                        params: {
                                          additionalProperty: '' + key5 + ''
                                        },
                                        message:
                                          'should NOT have additional properties'
                                      };
                                      if (vErrors === null) vErrors = [err];
                                      else vErrors.push(err);
                                      errors++;
                                      break;
                                    }
                                  }
                                  if (valid6) {
                                    var data4 = data3.type;
                                    if (data4 === undefined) {
                                      valid6 = false;
                                      var err = {
                                        keyword: 'required',
                                        dataPath:
                                          (dataPath || '') +
                                          '.cues[' +
                                          i1 +
                                          '].data',
                                        schemaPath:
                                          '#/definitions/annotation-info/required',
                                        params: {
                                          missingProperty: 'type'
                                        },
                                        message:
                                          "should have required property 'type'"
                                      };
                                      if (vErrors === null) vErrors = [err];
                                      else vErrors.push(err);
                                      errors++;
                                    } else {
                                      var errs_6 = errors;
                                      if (typeof data4 !== 'string') {
                                        var err = {
                                          keyword: 'type',
                                          dataPath:
                                            (dataPath || '') +
                                            '.cues[' +
                                            i1 +
                                            '].data.type',
                                          schemaPath:
                                            '#/definitions/annotation-info/properties/type/type',
                                          params: {
                                            type: 'string'
                                          },
                                          message: 'should be string'
                                        };
                                        if (vErrors === null) vErrors = [err];
                                        else vErrors.push(err);
                                        errors++;
                                      }
                                      var schema6 =
                                        refVal1.properties.type.const;
                                      var valid6 = equal(data4, schema6);
                                      if (!valid6) {
                                        var err = {
                                          keyword: 'const',
                                          dataPath:
                                            (dataPath || '') +
                                            '.cues[' +
                                            i1 +
                                            '].data.type',
                                          schemaPath:
                                            '#/definitions/annotation-info/properties/type/const',
                                          params: {
                                            allowedValue: schema6
                                          },
                                          message: 'should be equal to constant'
                                        };
                                        if (vErrors === null) vErrors = [err];
                                        else vErrors.push(err);
                                        errors++;
                                      }
                                      var valid6 = errors === errs_6;
                                    }
                                    if (valid6) {
                                      if (data3.title === undefined) {
                                        valid6 = false;
                                        var err = {
                                          keyword: 'required',
                                          dataPath:
                                            (dataPath || '') +
                                            '.cues[' +
                                            i1 +
                                            '].data',
                                          schemaPath:
                                            '#/definitions/annotation-info/required',
                                          params: {
                                            missingProperty: 'title'
                                          },
                                          message:
                                            "should have required property 'title'"
                                        };
                                        if (vErrors === null) vErrors = [err];
                                        else vErrors.push(err);
                                        errors++;
                                      } else {
                                        var errs_6 = errors;
                                        if (typeof data3.title !== 'string') {
                                          var err = {
                                            keyword: 'type',
                                            dataPath:
                                              (dataPath || '') +
                                              '.cues[' +
                                              i1 +
                                              '].data.title',
                                            schemaPath:
                                              '#/definitions/annotation-info/properties/title/type',
                                            params: {
                                              type: 'string'
                                            },
                                            message: 'should be string'
                                          };
                                          if (vErrors === null) vErrors = [err];
                                          else vErrors.push(err);
                                          errors++;
                                        }
                                        var valid6 = errors === errs_6;
                                      }
                                      if (valid6) {
                                        var data4 = data3.url;
                                        if (data4 === undefined) {
                                          valid6 = true;
                                        } else {
                                          var errs_6 = errors;
                                          if (errors === errs_6) {
                                            if (typeof data4 === 'string') {
                                              if (!formats.uri.test(data4)) {
                                                var err = {
                                                  keyword: 'format',
                                                  dataPath:
                                                    (dataPath || '') +
                                                    '.cues[' +
                                                    i1 +
                                                    '].data.url',
                                                  schemaPath:
                                                    '#/definitions/annotation-info/properties/url/format',
                                                  params: {
                                                    format: 'uri'
                                                  },
                                                  message:
                                                    'should match format "uri"'
                                                };
                                                if (vErrors === null)
                                                  vErrors = [err];
                                                else vErrors.push(err);
                                                errors++;
                                              }
                                            } else {
                                              var err = {
                                                keyword: 'type',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.cues[' +
                                                  i1 +
                                                  '].data.url',
                                                schemaPath:
                                                  '#/definitions/annotation-info/properties/url/type',
                                                params: {
                                                  type: 'string'
                                                },
                                                message: 'should be string'
                                              };
                                              if (vErrors === null)
                                                vErrors = [err];
                                              else vErrors.push(err);
                                              errors++;
                                            }
                                          }
                                          var valid6 = errors === errs_6;
                                        }
                                        if (valid6) {
                                          var data4 = data3.authors;
                                          if (data4 === undefined) {
                                            valid6 = false;
                                            var err = {
                                              keyword: 'required',
                                              dataPath:
                                                (dataPath || '') +
                                                '.cues[' +
                                                i1 +
                                                '].data',
                                              schemaPath:
                                                '#/definitions/annotation-info/required',
                                              params: {
                                                missingProperty: 'authors'
                                              },
                                              message:
                                                "should have required property 'authors'"
                                            };
                                            if (vErrors === null)
                                              vErrors = [err];
                                            else vErrors.push(err);
                                            errors++;
                                          } else {
                                            var errs_6 = errors;
                                            if (Array.isArray(data4)) {
                                              var errs__6 = errors;
                                              var valid6;
                                              for (
                                                var i6 = 0;
                                                i6 < data4.length;
                                                i6++
                                              ) {
                                                var errs_7 = errors;
                                                if (
                                                  typeof data4[i6] !== 'string'
                                                ) {
                                                  var err = {
                                                    keyword: 'type',
                                                    dataPath:
                                                      (dataPath || '') +
                                                      '.cues[' +
                                                      i1 +
                                                      '].data.authors[' +
                                                      i6 +
                                                      ']',
                                                    schemaPath:
                                                      '#/definitions/annotation-info/properties/authors/items/type',
                                                    params: {
                                                      type: 'string'
                                                    },
                                                    message: 'should be string'
                                                  };
                                                  if (vErrors === null)
                                                    vErrors = [err];
                                                  else vErrors.push(err);
                                                  errors++;
                                                }
                                                var valid7 = errors === errs_7;
                                                if (!valid7) break;
                                              }
                                            } else {
                                              var err = {
                                                keyword: 'type',
                                                dataPath:
                                                  (dataPath || '') +
                                                  '.cues[' +
                                                  i1 +
                                                  '].data.authors',
                                                schemaPath:
                                                  '#/definitions/annotation-info/properties/authors/type',
                                                params: {
                                                  type: 'array'
                                                },
                                                message: 'should be array'
                                              };
                                              if (vErrors === null)
                                                vErrors = [err];
                                              else vErrors.push(err);
                                              errors++;
                                            }
                                            var valid6 = errors === errs_6;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              } else {
                                var err = {
                                  keyword: 'type',
                                  dataPath:
                                    (dataPath || '') + '.cues[' + i1 + '].data',
                                  schemaPath:
                                    '#/definitions/annotation-info/type',
                                  params: {
                                    type: 'object'
                                  },
                                  message: 'should be object'
                                };
                                if (vErrors === null) vErrors = [err];
                                else vErrors.push(err);
                                errors++;
                              }
                              var valid5 = errors === errs_5;
                              var valid4 = errors === errs_4;
                              if (valid4) {
                                valid3 = prevValid3 = true;
                                passingSchemas3 = 0;
                              }
                              var errs_4 = errors;
                              if (
                                !refVal2(
                                  data3,
                                  (dataPath || '') + '.cues[' + i1 + '].data',
                                  data2,
                                  'data',
                                  rootData
                                )
                              ) {
                                if (vErrors === null) vErrors = refVal2.errors;
                                else vErrors = vErrors.concat(refVal2.errors);
                                errors = vErrors.length;
                              }
                              var valid4 = errors === errs_4;
                              if (valid4 && prevValid3) {
                                valid3 = false;
                                passingSchemas3 = [passingSchemas3, 1];
                              } else {
                                if (valid4) {
                                  valid3 = prevValid3 = true;
                                  passingSchemas3 = 1;
                                }
                              }
                              if (!valid3) {
                                var err = {
                                  keyword: 'oneOf',
                                  dataPath:
                                    (dataPath || '') + '.cues[' + i1 + '].data',
                                  schemaPath:
                                    '#/properties/cues/items/properties/data/oneOf',
                                  params: {
                                    passingSchemas: passingSchemas3
                                  },
                                  message:
                                    'should match exactly one schema in oneOf'
                                };
                                if (vErrors === null) vErrors = [err];
                                else vErrors.push(err);
                                errors++;
                                validate.errors = vErrors;
                                return false;
                              } else {
                                errors = errs__3;
                                if (vErrors !== null) {
                                  if (errs__3) vErrors.length = errs__3;
                                  else vErrors = null;
                                }
                              }
                              var valid3 = errors === errs_3;
                            }
                          }
                        }
                      }
                    }
                  } else {
                    validate.errors = [
                      {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.cues[' + i1 + ']',
                        schemaPath: '#/properties/cues/items/type',
                        params: {
                          type: 'object'
                        },
                        message: 'should be object'
                      }
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
                    dataPath: (dataPath || '') + '.cues',
                    schemaPath: '#/properties/cues/type',
                    params: {
                      type: 'array'
                    },
                    message: 'should be array'
                  }
                ];
                return false;
              }
              var valid1 = errors === errs_1;
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
            type: 'object'
          },
          message: 'should be object'
        }
      ];
      return false;
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  $id: 'plopdown_v1',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Plopdown File v1',
  type: 'object',
  additionalProperties: false,
  definitions: {
    percentage: {
      type: 'number',
      minimum: 0,
      maximum: 100
    },
    degree: {
      type: 'number',
      minimum: 0,
      maximum: 360
    },
    icon: {
      type: 'object',
      additionalProperties: false,
      properties: {
        top: {
          $ref: '#/definitions/percentage'
        },
        left: {
          $ref: '#/definitions/percentage'
        },
        size: {
          type: 'number',
          minimum: 0,
          maximum: 500
        },
        rotate: {
          $ref: '#/definitions/degree'
        },
        emoji: {
          type: 'string'
        }
      }
    },
    'annotation-info': {
      type: 'object',
      additionalProperties: false,
      description: 'Information card displayed on the top left.',
      required: ['type', 'title', 'authors'],
      properties: {
        type: {
          type: 'string',
          const: 'INFO'
        },
        title: {
          type: 'string'
        },
        url: {
          type: 'string',
          format: 'uri'
        },
        authors: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    },
    'annotation-plop': {
      type: 'object',
      additionalProperties: false,
      description: 'A simple plopdown annotation with text and an icon.',
      required: ['type', 'top', 'left', 'width', 'desc', 'icons'],
      properties: {
        type: {
          type: 'string',
          const: 'PLOP'
        },
        top: {
          $ref: '#/definitions/percentage'
        },
        left: {
          $ref: '#/definitions/percentage'
        },
        width: {
          $ref: '#/definitions/percentage'
        },
        desc: {
          type: 'string'
        },
        icons: {
          type: 'array',
          items: [
            {
              $ref: '#/definitions/icon'
            }
          ]
        }
      }
    }
  },
  required: ['headers', 'cues'],
  properties: {
    headers: {
      type: 'object',
      required: ['type', 'id', 'title', 'for', 'created'],
      additionalProperties: false,
      properties: {
        type: {
          type: 'string',
          const: 'plopdown_v1',
          description: 'The filetype and version number.'
        },
        id: {
          description:
            'The unique ID of the track. Needs to be in uuid_v4 format.',
          type: 'string',
          pattern:
            '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
          format: 'uuid'
        },
        title: {
          type: 'string',
          description: 'The human readable file title.'
        },
        for: {
          description: 'The title of the video this track is for.',
          type: 'string'
        },
        url: {
          description: 'The URL of the platform.',
          type: 'string',
          format: 'uri'
        },
        license: {
          description: 'The license terms for this track.',
          type: 'string'
        },
        authors: {
          description: 'The author or authors of this file.',
          type: 'string'
        },
        created: {
          description: 'The datetime the file was first created.',
          type: 'string',
          format: 'date-time'
        },
        updated: {
          description: 'The datetime the file was last updated.',
          type: 'string',
          format: 'date-time'
        },
        origin: {
          description: 'The location of the video to combine this file with.',
          type: 'string',
          format: 'uri'
        },
        path: {
          description: 'The absolute path to the associated video.',
          type: 'string',
          format: 'uri-reference'
        },
        search: {
          description:
            'The search query of the video this track is associated with.',
          type: 'string',
          format: 'uri-reference'
        },
        xpath: {
          description: 'The XPath of the video this track is associated with.',
          type: 'string'
        }
      }
    },
    cues: {
      description: 'The cues to annotate the video with.',
      type: 'array',
      items: {
        type: 'object',
        required: ['startTime', 'endTime', 'data'],
        properties: {
          id: {
            type: 'string'
          },
          startTime: {
            type: 'number'
          },
          endTime: {
            type: 'number'
          },
          data: {
            oneOf: [
              {
                $ref: '#/definitions/annotation-info'
              },
              {
                $ref: '#/definitions/annotation-plop'
              }
            ]
          }
        }
      }
    }
  }
};
validate.errors = null;
module.exports = validate;
