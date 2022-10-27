let qaAPIS;
export default qaAPIS =
    {
        "info": {
            "_postman_id": "140b4c7a-5f8a-48d5-ba68-70e8fe1a2c67",
            "name": "QA",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
            "_exporter_id": "23302792"
        },
        "item": [
            {
                "name": "Login",
                "item": [
                    {
                        "name": "SignIn",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"UserName Check\", function () {\r",
                                        "    pm.expect(jsonData.data.username).to.eql(pm.variables.get(\"username\"));\r",
                                        "});\r",
                                        "pm.environment.set(\"usernameqa\", jsonData.data.username);\r",
                                        "pm.environment.set(\"idTokendev\", jsonData.data.idToken);\r",
                                        "pm.environment.set(\"refreshTokenQA\", jsonData.data.refreshToken);\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var username=pm.environment.set(\"username\", \"jenkins-warmer\");\r",
                                        "var password=pm.environment.set(\"password\", \"Inverness$1\");\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"username\": {{username}},\r\n    \"password\": \"{{password}}\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/account/signin",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "account",
                                    "signin"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "RefreshToken",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"UserName Check\", function () {\r",
                                        "    pm.expect(jsonData.data.username).to.eql(pm.variables.get(\"username\"));\r",
                                        "});\r",
                                        "pm.environment.set(\"idTokend\", jsonData.data.idToken);\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"username\": {{usernameqa}},\r\n    \"refreshToken\": {{refreshTokenQA}}\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/account/refreshToken",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "account",
                                    "refreshToken"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "etl-definition.js",
                "item": [
                    {
                        "name": "CreateETLDefinition",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI0Mjg3NiwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNDY0NzYsImlhdCI6MTY0MDI0Mjg3NiwianRpIjoiNTVmMmMxY2YtZDJmMy00YjM1LTk3OTctZDlhZjZiODMwZGM0IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiJmYzI4Y2I2Mi0xNzY0LTQxMWYtOTc5Ni05ZGRlYWE2MzUxMzAiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIxMWMzYjBiNC03ZWNmLTQwNTktOThjOC1mNWUxMTIxMTQwYTUiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.zhMTdhMy8fS_bH4vh6HIRVgpMzf80Hx5aExcqHYJnqoPJauATYjZgfILTGIMznPlmNKn7To575dsAM9NXjqyKqUOj1nd8vPPG_p_AMYbsj-b-yguFYJOdnFjZq9BRmkeMkfy-R0rzzmbEkYJN6cxAD5IvyYxrZMYW0wS4plpN3rajJurToMpx3wbO67HauYU9LntbUPHDPAq8cdjjHx5kT_YiBLNJbAeu0fgjElAXUnLgrLpgaVDC3PQoOdvPhcJ31FEpl7HbrYidTUhYoG4124otMjBR_GFSdg93pxLeyQF6wsFk53_zbhrKKyyTipd8yTrlyaAS7Mc_8XcvGZGWw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": \"Dev Test ETL\",\r\n    \"description\": \"Cepea Cassava Root Prices QA delete\",\r\n    \"supplier\": \"CEPEA\",\r\n    \"category\": \"AGRICULTURE\",\r\n    \"subcategory\": \"CASSAVA\",\r\n    \"domain\": \"AGRICULTURE\",\r\n    \"collectorSettings\": {\r\n        \"url\": \"www.cepea.esalq.usp.br/en/indicator/cassava.aspx\",\r\n        \"localDirectory\": \"/tmp/\",\r\n        \"fileName\": \"CASSAVA_ROOT_PRICES.csv\",\r\n        \"name\": \"CASSAVA_ROOT_PRICES\",\r\n        \"fromDateReplaceString\": \"\",\r\n        \"toDateReplaceString\": \"\",\r\n        \"uploadToS3\": true,\r\n        \"forceSameContentDownload\": false,\r\n        \"type\": \"HttpCollectorSettings\",\r\n        \"clientCode\": \"vtx\"\r\n    },\r\n    \"settingsDefinitions\": [{\r\n        \"_id\": \"5fa8e176cc2ec56f19c957cc\",\r\n        \"loaderSettings\": {\r\n            \"dateInFilename\": false,\r\n            \"headerHasAsset\": false,\r\n            \"readFullHistory\": false,\r\n            \"dateHorizontal\": false,\r\n            \"dataStartRow\": 2,\r\n            \"dataEndRow\": 0,\r\n            \"headerRow\": 1,\r\n            \"assetColumns\": \"COL2\",\r\n            \"dateColumns\": \"COL1\",\r\n            \"timeColumns\": \"\",\r\n            \"valueColumns\": \"COL3:COL4!PRICE\",\r\n            \"type\": \"CSVLoaderSettings\",\r\n            \"assetGroup\": \"CASSAVA_ROOT_PRICES\",\r\n            \"assetSubGroup\": \"\",\r\n            \"assetProperties\": {\r\n                \"SUPPLIERCODE\": \"CEPEA\",\r\n                \"FREQUENCY\": \"\",\r\n                \"REGIONDESC\": \"\",\r\n                \"COMMODITY\": \"CASSAVA_ROOT_PRICES\",\r\n                \"CONTRACTTYPE\": \"SPOT\",\r\n                \"SUPPLIERDESC\": \"Center For Advanced Studies On Applied Economics\",\r\n                \"REGIONCODE\": \"BRAZIL\"\r\n            }\r\n        },\r\n        \"modifiedTime\": {\r\n            \"$numberLong\": \"1604903286663\"\r\n        }\r\n    }],\r\n    \"type\": \"CSV\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/createETLDefinition",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "createETLDefinition"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetETLDefinition",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI0Mjg3NiwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNDY0NzYsImlhdCI6MTY0MDI0Mjg3NiwianRpIjoiNTVmMmMxY2YtZDJmMy00YjM1LTk3OTctZDlhZjZiODMwZGM0IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiJmYzI4Y2I2Mi0xNzY0LTQxMWYtOTc5Ni05ZGRlYWE2MzUxMzAiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIxMWMzYjBiNC03ZWNmLTQwNTktOThjOC1mNWUxMTIxMTQwYTUiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.zhMTdhMy8fS_bH4vh6HIRVgpMzf80Hx5aExcqHYJnqoPJauATYjZgfILTGIMznPlmNKn7To575dsAM9NXjqyKqUOj1nd8vPPG_p_AMYbsj-b-yguFYJOdnFjZq9BRmkeMkfy-R0rzzmbEkYJN6cxAD5IvyYxrZMYW0wS4plpN3rajJurToMpx3wbO67HauYU9LntbUPHDPAq8cdjjHx5kT_YiBLNJbAeu0fgjElAXUnLgrLpgaVDC3PQoOdvPhcJ31FEpl7HbrYidTUhYoG4124otMjBR_GFSdg93pxLeyQF6wsFk53_zbhrKKyyTipd8yTrlyaAS7Mc_8XcvGZGWw",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/ETLDefinition?id=JODI_WORLD_GAS_DATA",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "ETLDefinition"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "JODI_WORLD_GAS_DATA"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllETLDefinitions",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI0Mjg3NiwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNDY0NzYsImlhdCI6MTY0MDI0Mjg3NiwianRpIjoiNTVmMmMxY2YtZDJmMy00YjM1LTk3OTctZDlhZjZiODMwZGM0IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiJmYzI4Y2I2Mi0xNzY0LTQxMWYtOTc5Ni05ZGRlYWE2MzUxMzAiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIxMWMzYjBiNC03ZWNmLTQwNTktOThjOC1mNWUxMTIxMTQwYTUiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.zhMTdhMy8fS_bH4vh6HIRVgpMzf80Hx5aExcqHYJnqoPJauATYjZgfILTGIMznPlmNKn7To575dsAM9NXjqyKqUOj1nd8vPPG_p_AMYbsj-b-yguFYJOdnFjZq9BRmkeMkfy-R0rzzmbEkYJN6cxAD5IvyYxrZMYW0wS4plpN3rajJurToMpx3wbO67HauYU9LntbUPHDPAq8cdjjHx5kT_YiBLNJbAeu0fgjElAXUnLgrLpgaVDC3PQoOdvPhcJ31FEpl7HbrYidTUhYoG4124otMjBR_GFSdg93pxLeyQF6wsFk53_zbhrKKyyTipd8yTrlyaAS7Mc_8XcvGZGWw",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getAllETLDefinitions?skip=0&limit=100",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getAllETLDefinitions"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "100"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteETLDefinition",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI0Mjg3NiwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNDY0NzYsImlhdCI6MTY0MDI0Mjg3NiwianRpIjoiNTVmMmMxY2YtZDJmMy00YjM1LTk3OTctZDlhZjZiODMwZGM0IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiJmYzI4Y2I2Mi0xNzY0LTQxMWYtOTc5Ni05ZGRlYWE2MzUxMzAiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIxMWMzYjBiNC03ZWNmLTQwNTktOThjOC1mNWUxMTIxMTQwYTUiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.zhMTdhMy8fS_bH4vh6HIRVgpMzf80Hx5aExcqHYJnqoPJauATYjZgfILTGIMznPlmNKn7To575dsAM9NXjqyKqUOj1nd8vPPG_p_AMYbsj-b-yguFYJOdnFjZq9BRmkeMkfy-R0rzzmbEkYJN6cxAD5IvyYxrZMYW0wS4plpN3rajJurToMpx3wbO67HauYU9LntbUPHDPAq8cdjjHx5kT_YiBLNJbAeu0fgjElAXUnLgrLpgaVDC3PQoOdvPhcJ31FEpl7HbrYidTUhYoG4124otMjBR_GFSdg93pxLeyQF6wsFk53_zbhrKKyyTipd8yTrlyaAS7Mc_8XcvGZGWw",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/deleteETLDefinition?id=Dev Test ETL",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "deleteETLDefinition"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "Dev Test ETL"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "createETLGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI1MjkwMiwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNTY1MDIsImlhdCI6MTY0MDI1MjkwMiwianRpIjoiODk2YjBhNmQtMGI0Ny00YTE1LThmODUtNjc3NTcxODU3NWU1IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiI3Y2E5ZTI2MC0wMjhiLTQzNWUtYWNhNS01OTk1OGUyY2Y1ODMiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI4N2JiZjE2ZC05NDI4LTQ5ZTYtYTJkNi1mZWE2MDZhYjM5ZWQiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.mMM3xMxFBVjYHiSa28QNVhNTz8ZSm6Rj_mO86kQZ_B5sUV76i1uY2zAlw56-Rej81icoNad6I9T618bEN1TAbndlqG_VKMnrPIAYi6fgUCigzdRG6xtRGVcb288M3JMv2EKUcu6R1rr0W7UYGpZFKcx-t7CmxdvMxSjTTImkHL0WUgTnMPwkQd8hYDcwu5llaF-ZaL2_zaoU6Rj7ur-dpDjsWBGlnsS99XKVvnwgi1xFkfjghstkssEp36myjLpzll9vjLNlGSCMq_3P0SjVh6NVZsMi-bGpZsYDBJYurk6ZZQpCLSCOp90OWRjV6m98cyXkrLde67wzZJTYb1AqFg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": \"Dev Test ETL Group1\",\r\n    \"description\": \"QA Rest Api Test Now\",\r\n    \"etlNames\": [\r\n        \"EXAA_GREEN_POWER_AT_BLOCKPRODUKTE\",\r\n        \"EXAA_GREEN_POWER_DE_STUNDENPRODUKTE\"\r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/createETLGroup",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "createETLGroup"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateETLGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI1NDU4NSwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNTgxODUsImlhdCI6MTY0MDI1NDU4NSwianRpIjoiYTEzMGJhYTgtNjA0OS00MTZiLWJmMjAtY2JhZjJmNmRjNmVjIiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiJjMmE2MDJkNC02OTkzLTQxZjItYTY5NC1lMjJjZTFiMGJiZDQiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJkZmI2M2VhNi03YjlhLTRiNWUtOWZiMS1iM2EzNGJhYTcxOTYiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.ruRefpQZ901mx4Bo40L2EwtN78rlckVesdr28AtMxBkyCzlSibTLxYQqwLXVlmQreQdt6ROWs58jNSM6M9KW_lP49WBp-HOoiIt_DnyZbQVt4foLzXxL8j3kCLE-vYTUXUp2J_UrXu2FfUB8U338Tihb4_j1B92vkTNShafcVfubftBHL4g21mmcJFkTZI2-z1Qc9952E5m-HnhFHw3acNsQH0tRPeWHnp4xrk7O8V2gt6pWK61PHpo6F2xT0re4XZZqahuKNm-UCQHCRUuVzMX94sZUpMzed34Yy3jZoHD02eeRRnl1me4FOZLRrjt7yZlNdwS_fwTrcf70wg8lTw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"_id\" : \"Dev Test ETL Group1\",\r\n    \"name\": \"Dev Test ETL Group1\",\r\n    \"description\": \"QA Rest Api Test Now1223\",\r\n    \"etlNames\": [\r\n        \"EXAA_GREEN_POWER_AT_BLOCKPRODUKTE\"\r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/updateETLGroup",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "updateETLGroup"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllETLGroups",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI1MjkwMiwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNTY1MDIsImlhdCI6MTY0MDI1MjkwMiwianRpIjoiODk2YjBhNmQtMGI0Ny00YTE1LThmODUtNjc3NTcxODU3NWU1IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiI3Y2E5ZTI2MC0wMjhiLTQzNWUtYWNhNS01OTk1OGUyY2Y1ODMiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI4N2JiZjE2ZC05NDI4LTQ5ZTYtYTJkNi1mZWE2MDZhYjM5ZWQiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.mMM3xMxFBVjYHiSa28QNVhNTz8ZSm6Rj_mO86kQZ_B5sUV76i1uY2zAlw56-Rej81icoNad6I9T618bEN1TAbndlqG_VKMnrPIAYi6fgUCigzdRG6xtRGVcb288M3JMv2EKUcu6R1rr0W7UYGpZFKcx-t7CmxdvMxSjTTImkHL0WUgTnMPwkQd8hYDcwu5llaF-ZaL2_zaoU6Rj7ur-dpDjsWBGlnsS99XKVvnwgi1xFkfjghstkssEp36myjLpzll9vjLNlGSCMq_3P0SjVh6NVZsMi-bGpZsYDBJYurk6ZZQpCLSCOp90OWRjV6m98cyXkrLde67wzZJTYb1AqFg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": ""
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/getAllETLGroups?skip=0&limit=1",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getAllETLGroups"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "1"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetETLGroupById",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI1MjkwMiwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNTY1MDIsImlhdCI6MTY0MDI1MjkwMiwianRpIjoiODk2YjBhNmQtMGI0Ny00YTE1LThmODUtNjc3NTcxODU3NWU1IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiI3Y2E5ZTI2MC0wMjhiLTQzNWUtYWNhNS01OTk1OGUyY2Y1ODMiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI4N2JiZjE2ZC05NDI4LTQ5ZTYtYTJkNi1mZWE2MDZhYjM5ZWQiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.mMM3xMxFBVjYHiSa28QNVhNTz8ZSm6Rj_mO86kQZ_B5sUV76i1uY2zAlw56-Rej81icoNad6I9T618bEN1TAbndlqG_VKMnrPIAYi6fgUCigzdRG6xtRGVcb288M3JMv2EKUcu6R1rr0W7UYGpZFKcx-t7CmxdvMxSjTTImkHL0WUgTnMPwkQd8hYDcwu5llaF-ZaL2_zaoU6Rj7ur-dpDjsWBGlnsS99XKVvnwgi1xFkfjghstkssEp36myjLpzll9vjLNlGSCMq_3P0SjVh6NVZsMi-bGpZsYDBJYurk6ZZQpCLSCOp90OWRjV6m98cyXkrLde67wzZJTYb1AqFg",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getETLGroupById?id=Dev Test ETL Group1",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getETLGroupById"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "Dev Test ETL Group1"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateETLGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI1NDU4NSwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNTgxODUsImlhdCI6MTY0MDI1NDU4NSwianRpIjoiYTEzMGJhYTgtNjA0OS00MTZiLWJmMjAtY2JhZjJmNmRjNmVjIiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiJjMmE2MDJkNC02OTkzLTQxZjItYTY5NC1lMjJjZTFiMGJiZDQiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJkZmI2M2VhNi03YjlhLTRiNWUtOWZiMS1iM2EzNGJhYTcxOTYiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.ruRefpQZ901mx4Bo40L2EwtN78rlckVesdr28AtMxBkyCzlSibTLxYQqwLXVlmQreQdt6ROWs58jNSM6M9KW_lP49WBp-HOoiIt_DnyZbQVt4foLzXxL8j3kCLE-vYTUXUp2J_UrXu2FfUB8U338Tihb4_j1B92vkTNShafcVfubftBHL4g21mmcJFkTZI2-z1Qc9952E5m-HnhFHw3acNsQH0tRPeWHnp4xrk7O8V2gt6pWK61PHpo6F2xT0re4XZZqahuKNm-UCQHCRUuVzMX94sZUpMzed34Yy3jZoHD02eeRRnl1me4FOZLRrjt7yZlNdwS_fwTrcf70wg8lTw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"_id\" : \"Dev Test ETL Group1\",\r\n    \"name\": \"Dev Test ETL Group1\",\r\n    \"description\": \"QA Rest Api Test Now1234\",\r\n    \"etlNames\": [\r\n        \"EXAA_GREEN_POWER_AT_BLOCKPRODUKTE\"\r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/updateETLGroup",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "updateETLGroup"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "AddETLToGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI1NTI1NywiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNTg4NTcsImlhdCI6MTY0MDI1NTI1NywianRpIjoiZTZhMDE4YmQtODJiOS00ZmJiLWEyZGEtZGExZjQ1MDE0OWQ1IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiIxYWYwYzM0NS1mMzAxLTQ0ZDktYjRlYy05MzMwZDY1NDk4NTAiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI1NjVkMjljNC0zMzBiLTQ2NTgtODMxNi1mYTJjYmE2MDBiNGMiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.DE6vspR30bZNjPm356NduJMe-VewDSGUq9Iz4s_u0j-5uExoj8xEOmkK0Gc9OuuRPurtABfqKfFyylCJ_U3wfnVKeWvScDlHG91k-fUs9I2B4wrbvss8cZ4CBpxw11ozDokRTe0AlxHANzudw7N7QNUh5lMJ7MRBzG2g87MbHBZk5U8KQYFNyC8Wi5nevliH-9ucIZqVGdZQhMSOT_nds9g9u8IYNLxlNGsDQ4jc877Ri45snoCB6WfuNvMDtuEL3A01p4VC4YaHIHGYQkNfu7BJ_Jr0dMGGp4xqOA8l6FnSB19Q0CJKFnC-jrEJdJCI21ti6qZi_37I9I9BgaE_kw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\"etlNames\": [\"ENTSOE_LOAD_TOTAL_ACTUAL_DK1\"]}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/addETLToGroup?groupName=Api Test Now",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "addETLToGroup"
                                ],
                                "query": [
                                    {
                                        "key": "groupName",
                                        "value": "Api Test Now"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "RemoveETLFromGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI1NTQxMywiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNTkwMTMsImlhdCI6MTY0MDI1NTQxMywianRpIjoiZWU3MzFkNWUtYmJkNi00ODlmLWE2MDctMWI1YWE5MGYwMDlkIiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiJhNTRjMGFkZC05NzdhLTQ2NmEtYjczZC1hNjE5NWNmY2IzODEiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI3YWFhY2Q4My1iN2IwLTQxYWEtYjJhNC0yYWU3ZGZlMDFhNzQiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.m5CwK6MJfzUqAZ6QRa-Ye41b7Yp14iRhBKcyn02iAByRUIfGtEtBxpS7Rs9qlWg2DRgxczng8Dk0uacR5FGmSdI3qUNmIbmqmccAIhBzE5l3lHLz2hCgv5Klb7aaPjUF4eiGOtvSF5e_oBeZrn0pp3vIUX60W_BWRSQDGygBvNKBFKN6g9VE5ggLWKrmZtwjm7PeYUQUvFnR4VAUT2lmsgWn9b1wE1RSnoKu72HIf-B4Cb0CSWRCEdznu36u6MUYmj4YYJegkyWn458f-M90UKj8EYJu34lC1weSHdUazBidVIJPTU4V9F3vfRYL20B6DNCQGkoXp2Gn28XMXMi-7A",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\"etlNames\": [\"ENTSOE_LOAD_TOTAL_ACTUAL_DK1\"]}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/removeETLFromGroup?groupName=Api Test Now",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "removeETLFromGroup"
                                ],
                                "query": [
                                    {
                                        "key": "groupName",
                                        "value": "Api Test Now"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteETLGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI1NDU4NSwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNTgxODUsImlhdCI6MTY0MDI1NDU4NSwianRpIjoiYTEzMGJhYTgtNjA0OS00MTZiLWJmMjAtY2JhZjJmNmRjNmVjIiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiJjMmE2MDJkNC02OTkzLTQxZjItYTY5NC1lMjJjZTFiMGJiZDQiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJkZmI2M2VhNi03YjlhLTRiNWUtOWZiMS1iM2EzNGJhYTcxOTYiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.ruRefpQZ901mx4Bo40L2EwtN78rlckVesdr28AtMxBkyCzlSibTLxYQqwLXVlmQreQdt6ROWs58jNSM6M9KW_lP49WBp-HOoiIt_DnyZbQVt4foLzXxL8j3kCLE-vYTUXUp2J_UrXu2FfUB8U338Tihb4_j1B92vkTNShafcVfubftBHL4g21mmcJFkTZI2-z1Qc9952E5m-HnhFHw3acNsQH0tRPeWHnp4xrk7O8V2gt6pWK61PHpo6F2xT0re4XZZqahuKNm-UCQHCRUuVzMX94sZUpMzed34Yy3jZoHD02eeRRnl1me4FOZLRrjt7yZlNdwS_fwTrcf70wg8lTw",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/deleteETLGroup?groupName=Dev Test ETL Group1",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "deleteETLGroup"
                                ],
                                "query": [
                                    {
                                        "key": "groupName",
                                        "value": "Dev Test ETL Group1"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetETLDefinitionInfosFromGroup",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjNhYWFmZTAzLTAwOTMtNDhiNS1iMmNjLTU3ZDMxMWE5NzdmOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA3NDMxODM2LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDc0MzU0MzYsImlhdCI6MTYwNzQzMTgzNiwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.qF-ENgI31LoN7V23awZ2OSS9hN7xJMWRORhmnK_1HD53qLZNQABzA78qSPLrM8kzQDFDiD5H7uiOaDb5Fa0VPMVNntmo26csoiYcv9EM2ie3v3KJyl5RFOxnsdY7lZT-GCs24JbANIeAl06TRhEthiQhzq5O019ZmtLwKF8bEiFE3Yg9cjojxt9YFtOM56Wax75JP4NggMoFKXj1r_cheVcEX6sJeIuSghpr1Z7iuomyOHoOknXG1Rmr8_1x73FOpUtrgxbqaD98FrQx7xtHfaQXVpJao-wiSDJxsdx31LPP6VbF_tRAGBfw8TMrMEuHcrv4-hJCwaxT-sX_dN_iew"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getETLDefinitionInfosFromGroup?groupName=JODI_ENERGY",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getETLDefinitionInfosFromGroup"
                                ],
                                "query": [
                                    {
                                        "key": "groupName",
                                        "value": "JODI_ENERGY"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getAllEtlDefinitionInfos",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/getAllEtlDefinitionInfos?skip=0&limit=5",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getAllEtlDefinitionInfos"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "5"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getETLDefinitionbyId",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": ""
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/getETLDefinition?id=JODI_WORLD_GAS_DATA",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getETLDefinition"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "JODI_WORLD_GAS_DATA"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "MarketPlace Product",
                "item": [
                    {
                        "name": "GetMarketplaceProduct",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/product/getMarketplaceProduct?productId=61c4730f2ee19035e01be507",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "getMarketplaceProduct"
                                ],
                                "query": [
                                    {
                                        "key": "productId",
                                        "value": "61c4730f2ee19035e01be507"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllMarketplaceProduct",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjlmZDEzMGE3LTM1MzEtNGRmOS1iZWZhLTk1YTkzMzkxZWJmNSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA1Mjc1NTI4LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDUyNzkxMjgsImlhdCI6MTYwNTI3NTUyOCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.EHKb5h-lZBIbJNlNTrTcw9xgMf14EG62nhxKNiSsZbDPtt_FBOdCRk1r05III8fZOZcQr3m6brEFX_xeA4AnGdXiWxGFMAoH2KMJI44c-4FnPi0-gg8HLHrXTccPi9o3CmMVpjEAGHH9uo5sjJYqd8i42s905JvBo7sEg82_DeJGoC4Oi8cNRC9FqMnmcuFHnuXzFLUCQ6HsyY7tbgfRWVUFsXhT1mnk48Kh00fvSYZdWymSOxs2532u_A5pikG01f8EvwVn-B8OcLQFl7BjCmmuhitetr8ujSxwG0DE5EGV5tzJJ0Ov95kfnVa_BSfJ9EvUknMMJltIDvyCc36lNQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n   \r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/product/getAllMarketplaceProducts?skip=0&limit=3",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "getAllMarketplaceProducts"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "3"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateMarketplaceProduct",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjRiZTVjNjAyLWFlMjUtNDNmOS1hMDgzLTE1NGFjNjRiMzY2MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA5MjQwMzYxLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDkyNDM5NjEsImlhdCI6MTYwOTI0MDM2MSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.ZISYwJ2jmZGDeLaN-HxijBPx8J17t0TZkCNAKpGs9rIJxqO1FkomgF3ti8Js_5-8ITiRp-tAArWqT5LitbcbcrklNOeEaydZFIeP1gT_QvdP2P_DgIPVeVGf_jMDnGdV2taNX4xd9NN3LaahnAYUNQk5nmw1f3DKMbmhjhE9_U9AP_HM7xSL4UD7epBxvsG4yyyq1IBuKz_QXwJwOxlbK1S-klRtnVhWneqquOl9N7UH25Z20wkHuVaMok61DhpIzofi7TJ-vX-3_IzGPF5JQLcsWI7OtC9bf9MQAz-hEnQmdk5qzDk4WODsHLCTBe0Yo4NbagcHMsqTcwzSkVRFUQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n        \"_id\": \"61c4730f2ee19035e01be507\",\r\n        \"providerId\": \"617790dbd39f0a3adcc151bd\",\r\n        \"providerVid\": \"FGT\",\r\n        \"name\": \"Test Product Dev update123\",\r\n        \"description\": \"Test Dev description\",\r\n        \"ratings\": 0,\r\n        \"deliveryOptions\": [\r\n            \"EXCEL\"\r\n        ],\r\n        \"fulfilmentOptions\": [\r\n            \"VENTRIKS\"\r\n        ],\r\n        \"dataFrequencyOptions\": [\r\n            \"BUSINESS\"\r\n        ],\r\n        \"dataFormatOptions\": [\r\n            \"JSON\"\r\n        ],\r\n        \"totalAssets\": 8,\r\n        \"sectors\": [\r\n            \"test1\"\r\n        ],\r\n        \"benefits\": [\r\n            \"Test1,Test2\"\r\n        ],\r\n        \"marketsCovered\": [\r\n            {\r\n                \"name\": \"marketHeader1\",\r\n                \"highlights\": [\r\n                    {\r\n                        \"description\": \"test description\",\r\n                        \"keyPoints\": [\r\n                            \"keypoints1\",\r\n                            \"keypoints2\"\r\n                        ]\r\n                    }\r\n                ]\r\n            }\r\n        ],\r\n        \"published\": false,\r\n        \"trialData\": false,\r\n        \"sampleData\": false,\r\n        \"autoRenewal\": false,\r\n        \"isPremium\": false,\r\n        \"isFree\": false\r\n    }",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/product/updateMarketplaceProduct",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "updateMarketplaceProduct"
                                ]
                            },
                            "description": "CreateMarketplaceProduct"
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteMarketplaceProduct",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjVkNjRhZTRiLTM4ZTMtNGZiMS1iOGIzLTZmMmIyNWVhODQ3MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA3Mzk4MDA1LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDc0MDE2MDUsImlhdCI6MTYwNzM5ODAwNSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.ZuwW6r28Hr7Fkow3GnaxPUXtl7XkBt4qteePfNCJnK0Eg-lNC4CAp4FRyLlp0GFjLzeOsr_PkpwCzDxg2fv1E_YX5GocoN-EDUhNOzaxMpCbcoHdqXnnim2zRdJuuZwbuR0KS6is5vRi6LOTGh7QwuQIGoK3ziJFN4yVXg16jpp0XNYQtL1Uz9X_xbx5JNYinbnsKLeqE0XLGRoBuNmtxaeEZ9Q4uSy8F27bzMRZDHSaXYeq-9cKg2VYIY5GnXHmVUZSb7Vmv8cBnLJpVbLlry8QE72fQ52pl4rDa3BbjdLE_19SjlX5wOoGR7Za-nh3btGpbuhkK8DU5hSQ-G7f6Q",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/product/deleteMarketplaceProduct?productId=61c4730f2ee19035e01be507",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "deleteMarketplaceProduct"
                                ],
                                "query": [
                                    {
                                        "key": "productId",
                                        "value": "61c4730f2ee19035e01be507"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetMarketplaceProducts",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjVkNjRhZTRiLTM4ZTMtNGZiMS1iOGIzLTZmMmIyNWVhODQ3MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA3Mzk4MDA1LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDc0MDE2MDUsImlhdCI6MTYwNzM5ODAwNSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.ZuwW6r28Hr7Fkow3GnaxPUXtl7XkBt4qteePfNCJnK0Eg-lNC4CAp4FRyLlp0GFjLzeOsr_PkpwCzDxg2fv1E_YX5GocoN-EDUhNOzaxMpCbcoHdqXnnim2zRdJuuZwbuR0KS6is5vRi6LOTGh7QwuQIGoK3ziJFN4yVXg16jpp0XNYQtL1Uz9X_xbx5JNYinbnsKLeqE0XLGRoBuNmtxaeEZ9Q4uSy8F27bzMRZDHSaXYeq-9cKg2VYIY5GnXHmVUZSb7Vmv8cBnLJpVbLlry8QE72fQ52pl4rDa3BbjdLE_19SjlX5wOoGR7Za-nh3btGpbuhkK8DU5hSQ-G7f6Q",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": \"\",\r\n    \"description\": \"\",\r\n    \"searchTerm\":\"\",\r\n    \"PropertyList\": []\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/product/getAllMarketplaceProducts?skip=0&limit=1",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "getAllMarketplaceProducts"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "1"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getDefaultCategoriesAndFilters",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": ""
                            },
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/getDefaultCategoriesAndFilters",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "getDefaultCategoriesAndFilters"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllMarketplceIntegration",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNzAzZGQyYS02YTExLTQ1NDUtYWZhMC0yNWRmODM0MjhiZDkiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byJdLCJhdWQiOiI1bGgwbmo4c2xlMjE4NzZnYm42N2h0MDc2cyIsImV2ZW50X2lkIjoiMjVlYTZkMzItYTc0ZS00YjdjLWE0YmItYTcxY2VkMDUxMDkxIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MzEwODQ3OTgsIm5hbWUiOiJrb3dzaGlrIiwicGhvbmVfbnVtYmVyIjoiKzkxOTUxMzI3OTY2NiIsImV4cCI6MTYzMTA4ODM5OCwiaWF0IjoxNjMxMDg0Nzk4LCJmYW1pbHlfbmFtZSI6Ik5TIiwiZW1haWwiOiJrb3dzaGlrbnNAZ21haWwuY29tIn0.GzCHW2Dsmormjs_ri033e7u39MrA6Y9nbpLRGGi6yZlHEIoR_g_hz21ZxQSzqB6PYkl8s-oCKQVQNSiTBBA5bD0b-xQVytiyq7jEGTXXmrn8u9UMplhUCQoBlrDdGIEx7zju7dSFSAgeYd4QCMxZw1aAM0oH0fb5U9Cx3vbnZaAiWHURqkFM1tGdJCa1HDToylSq7PyiobbxJYzF0sJFxpyEJCNBMDaoJNMxtIFk3ot4sIBa1Q9Bo1Q0DUgo6SHQ0FjPmoN_d86k8cXcxtZotULyK3YVa_26BfzKZiRcfUwsApoZJeR_OTvxPI-XpzBfFv44SsAdPfxOVGKsEho05A"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/product/getAllMarketplaceIntegrations",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "getAllMarketplaceIntegrations"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getAllCountries",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/common/getAllCountries",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getAllCountries"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetMarketplaceSampleData",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1N2M0ZmNiYS0yMDYwLTQ5OTktOTEwMi0wOWFiOWE5MGRhODUiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoiamVua2lucy13YXJtZXIiLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiIzZGQ4ZDcwZC1jZjIwLTQ2ODUtOGNhNy0wMGRlMGQxNjA4ODYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYzOTA0MjYxOSwibmFtZSI6IkplbmtpbnMiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiZXhwIjoxNjM5MDQ2MjE5LCJpYXQiOjE2MzkwNDI2MTksImZhbWlseV9uYW1lIjoiV2FybWVyIiwiZW1haWwiOiJpdEB2ZW50cmlrcy5jb20ifQ.WyQiGNIs4iyUmB-coy0lnWFzFgQDhVOAIoIJC5IqmPFKP9ICcLQ0Sx4sdbBuoBZCKhyb0XRcw2d5w2XBoeVzTF_Nl1MXocmKLn-iCIaAnli5kpDXHLFRVwKkYhx7yM_j7ofuHQRzs4SXg7Zwd8O8cr1TkIGI2jvdb-hLpfEPXgsEBSRy-xBDE_CQLbZdRxU4I8PCJX5HLo_g3vSveVD4YpjHiMUkKkINbxxVD31kf8cm9Fq0YxeEmKiDhGXbHleYKdL6R4ysQedbW5lppA08NfKlfxBe-Rt4dzGjPDo-EeM1WO_8bAMN7Ry76ZzBiG3OSMG-zTA1pe2ZcixegPSbOg"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/product/getMarketplaceSampleData?productId=61934be9610427634f53285d",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "getMarketplaceSampleData"
                                ],
                                "query": [
                                    {
                                        "key": "productId",
                                        "value": "61934be9610427634f53285d"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetMarketplaceFileAndDataAttributes",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/product/getMarketplaceFileAndDataAttributes?productId=618cc5793403170f55fdc1b9",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "getMarketplaceFileAndDataAttributes"
                                ],
                                "query": [
                                    {
                                        "key": "productId",
                                        "value": "618cc5793403170f55fdc1b9"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetSettings",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMzk0YjdjNi1kYzJiLTRiMmUtODQ4My01YjZjODQ1YTBmZTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoicmFuaml0aGEubmFnZW5kcmEiLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiI5NWRlZmViNS04NDRkLTRjODktYjgzYi05NDQ0N2Q1Njg4NjciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY0Mzk1MzQ5MSwibmFtZSI6IlJhbmppdGhhIiwicGhvbmVfbnVtYmVyIjoiKzkxOTY4NjIwMzg4MyIsImV4cCI6MTY0Mzk1NzA5MSwiaWF0IjoxNjQzOTUzNDkxLCJmYW1pbHlfbmFtZSI6Ik4iLCJlbWFpbCI6InJhbmppdGhhLm5hZ2VuZHJhQHZlbnRyaWtzLmNvbSJ9.sJnVbjJ6npKQbjZZtEdZGrW2khNBRNesf201Lp7tu4ftynBjGApEX6BZjX3Auwmk-P2ZPVwKIVkllHCOOe4VwaRtuSvgOxy0oKIQtDG_48HBknDt_PwRaag_CIxCWMrMHeJlrwe1PoDw-yOr7lAekVBiAK4AVSgpkcLBGAM07fHwJLf6tbxkNyjasCZ_LImmT7ldOVy3VG1iP0S2rflp6NVaA9Dx8l87kKsa7bENEjTN1r1fNRbeQjL0pvrUJ9i3KKq0rmKaUgcLwkO6b8dkMVUQfdIZusD7h3ZOAEliQHNjLs2Y2tbq1qkvpRS2VLxKyDwWkKpSMiHW9P9kWdQ2vQ",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/common/getSettings?domain=MARKETPLACE",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getSettings"
                                ],
                                "query": [
                                    {
                                        "key": "domain",
                                        "value": "MARKETPLACE"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllProductsInProvider",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"providerId\":\"617790dbd39f0a3adcc15167\",\r\n    \"name\":\"mdx\"\r\n}"
                            },
                            "url": {
                                "raw": "{{qaurl}}/provider/getAllProductsInProvider",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "provider",
                                    "getAllProductsInProvider"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "MarketPlace Provider",
                "item": [
                    {
                        "name": "CreateMarketplaceProvider",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI2NDM5OCwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNjc5OTgsImlhdCI6MTY0MDI2NDM5OCwianRpIjoiZjZkZGY2NDQtM2FkZC00Y2ZiLTk5ZjgtZDJhMzRmYTdhYzNjIiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiIwYTgxMjQ2MS1jMzJmLTQ5MmYtYTMxZS0yZjQzMjAwMjc1ZWQiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJkM2IzZjYxNi01OTNlLTQzNjYtYmQzNy0wMjE2ZWZkMWUyMmQiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.EK0BDMvU_UGLAmZ2T7eMTU8SjE4stGOITOfeAg7CqW2onrioHBobamG6FYGZQQmQPzfMJ5hZg-02oF7jI6TYtneCOM74Rc6gaj4mHkY8CJjXYh56B1GkB5UKIzgS50afeOsfkMQ3h57DV-hW1f8sHrAoCQBAm4JZ15cAS35ZMgcK3OAdhkB9IYMIZ7y_GIWUfEiMnyL3wBGczNdi9nDcX9dSImC87HzhYsudDJRRDS8Yywu796wxwU8Zrsb-G32JyPQqSN7RQWVgxRVPHV270NzVCycWWmcy-daJWKRwVcNDP7TjLAjI09v3kGoFP5txuOgKzG8IsVaERE9H3yKTbA"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\"vid\":\"BOI\",\r\n\"name\":\"Test DEV BANK INDONESIA\",\r\n\"summary\":\"The Bank Indonesia is the central bank of the Republic of Indonesia and the issuer of Indonesia's legal tender currency, the Indonesian Rupiah. The bank is independent of the government and operates the typical central bank-like structure.\",\r\n\"description\":\"The Bank Indonesia aims to become the leading digital central bank that contributes significantly to the national economy and is the best among emerging market countries for advanced Indonesia.\",\r\n\"logo\":\"http://vtx-marketplace.s3.eu-west-1.amazonaws.com/vendors/boi/BOI.png\",\"website\":\"https://www.bi.go.id/\",\r\n\"email\":\"bicara@bi.go.id\",\r\n\"ratings\":0.0,\r\n\"headquarters\":\"Jakarta, Indonesia\",\r\n\"highlights\":[\"\"],\r\n\"customers\":[{\"name\":\"\",\"logo\":null}],\r\n\"dataCategories\":[\"Financial\"],\r\n\"contactInfo\":{\"countryCode\":\"0.0\",\"number\":\"\"},\r\n\"productCount\":3,\r\n\"currencyProvider\":true,\r\n\"verified\":false}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/provider/createMarketplaceProvider",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "provider",
                                    "createMarketplaceProvider"
                                ]
                            },
                            "description": "CreateMarketplaceProduct"
                        },
                        "response": []
                    },
                    {
                        "name": "GetMarketplaceProvider",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDI2NDM5OCwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDAyNjc5OTgsImlhdCI6MTY0MDI2NDM5OCwianRpIjoiZjZkZGY2NDQtM2FkZC00Y2ZiLTk5ZjgtZDJhMzRmYTdhYzNjIiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiIwYTgxMjQ2MS1jMzJmLTQ5MmYtYTMxZS0yZjQzMjAwMjc1ZWQiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJkM2IzZjYxNi01OTNlLTQzNjYtYmQzNy0wMjE2ZWZkMWUyMmQiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.EK0BDMvU_UGLAmZ2T7eMTU8SjE4stGOITOfeAg7CqW2onrioHBobamG6FYGZQQmQPzfMJ5hZg-02oF7jI6TYtneCOM74Rc6gaj4mHkY8CJjXYh56B1GkB5UKIzgS50afeOsfkMQ3h57DV-hW1f8sHrAoCQBAm4JZ15cAS35ZMgcK3OAdhkB9IYMIZ7y_GIWUfEiMnyL3wBGczNdi9nDcX9dSImC87HzhYsudDJRRDS8Yywu796wxwU8Zrsb-G32JyPQqSN7RQWVgxRVPHV270NzVCycWWmcy-daJWKRwVcNDP7TjLAjI09v3kGoFP5txuOgKzG8IsVaERE9H3yKTbA",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/provider/getMarketplaceProvider?id=61c9951b78643755642456b0",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "provider",
                                    "getMarketplaceProvider"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "61c9951b78643755642456b0"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllMarketplaceProduct",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Body matches string\", function () {\r",
                                        "    pm.expect(pm.response.text()).to.include(\"TENNET\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjlmZDEzMGE3LTM1MzEtNGRmOS1iZWZhLTk1YTkzMzkxZWJmNSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA1Mjc1NTI4LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDUyNzkxMjgsImlhdCI6MTYwNTI3NTUyOCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.EHKb5h-lZBIbJNlNTrTcw9xgMf14EG62nhxKNiSsZbDPtt_FBOdCRk1r05III8fZOZcQr3m6brEFX_xeA4AnGdXiWxGFMAoH2KMJI44c-4FnPi0-gg8HLHrXTccPi9o3CmMVpjEAGHH9uo5sjJYqd8i42s905JvBo7sEg82_DeJGoC4Oi8cNRC9FqMnmcuFHnuXzFLUCQ6HsyY7tbgfRWVUFsXhT1mnk48Kh00fvSYZdWymSOxs2532u_A5pikG01f8EvwVn-B8OcLQFl7BjCmmuhitetr8ujSxwG0DE5EGV5tzJJ0Ov95kfnVa_BSfJ9EvUknMMJltIDvyCc36lNQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n   \r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/provider/getAllMarketplaceProviders?skip=126&limit=1",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "provider",
                                    "getAllMarketplaceProviders"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "126"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "1"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateMarketplaceProvider",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjRiZTVjNjAyLWFlMjUtNDNmOS1hMDgzLTE1NGFjNjRiMzY2MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA5MjQwMzYxLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDkyNDM5NjEsImlhdCI6MTYwOTI0MDM2MSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.ZISYwJ2jmZGDeLaN-HxijBPx8J17t0TZkCNAKpGs9rIJxqO1FkomgF3ti8Js_5-8ITiRp-tAArWqT5LitbcbcrklNOeEaydZFIeP1gT_QvdP2P_DgIPVeVGf_jMDnGdV2taNX4xd9NN3LaahnAYUNQk5nmw1f3DKMbmhjhE9_U9AP_HM7xSL4UD7epBxvsG4yyyq1IBuKz_QXwJwOxlbK1S-klRtnVhWneqquOl9N7UH25Z20wkHuVaMok61DhpIzofi7TJ-vX-3_IzGPF5JQLcsWI7OtC9bf9MQAz-hEnQmdk5qzDk4WODsHLCTBe0Yo4NbagcHMsqTcwzSkVRFUQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n        \"_id\": \"61c9951b78643755642456b0\",\r\n        \"vid\": \"TESTBOI\",\r\n        \"name\": \"Test dev stage BANK INDONESIA\",\r\n        \"summary\": \"The Bank Indonesia is the central bank of the Republic of Indonesia and the issuer of Indonesia's legal tender currency, the Indonesian Rupiah. \",\r\n        \"description\": \"The Bank Indonesia aims to become the leading digital central bank that contributes significantly to the national economy and is the best among emerging market countries for advanced Indonesia.\",\r\n        \"logo\": \"http://vtx-marketplace.s3.eu-west-1.amazonaws.com/vendors/boi/BOI.png\",\r\n        \"website\": \"https://www.bi.go.id/\",\r\n        \"email\": \"bicara@bi.go.id\",\r\n        \"ratings\": 0.0,\r\n        \"headquarters\": \"Jakarta, Indonesia\",\r\n        \"highlights\": [\r\n            \"\"\r\n        ],\r\n        \"customers\": [\r\n            {\r\n                \"name\": \"\",\r\n                \"logo\": null\r\n            }\r\n        ],\r\n        \"dataCategories\": [\r\n            \"Financial\"\r\n        ],\r\n        \"contactInfo\": {\r\n            \"countryCode\": \"0.0\",\r\n            \"number\": \"\"\r\n        },\r\n        \"productCount\": 3,\r\n        \"verified\": false,\r\n        \"currencyProvider\": true\r\n    }",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/provider/updateMarketplaceProvider",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "provider",
                                    "updateMarketplaceProvider"
                                ]
                            },
                            "description": "CreateMarketplaceProduct"
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteMarketplaceProvider",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjVkNjRhZTRiLTM4ZTMtNGZiMS1iOGIzLTZmMmIyNWVhODQ3MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA3Mzk4MDA1LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDc0MDE2MDUsImlhdCI6MTYwNzM5ODAwNSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.ZuwW6r28Hr7Fkow3GnaxPUXtl7XkBt4qteePfNCJnK0Eg-lNC4CAp4FRyLlp0GFjLzeOsr_PkpwCzDxg2fv1E_YX5GocoN-EDUhNOzaxMpCbcoHdqXnnim2zRdJuuZwbuR0KS6is5vRi6LOTGh7QwuQIGoK3ziJFN4yVXg16jpp0XNYQtL1Uz9X_xbx5JNYinbnsKLeqE0XLGRoBuNmtxaeEZ9Q4uSy8F27bzMRZDHSaXYeq-9cKg2VYIY5GnXHmVUZSb7Vmv8cBnLJpVbLlry8QE72fQ52pl4rDa3BbjdLE_19SjlX5wOoGR7Za-nh3btGpbuhkK8DU5hSQ-G7f6Q",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/provider/deleteMarketplaceProvider?id=61c9951b78643755642456b0",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "provider",
                                    "deleteMarketplaceProvider"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "61c9951b78643755642456b0"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetMarketplaceVendor",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImYxNTNhYTI3LTA2OWUtNDA3Ny05YWJkLWYxMDNmZmMwYmM3NSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjE0NTc2MTg2LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MTQ1Nzk3ODYsImlhdCI6MTYxNDU3NjE4NiwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.edbd9Onis8SZgLkGEYwgVfX4cxo3wCX9UrxAD95KGSoUuZDJ7m49-yUyTWsew6eyU8JefewMITRQ-9RffuR_5_nYT63iHY6PGShYAxWxFIQCa-UDHzGP0_bMXX8qIUlbuanaP5AuEVZ8XZU-AJGNiI_SRpTxQFoNt-ve-2dtXimoGY8xzhA-IhsusAjQcuG7O9yYyDc6ejTAfkOk_mgdaLY-fQiAvROEaof-Ry0WcB1MAkypDN2W2TLxd7KsMHP2n1j0jq-ehk67oUMH45iQpr5OG4Dhia84l_RFhlJPtbeGovibFJdLrbUU-qeNp6q3K5v8Nbpg1lL6Fe50BbwgpA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/provider/getMarketplaceProvider?id=617790dbd39f0a3adcc15168",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "provider",
                                    "getMarketplaceProvider"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "617790dbd39f0a3adcc15168"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getBasicMarketplaceProvidersInfo",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNzAzZGQyYS02YTExLTQ1NDUtYWZhMC0yNWRmODM0MjhiZDkiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byJdLCJhdWQiOiI1bGgwbmo4c2xlMjE4NzZnYm42N2h0MDc2cyIsImV2ZW50X2lkIjoiYzgyODRlYWEtODk5ZS00Mjk1LWI0NjgtMDk3MGY0ZWY4NzAyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MjkzNzk4MDgsIm5hbWUiOiJrb3dzaGlrIiwicGhvbmVfbnVtYmVyIjoiKzkxOTUxMzI3OTY2NiIsImV4cCI6MTYyOTM4MzQwOCwiaWF0IjoxNjI5Mzc5ODA4LCJmYW1pbHlfbmFtZSI6Ik5TIiwiZW1haWwiOiJrb3dzaGlrbnNAZ21haWwuY29tIn0.OLLkuvWEWC3ZkCaFBS5iAqLntRt_TIpm9N5SnGK4YvoDa7ZJC2xWT922J162KBacXl92b-igP2M31FhXVSsFykMn-AR1zM-sTmKJvf_Pbk5Hmd0AExn4MCfyH3zep1wXR8TE0KOq4M38Gr6CIdJolvely22q-rXZmShbB9lhlB-j3IS1Sy5vkMlOgOzxoRcZFBDnEZYuU3cTUew24AqbNeD_ahcJgPscz3H4tJDY3pECmMOSgbK5PUzqEiE4N5LiiY0vIYg7khFvPsJdYyagR3WZNBIITUOzHjfKxPii0hjqfIcuSWJ5jFhpy5amsIC0Ld0PpLN8WqgMSw7L376qFQ"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/provider/getBasicMarketplaceProvidersInfo",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "provider",
                                    "getBasicMarketplaceProvidersInfo"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "SignIn",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"UserName Check\", function () {\r",
                                        "    pm.expect(jsonData.data.username).to.eql(pm.variables.get(\"username\"));\r",
                                        "});\r",
                                        "pm.environment.set(\"usernameqa\", jsonData.data.username);\r",
                                        "pm.environment.set(\"idTokendev\", jsonData.data.idToken);\r",
                                        "pm.environment.set(\"refreshTokenQA\", jsonData.data.refreshToken);\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var username=pm.environment.set(\"username\", \"jenkins-warmer\");\r",
                                        "var password=pm.environment.set(\"password\", \"Inverness$1\");\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"username\": {{username}},\r\n    \"password\": \"{{password}}\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/account/signin",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "account",
                                    "signin"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Marketplace Cart",
                "item": [
                    {
                        "name": "getMarketplaceCart",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Message Check \", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Cart retrieved successfully\");\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/cart/getMarketplaceCart",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "cart",
                                    "getMarketplaceCart"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateMarketplaceCart",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImI2YmFlMDk2LTU3NDAtNDhiNS04NDgzLTc4MTUxNTgzZDBjZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI3MDM1NjA0LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjcwMzkyMDQsImlhdCI6MTYyNzAzNTYwNCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.GEs38VOCxoSF-vlCPMTr06dwiLi8-DvuI0KIhd6kokcfpsgfasleWnZ-4_owpnek7VtlN-mdd3q-UIUGxZg3O6m1fsf9YLmSPsh45fuw0YaK_besUkb3a8Fochvxqdp16RE1w7OVUpQlj35i2TLmdI9LH_jEL-2LV37X4lz-m9z_oTrrCYQMPsg-vRV0OmIUUfSlpcx9TXFaSzp3gG9dkd---AkN2nyM_6DFiHm4ep0JPuOtk3JvuD97zZ7rTKcYEDOaMddV_MsjHeoUldDTLd7JaiHLvmvjbkLF1C_Zku2vrOyx66hNdm5D_bxox5IeJjQ9exrzKATCusDFw1QYuw"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"contents\": {\r\n        \"618cb3f0556e8c37b21f059d\":50\r\n    }\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/cart/updateMarketplaceCart",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "cart",
                                    "updateMarketplaceCart"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "removeItemsFromCart",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"contents\": {\r\n        \"618cb3f0556e8c37b21f059d\": 1\r\n    }\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/cart/removeItemsFromCart",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "cart",
                                    "removeItemsFromCart"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "ClearMarketplaceCart",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjdiYzM5YzI0LWQyYjAtNDNlOC1iNDhjLWI0OGI2MWFlMzViMyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI2OTE1MzY1LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjY5MTg5NjUsImlhdCI6MTYyNjkxNTM2NSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.F-hf-HL9m8njDTQhfKp70LuXh7jeZbc-i298dURy7KXxwMdtxoGzUtY6oeTyblls5OR_jFKYufB8nrTaZU7MK9m3IYXo5UlRKHm1nlMaXfuquYU0QCH-YGdEq95amT9PRYlH0YOg4A-ant00O9C5j0T5b33e3wnmFNnIAd48LD3924-pR0Y00SxLee5geBp0GjBtkA7WhNqtuOhCeOYRfH7oYjrLmYV9G6hvrGKoMVHaDPc7jT87228CCGHtQqG38OaQ2lYbkHL6S5cyQ-psnNzYJbH1yTDJTvgl_OXSgACL9i4VdimlXJCpeNq00c1rctb-AyXyi8NUd-l5mENtVA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/cart/clearMarketplaceCart?cartId=618cb3f0556e8c37b21f059d",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "cart",
                                    "clearMarketplaceCart"
                                ],
                                "query": [
                                    {
                                        "key": "cartId",
                                        "value": "618cb3f0556e8c37b21f059d"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getPaymentPublishKey",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/payment/getPaymentPublishKey",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "payment",
                                    "getPaymentPublishKey"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "PurchaseMarketplaceCart",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjdiYzM5YzI0LWQyYjAtNDNlOC1iNDhjLWI0OGI2MWFlMzViMyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI2OTE1MzY1LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjY5MTg5NjUsImlhdCI6MTYyNjkxNTM2NSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.F-hf-HL9m8njDTQhfKp70LuXh7jeZbc-i298dURy7KXxwMdtxoGzUtY6oeTyblls5OR_jFKYufB8nrTaZU7MK9m3IYXo5UlRKHm1nlMaXfuquYU0QCH-YGdEq95amT9PRYlH0YOg4A-ant00O9C5j0T5b33e3wnmFNnIAd48LD3924-pR0Y00SxLee5geBp0GjBtkA7WhNqtuOhCeOYRfH7oYjrLmYV9G6hvrGKoMVHaDPc7jT87228CCGHtQqG38OaQ2lYbkHL6S5cyQ-psnNzYJbH1yTDJTvgl_OXSgACL9i4VdimlXJCpeNq00c1rctb-AyXyi8NUd-l5mENtVA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/cart/purchaseMarketplaceCart",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "cart",
                                    "purchaseMarketplaceCart"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetOrderHistory",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjRjMTMwMDRlLTgxM2ItNGU2MS1iOThhLWFkY2U3YzBjZDYzYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI3OTY2NDgxLCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2Mjc5NzAwODEsImlhdCI6MTYyNzk2NjQ4MSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.kaEpxq5EbJsmZvoiAPQ-kNXesXejq1gLnRLKhjf2rvQgruXo8DHiy84_nvKB8GmkKthzDug0C91uuU7clMhJGj7e8lGiyzE38Ra5EYqodrWtz6JwN18f0sVPXcGSOPci0EAgSDt4nXp01VCd0rLYLYOJ21JcTASMb9LVwCBQ0QR5JMN1CSOOrTMRcWx7bCEfzOHWvoX8u_A81KSnV0Q5H0QLwbnOOi8p93SaDZQCnh4emNL6T6U4AP0dBHkYh2EYaEPqVvnSFhYUTFKK8Ch2rGWX5twBP0bZxVXvN9rgF-niVEWV8cjjPByD1PZcM8_bv1QNz7R7u1wKtunKD4G7-A"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/cart/getOrderHistory",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "cart",
                                    "getOrderHistory"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getPaymentPublishKey",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/payment/getPaymentPublishKey",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "payment",
                                    "getPaymentPublishKey"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "License",
                "item": [
                    {
                        "name": "getAllLicenses",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/productlicense/getAllLicenses",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "productlicense",
                                    "getAllLicenses"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getLicense by providerId",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/productlicense/getLicense?providerId=616ec7c02978ae6f49b843bb",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "productlicense",
                                    "getLicense"
                                ],
                                "query": [
                                    {
                                        "key": "providerId",
                                        "value": "616ec7c02978ae6f49b843bb"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getLicense by contractId",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/productlicense/getLicense?contractId=61c99a96c5e0c56d213d0a4f",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "productlicense",
                                    "getLicense"
                                ],
                                "query": [
                                    {
                                        "key": "contractId",
                                        "value": "61c99a96c5e0c56d213d0a4f"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "Create License",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "warning": "This is a duplicate header and will be overridden by the Authorization header generated by Postman.",
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGZkNTc5MS1jNGYyLTQ5YzMtOTg0Ni01ZTlhZjM0MDA3MGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MDYwMjEwNiwiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDA2MDU3MDYsImlhdCI6MTY0MDYwMjEwNiwianRpIjoiZDQ4MGJjNzAtYzJlNy00M2UzLWE5YmMtYWViYzBiOTViZTQ0IiwiZW1haWwiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiTlMiLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsIm9yaWdpbl9qdGkiOiIwZmFmMmY2MS00MjRjLTQ3NDktOWIyNC0xMDY2YjdmNzEyNTMiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIyYjU0MmNlNC00MjI0LTRjOGMtOTc0Yi02NWI0MTNmYjU1MTIiLCJjdXN0b206Zmlyc3ROYW1lIjoia293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Imtvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoia25zQ29uc3VsdGFudHMiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.NDpMDXUMeBa_A-09AZ30RaYwXHPgqDwYQ262gFz-BDo7OBb4P7e6nauGZEYPUGAogBAw27Fdv8pK_2npwNJ6P8YxDktCafruqh923vYxrTKgo0T3o1E14hH1QCjQesOvlhqyfSXmipxcFiKMlMiUv4SL32orr8NIosQAnwxe6Bs0r7LAmpb1J4s-ooB5Eq0SsKqb6C_qUVbAZDHEH34uCQa3VAhG3vgfhFSyUJYcraTMVSDlTo4D3qm66ebB-rl8_2jdyc7HVUhD8-chScJEDQKqCoDpqkGicroqm1y3g83XGfVlp4cGLgYUeyIJZQcYjbs03sbWVf007PQQRJB29w",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n  \"provider\" : \"616ec7c02978ae6f49b843bb\",\r\n\r\n  \"name\" : \"Test Contract 007\",\r\n\r\n  \"type\" : \"free\",\r\n\r\n  \"variables\" : [ {\r\n\r\n    \"name\" : \"Exclusivity\",\r\n\r\n    \"values\" : [ \"Exclusivity\" ],\r\n\r\n    \"multiOption\" : false\r\n\r\n  }, {\r\n\r\n    \"name\" : \"DataUsages\",\r\n\r\n    \"values\" : [ \"Research\" ],\r\n\r\n    \"multiOption\" : false\r\n\r\n  }, {\r\n\r\n    \"name\" : \"SubLicense\",\r\n\r\n    \"values\" : [ \"Sublicensing  right\" ],\r\n\r\n    \"multiOption\" : false\r\n\r\n  }, {\r\n\r\n    \"name\" : \"LegalEntities\",\r\n\r\n    \"values\" : [ \"Named Legal Entity Only\" ],\r\n\r\n    \"multiOption\" : false\r\n\r\n  } ],\r\n\r\n  \"licenseDurations\" : [ {\r\n\r\n    \"value\" : 1,\r\n\r\n    \"name\" : null,\r\n\r\n    \"type\" : \"MONTH\"\r\n\r\n  }, {\r\n\r\n    \"value\" : 6,\r\n\r\n    \"name\" : null,\r\n\r\n    \"type\" : \"MONTH\"\r\n\r\n  }, {\r\n\r\n    \"value\" : 1,\r\n\r\n    \"name\" : null,\r\n\r\n    \"type\" : \"YEAR\"\r\n\r\n  } ],\r\n\r\n  \"territories\" : [ \"All\" ],\r\n\r\n  \"isProviderFormat\" : false\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/productlicense/createLicenseContract",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "productlicense",
                                    "createLicenseContract"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "Delete license",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/productlicense/deleteLicenseContract?contractId=61c99a96c5e0c56d213d0a4f",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "productlicense",
                                    "deleteLicenseContract"
                                ],
                                "query": [
                                    {
                                        "key": "contractId",
                                        "value": "61c99a96c5e0c56d213d0a4f"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "Update License",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n        \"_id\": \"61c99a96c5e0c56d213d0a4f\",\r\n        \"provider\": \"616ec7c02978ae6f49b843bb\",\r\n        \"name\": \"Test Contract 11007\",\r\n        \"type\": \"free\",\r\n        \"variables\": [\r\n            {\r\n                \"name\": \"Exclusivity\",\r\n                \"values\": [\r\n                    \"Exclusivity\"\r\n                ],\r\n                \"multiOption\": false\r\n            },\r\n            {\r\n                \"name\": \"DataUsages\",\r\n                \"values\": [\r\n                    \"Research\"\r\n                ],\r\n                \"multiOption\": false\r\n            },\r\n            {\r\n                \"name\": \"SubLicense\",\r\n                \"values\": [\r\n                    \"Sublicensing  right\"\r\n                ],\r\n                \"multiOption\": false\r\n            },\r\n            {\r\n                \"name\": \"LegalEntities\",\r\n                \"values\": [\r\n                    \"Named Legal Entity Only\"\r\n                ],\r\n                \"multiOption\": false\r\n            }\r\n        ],\r\n        \"licenseDurations\": [\r\n            {\r\n                \"value\": 1,\r\n                \"name\": null,\r\n                \"type\": \"MONTH\"\r\n            },\r\n            {\r\n                \"value\": 6,\r\n                \"name\": null,\r\n                \"type\": \"MONTH\"\r\n            },\r\n            {\r\n                \"value\": 1,\r\n                \"name\": null,\r\n                \"type\": \"YEAR\"\r\n            }\r\n        ],\r\n        \"territories\": [\r\n            \"All\"\r\n        ],\r\n        \"isProviderFormat\": false\r\n    }",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/productlicense/updateLicenseContract",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "productlicense",
                                    "updateLicenseContract"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getLicense",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/productlicense/getLicense",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "productlicense",
                                    "getLicense"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Curve",
                "item": [
                    {
                        "name": "SignIn",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"UserName Check\", function () {\r",
                                        "    pm.expect(jsonData.data.username).to.eql(pm.variables.get(\"username\"));\r",
                                        "});\r",
                                        "pm.environment.set(\"usernameqa\", jsonData.data.username);\r",
                                        "pm.environment.set(\"idTokendev\", jsonData.data.idToken);\r",
                                        "pm.environment.set(\"refreshTokenQA\", jsonData.data.refreshToken);\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var username=pm.environment.set(\"username\", \"jenkins-warmer\");\r",
                                        "var password=pm.environment.set(\"password\", \"Inverness$1\");\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"username\": {{username}},\r\n    \"password\": \"{{password}}\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/account/signin",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "account",
                                    "signin"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllCurveDefinitions",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NThhOWRmZS0xMTY3LTQ5ZjMtYTIyZC03ZWIxMjIzMWEzOTQiLCJjdXN0b206ZGF0YVVzYWdlcyI6Im51bGwiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9Ec1VZS1hyVW4iLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY3VzdG9tOnRvdGFsRW1wbG95ZWVzIjoiMTAiLCJhdXRoX3RpbWUiOjE2NTQ2NzAyODEsImN1c3RvbTpqb2JUaXRsZSI6IkRldmVsb3BlciIsImN1c3RvbTpfaWQiOiI2MjlmNDZmYWQxMmQxODQwZTA3MmUzZjYiLCJleHAiOjE2NTQ2NzExODEsImlhdCI6MTY1NDY3MDI4MSwiY3VzdG9tOmVudmlyb25tZW50IjoiZGV2IiwianRpIjoiNTg3MjYwNDYtMDA1OS00ZWNhLTlmMjYtNmIwNDk1MDBiM2ZjIiwiZW1haWwiOiJuYXZlZW5rdW1hci5idkB2ZW50cmlrcy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOmxhc3ROYW1lIjoiQiBWIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiIwYjFhMmUzYi03YzMwLTQyOWEtYmNmMy0zM2FlNmVhNWEyZjkiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIxMjc0NDE1Ni0xNDlhLTRjODgtYjYwMi1hOTQwMGQ5YTVlYzYiLCJjdXN0b206Zmlyc3ROYW1lIjoiTmF3aW4iLCJ0b2tlbl91c2UiOiJpZCIsIm5hbWUiOiJOYXdpbiIsInBob25lX251bWJlciI6Iis5MTkwMzY1MTM4OTQiLCJjdXN0b206Y29tcGFueU5hbWUiOiJWZW50cmlrcyIsImZhbWlseV9uYW1lIjoiQiBWIn0.Vjfa8kZsrHQAhKMYJvZbroyvhgZNOA1po6fNJPaRZlGUDjNj_jHgcjxrlsZcEQf4-AU5Sfpc6nDmakzqgGIAKiDgwREdAnG7jha6mzMzdskWiVuCrYhMqqcpFNG-IQ_KimSp7ovpocCF8uKPoNZvcHQSe1Kem3t9uTR4MDqytiidYE5BRkLKMN5cCX8Z6Jjgrua7SPqE03fipal81BVXr-vvkierCr3D_UCXwGHu2EWHorf4752AnlTVx8WZA6Y5EWkrTrfcVqVLqHH7BSLDGdOSOg9oQ_1uu5YvJKoDT36bmXBK0wP4rugLBW0FNEPmz7t_ISza30PPfkK8mAh_ow",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getAllCurveDefinitions",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getAllCurveDefinitions"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllCurveDefinitionInfos",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NThhOWRmZS0xMTY3LTQ5ZjMtYTIyZC03ZWIxMjIzMWEzOTQiLCJjdXN0b206ZGF0YVVzYWdlcyI6Im51bGwiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9Ec1VZS1hyVW4iLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY3VzdG9tOnRvdGFsRW1wbG95ZWVzIjoiMTAiLCJhdXRoX3RpbWUiOjE2NTQ2NzIwNTgsImN1c3RvbTpqb2JUaXRsZSI6IkRldmVsb3BlciIsImN1c3RvbTpfaWQiOiI2MjlmNDZmYWQxMmQxODQwZTA3MmUzZjYiLCJleHAiOjE2NTQ2NzIzNTgsImlhdCI6MTY1NDY3MjA1OCwiY3VzdG9tOmVudmlyb25tZW50IjoiZGV2IiwianRpIjoiMDkwZDkyYTEtN2Q4MC00NzgzLWE5OTktODAzZmM4OTc1OWIzIiwiZW1haWwiOiJuYXZlZW5rdW1hci5idkB2ZW50cmlrcy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOmxhc3ROYW1lIjoiQiBWIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiI1NWZiMWQ4My1kMDNiLTQ4ZTItOGRmNS1hN2QzYjkxYjhhNjciLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI5ZjNlMTg0Yy0yZDAwLTQ3OGEtOTliNC1jNGRlM2I2ODBhMGYiLCJjdXN0b206Zmlyc3ROYW1lIjoiTmF3aW4iLCJ0b2tlbl91c2UiOiJpZCIsIm5hbWUiOiJOYXdpbiIsInBob25lX251bWJlciI6Iis5MTkwMzY1MTM4OTQiLCJjdXN0b206Y29tcGFueU5hbWUiOiJWZW50cmlrcyIsImZhbWlseV9uYW1lIjoiQiBWIn0.egyWhHxrlg_MOgO9O9tu04Zno12QzKy0cn-5PhnfORdXHliwYEYsmY3GRmAe5GogmcECKpLc6DsBI-4jcv5cnNK-nF9UjNnZzuv2XwWD7V_RVpX3E5fujMKMyX42Pu_SOFl8_YswsFKscfb4xiXBZJFqvT7_MTcrArXAdoKrvhw0EFjzQduUOUQY9ILW4tuFB88cV8ZmiM_hyPnhWKPWXtYDvOyCCzc-zoUhyW1dIMydxxXTieOmqrz4MsCeo7CA0jDWFGBHteR0IILOaBp6BEbHiR-AWrPfHwB8cLlvPcHHn7FGHKx-N0YrPkRPQGz40bryj91UX9E6QP3SOobRDw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getAllCurveDefinitionInfos",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getAllCurveDefinitionInfos"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllBuildExecutions",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MzU0OTI2MCwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY1MzU1Mjg2MCwiaWF0IjoxNjUzNTQ5MjYwLCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI1MzZiMWIyMC0yZGMxLTRkZDQtYTU3My00NTkxMTgwNDgzY2YiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiIyNDBmNmUwMi0zY2EyLTRhZWMtYWNkYi0xMjY4ZGQ4NjRiMTMiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIwOTE0NDAyNS0xMTkzLTRjZGUtOWRkNS01Y2ExNmM0ZjUxNzQiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.EjhPPcsiath4kAF2l69KZGAE3LPj5-GbGoTu0GWLQFRJtNd_ySfJZGdZMb9i01PFRXng3W4bkqN9uHR_BPKxRefoj32J1Y-i-NqfiZ00NHDWkSgSCbwjJ5b8ID7HoMm0TH_GqQRDrfcGhdNu80tqLydToLfsX7CVxsfyWcSCTmbIrkkySiDZrAD0s_SbIJM__Sa7PLKDoB1PCTDDT6BEnrY36Hhu2BVrDHwVswstIaAIZDskFS96WtSzuGXfHqnLMEikXK-Ke3-hXElnH0XeTWsLbcn13uPxDtGKphgp2zCpvYFf134gbbXjDg9bHJiZwzHnh7KUdTOGsDz8x8buFg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n\t\t\"curveDefinitionId\": \"627b92e33ba8d94461ec27c1\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getAllBuildExecutions",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getAllBuildExecutions"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetProcessLogs",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1Mzg5NzY2NywiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY1MzkwMTI2NywiaWF0IjoxNjUzODk3NjY3LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIxMWI1ZGFjZS0xNGY2LTRiNmYtOTVmNC03YzkxNTcyNzdhOTMiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiI5MWM2ZWMxYS01ZWIxLTQ1OGQtYjc4ZS1jZDk0MDA1YzI4ZDMiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI2YjIyYmQzYi04MTZmLTQ5M2ItYjYzMy01ZGQ4ODMxNGMyM2EiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.s6BcTeZIdOm-lSIBdiFMHFXniuLqRRC5fgGaGkEZvJXmqtpOr1nrJBLBN_2YCacOdHEE3lLXwLtFSlyI4iqlzU56lYLv8v6QnbowqSAgAZmVHA0HwEki1jkiNW2qxCCBmw5P5zPcgpUa1QCX6oR0zUD5X0_NCONBcDnJrAtPxrLsIH50JMmeOlxvTL06jx3icXwyu4FZj5I_hn34HPudqEY3aBy1R8seRGLaAayiuMXOv-Jg0HZvSGnWzlgUGgdWScZRTj2O_2i9CXPhjPOo8StrBvS5x4SRyfu7TSPC6DR0cDcEZZYYXzKxZjTbdVxqwmHkfNSSQERpgwr2rm7_fw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n\t\t\"curveId\": \"628e153edbda2a3bd4d1a71c\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getProcessLogs?skip=0&limit=3",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getProcessLogs"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "3"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateCurveDefinition",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjMzNDIxNSwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjMzNzgxNSwiaWF0IjoxNjUyMzM0MjE1LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJmY2Q4M2UzNi05YTM1LTRiOGUtYjE0YS0yNjk3ZmNiYjNkNjUiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjhjNDJiMWFmLTJmOWMtNDdmNS1hNGMwLTI5YWQ2YTI0ZTZkMSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjUzOGY2ZDdjLTdlMWEtNGJmOC1hOWVkLTk5NDU4YTc3ZWZlZSIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.L0Ju6c5goKXWnwtDK7EJ66WfsK-a1gtJcri8coHW5p4PFmPM5SK1bltEHGlX7sP0tLmyqb-REEpM0D0MaUalgxpDTcKV0s2VoYs4J1qE_Z0z5_sMWgxG0-GxDZke4Juf0wYcMNtq-darXgN1NMRrNRZDIBNj_k9DgPnI1eZvzApRMMPbraVx53lJeMovG4v7k6PWOf90fdApQzgum6pGZgck8jD2sQT0dco7_AQyvmJGbzkL1r36qmVeLEco55Vnqij8830p8Sj3jN9rGGO_PXTYNNmINNii_TyeKmfPjqlpAcOdZIIZMu9atWtW_tBTAqTMuvGeiw9hl4n9zekloA",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"_id\":\"634563001f96ab33b7295ad4\",\r\n\t\"name\": \"test90044\",\r\n\t\"description\": \"\",\r\n\t\"category\": \"test900\",\r\n\t\"metaData\": [\r\n\t\t{\r\n\t\t\t\"name\": \"\",\r\n\t\t\t\"value\": \"\"\r\n\t\t}\r\n\t],\r\n\t\"holidayCalendar\": \"HENG\",\r\n\t\"expiryCalendar\": \"RMSPECTRONM\",\r\n\t\"currency\": \"EUR\",\r\n\t\"unitsOfMeasure\": \"\",\r\n\t\"decimalPrecision\": 0,\r\n\t\"profile\": \"\",\r\n\t\"buildType\": \"MARKET_BASED\",\r\n\t\"fillType\": \"NONE\",\r\n\t\"contractInputType\": \"BOTH\",\r\n\t\"isOverlapped\": true,\r\n\t\"roundingMethod\": \"UNNECESSARY\",\r\n\t\"showActions\": false,\r\n    \"userEnteredModifiedReason\" :\"Test\",\r\n    \"modifiedReasons\" : \"VT\"\r\n\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/updateCurveDefinition?setToProd=false",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "updateCurveDefinition"
                                ],
                                "query": [
                                    {
                                        "key": "setToProd",
                                        "value": "false"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteCurveDefinition",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0OTI0ODk1MSwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY0OTI1MjU1MSwiaWF0IjoxNjQ5MjQ4OTUxLCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI3MTZhMTBjMC1lMWQ4LTRmODAtOTFhMi01Mjk1NDI5YmNkYWEiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiJjMTc0MTFkNi0wODE2LTRlYWMtOGZlZi1mNmU2ZTNmNjQ1NzgiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIyOThkMmZkMy0zZTgxLTRjYWYtYjc3MC01N2FkZDhlOGI0NjIiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.qJkzSMtwETx-VrEf_IahD6SS701SimSMHP4Dn5rVhtYwPeqkwVw2B7D7xQ9TlwMyCZKHTY7KlWIN7DvO24EY7CNhtPVgwFCTu5M309to640dhE3z1NkfszCybQ9se0zyJa08vYFycZNzAeMZJzln845PqpG8eKuZWB2Rp1GwXEZveNx1Xe2un1Hu2ieXJKAzYkP5tmtvqgveVyQuTE54vh3ZGaKRuZGM4_JvUWtBBC0SgJzoz-wp5j_bnbVI0xEIaWzISDfwHRIceY4Uj-9WmycsnGzuDNofJGyQHK2oWUH-9yHwPaDDvAskwRDP7o5gflN1IXhn-qk8V7vNxOpdtQ",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/curve/deleteCurveDefinition?id=634563001f96ab33b7295ad4",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "deleteCurveDefinition"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "634563001f96ab33b7295ad4"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "CreateCurveDefinition",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJYWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhMmNjNjMzNS1lZDM4LTQ2YmItOTk4OC0wNmRkMWExYTViNDIiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoiW1wiQ2xpZW50IGZhY2luZyB3ZWJzaXRlIG9yIGFwcFwiXSIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmJ1c2luZXNzU2VjdG9yIjoiRW5lcmd5ICYgQ29tbW9kaXRpZXMiLCJjdXN0b206Y29tcGFueSI6Im5hd3Rlc3QiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo1OTEzODA1MjM2NjY6cm9sZVwvUm9sZUNvZ25pdG8iXSwiY3VzdG9tOnRvdGFsRW1wbG95ZWVzIjoiMS01MCIsImF1dGhfdGltZSI6MTY1Mjg0OTI4NiwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyODI2NGE2YzFmNTI3MjUwNmQyYWMzNCIsImV4cCI6MTY1Mjg1MzAyNiwiaWF0IjoxNjUyODQ5NDI2LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJmNDYyMzhlYS0yZWEwLTRkMmQtYTM2MC1jMTIyYjFmNmQ3ZmUiLCJlbWFpbCI6Im5hd2luLmJ2QG5hd3Rlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJCIFYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF3aW4uYnZAbmF3dGVzdC5jb20iLCJvcmlnaW5fanRpIjoiMThlYmI0NDItZWMyOS00NWMwLWIzZjgtZDczZjA1NTYxNzJkIiwiYXVkIjoiNGU2c2dxZWszczVxdnRwYjRqamp1YTlnbGMiLCJjdXN0b206Y291bnRyeUNvZGUiOiI5MSIsImN1c3RvbTphY2NvdW50X3R5cGUiOiJCVVNJTkVTUyIsImV2ZW50X2lkIjoiM2EzMjIwNDctMjg1Yy00NzVlLWI4MzQtNDVkZmRlYWViNWNiIiwiY3VzdG9tOmZpcnN0TmFtZSI6Ik5hd3Rlc3QiLCJ0b2tlbl91c2UiOiJpZCIsIm5hbWUiOiJOYXd0ZXN0IiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzk0IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoibmF3dGVzdCIsImZhbWlseV9uYW1lIjoiQiBWIn0.vHD2FfaOha7qSwDPlSLWcbl2rYzPbVQpKsZ3phjunNEi5jghOaVxsBjgWLKKwS4Zy8amYD-etStVHgRaVDkOvTr45e7-tr89KixsfUWihP-ckKD2wtwMbyw8_khPVrwESx7BNF6pc9x1rMdAYCw2kIrhQuQAjPX5IR1kKWU5OwTDlpeAvIXTI1EoX5jfRuIkrFNflIylGYIWxBO2gUAePz91sDKogXYskX9Vl00DmPwx4LfmhsFGoNT72SdbQKsOPgKVxtVFL7PnjxaMbnKaIc-d-LTSbknJdMwq8PCiEgDzgQLhzgnBTs6rFtX0k_u5gREokHZobziNY0GQDwg-fQ",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n\t\"name\": \"test900\",\r\n\t\"description\": \"\",\r\n\t\"category\": \"test900\",\r\n\t\"metaData\": [\r\n\t\t{\r\n\t\t\t\"name\": \"\",\r\n\t\t\t\"value\": \"\"\r\n\t\t}\r\n\t],\r\n\t\"holidayCalendar\": \"\",\r\n\t\"expiryCalendar\": \"\",\r\n\t\"currency\": \"\",\r\n\t\"unitsOfMeasure\": \"\",\r\n\t\"decimalPrecision\": 0,\r\n\t\"profile\": \"\",\r\n\t\"buildType\": \"MARKET_BASED\",\r\n\t\"fillType\": \"NONE\",\r\n\t\"contractInputType\": \"BOTH\",\r\n\t\"isOverlapped\": true,\r\n\t\"roundingMethod\": \"UNNECESSARY\",\r\n\t\"showActions\": false\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/createCurveDefinition",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "createCurveDefinition"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCurveFilters",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0OTEzOTg1NCwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY0OTE0MzQ1NCwiaWF0IjoxNjQ5MTM5ODU0LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJlYWFmODBhNy1jNjMzLTRkY2YtOTAwNi1hZjIwMmY5ZTBjYTciLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiJmNzZmNTk3Ni01ZDMyLTQ3ZDgtOWI2Zi1hY2JmM2YwMDZkOTciLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJkMmRjYTVhOC04YjQ2LTQ0NzItYTQ5Yi1mZDg1ZDMzMjFkYjkiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.NJYnpZ9NnzapfPyM2bi-yB01XKupywpkPKGr7UHbFuPhMQmEZguOB0mGAAIv7juN5eoCpCprFnUi7R9Hvzx9k57v1lBNjTAS0z1HAi_al2TVuEbc-9yDAJ6MSdgvZyVVqO8Q-mTQYobafScmR8WnZYyQXtEJqsLd-5SyOvAI4xF1kyxrIjUiRK5CX1pql-KdA5osurmLp9whLYXyG2VS1UBAj78xUnxJFyinC0d0ifSVNnQh2SlWHMyFiHucUgY41D_0_o6SBkTg3koguY9RY14xNJB_R01RTTLyXSADkBVaSJSLJQVtmPT-FEnEBGb_4UpvZDiZw9CDF5kDwDgQng",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"depth\": 1,\r\n    \"searchTerm\": \"\",\r\n    \"type\": \"CURVE\",\r\n    \"productSearchCriteria\": null,\r\n    \"assetSearchCriteria\": null,\r\n    \"eventCalendarSearchCriteria\": null\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/getDefaultCategoriesAndFilters",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "getDefaultCategoriesAndFilters"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "AddCurveInputs",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjI3NjA5OCwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjI3OTY5OCwiaWF0IjoxNjUyMjc2MDk4LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIwN2RhYjk1ZS1mY2UzLTQ3NzEtOTM3Yi00Mjg3ODJlNzFkMTciLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjEyNWEwZjU2LTJlOTItNDU2MS1hYTRkLTZhZWNmYzRjNjNiNSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6ImE1MTBmODE5LTllNTMtNDNjYi1iMmI0LTc0ZjYxOTZiZWZjYyIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.zjrbJzqx0mNxB_6yJT7Buph1Q15pmFNC4mEtxYAtx8u-QC8RSnldVmP6CEKylfyqJBvIYfzndYrWz176GTmilnxQSFDWRVEAoHUk08QELeDt6kAxOlGSWOpRyUWr7eHklpc6GbmrfqRY2a3Vrbrrh6VARFdJ49Yk3w-ZnMxi6J3haqu6FGOuokiNNnGt3LNQQtGs31cw_MvpMediTBHCV-aOBEDGD5X0hIGgNdh6h2AJim2VCUW_B5FyzJpi_fYIoO2JOG2C-QiO-Z7q8Q0hdY0AsG9JijHQgbgRH2PkKvzdQ4t4O_D6CK0E8wt7nMP9vMKPgQUzKjGdg0cE_ra7wQ",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "[\r\n    {\r\n        \"supplier\": \"CEGH\",\r\n        \"dataCategory\": \"Energy and Commodities\",\r\n        \"dataType\": \"Natural Gas\",\r\n        \"productDescription\": null,\r\n        \"role\": null,\r\n        \"profile\": \"SETTLEMENT\",\r\n        \"offset\": 0,\r\n        \"sequence\": 0,\r\n        \"conversionParameters\": null,\r\n        \"fields\": null,\r\n        \"propertyList\": null\r\n    },\r\n    {\r\n        \"supplier\": \"BOVESPA\",\r\n        \"dataCategory\": \"FUTURES\",\r\n        \"dataType\": \"AGRICULTRE\",\r\n        \"productDescription\": null,\r\n        \"role\": null,\r\n        \"profile\": \"SETTLEMENT\",\r\n        \"offset\": 0,\r\n        \"sequence\": 0,\r\n        \"conversionParameters\": null,\r\n        \"fields\": null,\r\n        \"propertyList\": null\r\n    }\r\n]",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/addCurveInputs?curveDefinitionId=63464ef83879cd35f12c8a13&forceUpdateSettings=true",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "addCurveInputs"
                                ],
                                "query": [
                                    {
                                        "key": "curveDefinitionId",
                                        "value": "63464ef83879cd35f12c8a13"
                                    },
                                    {
                                        "key": "forceUpdateSettings",
                                        "value": "true"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCurveDefinitionInputs",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1Mjk1NTQ3OSwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY1Mjk1OTA3OSwiaWF0IjoxNjUyOTU1NDc5LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI3MzdjYjk4MC03MjZmLTQ0YTQtOTBlYi0xMGEzMTM1MDhkYTciLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiI5YTc5ZTkyYS0zMWNmLTQ4ZmUtYjA1Yi0xNWM0ZTVkMWI2MTQiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJlN2M0NzBiYy02MDMzLTQwODYtYjVmZC1lNTU0NDYwMWI4ZmEiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.kKqAVmhP6v1enwH4EHrrNfZmSs7nP_G3n0Jw3VhewBNB94-nYava0ADnA_ENURX4eFdTU_RS-IHnEkuOrm6i2bhr-tPaR6uTGjVdNmVWFYL4aWpxf9w3ZEmLmthI36PZ5FcuvyDOuTWSbRYtNLwjCHaDsS2uNE5ldRs_amjTirkv50iFEnVbsQKJA6KzweasUfX9vzykuWlOTy_As2uhwcL9lvfGN_WYuWbW_9hMagm57coo_SGgt3dOK77sUVV6cUG-Fydy48HZnNy-1Ff9DvXK-YRDCb1PybrKz_GviV_GvjCyB8czuCOxjzOQ51hABAq1vUOkgfTOcfR6FScYWA",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveDefinitionInputs?id=6284ca3a13e7280d5c86a8ea",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveDefinitionInputs"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "6284ca3a13e7280d5c86a8ea"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "RemoveCurveInputs",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0OTMxMjYyOCwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY0OTMxNjIyOCwiaWF0IjoxNjQ5MzEyNjI4LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIwMGE5ZmRiNy1iNGU3LTQ3ZWUtYTY4Ni00NTEzZDMxY2RjYjAiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiIwZDg2NDNkOC04OWUwLTRjNDEtODI3NS1iMDYxZjNlNTdlYzYiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI5ODI0YWJmMC1kNzE4LTRmZjgtYjIyNC02NmM5NGI0Y2FiOGUiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.dsgEc_3IEywgIMH_7OCmcuho393NiJ41gdZXeMoF_Fx-R-2_ruauj4QQblVPi3GLtOR0CFkDde_19mneZvkBLwRwkbnL3npj2asc4cfm9IldSWdFvx5ffBWRJCGnY71jFC_kOEPvm8BxK7uqDySUrk1aDxd37yLxSa8uO-0pLU7D5Hpg2qeuiHWH-aMe676MgzB0_5V_k2A_I4T8TmrX_4jy43nPoRLjzEoQVN_1Hr5vdu27j6MkkGmpy-FE4IojzPiljaaf2tLeAfhsEmnx4wBgrZnxt3iMZEXPNFu63aR3zOVZiOVRtT9vxnjeFmANDHvdZ2jyH1PaWRNOFCuGnA",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "[\r\n    \"624e846b63d898306ecdffd8\",\r\n    \"624e846b63d898306ecdffd9\"\r\n    \r\n]",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/removeCurveInputs?curveDefinitionId=624d35e6598e290ce7060bc0",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "removeCurveInputs"
                                ],
                                "query": [
                                    {
                                        "key": "curveDefinitionId",
                                        "value": "624d35e6598e290ce7060bc0"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllCurveDefinitions",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0OTE2Mjg4NCwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY0OTE2NjQ4NCwiaWF0IjoxNjQ5MTYyODg0LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI4NzYzMDljYS1jMWE2LTRiYzctYjE0NS02ODExN2FiZTA3NWQiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiJiZTkyM2Y0Yy1jN2VkLTRlYzQtYTRlOS1kZDI0MjA4OWJjNTEiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiI0ODIzYjJkZS1iNjY5LTRlOWUtOWM3ZC1lYThmNmJhYmI0OGIiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.bCNedOYU7tG7BPPCCaZDQApKd7uYXNJGU84Ujvls7utNz9GJ3xHzq7APjXBYie9ON6I7DdhvDD0svqtEgSYQYwsM15mu5D8NAlpI8N1eaXUYuW9qLm1WvOSuPa22v5TLnDMpjfBaeWplYvc2FbLXfUG84o3XLAskoBgMQPcziX2xgunqQIab-fHBnAbEg_MaVQ_9KE9xLL8m3sPdhwHqLFsfKOVfcPUf3jbFjQ1CdwsN6qcjscv63N7suqIvSkwjNMBPzcaLb3pFSI1ZXVAIp9AroA6dJM6AjScjiTeecHpXghOgfiHgnzNY24QrlbizjBFg-KuXyiTUxl5hUHZhNg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getAllCurveDefinitions?skip=0&limit=100",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getAllCurveDefinitions"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "100"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCurveDefinition",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1Mjc4NDI2NywiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1Mjc4Nzg2NywiaWF0IjoxNjUyNzg0MjY3LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIyMGI3ODk2MC03YzRmLTQwZDUtOWViOC1lY2I1YTg4ZGQzNmQiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjIxOTUyZmI1LWQxZDAtNGI3OC04Y2JjLTY3MDk0OWI5YzQ0NiIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjAzZTliYjUzLWFmNGItNGQ4ZS04OGVmLWQyMDA5ZDU5YjFkMyIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.xcMwv1wHEFhUIzBgUnrMxfqxD9FdH-tNr25VZT-gaPuOn5aVNS4vgg7lHDRfWER24_Mi137wKDD7cXH9T-SQHZ5PmFfuEO2QgDFZtOgWwd0b5fhQ7v7nxpd_7Jq6t8GxbWb8eJVwaos40nvvWP43fOhvgd-DLl7KkLZbdiPXxP1wmLVDanxvcU5JMPf2hy2-022Uo2-wVcfdcmPNw6XIPhWCRpU0T7pICYii1EQoD2X15Uni2l06i1G8ZgG9rymwRqv_7C-l3JUd0dOMsGkvoRwogbPG7EL8AsYHmf4D5v7GQZIQaN2w9zrhnEXkMss6OVQjBdknLGCnj80I6JisoQ",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveDefinition?id=626bb287d4fd5b42e2f0a6ac",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveDefinition"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "626bb287d4fd5b42e2f0a6ac"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCurveDataTest",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1Mjc4OTExMSwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1Mjc5MjcxMSwiaWF0IjoxNjUyNzg5MTExLCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJiOTQ4MDQxOC0yOGVlLTRlNzktOTZjMC05YTg5ZjFjMWIwOTYiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6ImI1ZjMwMmVhLWRiMjEtNGMxNi05ZTMwLTI1MTZlNmZhOTZmNCIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6ImVkMTY4YTYyLTMzZjctNGNjYi1hOWFiLTJlZDc0ZmQxYjkyOCIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.v2hwsJGpHQG2pA-IhJhBRS2tT_xn5dBtIcD9dZdJXwZjivucAaYz11AQXLbLtEz7v7VfLq0zVgsuCLoRJxSju_cxXi8HtUmXxCcCvELM_x2WT9rHO0fOiYfmkAzAPorqjPSpFdfao7xR4bQEaOYFFTHYmW5_XFxO3h-OdAnvPvLk2Jgn0-lrZeKbti_BpM7fCDEzCcwlf5-VinjinAhmMDmSLEtW-r68ACP_Bssf7hyFVO-sJOirwi5ie-sssFJrOYfS6GMive6dSbTtzesgwMn5iOdVDzEjvgasaLa5OfWp4qJpJvVb2Cy5Fruj0FF7fDIX5d-QvrNMf3aPvAUylQ",
                                    "type": "text"
                                },
                                {
                                    "key": "",
                                    "value": "",
                                    "type": "text",
                                    "disabled": true
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveData?curveDefinitionId=627b92e33ba8d94461ec27c1&ondate=07-04-2022",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveData"
                                ],
                                "query": [
                                    {
                                        "key": "curveDefinitionId",
                                        "value": "627b92e33ba8d94461ec27c1"
                                    },
                                    {
                                        "key": "ondate",
                                        "value": "07-04-2022"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCurveDefinitionInfo",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3YWViOTRhYi1mNDMyLTQ5MGUtODkyYi1hNGNmMzBkOGNjMzAiLCJjdXN0b206ZGF0YVVzYWdlcyI6IltcIkNsaWVudCBmYWNpbmcgd2Vic2l0ZSBvciBhcHBcIl0iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9Ec1VZS1hyVW4iLCJjdXN0b206YnVzaW5lc3NTZWN0b3IiOiJFbmVyZ3kgJiBDb21tb2RpdGllcyIsImN1c3RvbTpjb21wYW55IjoidmVudHJpa3MiLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxLTUwIiwiYXV0aF90aW1lIjoxNjUzMzEzOTcwLCJjdXN0b206am9iVGl0bGUiOiJEZXZlbG9wZXIiLCJjdXN0b206X2lkIjoiNjI4YjM3OTgzMWM4NTgwZTkzOGQ4OTFiIiwiZXhwIjoxNjUzMzE3NTcwLCJpYXQiOjE2NTMzMTM5NzAsImN1c3RvbTplbnZpcm9ubWVudCI6ImRldiIsImp0aSI6ImFkMjU5M2JmLTYwZTMtNDViMC1hOWQwLTEyOGNhYTBmZjNkYSIsImVtYWlsIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpsYXN0TmFtZSI6IkIgViIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJuYXZlZW5rdW1hci5idkB2ZW50cmlrcy5jb20iLCJvcmlnaW5fanRpIjoiMjE3ZTIzODctMDlmNC00ZTNiLWI5ZDMtN2IzNTY3YTg5YmIyIiwiYXVkIjoiNGU2c2dxZWszczVxdnRwYjRqamp1YTlnbGMiLCJjdXN0b206Y291bnRyeUNvZGUiOiI5MSIsImN1c3RvbTphY2NvdW50X3R5cGUiOiJCVVNJTkVTUyIsImV2ZW50X2lkIjoiYjIzZjgxMDQtNTgxYi00ZTUxLWFhY2EtZWNlMDY1OTQ5YzVhIiwiY3VzdG9tOmZpcnN0TmFtZSI6Ik5hd2luIiwidG9rZW5fdXNlIjoiaWQiLCJuYW1lIjoiTmF3aW4iLCJwaG9uZV9udW1iZXIiOiIrOTE5MDM2NTEzOTQiLCJjdXN0b206Y29tcGFueU5hbWUiOiJ2ZW50cmlrcyIsImZhbWlseV9uYW1lIjoiQiBWIn0.BCd8doIHovnGE-Jj8rTE8PR-IpSpv7OfHAbwhxlM4eQVizY4RedVHngWB0FSYI1kKEACjTBpUJWgpczm7uX0rdw6K3qAWdI9inzcISxNOnErS0ezSXq_4rI1ZEFbf6BDpvA9FQi_Wd8UzpqtqPlqoPyV9ztZ_Cpr0clNaB5xZ9aKibk6SVr0PFBdCm_uXPC1ZGbgBhJqXvPLf62eO4NyOUnA3sQYKhM7urLfUh7Jw6HwuvbTlD6EV37nPlq9lC3sb_29yp1O9f6eEVseUq2s1XorimrOAn16VRwql66IA-bs07leBu3yaR9mHD8v8RxJXSEcZ8GXsH4YIxzjqQOfDw",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveDefinitionInfo?id=626bb287d4fd5b42e2f0a6ac",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveDefinitionInfo"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "626bb287d4fd5b42e2f0a6ac"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getBuildExecutionDetails",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MzU0OTI2MCwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY1MzU1Mjg2MCwiaWF0IjoxNjUzNTQ5MjYwLCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI1MzZiMWIyMC0yZGMxLTRkZDQtYTU3My00NTkxMTgwNDgzY2YiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiIyNDBmNmUwMi0zY2EyLTRhZWMtYWNkYi0xMjY4ZGQ4NjRiMTMiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIwOTE0NDAyNS0xMTkzLTRjZGUtOWRkNS01Y2ExNmM0ZjUxNzQiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.EjhPPcsiath4kAF2l69KZGAE3LPj5-GbGoTu0GWLQFRJtNd_ySfJZGdZMb9i01PFRXng3W4bkqN9uHR_BPKxRefoj32J1Y-i-NqfiZ00NHDWkSgSCbwjJ5b8ID7HoMm0TH_GqQRDrfcGhdNu80tqLydToLfsX7CVxsfyWcSCTmbIrkkySiDZrAD0s_SbIJM__Sa7PLKDoB1PCTDDT6BEnrY36Hhu2BVrDHwVswstIaAIZDskFS96WtSzuGXfHqnLMEikXK-Ke3-hXElnH0XeTWsLbcn13uPxDtGKphgp2zCpvYFf134gbbXjDg9bHJiZwzHnh7KUdTOGsDz8x8buFg",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/curve/getBuildExecutionDetails?id=628e0673fd74b309f8db249c",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getBuildExecutionDetails"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "628e0673fd74b309f8db249c"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCurveOnDates",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveOnDates",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveOnDates"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCurveData",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "body": {
                                "mode": "formdata",
                                "formdata": []
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveData",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveData"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllCurveDefinitionsbyId",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJ4SmtCZmt3cEhwMEdia3ZGc1JtbERHVFo5OGJyMnNlNHVvRDB0VXVkZ3RNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxODBlODkxNi00M2I0LTQ1YWQtYjBiYS04YjFmMGUxY2I0MGUiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0ODYxNTE0MTU2MzE6cm9sZVwvYXdzLXNlcnZpY2Utcm9sZVwvb3BzLmFwaWdhdGV3YXkuYW1hem9uYXdzLmNvbVwvQVdTU2VydmljZVJvbGVGb3JBUElHYXRld2F5IiwiY3VzdG9tOmxhc3ROYW1lIjoid2FybWVyIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfZzFTd0VRa0x6IiwiY29nbml0bzp1c2VybmFtZSI6ImplbmtpbnMtd2FybWVyIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsIm9yaWdpbl9qdGkiOiI5MjEyNzI5Zi01NDRhLTQzMDEtODlkMC1iNWIwZDMwYThjMTciLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0ODYxNTE0MTU2MzE6cm9sZVwvYXdzLXNlcnZpY2Utcm9sZVwvb3BzLmFwaWdhdGV3YXkuYW1hem9uYXdzLmNvbVwvQVdTU2VydmljZVJvbGVGb3JBUElHYXRld2F5Il0sImF1ZCI6IjFqYzkzNTlrbWpmamVoMTFkZm9hb2lsZ3Y5IiwiZXZlbnRfaWQiOiIxMWM1NWQ3Ny1mZGVmLTQ3MGYtYmUxMC0zNjNmMGVjMDU3ZGMiLCJjdXN0b206Zmlyc3ROYW1lIjoiamVua2lucyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU4Mjk4NzE5LCJuYW1lIjoiamVua2lucyIsImN1c3RvbTpfaWQiOiI2MmNlYTY5ODFkOTE3NDNhYTQzOGYyYjUiLCJleHAiOjE2NTgzMDIzMTksImlhdCI6MTY1ODI5ODcxOSwiZmFtaWx5X25hbWUiOiJ3YXJtZXIiLCJjdXN0b206ZW52aXJvbm1lbnQiOiJxYSIsImp0aSI6ImQ1ODQ3NjQyLThjYTEtNDc0Yi05MmE3LTZlNDU3MzQ3OTllOSIsImVtYWlsIjoiamVua2lucy13YXJtZXJAdmVudHJpa3MuY29tIn0.UpXGwCyOjVyz9sGI8KZ9_06JMwDGiETgbupHnvmlTtEuIIiq9VlR10nlCHwYan44oTsBhI6ubBnygDDvptcipBDtxtyBUDduIc9warESnPj4p2N1fybaL6yYub3CMV6GUUh66bt6cXvAcA7abwrHy2oxxe-s_olERvCHk41SwhXY4bwURjLCD3h2y_JYMuTdoU9dpO-mfNbTLxbkHr5QHftJnREDxhAs2YirbghvUD95gmXA3qISyWqpPll-TSMjJ4pV-GDMwXPgfua02xyIPMj7uPiURqNz4wyHfLL3uJchmDBdxurCzggzhBCIDDnbyW7VS7xp-TLkAIhmqj-xYA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveDefinition?id=xyz",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveDefinition"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "xyz"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllDataProductsInfo",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiYzQwZjE0MC1hZWY3LTQyNTYtOGJiMy05NmM5ZGU0NDNiMDUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9Ec1VZS1hyVW4iLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwiY3VzdG9tOmNvbXBhbnkiOiJWZW50cmlrcyIsIm9yaWdpbl9qdGkiOiJlZDYzOWYwZi0wN2Y5LTRiMGUtOGMyNC0yZjUyMmRhNDRiZTUiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImV2ZW50X2lkIjoiMzQ1NWU0MDEtMzFjZS00MmM0LTk4OTEtNzQ0OThmMDdlYzc4IiwiY3VzdG9tOmZpcnN0TmFtZSI6Ik5hdmVlbiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjYwMjgxMDkwLCJuYW1lIjoiTmF2ZWVuIiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoiVmVudHJpa3MiLCJjdXN0b206X2lkIjoiNjJlYTFlZjY2OTNkNzA1OWQ2MGM4ZmUyIiwiZXhwIjoxNjYwMjkxODkwLCJpYXQiOjE2NjAyODEwOTAsImZhbWlseV9uYW1lIjoiQlYgIiwiY3VzdG9tOmVudmlyb25tZW50IjoiZGV2IiwianRpIjoiZGYwN2Q5OGUtZjFkNS00ODdhLWIyY2EtNWQwN2UwMjVkMzU1IiwiZW1haWwiOiJuYXZlZW5rdW1hci5idkB2ZW50cmlrcy5jb20ifQ.p1AAeDHf7IQzpMi4A2lKUeRZidjOjZ9fk-t4Z8jUsSPohnRndGa-DxMZD3AC9Ccg6CukdjTh_RYp62CwljZMtBV-C3Cl3Wv-59TrkPDNofoZfZLIUFENkW7PaBhCMZvJs69f-ZWQzPLyq8dscdUgH_Ql7GO5R9A0ikUMopl1WjSMPj3hdvhOzlrHTXv55xw6Free1YzdNWXwsWaH0adKiKIBQ5WeFogIJKfTUipGXKoKaEXOlf1vP0lVqY1wjL03Z5etY82WxAa6H9TaxvNgmzoJvn1zGhh-mza98d0KyPQPOJA8KEQoMS1jaI0elvIdHkpmxg6w4Dd0JwOXV9N_UA",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"searchTerm\" : \"Gaspool\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/common/getAllDataProductsInfo?skip=0&limit=10",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getAllDataProductsInfo"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "10"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getBuildLogs",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n        \"curveDefinitionId\": \"627b92e33ba8d94461ec27c1\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getBuildLogs?buildId=6332cceea9cae1411150a71d&skip=0&limit=10",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getBuildLogs"
                                ],
                                "query": [
                                    {
                                        "key": "buildId",
                                        "value": "6332cceea9cae1411150a71d"
                                    },
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "10"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getAllProvidersInfo",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/common/getAllProvidersInfo?skip=0&limit=10",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getAllProvidersInfo"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "10"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetDataFields",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiYzQwZjE0MC1hZWY3LTQyNTYtOGJiMy05NmM5ZGU0NDNiMDUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9Ec1VZS1hyVW4iLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwiY3VzdG9tOmNvbXBhbnkiOiJWZW50cmlrcyIsIm9yaWdpbl9qdGkiOiJhMDhlZmVmYS00YTZkLTRiYjEtYTUzZS1mZDUyODExZmZmNzQiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImV2ZW50X2lkIjoiMGMzMGFlNzYtYzRlNi00NWEwLWI4NDMtY2JmNmQ4YjEwZTI0IiwiY3VzdG9tOmZpcnN0TmFtZSI6Ik5hdmVlbiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjYxMzIxMjA0LCJuYW1lIjoiTmF2ZWVuIiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoiVmVudHJpa3MiLCJjdXN0b206X2lkIjoiNjJlYTFlZjY2OTNkNzA1OWQ2MGM4ZmUyIiwiZXhwIjoxNjYxMzMyMDA0LCJpYXQiOjE2NjEzMjEyMDQsImZhbWlseV9uYW1lIjoiQlYgIiwiY3VzdG9tOmVudmlyb25tZW50IjoiZGV2IiwianRpIjoiZjc3ODMwNWYtZjYzNC00MDlkLTg3N2MtN2Q1ZTY1NjY0YjE4IiwiZW1haWwiOiJuYXZlZW5rdW1hci5idkB2ZW50cmlrcy5jb20ifQ.tAdqLceEkRgLDXuurNhptlPUk3BZLB9N774YEeVaCnh0egPnCx5c2HDQhJwQHB1h01Ze8_Mr1x8N4gxMOBA1ZW1YqmB3sm4zcbS43ZH76Y_l6etzKbzy-tDvNe35walysuiDkeDRjVOeQ9tvHCI6TzRa1VxKBGzTwAG-pxYmyxIo02yZqkMl7db-CC25jwjsMRwva0Ly52H-2NyqW2nlOjk2KmsqMr_OoGzqwJnbNp05zKYYJ4lwuW6ewI-SR5yLMgV9GvXaNEFZdfgXlUbf9QxmZehjzgAiIQ8qjlSo4H4ovDFzkGuzcwC2aP9duqb-rQaXk3s3ivsoCboVN8bD7g",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"providerVid\": \"CEGH\",\r\n    \"etlId\": \"CEGH_DAYAHEAD_MARKET_DATA_CZ\",\r\n    \"dataProductDescription\": \"CZ(CZECH)\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/common/getDataFields?skip=0&limit=10",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getDataFields"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "10"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getCurveDataForSupplierAndVid",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveDataForSupplierAndVid?provider=VENTRIKS&vid=ICE TTF Natural Gas MidPoint Curve&ondate=12-09-2022",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveDataForSupplierAndVid"
                                ],
                                "query": [
                                    {
                                        "key": "provider",
                                        "value": "VENTRIKS"
                                    },
                                    {
                                        "key": "vid",
                                        "value": "ICE TTF Natural Gas MidPoint Curve"
                                    },
                                    {
                                        "key": "ondate",
                                        "value": "12-09-2022"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getCurveOnDatesForSupplierAndVid",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveOnDatesForSupplierAndVid?provider=VENTRIKS&vid=ICE TTF Natural Gas MidPoint Curve&stage=PRODUCTION&skip=0&limit=5",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveOnDatesForSupplierAndVid"
                                ],
                                "query": [
                                    {
                                        "key": "provider",
                                        "value": "VENTRIKS"
                                    },
                                    {
                                        "key": "vid",
                                        "value": "ICE TTF Natural Gas MidPoint Curve"
                                    },
                                    {
                                        "key": "stage",
                                        "value": "PRODUCTION"
                                    },
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "5"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getForwardCurves",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"searchTerm\" : \"\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getForwardCurves?skip=0&limit=10&stage=PRODUCTION",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getForwardCurves"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "10"
                                    },
                                    {
                                        "key": "stage",
                                        "value": "PRODUCTION"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Taxonomy",
                "item": [
                    {
                        "name": "GetDefaultCategoriesAndFilters",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "warning": "This is a duplicate header and will be overridden by the Authorization header generated by Postman.",
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwYTZlZTVmOS1iNzVkLTQ5NzctODVhYS02NjNiNDliM2EwOGEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0MTgwMDgyNywiY3VzdG9tOmpvYlRpdGxlIjoiVlAiLCJleHAiOjE2NDE4MDQ0MjcsImlhdCI6MTY0MTgwMDgyNywianRpIjoiNzQxNDliMjctZThkMi00MDM4LTgxZjYtNTA4ZGMzYzZkZDllIiwiZW1haWwiOiJ2YXNhbnRoLnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJTIiwiY29nbml0bzp1c2VybmFtZSI6ImplbmtpbnMtd2FybWVyIiwib3JpZ2luX2p0aSI6IjM4M2RiZTVlLTU1NzAtNDk1ZC1hNzBhLTcxMzg3ZmU3ZWVhOSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjI1MTU1MjRkLWMzNjgtNDNiZC1hOWIxLTM4ZmEyNDdiMTJjZiIsImN1c3RvbTpmaXJzdE5hbWUiOiJrb3dzaGlrIiwidG9rZW5fdXNlIjoiaWQiLCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJjdXN0b206Y29tcGFueU5hbWUiOiJ2ZW50cmlrcyIsImZhbWlseV9uYW1lIjoiUyJ9.chvjHZ_XjZ-2_tEYPgJnXSh5M3GZPDAXbsSqW-RRT7Y1i0VzlQN9ae_LASABJbH4kjXFe3MKexOrIsw83I11JQuMG79Pou2tvjZrjMrWdq6g69SrSKNLZbDomvVgl2bwMOyT5ae9fT9lstC13yUy_q-l9h6nRV_GRmk4DUW_hUdHvNVCG-cGmwMeNoThuoDY_LWKxBfcpIe2LFVeQrr6n0O1peXVVfY2KcRdyboBF9d2LenccKs7GHhpURWoypiWwhEMaa14F7Grk7on8ea8HcyA6wgeYsT_LEAosXibWqUWxyfTkyQqMkxhcJNIowI_t5vIafbUxy3bacWqPcy-_w",
                                    "type": "default"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"depth\": 1,\r\n    \"searchTerm\": \"\",\r\n    \"dataFilter\": null,\r\n    \"productSearchCriteria\": null,\r\n    \"assetSearchCriteria\": {\r\n        \"name\": null,\r\n        \"description\": null,\r\n        \"searchTerm\": \"\",\r\n        \"searchType\": 0,\r\n        \"propertyList\": [],\r\n        \"uris\": null,\r\n        \"fetchMetaData\": false,\r\n        \"ids\": null\r\n    }\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/getDefaultCategoriesAndFilters",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "getDefaultCategoriesAndFilters"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetTaxonomy",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/getTaxonomy",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "getTaxonomy"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllCategories",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/getAllCategories",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "getAllCategories"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "RootDataFilter",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/rootDataFilter",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "rootDataFilter"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "updateTaxonomy",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/updateTaxonomy",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "updateTaxonomy"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteTaxonomy",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/deleteTaxonomy",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "deleteTaxonomy"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetTaxonomyCategoryFilters",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": ""
                            },
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/getTaxonomyCategoryFilters",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "getTaxonomyCategoryFilters"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Monitoring",
                "item": [
                    {
                        "name": "GetDataLineageETL",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "[\r\n    {\r\n        \"key\": \"downloadStartTime\",\r\n        \"searchOperator\": \"GREATER_THAN\",\r\n        \"value1\": \"2021-05-12\",\r\n        \"value2\": null\r\n    }\r\n]"
                            },
                            "url": {
                                "raw": "{{qaurl}}/common/getDataLineageETL",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getDataLineageETL"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Integration",
                "item": [
                    {
                        "name": "GetAllUserIntegrations",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMzk0YjdjNi1kYzJiLTRiMmUtODQ4My01YjZjODQ1YTBmZTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoicmFuaml0aGEubmFnZW5kcmEiLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiIzOWFhMWMwOC0wOGZlLTRmZjItOWI0MC1iNDc0MjFkZmIxOGMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYzOTk5ODA4MiwibmFtZSI6IlJhbmppdGhhIiwicGhvbmVfbnVtYmVyIjoiKzkxOTY4NjIwMzg4MyIsImV4cCI6MTY0MDAwMTY4MiwiaWF0IjoxNjM5OTk4MDgyLCJmYW1pbHlfbmFtZSI6Ik4iLCJlbWFpbCI6InJhbmppdGhhLm5hZ2VuZHJhQHZlbnRyaWtzLmNvbSJ9.UwPrsVvlrgPeLs_IU7oqi4n4aQriH1oi--c-R1w25pYfg8duzP0AojUfRfntnp_UcUVe5lveASp2U9n7YFDVivbcET7vkcb6XXy0l6VL2Uc_SdOt6jJ0ME9wVSiQrFkrjRZMRmKlNiHPEEBCxUWOeoh1emgFTDiR6iV4syQK1Fa82gsaaoslfpQlSixW9g92qpUN4pDCyD6ckRQQ3H2mo9vHlLf8TBJMSP7CT4vS1oDm51-tE_EDkLaSnYIIwANdXDl_cf4B43Qm2biHQISaWV3YiPRLBQ3aYf9RPiqwmFeLY2Ft43z9Hth_BTNRLf94RiK7IUHYos9qAiPgcGePKg",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/integration/getAllUserIntegrationSettings",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "integration",
                                    "getAllUserIntegrationSettings"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getAllMarketplaceIntegrations",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/product/getAllMarketplaceIntegrations",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "product",
                                    "getAllMarketplaceIntegrations"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetUserIntegrationById",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"User Integration setting retrieved successfully\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMzk0YjdjNi1kYzJiLTRiMmUtODQ4My01YjZjODQ1YTBmZTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoicmFuaml0aGEubmFnZW5kcmEiLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiI3NzM5MTQwNy03M2YzLTQ3OGEtOGJlMy02MTQ5ZTA4NTQ5Y2QiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY0MDAwMjE3NCwibmFtZSI6IlJhbmppdGhhIiwicGhvbmVfbnVtYmVyIjoiKzkxOTY4NjIwMzg4MyIsImV4cCI6MTY0MDAwNTc3NCwiaWF0IjoxNjQwMDAyMTc0LCJmYW1pbHlfbmFtZSI6Ik4iLCJlbWFpbCI6InJhbmppdGhhLm5hZ2VuZHJhQHZlbnRyaWtzLmNvbSJ9.KQ_G9XH7IdDklLW6G4-EiwwfPrAQstuzz1FWzswSLeEuMPI3yZHp7ExagFxVWuMvIm5r3qOGz_gsmHGlG5CHdYQ5q6uvOcxceWQ-ymjEWOZjBlghPUNfcaVKxHjHyq0FuLcEQje1mOQp6CZB6PoU98i3tlcnEgZR-e5HzTtV8xNOJflpv6tLbaCh8xE08XVz7iFLXA9ybJ1L4DlOXIi3DVXlW7Nmz_Db-j5jFTQwFc2OH_QyUoU0ZzU6f_W5AtiIDz4MdlL_REAxvbiD1xRE_tPlHnl9KRyi8h7QO9yVpM53x8MRNp-aJUYxnJ24YDfcBDS0o5Ie5k1y5oVjPDrwMQ",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/integration/getUserIntegration?id=61c066908e8a0310ec80b65e",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "integration",
                                    "getUserIntegration"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "61c066908e8a0310ec80b65e"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "CreateUserIntegration",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/integration/createUserIntegration",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "integration",
                                    "createUserIntegration"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllIntegrationSettings",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/integration/getAllIntegrationSettings",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "integration",
                                    "getAllIntegrationSettings"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetIntegrationById",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/integration/getIntegrationSetting?id=61a71f919a71d608eaf12976",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "integration",
                                    "getIntegrationSetting"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "61a71f919a71d608eaf12976"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Collectors",
                "item": [
                    {
                        "name": "getLoaderSettings",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjNkZDJmOTlhLWViZTMtNGY1Ny1iMWQwLWJkYWU4YTc1NDM5MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk1Mzg5MTU2LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE1OTUzOTI3NTYsImlhdCI6MTU5NTM4OTE1NiwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.ACHAM3rpweM3OgHrl7klrvYBMFwgOVqsyaXOYkn0YqDDU7PPd8why8u3xRKJldfZpZSgeKKVdLbIHetiRCvlnULVABCX3bB1wMf5JCfSOgvg2-VF0_D1F3-QdpZWQ0ujtp8YsbAy0Kt-Mdec51WYS9YbFRhM-oEiTWklOOf2GKADLVgu-FLLJ4KjrLCwfmn0lnN8LbU0aQ7DhHB6ko3EQE5vnq0vGlenDird260wiPOo5QYv2HFF6vwualfFs3pyXgUKHTMAPIxDaCYc-o5gZnbqavebHpNeTfzftq7EU1SPE1N1EsQ1-daLKSMwQkqpAl5e_LUvgJbXWV5mzDAYBA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getLoaderSettings?loaderType=CSV&type=PREDICTOR",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getLoaderSettings"
                                ],
                                "query": [
                                    {
                                        "key": "loaderType",
                                        "value": "CSV"
                                    },
                                    {
                                        "key": "type",
                                        "value": "PREDICTOR"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllCollectors",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {  \r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Check One of the Collector\", function () {\r",
                                        "    pm.expect(jsonData.data[0].name).to.eql(\"HttpCollector\");\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImEyNWEyNzA2LTgzZTEtNDk5Ny1iMmY5LTU5MjhjYmE0MWViOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk2MTE1NjU1LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE1OTYxMTkyNTUsImlhdCI6MTU5NjExNTY1NSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.Mgbzv0G9cTMR4XZNu8WBqclZZtTGjNZYgbwpJXXcYLGatBo4nYnVg2brSyT9j4uALxnhp7kcEUXA5ECKWjVNe2Fnj6v-WOol3ii3TuUANbsOqJQIzSxMZXN6EQLVqAmgz_V0IBJrBaMmOaQMtACWxvMEzvWRIUxiQNcCjQcFc5hoHLchvmFr3hmHqwftGNdnP2FofHiqtYZkcaCsxpNzhw7S2xdeHk42RC4G-xy3m1FcqkedgofDeEnpcZn3eLJhYSYWkEFtgDHEf5SBMmEGrqrzsHSCOLiIvKnvvA_mtSVjy99wS0Mg1WuzIQUd1gKO1nOSQavGoPt7TtAmdEQhew"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getAllCollectorTypes",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getAllCollectorTypes"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetVentriksData",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "   // pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImM2YmEzYzE1LTZkMTAtNDg4My1iOWU3LWU2MjBiMzhlNjZlZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAzOTYxNTIyLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDM5NjUxMjIsImlhdCI6MTYwMzk2MTUyMiwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.Sqq_RI4_lDlme-H6hdfc1HQO1A8kNIo1e9O24AzzEHBcGciPJJOrp7nnKk0WGl39Ptb8m7XtcAEq13M60_O4iGopAWrkiTN5GncjOf5TtlhMHnHWBTOWSdKsHULVpEFetUBoK770AEoZrM3usg7z1Lk9divDrladMHygYUpait4F0enbW7kuZDS39SEwbA990-s38MWGqZ1JXPLbBKEnWvr9W-M7-V2ziApZUlF4spnVl4c6GEvDzapkNu3diHHOm0mPXEun1iY-jk1PdSbiBLqR3QWkr-mSpoqk6oJUzg_QsuWjV7JeX2E2WcXhrl8Kes_5Q-93KxJ-wf6DfubqZQ"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/common/getVentriksData?source=DAILY_FX_RATES%7CUSD%7CTRANSFER%7CBUY&supplier=BOV",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getVentriksData"
                                ],
                                "query": [
                                    {
                                        "key": "source",
                                        "value": "DAILY_FX_RATES%7CUSD%7CTRANSFER%7CBUY"
                                    },
                                    {
                                        "key": "supplier",
                                        "value": "BOV"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "ExecuteFormula",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Message Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Formula executed successfully\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImNkOTQ2NzczLTc1OGQtNGNhOS1hNTg0LWM0NDdhZTI3ZmVmMiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjEyODUzMjkzLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MTI4NTY4OTMsImlhdCI6MTYxMjg1MzI5MywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.Qo4AYwOClgg9hdJ9rdhA7GeMSP_D7fduppAR4xdXHQUna4ymdAArbz5VT2DYI6EeuZbEoQYLOP-0ecE1tiOQXsj0XaL1ntV9y7k7nCKNG_HvDEWKSHboAXnj9sOAl1V8U0HnpSqau07ni0QNJDOrPJ_NwhEfwhO6jWcEUdcu7nlJkhWH0qrV0SFEKrWtoRx8dE5K-JCozWjIsLHfX3hU1hp5YUbM6mco3btiQAJlzRA3VLm_Et3tMzHWm7U4W_mpPtQ6yBvo-AqKjpazvJza3FSdcdaTonHLxZFmyH0GCtv1s3MmPPpJa_cbyHW319e2YEYZRMwLiayFP92xiwUTew"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/common/executeFormula?formula=pma(asset%3A%2F%2FELECTRICITY%7CELIA_GRID_FEED_IN%7CTOTAL%2C10%2C20)",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "executeFormula"
                                ],
                                "query": [
                                    {
                                        "key": "formula",
                                        "value": "pma(asset%3A%2F%2FELECTRICITY%7CELIA_GRID_FEED_IN%7CTOTAL%2C10%2C20)"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetVentriksDataConsolidated",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImEwZThjMWM4LWFkMjAtNDE2Yi1hZThhLWY4Y2IxMDVlMDUyMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjIzMjk4MTQ2LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjMzMDE3NDYsImlhdCI6MTYyMzI5ODE0NiwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.Hhe9gyb5xa2MyDoFfxnDquRLgesvZrn_GvKz1HHxpHNb6MC_4GKk2jf7bGQ22R-RZWYQtSPgWf7B03_4RP7PN73ebfk9Eb_EGO-fXFEBtRDlZY37jZMuJ91rlbOwezV7nrXvQpT9R6Q4xIJaJhYh6okKN6xnOr8_SnwtIjtbKtbvnLZjR0dq_ASlUOXPDzu3Z_FcownUKorC3kcLErHYvpJpM2zxdR9PgAZlpgY9fkTGUlVMUG9k_7omIgmbF-rRIhsI4fkNfvmNgkf1qEge3GtZquGNoKFvq33gzbtGd9FWwod-URNKdsHhwNLdCQZyOFRq-LICQfA1fNLnfz91KQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\"assetIds\": [\"LBMA/SILVER_RATE|USD|PRICE\",\"LBMA/SILVER_RATE|EUR|PRICE\"],\"startDate\": \"2021-02-01\",\"endDate\": \"2021-07-01\",\"holidayCalendar\": \"HBE\",\"timeZone\": null ,\"sort\": \"DSC\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/common/getVentriksDataConsolidated",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getVentriksDataConsolidated"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getAllCurrencies",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"EUR Check\", function () {\r",
                                        "    pm.expect(pm.response.text()).to.include(\"EUR\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/common/getAllCurrencies",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getAllCurrencies"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getAllCurrencyProviders",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Check\", function () {\r",
                                        "    pm.expect(pm.response.text()).to.include(\"BOE\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/common/getAllCurrencyProviders",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getAllCurrencyProviders"
                                ]
                            }
                        },
                        "response": []
                    }
                ],
                "description": "Collectors"
            },
            {
                "name": "Assest",
                "item": [
                    {
                        "name": "CreateAsset",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MmYxMTg5YS0zNTg0LTQ0NzMtODk3Yi03MmU2ZWU2YmVmZmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrbnNjb25zdWx0YW50cyIsImN1c3RvbTpjb21wYW55IjoiS05TIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiJmZDQ0M2ZiMC1jNmFjLTQ5ZjQtYjY3OC03NzcyMDVhYjUyNWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU5ODkzOTQwMSwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiZXhwIjoxNTk4OTQzMDAxLCJpYXQiOjE1OTg5Mzk0MDIsImZhbWlseV9uYW1lIjoiTlMiLCJlbWFpbCI6Imtuc2NvbnN1bHRhbnRzQGdtYWlsLmNvbSJ9.ZQZyJu5FmBimWZimXF7tlOSICR1TZqBWFv5psmMHP6uoRZi2Q2Zl5Y3Mt4IWyYXfdjpO0FGFBeNquKMih9TXn60ao4c7HWMB3QvbbKS-RJbMJ7muznY9FNEkcrkpRgJsQLlvb5yE6sBmUJlcmBuTIYF2bYBcR8zlLL6dYs1bYn7tj0fh6TkOfJkH5TCdc-1shKv0UrOzJO8lyqHeOPPKXL9EoVCsTYb97Wv5kYeEX_ijDD2o6gUZ1iJoLcSWBQzYvvFNKi_rH64ToK6UNi21YZNU4US3UYRwdFUJmZF9IwxWGXHt9PSIePGnO0n71Vwy1HHlM2kJlnd-stvoByS83g"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{ \r\n    \"domain\" : \"ELECTRICPOWERFUNDAMENTALS\", \r\n    \"name\" : \"PRODUCTION|ELIA_GRID_FEED_IN|TOTAL\", \r\n    \"description\" : \"PRODUCTION|ELIA_GRID_FEED_IN|TOTAL\", \r\n    \"supplier\" : \"ELIA\", \r\n    \"metaData\" : [\r\n        {\r\n            \"name\" : \"UOM\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5611\", \r\n                    \"value\" : \"MAW\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171660\r\n                }\r\n            ], \r\n            \"date\" : 1620719171660, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"MAW\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"CONTRACT_TYPE\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5612\", \r\n                    \"value\" : \"SPOT\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171674\r\n                }\r\n            ], \r\n            \"date\" : 1620719171674, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"SPOT\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"HUB_CODE\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5613\", \r\n                    \"value\" : \"DE\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171674\r\n                }\r\n            ], \r\n            \"date\" : 1620719171674, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"DE\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"VENDOR_DESCRIPTION\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5614\", \r\n                    \"value\" : \"50HERTZ ELIA GROUP\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171674\r\n                }\r\n            ], \r\n            \"date\" : 1620719171674, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"50HERTZ ELIA GROUP\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"FREQUENCY\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5615\", \r\n                    \"value\" : \"MINUTELY_15\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"MINUTELY_15\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"VENDOR_CODE\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5616\", \r\n                    \"value\" : \"ELIA\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"ELIA\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"COMMODITY\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5617\", \r\n                    \"value\" : \"PRODUCTION\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"PRODUCTION\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"HUB_DESCRIPTION\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5618\", \r\n                    \"value\" : \"GERMANY\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"GERMANY\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"TIMEZONE\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5619\", \r\n                    \"value\" : \"EUROPE/BERLIN\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"EUROPE/BERLIN\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"HOLIDAY_CALENDAR\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a561a\", \r\n                    \"value\" : \"HDE\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"HDE\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"REGION_CODE\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a561b\", \r\n                    \"value\" : \"EU\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"EU\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"REGION_DESCRIPTION\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a561c\", \r\n                    \"value\" : \"EUROPE\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"EUROPE\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"ROLLOVER_CALENDAR\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a561d\", \r\n                    \"value\" : \"NA\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"NA\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"BASE_CURRENCY\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a561e\", \r\n                    \"value\" : \"NA\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"NA\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"SUPPLIER_CODE\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a561f\", \r\n                    \"value\" : \"NA\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675), \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"NA\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"SUPPLIER_DESCRIPTION\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5620\", \r\n                    \"value\" : \"NA\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"NA\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"QUOTE_CURRENCY\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5621\", \r\n                    \"value\" : \"NA\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"NA\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"PRODUCT_CODE\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5622\", \r\n                    \"value\" : \"NA\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"NA\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"PRODUCT_DESCRIPTION\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a36435c23a301447a5623\", \r\n                    \"value\" : \"NA\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719171675\r\n                }\r\n            ], \r\n            \"date\" : 1620719171675), \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"NA\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"TYPE\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a3667f7527a599e0d20dd\", \r\n                    \"value\" : \"ENERGY_&_COMMODITIES\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719207096\r\n                }\r\n            ], \r\n            \"date\" : 1620719207096), \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"ENERGY_&_COMMODITIES\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"ENERGY_&_COMMODITIES\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a3667f7527a599e0d20e3\", \r\n                    \"value\" : \"ELECTRIC_POWER_FUNDAMENTALS\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719207097\r\n                }\r\n            ], \r\n            \"date\" : 1620719207097, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"ELECTRIC_POWER_FUNDAMENTALS\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"ELECTRIC_POWER_FUNDAMENTALS\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a3667f7527a599e0d20e7\", \r\n                    \"value\" : \"GENERATION_(PRODUCTION)\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719207097\r\n                }\r\n            ], \r\n            \"date\" : 1620719207097, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"GENERATION_(PRODUCTION)\", \r\n            \"verified\" : false\r\n        }, \r\n        {\r\n            \"name\" : \"GENERATION_(PRODUCTION)\", \r\n            \"values\" : [\r\n                {\r\n                    \"id\" : \"609a3667f7527a599e0d20eb\", \r\n                    \"value\" : \"GRID_FEED-IN\", \r\n                    \"votes\" : 0, \r\n                    \"date\" : 1620719207097\r\n                }\r\n            ], \r\n            \"date\" : 1620719207097, \r\n            \"access_level\" : \"PUBLIC\", \r\n            \"latestValue\" : \"GRID_FEED-IN\", \r\n            \"verified\" : false\r\n        }\r\n    ], \r\n    \"productId\" : \"ELIA_GRID_FEED_IN\", \r\n    \"unit\" : \"MAW\", \r\n    \"currency\" : \"NA\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/asset/createAsset",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "asset",
                                    "createAsset"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAssetsWithCriteria",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMzk0YjdjNi1kYzJiLTRiMmUtODQ4My01YjZjODQ1YTBmZTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoicmFuaml0aGEubmFnZW5kcmEiLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiI3YTMzOGIxYi1mNGFmLTQzYmUtOTY1OS1jYTQ1MjI1NzRlZjEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYzNzEzMTY4MSwibmFtZSI6IlJhbmppdGhhIiwicGhvbmVfbnVtYmVyIjoiKzkxOTY4NjIwMzg4MyIsImV4cCI6MTYzNzEzNTI4MSwiaWF0IjoxNjM3MTMxNjgxLCJmYW1pbHlfbmFtZSI6Ik4iLCJlbWFpbCI6InJhbmppdGhhLm5hZ2VuZHJhQHZlbnRyaWtzLmNvbSJ9.imfJLmcnxBLwVMkbraBID72Tdj_9DLgVXDEUss3QXANYyRQSVcK1_cVofX4GjzHJFm3Jy2hKeAkhHHjXEDAshFpLZnfhwP32U5uLU_-Pw-LUBfa6v2YCTRZDDVOQNtsHuNecTJD9XJoQqgZCMbt-w66NTq8ZgpRyKbynAg5oVgh7OnEwSt48WV_7drWqO74hwcBlM373PTgR7T106hjONBYqo2coG-tvr_WYMOI3wQEN-s4zBQP7SnpTu-kHc5ISQcTUx_RmIHCqRFxxIQZ2Q7DmVjTSyDgFwlzEE5PMP0uWH6kc75kdeH6O8AcbEh3Rgga0Ly6W6r5J3tbNbLX-ng"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": null,\r\n    \"description\": null,\r\n    \"searchTerm\": \"marex\",\r\n    \"propertyList\": []\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/asset/getAssets?skip=0&limit=100",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "asset",
                                    "getAssets"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "100"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "CreateAssetAlias",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MmYxMTg5YS0zNTg0LTQ0NzMtODk3Yi03MmU2ZWU2YmVmZmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrbnNjb25zdWx0YW50cyIsImN1c3RvbTpjb21wYW55IjoiS05TIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiIxZmYzYWVkNS02Yzk4LTQ0ZWMtOTJmZi04NmQ5M2Y0MmI2ZTUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU5OTQ3NTczMSwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiZXhwIjoxNTk5NDc5MzMxLCJpYXQiOjE1OTk0NzU3MzEsImZhbWlseV9uYW1lIjoiTlMiLCJlbWFpbCI6Imtuc2NvbnN1bHRhbnRzQGdtYWlsLmNvbSJ9.H8XUsd-CxScDGCVn2CNLIeGyTnplN0d3HG2Z0DL2WmiO1asDKvDcbcgJygNaz8esQI7UkK6naB0vOcXlGeKOToxomqout_g_j_BDbo4EBhxYlLZtIHLSDkjSzYeOgcfcsiMUYbyPq6UIIdvYaoYVwFXckN3ZPDF_SN2mhyV5UBjozowAdoYAW6EM-NhlG7AfzCaRf8rRgKK7xSAFt1NM5EJcW8NI0PlFkmbAvP4-2RKzl4YRk4Kp0AMlVCiqfWWljzYqucL3eq1qZpK5vrRrcD-jUnsNwBFkN87eadFl0ztsc1nLgqD0WdfFaMzsxB-N1t8iOyXl6_vcv8HMKyu2yw"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{ \r\n    \"_id\" : \"BOCANADA|BCPI_MONTHLY|M.BCNE|INDEX_QA\", \r\n    \"domain\" : \"COMMODITY_QA\", \r\n    \"name\" : \"BOCANADA|BCPI_MONTHLY|M.BCNE|INDEX\", \r\n    \"description\" : \"BOCANADA|BCPI_MONTHLY|M.BCNE|INDEX\", \r\n    \"tags\" : [\r\n        \"BANK\", \r\n        \"CANADA\", \r\n        \"MONTHLY\", \r\n        \"COMMODITY\", \r\n        \"PRICE\", \r\n        \"INDEX\"\r\n    ], \r\n    \"metaData\" : [\r\n        {\r\n            \"name\" : \"ORGANIZATION\", \r\n            \"latestValue\" : \"BANK OF CANADA\"\r\n        }\r\n \r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/asset/createAssetsAlias?originalAsset=BOCANADA%7CBCPI_MONTHLY%7CM.BCNE%7CINDEX",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "asset",
                                    "createAssetsAlias"
                                ],
                                "query": [
                                    {
                                        "key": "originalAsset",
                                        "value": "BOCANADA%7CBCPI_MONTHLY%7CM.BCNE%7CINDEX"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "deleteAssets",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "//pm.test(\"Body matches string\", function () {\r",
                                        "//    pm.expect(pm.response.text()).to.include(\"WIND_POWER_FORECAST|TOTAL\");\r",
                                        "//});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MmYxMTg5YS0zNTg0LTQ0NzMtODk3Yi03MmU2ZWU2YmVmZmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrbnNjb25zdWx0YW50cyIsImN1c3RvbTpjb21wYW55IjoiS05TIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiI1NjljMWJmOC1mMTY4LTQ3NDQtYjJiMS0xNjA0NzBjYjNkY2MiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU5OTY2NDc4MywibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiZXhwIjoxNTk5NjY4MzgzLCJpYXQiOjE1OTk2NjQ3ODMsImZhbWlseV9uYW1lIjoiTlMiLCJlbWFpbCI6Imtuc2NvbnN1bHRhbnRzQGdtYWlsLmNvbSJ9.a_dWFFizibq_V1jdxeb_GxJloZAN0sRyMFDRiKnm3_sTOEycnd_vqlB5WlLvtZ4AE7aViKuKDAbsa4L8fjPUA5EzOimsbMSDs6d-HN4hdpRGA_2gTXri49nKemiS3yTApMhptZyxi1Cvh-gG3pTe67rbAJXJfW4jTzsH9k9GzX_jWW8DyqzrZdh-uwEKnIw8ynOgErLcK0mHaWrS2K8VfaZJdEj5bof-t6DsbiwTk206RfuVfibBj9m_ybczOtS1uxk3MdsPT3ZPN3oZqHnC06m4suFNbcFuw6GAI-tTncQ-Afi6OifHleqWn3KauZlgOsJOzOAFBhjfwXMV65vP7Q"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/asset/deleteAsset?id=CAPACITY%7CTENNET_AVAILABLE_CAPACITY%7CLOAD",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "asset",
                                    "deleteAsset"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "CAPACITY%7CTENNET_AVAILABLE_CAPACITY%7CLOAD"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAssetsWithCriteriawithId",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjA2NTNmMWEzLWIxMmYtNGM0OC05ZDg0LTNiNWVlZWUyOWQ4MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyNTg3MzczLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDI1OTA5NzMsImlhdCI6MTYwMjU4NzM3MywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.iTJXCMlkHqnXMWXjDb_EPVqdndc6U14IGTY_Of1DJElmMxhNvYX-ro9ZhKASGHjx93hEAU516AHfLi6Sf7wTqQcGTz6-feX6qb6ZjIjCrFE5E2W75j-3hHkiambTTAE5IWumU7u5QZZzvqZrLnIY2quedLbDeGu_hJNYtReNMLF8PzmLs004IqZhBXjSpGmrw3b5PyqxBqpESMwNPKUSYc5sdZ2fpPz3Vbq30uXOIwv9q0sC32wWJVQCqxs9bnjp7GvnzeJR-SOMOpz_ZQ4M6EbaK1c4m7FLDrN9oP5udAmP4hSIhLy3RKrTF9L7MwCmnPhb6_VIe41b3KXPnVmzuA"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": null,\r\n    \"description\": null,\r\n    \"searchTerm\": null,\r\n    \"ids\" : [\r\n             \"PALLADIUM_AM|WANTED|PRICE\",\r\n             \"GAS|VN|NATGAS|TOTEXPSB|M3|VOL\"\r\n    ],\r\n    \"propertyList\": [\r\n \r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/asset/getAllAssets?skip=0&limit=5",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "asset",
                                    "getAllAssets"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "5"
                                    }
                                ]
                            },
                            "description": "GetAssetsWithCriteriawithId"
                        },
                        "response": []
                    },
                    {
                        "name": "validateAssets",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"assetIds\": [\"CZCE/CF|MAY_2021|LOW\"]\r\n}\r\n",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/asset/validateAssets",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "asset",
                                    "validateAssets"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCompanionAssets",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Assets retrieved successfully\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/asset/getCompanionAssets?vid=PLATINUM_PM%7CUSD%7CPRICE&supplier=LPPM",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "asset",
                                    "getCompanionAssets"
                                ],
                                "query": [
                                    {
                                        "key": "vid",
                                        "value": "PLATINUM_PM%7CUSD%7CPRICE"
                                    },
                                    {
                                        "key": "supplier",
                                        "value": "LPPM"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getAllCategories",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Root filters retrieved successfully\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"depth\": 3,\r\n    \"dataFilterList\": null\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/asset/getAllCategories",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "asset",
                                    "getAllCategories"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getTaxonomyCategoryFilters",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Root filters retrieved successfully\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjY0NWJmOTAzLTlkOWQtNGI3My1hYjM0LTMyMGJiYWE4NjdhZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjE2NjQzNzU3LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MTY2NDczNTcsImlhdCI6MTYxNjY0Mzc1OCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.akvqqZYv4yHca6iCQdAP_B-Di9OHOZKA-SqNN0YbeohHrgavcz8I09jepv34ghwWnY8ntdcpZ9U5tWCAfD4ufI2yZ6-PzopvElQ6rkRX8UnLyw9ekYGCei4jPwHtxITLedaCNRIiR8cCThRx8B_YyhtK82kbtI3Z2CIBi-KjHSFlI8h9RX3FNShLvLnJTUtxmI8bbX1FHUqyRHYy1wwZECtOsKhlIBv5M2vfq8OxlpX0nkLwanB7bFyuqnulaF-sdEsJYV5-rsL7stmPV-Bp7iRyWOvVq5R87fBzaWRtqERMSxQc1Qm4wXAlUIAnw3yprdfchCp_7Q2dVyud6LdvXg"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"isFullList\": false,\r\n    \"propertyList\": [\r\n        {\r\n            \"name\": \"Energy and Commodities\",\r\n            \"value\": \"Petrochemicals\"\r\n        },\r\n        {\r\n            \"name\": \"Energy and Commodities\",\r\n            \"value\": \"Chemical\"\r\n        },\r\n        {\r\n            \"name\": \"Energy and Commodities\",\r\n            \"value\": \"Power\"\r\n        }\r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/getTaxonomyCategoryFilters",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "getTaxonomyCategoryFilters"
                                ]
                            }
                        },
                        "response": []
                    }
                ],
                "description": "Assest"
            },
            {
                "name": "AssetGroup",
                "item": [
                    {
                        "name": "CreateAssetGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Message Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Asset Group Created successfully\");\r",
                                        "});\r",
                                        "\r",
                                        "pm.globals.set(\"idT\", jsonData.data._id);\r",
                                        "\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);\r",
                                        "var gname=pm.environment.set(\"gname\", \"ASSET_GROUP_QA\"+parseInt(Math.random()*10000));"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNzAzZGQyYS02YTExLTQ1NDUtYWZhMC0yNWRmODM0MjhiZDkiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byJdLCJhdWQiOiI1bGgwbmo4c2xlMjE4NzZnYm42N2h0MDc2cyIsImV2ZW50X2lkIjoiZGFjYzE4MjEtOWMzYy00NjdhLWE2NzktNDNiNjBkNTVmYmJjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Mjk0NjAzNDksIm5hbWUiOiJrb3dzaGlrIiwicGhvbmVfbnVtYmVyIjoiKzkxOTUxMzI3OTY2NiIsImV4cCI6MTYyOTQ2Mzk0OSwiaWF0IjoxNjI5NDYwMzQ5LCJmYW1pbHlfbmFtZSI6Ik5TIiwiZW1haWwiOiJrb3dzaGlrbnNAZ21haWwuY29tIn0.STVEMDZfoiuzBqc1okDvnack2jXFfrd4ATbgH9bc2Wyf526oxZ_0qv21To_qE2YOSO1QbtSEUH3Vv37Po1BaAF5NFSUQp6pW6GsIfxxxvmpHJMgPhuWE18E5w7SGCdg7SyDZk4GhvvTiHgHDDpCYr4dkdMLkvZ41EmN4ZE2czyyz-mit9XYdj3yGarHPJ6tbjb1aZRzliCywTLxVkgV2SEESqwvY9cP2tccfeufPVIekInrIz68QdmsmJTpQEPmhZ38KElq5zWFMS-43HtDwaF4AmJtjm4c6tSj7_5nFi3PVfJmYLPlqBbbaoqIDviYQMWQed4k7lEtuT6yXzEIDCA",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": {{gname}},\r\n    \"description\": {{gname}},\r\n    \"parentId\": \"6124f85628750836fc13e6c5\",\r\n    \"group_type\" : \"PRIVATE\",\r\n    \"isRoot\" : false,\r\n    \"isHybrid\" : false,\r\n    \"isDynamic\" : false,\r\n    \"assetIds\": [\r\n        \"60c0dc1932bc244a03a90649\",\r\n        \"60c0dc2132bc244a03a9064a\",\r\n        \"60c0dc2832bc244a03a9064b\"\r\n    ]\r\n    \r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/assetgroup/createAssetGroup",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "assetgroup",
                                    "createAssetGroup"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAssetsForGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Message Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Asset Group Created successfully\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idT = pm.environment.get(idT);"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNzAzZGQyYS02YTExLTQ1NDUtYWZhMC0yNWRmODM0MjhiZDkiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byJdLCJhdWQiOiI1bGgwbmo4c2xlMjE4NzZnYm42N2h0MDc2cyIsImV2ZW50X2lkIjoiOTA1OWExODktMzUzYi00YjZiLTg0NjUtMzlkYmFiZWU2MmYwIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Mjk3NzgzNDQsIm5hbWUiOiJrb3dzaGlrIiwicGhvbmVfbnVtYmVyIjoiKzkxOTUxMzI3OTY2NiIsImV4cCI6MTYyOTc4MTk0NCwiaWF0IjoxNjI5Nzc4MzQ0LCJmYW1pbHlfbmFtZSI6Ik5TIiwiZW1haWwiOiJrb3dzaGlrbnNAZ21haWwuY29tIn0.VED3IgAn4BPfs7o06TPHgwOMDQ2-kUEr9ofLFYJeyv8YD4lSVdtHWsReUWjoxMB1wTyyjY6DLHCMgXQDA_wNNhwQJJi20nuODgiWwtVgSmp71K1waRLwwTEB9Z9Fh-Dvu4kT8vaFZkSqorkqTpIBTIU7f56ZX__u8RJ1bGbXvXyO1I2xh2CLAMwx2qAbFzyEjCaUKDTUY-twTvIRlHkvD_S6Kl3Y0qvqt_lOrFsGY9blRf5JZF75B8x9YHGy4xYcISLhs8kM-L3DIIsC7tiPjvwMqBx7kFjn7pwv1i0DOHgUd5T4UyhENuiJY6Mb2aN_EIi7viluhgW1_BV5KvtHpQ",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/assetgroup/getAssetsForGroup?groupName=Asset Group Qa9756",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "assetgroup",
                                    "getAssetsForGroup"
                                ],
                                "query": [
                                    {
                                        "key": "groupName",
                                        "value": "Asset Group Qa9756"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "AddAssetsToGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjAyY2M3ODA5LTRmMGQtNGQxMS05Y2NkLTdkZGIwMTM4ZmQzOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI3MDE4NzE3LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjcwMjIzMTcsImlhdCI6MTYyNzAxODcxNywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.CdxEOxt-Enoc2ClJMeHkeVApo7b2C_DwvuybTDnaxhZEVuhhlbms76KDg2WkK37BTa3J01_lK20UVQp2qWmRVr4caFWaKyrLB3g-97OHHquE73FB749a9MhbQj6CQvsH5qNs9MWJ4eTaoSmdyPjJbHvZaGBVACX3GdJ1eEoIB0Cv4473EHBFiJXMOnaDivWGFr4J7B0glQjTBqsuTud5cm6t9FoqftQv0rLD6-_-JiNyn0QxuoSSYc7il2vN6zBRsnS0QtWO4CVlPFLlbXszKnLhl9ORkGGlx3IdnnW0Gue2oiY6EYl2zvCl9-RSKlN16kdVa_r-kzrvcWPfVW-uHA",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"_id\" : \"63466494df67a11e0450b34a\",\r\n    \"name\" : \"Asset Group Qa9756 Update\",\r\n    \"description\" : \"ASSET_GROUP_QA9756 Update\",\r\n    \"parentId\" : \"6124f85628750836fc13e6c5\",\r\n    \"assetIds\" : [\r\n        \"60c0dc1932bc244a03a90649\",\r\n        \"60c0dc2132bc244a03a9064a\",\r\n        \"60c0dc2832bc244a03a9064b\"\r\n    ],\r\n    \"group_type\" : \"PRIVATE\",\r\n    \"createdBy\" : \"62ea6f1f34ec2219e7ee7511\",\r\n    \"isRoot\" : false,\r\n    \"isHybrid\" : false,\r\n    \"isDynamic\" : false\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/assetgroup/addAssetsToGroup",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "assetgroup",
                                    "addAssetsToGroup"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllAssetGroups",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNzAzZGQyYS02YTExLTQ1NDUtYWZhMC0yNWRmODM0MjhiZDkiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byJdLCJhdWQiOiI1bGgwbmo4c2xlMjE4NzZnYm42N2h0MDc2cyIsImV2ZW50X2lkIjoiZGFjYzE4MjEtOWMzYy00NjdhLWE2NzktNDNiNjBkNTVmYmJjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Mjk0NjAzNDksIm5hbWUiOiJrb3dzaGlrIiwicGhvbmVfbnVtYmVyIjoiKzkxOTUxMzI3OTY2NiIsImV4cCI6MTYyOTQ2Mzk0OSwiaWF0IjoxNjI5NDYwMzQ5LCJmYW1pbHlfbmFtZSI6Ik5TIiwiZW1haWwiOiJrb3dzaGlrbnNAZ21haWwuY29tIn0.STVEMDZfoiuzBqc1okDvnack2jXFfrd4ATbgH9bc2Wyf526oxZ_0qv21To_qE2YOSO1QbtSEUH3Vv37Po1BaAF5NFSUQp6pW6GsIfxxxvmpHJMgPhuWE18E5w7SGCdg7SyDZk4GhvvTiHgHDDpCYr4dkdMLkvZ41EmN4ZE2czyyz-mit9XYdj3yGarHPJ6tbjb1aZRzliCywTLxVkgV2SEESqwvY9cP2tccfeufPVIekInrIz68QdmsmJTpQEPmhZ38KElq5zWFMS-43HtDwaF4AmJtjm4c6tSj7_5nFi3PVfJmYLPlqBbbaoqIDviYQMWQed4k7lEtuT6yXzEIDCA",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/assetgroup/getAllAssetGroups",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "assetgroup",
                                    "getAllAssetGroups"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "RemoveAssetsFromGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjAyY2M3ODA5LTRmMGQtNGQxMS05Y2NkLTdkZGIwMTM4ZmQzOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI3MDE4NzE3LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjcwMjIzMTcsImlhdCI6MTYyNzAxODcxNywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.CdxEOxt-Enoc2ClJMeHkeVApo7b2C_DwvuybTDnaxhZEVuhhlbms76KDg2WkK37BTa3J01_lK20UVQp2qWmRVr4caFWaKyrLB3g-97OHHquE73FB749a9MhbQj6CQvsH5qNs9MWJ4eTaoSmdyPjJbHvZaGBVACX3GdJ1eEoIB0Cv4473EHBFiJXMOnaDivWGFr4J7B0glQjTBqsuTud5cm6t9FoqftQv0rLD6-_-JiNyn0QxuoSSYc7il2vN6zBRsnS0QtWO4CVlPFLlbXszKnLhl9ORkGGlx3IdnnW0Gue2oiY6EYl2zvCl9-RSKlN16kdVa_r-kzrvcWPfVW-uHA",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"_id\": \"634666a10190ea015e18046c\",\r\n    \"assetIds\": [\r\n        \"60dada6a3f61d844bf875ed0\", \r\n        \"60dada743f61d844bf875ed1\"\r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/assetgroup/removeAssetsFromGroup",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "assetgroup",
                                    "removeAssetsFromGroup"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteAssetGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjAyY2M3ODA5LTRmMGQtNGQxMS05Y2NkLTdkZGIwMTM4ZmQzOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI3MDE4NzE3LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjcwMjIzMTcsImlhdCI6MTYyNzAxODcxNywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.CdxEOxt-Enoc2ClJMeHkeVApo7b2C_DwvuybTDnaxhZEVuhhlbms76KDg2WkK37BTa3J01_lK20UVQp2qWmRVr4caFWaKyrLB3g-97OHHquE73FB749a9MhbQj6CQvsH5qNs9MWJ4eTaoSmdyPjJbHvZaGBVACX3GdJ1eEoIB0Cv4473EHBFiJXMOnaDivWGFr4J7B0glQjTBqsuTud5cm6t9FoqftQv0rLD6-_-JiNyn0QxuoSSYc7il2vN6zBRsnS0QtWO4CVlPFLlbXszKnLhl9ORkGGlx3IdnnW0Gue2oiY6EYl2zvCl9-RSKlN16kdVa_r-kzrvcWPfVW-uHA",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/assetgroup/deleteAssetGroup?groupId=63466a8b4c26c247e092073c",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "assetgroup",
                                    "deleteAssetGroup"
                                ],
                                "query": [
                                    {
                                        "key": "groupId",
                                        "value": "63466a8b4c26c247e092073c"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getDefaultCategoriesAndFilters",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n  \"depth\" : null,\r\n  \"dataFilterList\" : null,\r\n  \"dataFilter\" : null,\r\n  \"searchTerm\" : null,\r\n  \"productSearchCriteria\" : null,\r\n  \"assetSearchCriteria\" : {\r\n    \"name\" : null,\r\n    \"description\" : null,\r\n    \"searchTerm\" : null,\r\n    \"ids\" : null,\r\n    \"uris\" : null,\r\n    \"searchType\" : null,\r\n    \"fetchMetaData\" : false,\r\n    \"propertyList\" : null\r\n  }\r\n}\r\n",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/taxonomy/getDefaultCategoriesAndFilters",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "taxonomy",
                                    "getDefaultCategoriesAndFilters"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getAssetsForGroupbyId",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/assetgroup/getAssetsForGroup?groupId=6124f85628750836fc",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "assetgroup",
                                    "getAssetsForGroup"
                                ],
                                "query": [
                                    {
                                        "key": "groupId",
                                        "value": "6124f85628750836fc"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "updateAssetGroup",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"_id\": \"627baea17212fb7547904e55\",\r\n    \"name\": \"Newgrp\",\r\n    \"description\": \"newgrpd\",\r\n    \"assetIds\": [],\r\n    \"group_type\": \"PRIVATE\",\r\n    \"parentId\": \"6124f85628750836fc13e6c5\",\r\n    \"dynamicSearchProperties\": null,\r\n    \"isDynamic\": false,\r\n    \"isHybrid\": false\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/assetgroup/updateAssetGroup",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "assetgroup",
                                    "updateAssetGroup"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Schedulers",
                "item": [
                    {
                        "name": "GetAllSchedulers",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjgzZDBiOTUxLTVmOWUtNGJlMy1hNzJjLThjMTg1Yzc4ZjJkYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA0NTM5OTgwLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDQ1NDM1ODAsImlhdCI6MTYwNDUzOTk4MCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.CvYLv25r3BqDmQCowr6fw2f7DJKDAkQNpJxl3XZGI4qUQMzkSOrATu7kNOPNjXD9cZrOH6g5Mx7HJFQwiVluRGFFIqSKJjSC5NCO4UvwItSbxs1a7iQ_CtcAWeotnRRarPvlFR7Ib7OL_PoWwoPHuAjXwlUuKqbZN2WK7mBeQCY5sEfIf7kY-HJ69BuZvu3Ie9aTEgr8a6OXOkdcngDyhxkD9wvPLbzJXdvsYEv3hset3JPBbLK91oPNjxXDxBL11GgZ1UNJWXKaRFdyI6amGsIquOM65fn1gvED-5VPIzXC87eZ_Y7ZNR8w0Nv2Y_K_F_imA0THyWYMklrI2i7Hkw"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": null,\r\n    \"description\": null,\r\n    \"searchTerm\":\"OMIE\",\r\n    \"propertyList\": []\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/getAllSchedulers?skip=0&limit=100",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getAllSchedulers"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "100"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetSchedulerFilters",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImUwZTZhOTM2LTg3NWEtNDk3OS05OGIxLThmYzdjNTM2MDRjOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA2NTU3NzY4LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDY1NjEzNjgsImlhdCI6MTYwNjU1Nzc2OCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.O9eiey87XClXltNxSt7tqJZzjXNb3md1ZdOSPG9eP2wvjFIUKMgmk0bjysBtqBY4Tk43VpdgPkl4CUV8aQW6yNJAPmagFFJmxO1sa7oH3n1DJJlAPFoAizCWCV-VhIg7ncGFSSzOrUUBKjNCVVx9CdlLzjdzNr7wBgxHtxGb80lQHcpOy5TGr3-oplqhrshymuTsI7NNeGA9BgIO1M0UcpuuFJumNUVa792oIqQKTF5MBP2004twigB_Y8LkTrw8mD9gLxNTun25dM0ABXUct8fgjDF5dPuPp3Kx7zAFVmOFA7CVFelZJiX7_UEZjJ80prgOFv4qH-qKUSOpXhnQ6g"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getSchedulerFilters",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getSchedulerFilters"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetSchedulerById",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImM1MDQ0NzE4LTUyODktNDMxNC1iZWM2LTM5MTMzMWE2MmRlYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA1MTYyMjgxLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDUxNjU4ODEsImlhdCI6MTYwNTE2MjI4MSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.oY5PUIRANY3CoXE8eiVuJDQL-LLuiyTMzGNvfmyBjoMyklt2baJbPKpa_GOYWYJzKTc07hoF_wGAO05QfKXkAUY3t3RguXWf1nBVG6ds92WkarGKWrXMM_Lj2A95-qyB6sz1E8qO3HQHihI8TTKG5ISWc5VAkzopJUOn22LbbS3RTACDnU4uiq6TkeTs6pMGrherLTzP9f4J5HeFyalQZo98ip7_gJccnnPtDW_JnLSav7JLILoI4isyGx4bfnGNef2vopIrMUF-IpS_aD96Pt7VFnYzSvjcQM0aT7x4apYEL1rvr9R_uqYes-zLnnDwrZd2K-2tQHM6d3i9vgQ66w"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getSchedulerById?schedulerId=EUROSTAT_REGIONAL_GROUP3_2300_SCHEDULE",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getSchedulerById"
                                ],
                                "query": [
                                    {
                                        "key": "schedulerId",
                                        "value": "EUROSTAT_REGIONAL_GROUP3_2300_SCHEDULE"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllSchedulerTargets",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "    pm.expect(jsonData.data[0].name).to.eql(\"EUROSTAT_REGIONAL_GROUP3\");\r",
                                        "    \r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImMyOGU1OGFkLWViYTMtNDVlZC1iYmIxLThiNDc0ZWI0ZGYwNiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA1MDk1NzI3LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDUwOTkzMjcsImlhdCI6MTYwNTA5NTcyNywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.HRjYiFlp0tPDPNu_qs-nB3Yil8VSKZB0NpBK8yAHBYXqiFy6b7e-RoYLkOmcp1TbvxZQvmnCPv46I1BMTo3v8FNVKZQvS2kp7h1IvRDnvpjc1Nmni-W-e-tCuHeH07YRDTUqD6bfOzYZnp9GvoMcRoXxWcisCaM_gWMqsa9Qx2rU-o2mde7GTKhMyt1rNbbSxXQUsI9NsWhiZho_N_p87f6vKuLVbJUVTZ4L9AJwNV1mumOTLPQkeD9QIGYmrspqwBAc4UPmN1gVLn3ddWivUsxnGcbCqTzyCf1S_4OIkmkIKJWdAYPgcohVdYGtGlrQ4WMS7dbkJVZumA8WUU4eIQ"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getSchedulerTargets?schedulerName=EUROSTAT_REGIONAL_GROUP3_2300_SCHEDULE",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getSchedulerTargets"
                                ],
                                "query": [
                                    {
                                        "key": "schedulerName",
                                        "value": "EUROSTAT_REGIONAL_GROUP3_2300_SCHEDULE"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "AddTargetToScheduler ETL",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImMyOGU1OGFkLWViYTMtNDVlZC1iYmIxLThiNDc0ZWI0ZGYwNiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA1MDk1NzI3LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDUwOTkzMjcsImlhdCI6MTYwNTA5NTcyNywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.HRjYiFlp0tPDPNu_qs-nB3Yil8VSKZB0NpBK8yAHBYXqiFy6b7e-RoYLkOmcp1TbvxZQvmnCPv46I1BMTo3v8FNVKZQvS2kp7h1IvRDnvpjc1Nmni-W-e-tCuHeH07YRDTUqD6bfOzYZnp9GvoMcRoXxWcisCaM_gWMqsa9Qx2rU-o2mde7GTKhMyt1rNbbSxXQUsI9NsWhiZho_N_p87f6vKuLVbJUVTZ4L9AJwNV1mumOTLPQkeD9QIGYmrspqwBAc4UPmN1gVLn3ddWivUsxnGcbCqTzyCf1S_4OIkmkIKJWdAYPgcohVdYGtGlrQ4WMS7dbkJVZumA8WUU4eIQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"targets\": [\r\n        {\r\n            \"scheduler_type\": \"ETL_GROUP\",\r\n            \"name\": \"EXXA1\"\r\n        }\r\n        \r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/addTargetToScheduler?schedulerName={{sch}}",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "addTargetToScheduler"
                                ],
                                "query": [
                                    {
                                        "key": "schedulerName",
                                        "value": "{{sch}}"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Calendars",
                "item": [
                    {
                        "name": "Signin",
                        "item": [
                            {
                                "name": "Signin",
                                "event": [
                                    {
                                        "listen": "prerequest",
                                        "script": {
                                            "exec": [
                                                "var username=pm.environment.set(\"username\", \"jenkins-warmer\");\r",
                                                "var password=pm.environment.set(\"password\", \"Inverness$1\");\r",
                                                ""
                                            ],
                                            "type": "text/javascript"
                                        }
                                    },
                                    {
                                        "listen": "test",
                                        "script": {
                                            "exec": [
                                                "var jsonData = pm.response.json();\r",
                                                "pm.test(\"Status code is 200\", function () {\r",
                                                "    pm.response.to.have.status(200);\r",
                                                "});\r",
                                                "pm.test(\"UserName Check\", function () {\r",
                                                "    pm.expect(jsonData.data.username).to.eql(pm.variables.get(\"username\"));\r",
                                                "});\r",
                                                "pm.environment.set(\"idTokendev\", jsonData.data.idToken);\r",
                                                "pm.test(\"Response time is less than 200ms\", function () {\r",
                                                "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                                "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                                "        \r",
                                                "    }  \r",
                                                "});\r",
                                                "console.log(pm.globals.get(\"username\"));\r",
                                                "pm.test(\"UserName Check\", function () {\r",
                                                "    var jsonData = pm.response.json();\r",
                                                "    pm.expect(jsonData.data.username).to.eql(\"jenkins-warmer\");\r",
                                                "});\r",
                                                "console.log(jsonData.data.username);"
                                            ],
                                            "type": "text/javascript"
                                        }
                                    }
                                ],
                                "request": {
                                    "auth": {
                                        "type": "basic",
                                        "basic": [
                                            {
                                                "key": "password",
                                                "value": "{{password}}",
                                                "type": "string"
                                            },
                                            {
                                                "key": "username",
                                                "value": "{{username}}",
                                                "type": "string"
                                            }
                                        ]
                                    },
                                    "method": "PUT",
                                    "header": [],
                                    "body": {
                                        "mode": "raw",
                                        "raw": "{\r\n    \"username\": \"{{username}}\",\r\n    \"password\": \"{{password}}\"\r\n}",
                                        "options": {
                                            "raw": {
                                                "language": "json"
                                            }
                                        }
                                    },
                                    "url": {
                                        "raw": "{{qaurl}}/account/signin",
                                        "host": [
                                            "{{qaurl}}"
                                        ],
                                        "path": [
                                            "account",
                                            "signin"
                                        ]
                                    }
                                },
                                "response": []
                            }
                        ]
                    },
                    {
                        "name": "getAllExchange",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImY4ZWNlMDgyLTZkYTMtNGI4NC1iZjRkLTFlNTVhMThlOTVkZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAzMjUyNTgwLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDMyNTYxODAsImlhdCI6MTYwMzI1MjU4MCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.mMi7bXW1HUwAEruuy7rSDcUS42nPNs3pmaxKLr9bUc_ClfLj2l6-rQYDLAfNB6OiXU_ZkA7_iRGWMgkAzgX56krOGUVXxOZmKgdfStqalqZKMqE9ql2nUo_-M5XrbnyPUnlCExRgLIKYI2n9-8tvHO5eH9v219B_6IGwkF1t4AXyZp6Fe4mo7AFbRHzwW6bv8oeUpNkiSPl9gstfJ_QwEc1c4TcCulh7CfS7wpU8L2GOoAZseVppiRD7rp_wbKA2DMBroUKJ8gLW8Z7Dje7K-lg7y5RR9y9QKcllS8SqKZ2Q5lEKvgjg7kc3xVR8uYEHcvpAnanb359j-k1soSZSFA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/calendar/getAllExchanges",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "getAllExchanges"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllHolidays",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjRmMDRkODk5LTMwMGQtNGQyOS1hMDMyLWRkM2VjZmFiZDFiMiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjEzMjg4MjAyLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MTMyOTE4MDIsImlhdCI6MTYxMzI4ODIwMiwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.WJxbO8gZ_wFDGosNi6m7RPYa8Feo_y70FPBvLW4Gf5gPkTewV8v7ilwFVF_SXLmh4HotDjTzE0N05USCXO9lesPbduId0wcH39y8sY3uDdPnfTpdf563S_Xjrlg244sHGp2WuoY3esW_AEoDuOXMThB4yOclZZYRVKHk2tLY7Abd9LI9uEUMEOI_WyIBNPNQTdlCggr3dwjiopgJgwvHTYsI93WiHidj6xqyS8s8iiqTO7qLwnB-Qwf4xGUubKoVdyxH75N656vGg3VupQeRMH54mk6EYq3NrTzQTyJrrw4g7FvpoXis5grjln275R5-IsleFZuW-ffwmu3pD6nfRA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/calendar/getAllHolidayCalendars",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "getAllHolidayCalendars"
                                ]
                            },
                            "description": "GetAllHolidayCalendars"
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllRolloverCalendars",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Message Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Holiday Calendars retrieved successfully\");\r",
                                        "});\r",
                                        "pm.test(\"Rollover check\", function () {\r",
                                        "    pm.expect(pm.response.text()).to.include(\"RICEGASOIL\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjE0MWZlNDcxLTExYTItNDcyZC1hMzMxLWZmNDhlYzczNGMzNiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjE3MTc3ODAwLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MTcxODE0MDAsImlhdCI6MTYxNzE3NzgwMCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.Hm15mKY6GnVxDM-8PnLt0F5ICiQ-7b-rsleRCB2VYblQE4K3BgzqUexURhRsdn3rB4FYtzZLC8koLJWUn6S0fFy5x1EtCQ-hFLfTzOIlNxIQEQQxACRni-3aCVrZZ2FnITpTK9f0FK6uXosPnisgLIryV-9gmEI16ctEhyBFRSgZA_yOUj4upXkg6lEuY1VM8_UBuWe6AUyrVFE6TZVmGHMXYW7A85MdXTC_REoYePw4BKi4exqY4CQ-6x0Ln_WK5AXJ5gREaQQt_QhtnNxu_sZNozDZcE-3Y_kjb5-2PS9dNrM9BM1V8f7YJjwaDPogwvn6F_-SAKmWCJgCw1zkpw"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/calendar/getAllRolloverCalendars",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "getAllRolloverCalendars"
                                ]
                            },
                            "description": "GetAllRolloverCalendars"
                        },
                        "response": []
                    },
                    {
                        "name": "getHolidaysForCode",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/calendar/getHolidaysForCode?calendarCode=HBALTICEUROPE&startDate=2000-01-01&endDate=2030-12-31",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "getHolidaysForCode"
                                ],
                                "query": [
                                    {
                                        "key": "calendarCode",
                                        "value": "HBALTICEUROPE"
                                    },
                                    {
                                        "key": "startDate",
                                        "value": "2000-01-01"
                                    },
                                    {
                                        "key": "endDate",
                                        "value": "2030-12-31"
                                    }
                                ]
                            },
                            "description": "getHolidaysForCode"
                        },
                        "response": []
                    },
                    {
                        "name": "GetRolloverDates",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjU1OTk1OTg2LWY5ZjQtNDk1Ny05NjUxLTY4MDAwODg2ZWE3MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjE3NDc1MDgzLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MTc0Nzg2ODMsImlhdCI6MTYxNzQ3NTA4MywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.LK8BMGgVQFy8vriIO4uXuw2hFuNcDdXilPulTlJumcZrRr5t38ovfC3jsDheBo9zVQkkc5p8CiQkOC-FB1FsqCOMum3fVp3_VReP5JWZD6Errl6uRH0QJyTwzs07lGc4yJTUIxzyDBdtKr0-9IdD6k9X-fgOrKbbyeBzUjTiIeFZheaEAq5S66becLWN0bYkxltl7Of0nbquFr5FVzRmXcnV94c5eKYMfIWOpj6zeKIUnhqnYl3ApTy-0GGSafy3eTXyDLi9nXjbdwI5E_wlcf4CtRB0ufm96YvqiQN8Bwz0xGwTXRxWN05WbLFuRq-qFVLt-X0tVwJHyWr1XRLl6Q"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/calendar/getRolloverDatesForCode?calendarCode=RICEGASOIL&startDate=2020-01-01&endDate=2022-12-31",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "getRolloverDatesForCode"
                                ],
                                "query": [
                                    {
                                        "key": "calendarCode",
                                        "value": "RICEGASOIL"
                                    },
                                    {
                                        "key": "startDate",
                                        "value": "2020-01-01"
                                    },
                                    {
                                        "key": "endDate",
                                        "value": "2022-12-31"
                                    }
                                ]
                            },
                            "description": "GetRolloverDates"
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllTimeZones",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Message Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"Timezones retrieved successfully\");\r",
                                        "});\r",
                                        "pm.test(\"Body matches string\", function () {\r",
                                        "    pm.expect(pm.response.text()).to.include(\"Africa/Johannesburg\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjM4NzEyZTNkLTY3NzktNDg5OC1hOTdiLTljMTkxODYzNTE3MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjEyNDIzMTY1LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MTI0MjY3NjUsImlhdCI6MTYxMjQyMzE2NSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.SsPqdB3R7-2UaMsSPIm22enlDgmV-T4k6GKD4q_jRPXhyca5GYUvkfaJGmqvjDERTL7jGu57xGqm7ei_zBy7TKMtSlr-r73ibqif5AG8O9b4HjKnX3cYm6ES_CY_9mWalAsm0fU3Dq-UoB0EgQ_4TnJq6ANPgWolJH6Z9eKXDy0hvWKEYUOC9cTEW2hGDfDRD7Y1y5TLYT-6oaxCL_kltFu8JIYK4oTlhM0zTQjuJi0gbsCFR87VsmrqokF-b2ftQ433B9lF3EBj3MQvbtV6zOKbDpM9tVP7pGb7YopfjFUKQKjyjcG5VxHqn2n-P7BsQqeMHnCeS53oIwZQWT4Y6g"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/common/getAllTimeZones",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getAllTimeZones"
                                ]
                            },
                            "description": "GetAllTimeZones"
                        },
                        "response": []
                    },
                    {
                        "name": "createHolidayCalendar",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Check the message\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"HolidayCalendar created successfully\");\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImY4ZWNlMDgyLTZkYTMtNGI4NC1iZjRkLTFlNTVhMThlOTVkZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAzMjUyNTgwLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDMyNTYxODAsImlhdCI6MTYwMzI1MjU4MCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.mMi7bXW1HUwAEruuy7rSDcUS42nPNs3pmaxKLr9bUc_ClfLj2l6-rQYDLAfNB6OiXU_ZkA7_iRGWMgkAzgX56krOGUVXxOZmKgdfStqalqZKMqE9ql2nUo_-M5XrbnyPUnlCExRgLIKYI2n9-8tvHO5eH9v219B_6IGwkF1t4AXyZp6Fe4mo7AFbRHzwW6bv8oeUpNkiSPl9gstfJ_QwEc1c4TcCulh7CfS7wpU8L2GOoAZseVppiRD7rp_wbKA2DMBroUKJ8gLW8Z7Dje7K-lg7y5RR9y9QKcllS8SqKZ2Q5lEKvgjg7kc3xVR8uYEHcvpAnanb359j-k1soSZSFA"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{ \r\n    \r\n    \"code\" : \"HQATESTALVT\", \r\n    \"name\" : \"Baltic Exchange Europe + USA HolidayCalendar QAVT\", \r\n    \"description\" : \"Baltic Exchange Europe + USA HolidayCalendar\", \r\n    \"calendarRule\" : \"1,NB,1,New Year||||1stMON,,,Early May Bank Holiday;LAST_MON,,,Memorial Day||4,NB,[SAT:-1,SUN:1],Independence Day|LAST_MON,,,Summer bank holiday|1stMON,,,Labor Day||LAST_THU,,,Thanksgiving;LAST_FRI,,,Friday after Thanksgiving day|25,NB,0,Christmas Holiday;26,NB,0,Christmas Holiday;27,NB,0,Christmas Holiday;28,NB,0,Christmas Holiday;29,NB,0,Christmas Holiday;30,NB,0,Christmas Holiday;31,NB,0,Christmas Holiday+ GOOD_FRIDAY,EASTER_MONDAY\", \r\n    \"modifiedBy\" : \"bharathi.talluri@ventriks.com\",\r\n    \"holidayList\": null\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/calendar/createHolidayCalendar",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "createHolidayCalendar"
                                ]
                            },
                            "description": "CreateHolidayCalendar"
                        },
                        "response": []
                    },
                    {
                        "name": "updateHolidayCalendar",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Check the message\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"HolidayCalendar created successfully\");\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImY4ZWNlMDgyLTZkYTMtNGI4NC1iZjRkLTFlNTVhMThlOTVkZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAzMjUyNTgwLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDMyNTYxODAsImlhdCI6MTYwMzI1MjU4MCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.mMi7bXW1HUwAEruuy7rSDcUS42nPNs3pmaxKLr9bUc_ClfLj2l6-rQYDLAfNB6OiXU_ZkA7_iRGWMgkAzgX56krOGUVXxOZmKgdfStqalqZKMqE9ql2nUo_-M5XrbnyPUnlCExRgLIKYI2n9-8tvHO5eH9v219B_6IGwkF1t4AXyZp6Fe4mo7AFbRHzwW6bv8oeUpNkiSPl9gstfJ_QwEc1c4TcCulh7CfS7wpU8L2GOoAZseVppiRD7rp_wbKA2DMBroUKJ8gLW8Z7Dje7K-lg7y5RR9y9QKcllS8SqKZ2Q5lEKvgjg7kc3xVR8uYEHcvpAnanb359j-k1soSZSFA"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"_id\" : \"6017ef54dae813499fad9496\",\r\n    \"code\" : \"HBALTICEUROPE_TEST\",\r\n    \"name\" : \"Baltic Exchange Europe HolidayCalendar Test\",\r\n    \"description\" : \"Baltic Exchange Europe HolidayCalendar\",\r\n    \"calendarRule\" : \"1,NB,1,New Year||||1stMON,,,Early May Bank Holiday;LAST_MON,,,Spring Bank Holiday|||LAST_MON,,,Summer bank holiday||||25,NB,0,Christmas Holiday;26,NB,0,Christmas Holiday;27,NB,0,Christmas Holiday;28,NB,0,Christmas Holiday;29,NB,0,Christmas Holiday;30,NB,0,Christmas Holiday;31,NB,0,Christmas Holiday+ GOOD_FRIDAY,EASTER_MONDAY\",\r\n    \"modifiedBy\" : \"bharathi.talluri@ventriks.com\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/calendar/updateHolidayCalendar",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "updateHolidayCalendar"
                                ]
                            },
                            "description": "updateHolidayCalendar"
                        },
                        "response": []
                    },
                    {
                        "name": "getAllDerivedCalendars",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/calendar/getAllDerivedCalendars",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "getAllDerivedCalendars"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "getDerivedCalendarDatesForCode",
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "{{qaurl}}/calendar/getDerivedCalendarDatesForCode?calendarCode=CZCEROLLCAL&startDate=2022-01-01&endDate=2022-12-31",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "calendar",
                                    "getDerivedCalendarDatesForCode"
                                ],
                                "query": [
                                    {
                                        "key": "calendarCode",
                                        "value": "CZCEROLLCAL"
                                    },
                                    {
                                        "key": "startDate",
                                        "value": "2022-01-01"
                                    },
                                    {
                                        "key": "endDate",
                                        "value": "2022-12-31"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Conversion",
                "item": [
                    {
                        "name": "GetAllUOM",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Message Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"UOM retrieved successfully\");\r",
                                        "});\r",
                                        "\r",
                                        "pm.test(\"Unit Check\", function () {\r",
                                        "    pm.expect(pm.response.text()).to.include(\"METRIC_TONNE\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNzAzZGQyYS02YTExLTQ1NDUtYWZhMC0yNWRmODM0MjhiZDkiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zIiwiY3VzdG9tOmNvbXBhbnkiOiJrbnNDb25zdWx0YW50cyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byJdLCJhdWQiOiI1bGgwbmo4c2xlMjE4NzZnYm42N2h0MDc2cyIsImV2ZW50X2lkIjoiNzI1NGIwMzUtYzIwMy00MjYzLWJjZTMtYmM4NWNjOWZhNWZhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MTg3NjEyNzAsIm5hbWUiOiJrb3dzaGlrIiwicGhvbmVfbnVtYmVyIjoiKzkxOTUxMzI3OTY2NiIsImV4cCI6MTYxODc2NDg3MCwiaWF0IjoxNjE4NzYxMjcwLCJmYW1pbHlfbmFtZSI6Ik5TIiwiZW1haWwiOiJrb3dzaGlrbnNAZ21haWwuY29tIn0.H8vg_ArGt_v-YneUGiKwAw4L5onO3a-lkAL-HPckLT897HVlUkMcU1QhEZZQiqYBIFQ6UNVW_4nPiP8CW3vkIL3nzPa6fyJSgHo6v-zX6mKThUfiBM7uw2uEcKwhNrWg-7dqwNCvG7WZsbwk9Mgc972BaKlU30tWDxedSxHLkjeHDMuaMkFMm81mnvi6RCxw6rUPjw2omkjfOkNwXL_UMLviMXctgD665iHXKCgTN4GG1KKmrHeE4PmBkANcuMr94TwSirc9U3WLYYQTlhREOzFW9saaPVhK63di4pfqgWP0s1BPF8ddRhdareQOlaAfp0AG3midRZSDy-DI_2HT_A"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/common/getAllUOM",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getAllUOM"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetConvertableUnits",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"UOM retrieved successfully\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImQ1OGI1NDdjLTIzMzMtNDYxOS1hYzY3LWQzMzA4MGZjOGU3NiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI2NDI2MzQ0LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjY0Mjk5NDQsImlhdCI6MTYyNjQyNjM0NCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.XmGCeeniPP7BEsTn-cryGMucEoF5Voc_d0arXU_wG2cdUL2fcamu4TYj6gwbHPu-6PNX6eSjgng-iIV5xNCx7ofRTLENMGkeMjKI-1tXx0vxISK08JEKaujXmU6E7IsiHeE1qRXf73ivPv62lvnMY11d3EOVNaEc8XnUw92OhzplKa8A8XtKIPslT211ye4Klzm7HzT6MV5SJ76ZBkFTGZEbSi1eGqDTvn3lzv6fPI7ZWRdr32nfyuv4ILpjuP70nx2wObU2b8fpDid9dU1D85XwY0S3qN2CNQOJwdXu4AoLy7nNsGC_WiWPFS7BAMjHAQRT_fkgkEqyfk-ny9uQYw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/common/getConvertableUnits?group=ENERGY",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getConvertableUnits"
                                ],
                                "query": [
                                    {
                                        "key": "group",
                                        "value": "ENERGY"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetConversionParameters",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.message).to.eql(\"UOM retrieved successfully\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTFhYmI1Mi1iZTRkLTQwZmUtOWVkZi0yMzk5YjgxZTIwMmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoia293c2hpa25zdnR4MyIsImN1c3RvbTpjb21wYW55Ijoia25zQ29uc3VsdGFudHMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImQ1OGI1NDdjLTIzMzMtNDYxOS1hYzY3LWQzMzA4MGZjOGU3NiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI2NDI2MzQ0LCJuYW1lIjoia293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MjY0Mjk5NDQsImlhdCI6MTYyNjQyNjM0NCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpay5uc0B2ZW50cmlrcy5jb20ifQ.XmGCeeniPP7BEsTn-cryGMucEoF5Voc_d0arXU_wG2cdUL2fcamu4TYj6gwbHPu-6PNX6eSjgng-iIV5xNCx7ofRTLENMGkeMjKI-1tXx0vxISK08JEKaujXmU6E7IsiHeE1qRXf73ivPv62lvnMY11d3EOVNaEc8XnUw92OhzplKa8A8XtKIPslT211ye4Klzm7HzT6MV5SJ76ZBkFTGZEbSi1eGqDTvn3lzv6fPI7ZWRdr32nfyuv4ILpjuP70nx2wObU2b8fpDid9dU1D85XwY0S3qN2CNQOJwdXu4AoLy7nNsGC_WiWPFS7BAMjHAQRT_fkgkEqyfk-ny9uQYw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/common/getConversionParameters?fromUnit=ENERGY&toUnit=ALL&assetId=APCS%2FBALANCING_ENERGY_COSTS%7CUE_COSTS%7CPRICE",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getConversionParameters"
                                ],
                                "query": [
                                    {
                                        "key": "fromUnit",
                                        "value": "ENERGY"
                                    },
                                    {
                                        "key": "toUnit",
                                        "value": "ALL"
                                    },
                                    {
                                        "key": "assetId",
                                        "value": "APCS%2FBALANCING_ENERGY_COSTS%7CUE_COSTS%7CPRICE"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "WorkFlow",
                "item": [
                    {
                        "name": "createWorkflow",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);\r",
                                        "var wfname=pm.globals.set(\"wfname\", \"WF_QA\"+parseInt(Math.random()*10000));"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "var jsonData = pm.response.json();\r",
                                        "let wname = pm.variables.get(\"wfname\");\r",
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Rest Api Call successful\", function () {  \r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "    pm.expect(jsonData.data.name).to.eql(wname);\r",
                                        "    pm.expect(jsonData.data.startsWith.type).to.eql(\"ActivityEmail\");\r",
                                        "    console.log(jsonData.data.startsWith.type)\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjMzYWE5YTA3LTQ0MmEtNDFjYi1hNzViLTA5ODU4ZTljMjJhYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyNTYxNjk2LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDI1NjUyOTYsImlhdCI6MTYwMjU2MTY5NiwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.PgSNYIQ7ZPOJt9SS3HHU-JjMR0-fY03owpXTfadndB4E2NmGUu9WAvATC9B6fgBB-qwPCcNZ0l5IysiBLgrDYsNDP096huX-6gwl7YoOLzDeHocTWdWItI4y8r7OD288im0Nb3WtmHTnjGqcOX0mWNmbhshPBbt7mSFrfHPqWs8Ad7R1ibhdfbMGyOyquALHeZ5DnyQjMNeAC8JsAc6c51OAeLgGH7_4pML3oEst3TFpRNICGDDmj2VDFZIBt87nqFiF-v7wp9nlG9EgM9wDNS46s6k5mwVmSOC77iuG9Z8I1vPsvXHXZ3CUmzb0hur9HS_QytuZ8xMWpEi2jtn3nQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n  \"name\": \"QA WorkFlow dev\",\r\n  \"description\": \"QA WorkFlow\",\r\n  \"domain\": \"\",\r\n  \"layout\": \"{\\\"cells\\\":[{\\\"type\\\":\\\"app.FlowchartStart\\\",\\\"size\\\":{\\\"width\\\":48,\\\"height\\\":48},\\\"ports\\\":{\\\"items\\\":[{\\\"group\\\":\\\"out\\\",\\\"id\\\":\\\"88e5a268-236d-429a-a835-8abeb6f1daf9\\\"}]},\\\"position\\\":{\\\"x\\\":128,\\\"y\\\":192},\\\"id\\\":\\\"e87af1e6-05c8-4ed2-8e5c-703dd11ba2b7\\\",\\\"z\\\":1,\\\"attrs\\\":{\\\"icon\\\":{\\\"xlinkHref\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\"},\\\"label\\\":{\\\"text\\\":\\\"ActivityStart\\\"},\\\"activity\\\":{\\\"type\\\":\\\"ActivityStart\\\",\\\"name\\\":\\\"ActivityStart\\\",\\\"fullName\\\":\\\"com.vtx.rpa.di.ActivityStart\\\",\\\"shortName\\\":\\\"Start\\\",\\\"category\\\":\\\"Utility\\\",\\\"iconUrl\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\",\\\"transitions\\\":[{\\\"name\\\":\\\"START\\\",\\\"description\\\":\\\"Start from this activity\\\"}],\\\"executionResult\\\":{\\\"transition\\\":null,\\\"activityVariableDefinitions\\\":null}}}},{\\\"type\\\":\\\"app.Message\\\",\\\"size\\\":{\\\"width\\\":368,\\\"height\\\":80},\\\"ports\\\":{\\\"items\\\":[{\\\"group\\\":\\\"in\\\",\\\"id\\\":\\\"052cc630-62f3-49f8-a6f3-0834d017c845\\\"},{\\\"group\\\":\\\"out\\\",\\\"attrs\\\":{\\\"portLabel\\\":{\\\"text\\\":\\\"SUCCESS\\\",\\\"label\\\":\\\"SUCCESS\\\"},\\\"portBody\\\":{\\\"fill\\\":\\\"#28a745\\\"}},\\\"id\\\":\\\"14d296b3-d2a7-4ee4-a2bf-363d93a577e4\\\"},{\\\"group\\\":\\\"out\\\",\\\"attrs\\\":{\\\"portLabel\\\":{\\\"text\\\":\\\"FAIL\\\",\\\"label\\\":\\\"FAIL\\\"},\\\"portBody\\\":{\\\"fill\\\":\\\"#dc3545\\\"}},\\\"id\\\":\\\"669838f5-fb88-4782-8edb-0c3cde2cce70\\\"}]},\\\"position\\\":{\\\"x\\\":360,\\\"y\\\":176},\\\"id\\\":\\\"ffad5227-199f-4329-acd0-2e9bde8d842a\\\",\\\"z\\\":2,\\\"attrs\\\":{\\\"body\\\":{\\\"fill\\\":\\\"#FFFFFF\\\",\\\"stroke\\\":\\\"#E8E8E8\\\"},\\\"label\\\":{\\\"text\\\":\\\"ActivityEmail\\\"},\\\"icon\\\":{\\\"xlinkHref\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJlbnZlbG9wZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWVudmVsb3BlIGZhLXctMTYiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNDY0IDY0SDQ4QzIxLjQ5IDY0IDAgODUuNDkgMCAxMTJ2Mjg4YzAgMjYuNTEgMjEuNDkgNDggNDggNDhoNDE2YzI2LjUxIDAgNDgtMjEuNDkgNDgtNDhWMTEyYzAtMjYuNTEtMjEuNDktNDgtNDgtNDh6bTAgNDh2NDAuODA1Yy0yMi40MjIgMTguMjU5LTU4LjE2OCA0Ni42NTEtMTM0LjU4NyAxMDYuNDktMTYuODQxIDEzLjI0Ny01MC4yMDEgNDUuMDcyLTczLjQxMyA0NC43MDEtMjMuMjA4LjM3NS01Ni41NzktMzEuNDU5LTczLjQxMy00NC43MDFDMTA2LjE4IDE5OS40NjUgNzAuNDI1IDE3MS4wNjcgNDggMTUyLjgwNVYxMTJoNDE2ek00OCA0MDBWMjE0LjM5OGMyMi45MTQgMTguMjUxIDU1LjQwOSA0My44NjIgMTA0LjkzOCA4Mi42NDYgMjEuODU3IDE3LjIwNSA2MC4xMzQgNTUuMTg2IDEwMy4wNjIgNTQuOTU1IDQyLjcxNy4yMzEgODAuNTA5LTM3LjE5OSAxMDMuMDUzLTU0Ljk0NyA0OS41MjgtMzguNzgzIDgyLjAzMi02NC40MDEgMTA0Ljk0Ny04Mi42NTNWNDAwSDQ4eiI+PC9wYXRoPjwvc3ZnPg==\\\"},\\\"activity\\\":{\\\"type\\\":\\\"ActivityEmail\\\",\\\"name\\\":\\\"ActivityEmail\\\",\\\"fullName\\\":\\\"com.vtx.rpa.di.ActivityEmail\\\",\\\"shortName\\\":\\\"Email\\\",\\\"category\\\":\\\"VENTRIKS\\\",\\\"iconUrl\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJlbnZlbG9wZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWVudmVsb3BlIGZhLXctMTYiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNDY0IDY0SDQ4QzIxLjQ5IDY0IDAgODUuNDkgMCAxMTJ2Mjg4YzAgMjYuNTEgMjEuNDkgNDggNDggNDhoNDE2YzI2LjUxIDAgNDgtMjEuNDkgNDgtNDhWMTEyYzAtMjYuNTEtMjEuNDktNDgtNDgtNDh6bTAgNDh2NDAuODA1Yy0yMi40MjIgMTguMjU5LTU4LjE2OCA0Ni42NTEtMTM0LjU4NyAxMDYuNDktMTYuODQxIDEzLjI0Ny01MC4yMDEgNDUuMDcyLTczLjQxMyA0NC43MDEtMjMuMjA4LjM3NS01Ni41NzktMzEuNDU5LTczLjQxMy00NC43MDFDMTA2LjE4IDE5OS40NjUgNzAuNDI1IDE3MS4wNjcgNDggMTUyLjgwNVYxMTJoNDE2ek00OCA0MDBWMjE0LjM5OGMyMi45MTQgMTguMjUxIDU1LjQwOSA0My44NjIgMTA0LjkzOCA4Mi42NDYgMjEuODU3IDE3LjIwNSA2MC4xMzQgNTUuMTg2IDEwMy4wNjIgNTQuOTU1IDQyLjcxNy4yMzEgODAuNTA5LTM3LjE5OSAxMDMuMDUzLTU0Ljk0NyA0OS41MjgtMzguNzgzIDgyLjAzMi02NC40MDEgMTA0Ljk0Ny04Mi42NTNWNDAwSDQ4eiI+PC9wYXRoPjwvc3ZnPg==\\\",\\\"activityVariableDefinitions\\\":[{\\\"name\\\":\\\"fromEmail\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"From Email\\\",\\\"example\\\":\\\"kowshik.ns@ventriks.com\\\",\\\"displayName\\\":\\\"From\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"toEmail\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"To Email\\\",\\\"example\\\":\\\"kowshik.ns@ventriks.com\\\",\\\"displayName\\\":\\\"To\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"message\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Email Message\\\",\\\"example\\\":\\\"CSV Message failed\\\",\\\"displayName\\\":\\\"Message\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"textarea\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"subject\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"subject\\\",\\\"example\\\":\\\"CSV Result\\\",\\\"displayName\\\":\\\"Message\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"textarea\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true}],\\\"transitions\\\":[{\\\"name\\\":\\\"SUCCESS\\\",\\\"description\\\":\\\"Activity Completed successfully\\\"},{\\\"name\\\":\\\"FAIL\\\",\\\"description\\\":\\\"Activity failed\\\"}],\\\"executionResult\\\":{\\\"transition\\\":null,\\\"activityVariableDefinitions\\\":null},\\\"activityVariables\\\":[{\\\"name\\\":\\\"fromEmail\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"From Email\\\",\\\"example\\\":\\\"kowshik.ns@ventriks.com\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"toEmail\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"To Email\\\",\\\"example\\\":\\\"kowshik.ns@ventriks.com\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"subject\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Subject\\\",\\\"example\\\":\\\"kowshik.ns@ventriks.com\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"message\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Message\\\",\\\"example\\\":\\\"kowshik.ns@ventriks.com\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true}]},\\\"portAddButton\\\":{\\\"fill\\\":\\\"#BEBEBE\\\",\\\"cursor\\\":\\\"not-allowed\\\"}}},{\\\"type\\\":\\\"app.Message\\\",\\\"size\\\":{\\\"width\\\":368,\\\"height\\\":80},\\\"ports\\\":{\\\"items\\\":[{\\\"group\\\":\\\"in\\\",\\\"id\\\":\\\"5fd4ac81-52b9-43b4-9400-8b1809af4d22\\\"},{\\\"group\\\":\\\"out\\\",\\\"attrs\\\":{\\\"portLabel\\\":{\\\"text\\\":\\\"SUCCESS\\\",\\\"label\\\":\\\"SUCCESS\\\"},\\\"portBody\\\":{\\\"fill\\\":\\\"#28a745\\\"}},\\\"id\\\":\\\"d9c46f00-8bef-4021-9f4a-0c54983623ae\\\"},{\\\"group\\\":\\\"out\\\",\\\"attrs\\\":{\\\"portLabel\\\":{\\\"text\\\":\\\"FAIL\\\",\\\"label\\\":\\\"FAIL\\\"},\\\"portBody\\\":{\\\"fill\\\":\\\"#dc3545\\\"}},\\\"id\\\":\\\"c282a275-f24e-4caf-b3d2-098a6f6196a1\\\"}]},\\\"position\\\":{\\\"x\\\":32,\\\"y\\\":360},\\\"id\\\":\\\"26e15858-918c-47cf-89e7-5d03ae732c20\\\",\\\"z\\\":3,\\\"attrs\\\":{\\\"body\\\":{\\\"fill\\\":\\\"#FFFFFF\\\",\\\"stroke\\\":\\\"#E8E8E8\\\"},\\\"label\\\":{\\\"text\\\":\\\"ActivityCSVParser\\\"},\\\"icon\\\":{\\\"xlinkHref\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\"},\\\"activity\\\":{\\\"type\\\":\\\"ActivityCSVParser\\\",\\\"name\\\":\\\"ActivityCSVParser\\\",\\\"fullName\\\":\\\"com.vtx.rpa.di.ActivityCSVParser\\\",\\\"shortName\\\":\\\"CSVParser\\\",\\\"category\\\":\\\"VENTRIKS\\\",\\\"iconUrl\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\",\\\"activityVariableDefinitions\\\":[{\\\"name\\\":\\\"dateInFileName\\\",\\\"className\\\":\\\"java.lang.Boolean\\\",\\\"description\\\":\\\"If File Name Contains Date\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":\\\"Date in Filename\\\",\\\"valueType\\\":\\\"boolean\\\",\\\"inputType\\\":\\\"checkbox\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"uploadFile\\\",\\\"className\\\":null,\\\"description\\\":\\\"Please upload a valid file\\\",\\\"example\\\":\\\"\\\",\\\"displayName\\\":\\\"Upload\\\",\\\"valueType\\\":\\\"binary\\\",\\\"inputType\\\":\\\"file\\\",\\\"fileType\\\":\\\".csv\\\",\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"dataStartRow\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The start of actual Data Row\\\",\\\"example\\\":\\\"2\\\",\\\"displayName\\\":\\\"Start Row\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"headerRow\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The header row\\\",\\\"example\\\":\\\"1\\\",\\\"displayName\\\":\\\"Header Row\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"assetColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The list of Assets to derive from this file\\\",\\\"example\\\":\\\"COL2,COL3,COL4,COL11,COL13\\\",\\\"displayName\\\":\\\"Asset Columns\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"dragDrop\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"dateColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The dateColumn in the file\\\",\\\"example\\\":\\\"COL1\\\",\\\"displayName\\\":\\\"Date Columns\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"dragDrop\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"valueColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The list of values to derive from this file\\\",\\\"example\\\":\\\"COL14!SETTLE\\\",\\\"displayName\\\":\\\"Value Columns\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"dragDrop\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"headerHasAsset\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Whether the header has asset\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":\\\"Header has asset\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":false},{\\\"name\\\":\\\"readFullHistory\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Whether the read the full history\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":\\\"Whether to read the full history\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":false},{\\\"name\\\":\\\"description\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Description of the file that automatically generates the meta data tags\\\",\\\"example\\\":\\\"This is CME File\\\",\\\"displayName\\\":\\\"Description of the file\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":false}],\\\"transitions\\\":[{\\\"name\\\":\\\"SUCCESS\\\",\\\"description\\\":\\\"Activity Completed successfully\\\"},{\\\"name\\\":\\\"FAIL\\\",\\\"description\\\":\\\"Activity failed\\\"}],\\\"executionResult\\\":{\\\"transition\\\":null,\\\"activityVariableDefinitions\\\":null},\\\"activityVariables\\\":[{\\\"name\\\":\\\"dateInFileName\\\",\\\"className\\\":\\\"java.lang.Boolean\\\",\\\"description\\\":\\\"If File Name Contains Date\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"dataStartRow\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The start of actual Data Row\\\",\\\"example\\\":\\\"2\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"headerRow\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The header row\\\",\\\"example\\\":\\\"1\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"assetColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The list of Assets to derive from this file\\\",\\\"example\\\":\\\"COL2,COL3,COL4,COL11,COL13\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"dateColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The dateColumn in the file\\\",\\\"example\\\":\\\"COL1\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"valueColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The list of values to derive from this file\\\",\\\"example\\\":\\\"COL14!SETTLE\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true}]},\\\"portAddButton\\\":{\\\"fill\\\":\\\"#BEBEBE\\\",\\\"cursor\\\":\\\"not-allowed\\\"}}},{\\\"type\\\":\\\"app.FlowchartEnd\\\",\\\"size\\\":{\\\"width\\\":48,\\\"height\\\":48},\\\"ports\\\":{\\\"items\\\":[{\\\"group\\\":\\\"in\\\",\\\"id\\\":\\\"d27c1017-a14e-485f-be1e-0dcaada7a027\\\"}]},\\\"position\\\":{\\\"x\\\":632,\\\"y\\\":360},\\\"id\\\":\\\"9dbbe624-6582-40b0-bbae-c0360c22c226\\\",\\\"z\\\":4,\\\"attrs\\\":{\\\"icon\\\":{\\\"xlinkHref\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\"},\\\"label\\\":{\\\"text\\\":\\\"ActivityEnd\\\"},\\\"activity\\\":{\\\"type\\\":\\\"ActivityEnd\\\",\\\"name\\\":\\\"ActivityEnd\\\",\\\"fullName\\\":\\\"com.vtx.rpa.di.ActivityEnd\\\",\\\"shortName\\\":\\\"End\\\",\\\"category\\\":\\\"Utility\\\",\\\"iconUrl\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\",\\\"executionResult\\\":{\\\"transition\\\":null,\\\"activityVariableDefinitions\\\":null}}}},{\\\"type\\\":\\\"app.Link\\\",\\\"labels\\\":[{\\\"attrs\\\":{\\\"labelText\\\":{\\\"text\\\":\\\"\\\"}},\\\"position\\\":{\\\"distance\\\":0.25}},{\\\"attrs\\\":{\\\"label\\\":{\\\"fill\\\":\\\"#dc3545\\\"},\\\"text\\\":{\\\"text\\\":\\\"START\\\"}}}],\\\"source\\\":{\\\"id\\\":\\\"e87af1e6-05c8-4ed2-8e5c-703dd11ba2b7\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"88e5a268-236d-429a-a835-8abeb6f1daf9\\\"},\\\"target\\\":{\\\"id\\\":\\\"ffad5227-199f-4329-acd0-2e9bde8d842a\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"052cc630-62f3-49f8-a6f3-0834d017c845\\\"},\\\"id\\\":\\\"20d232d2-73ea-41b5-aa54-21e367f4310c\\\",\\\"z\\\":5,\\\"attrs\\\":{}},{\\\"type\\\":\\\"app.Link\\\",\\\"labels\\\":[{\\\"attrs\\\":{\\\"labelText\\\":{\\\"text\\\":\\\"\\\"}},\\\"position\\\":{\\\"distance\\\":0.25}},{\\\"attrs\\\":{\\\"label\\\":{\\\"fill\\\":\\\"#dc3545\\\"},\\\"text\\\":{\\\"text\\\":\\\"FAIL\\\"}}}],\\\"source\\\":{\\\"id\\\":\\\"ffad5227-199f-4329-acd0-2e9bde8d842a\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"669838f5-fb88-4782-8edb-0c3cde2cce70\\\"},\\\"target\\\":{\\\"id\\\":\\\"26e15858-918c-47cf-89e7-5d03ae732c20\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"5fd4ac81-52b9-43b4-9400-8b1809af4d22\\\"},\\\"id\\\":\\\"32067906-028d-4bf7-a39b-f64cdacfd9ae\\\",\\\"z\\\":6,\\\"attrs\\\":{}},{\\\"type\\\":\\\"app.Link\\\",\\\"labels\\\":[{\\\"attrs\\\":{\\\"labelText\\\":{\\\"text\\\":\\\"\\\"}},\\\"position\\\":{\\\"distance\\\":0.25}},{\\\"attrs\\\":{\\\"label\\\":{\\\"fill\\\":\\\"#28a745\\\"},\\\"text\\\":{\\\"text\\\":\\\"SUCCESS\\\"}}}],\\\"source\\\":{\\\"id\\\":\\\"26e15858-918c-47cf-89e7-5d03ae732c20\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"d9c46f00-8bef-4021-9f4a-0c54983623ae\\\"},\\\"target\\\":{\\\"id\\\":\\\"9dbbe624-6582-40b0-bbae-c0360c22c226\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"d27c1017-a14e-485f-be1e-0dcaada7a027\\\"},\\\"id\\\":\\\"6a791233-7d60-46a7-b41f-7c9bc1f186fa\\\",\\\"z\\\":7,\\\"attrs\\\":{}}]}\",\r\n  \"startsWith\": {\r\n    \"id\": \"ffad5227-199f-4329-acd0-2e9bde8d842a\",\r\n    \"type\": \"ActivityEmail\",\r\n    \"from\": [\r\n      {\r\n        \"cell\": \"e87af1e6-05c8-4ed2-8e5c-703dd11ba2b7\",\r\n        \"port\": \"88e5a268-236d-429a-a835-8abeb6f1daf9\",\r\n        \"label\": \"\"\r\n      }\r\n    ],\r\n    \"to\": [\r\n      \"26e15858-918c-47cf-89e7-5d03ae732c20\"\r\n    ],\r\n    \"shapeType\": \"app.Message\",\r\n    \"transitionPath\": {\r\n      \"SUCCESS\": \"\",\r\n      \"FAIL\": \"com.vtx.rpa.di.ActivityCSVParser\"\r\n    },\r\n    \"activityVariables\": [\r\n      {\r\n        \"name\": \"fromEmail\",\r\n        \"className\": \"java.lang.String\",\r\n        \"description\": \"From Email\",\r\n        \"example\": \"kowshik.ns@ventriks.com\",\r\n        \"displayName\": \"From\",\r\n        \"valueType\": \"string\",\r\n        \"inputType\": \"text\",\r\n        \"fileType\": null,\r\n        \"value\": null,\r\n        \"mandatory\": true\r\n      },\r\n      {\r\n        \"name\": \"toEmail\",\r\n        \"className\": \"java.lang.String\",\r\n        \"description\": \"To Email\",\r\n        \"example\": \"kowshik.ns@ventriks.com\",\r\n        \"displayName\": \"To\",\r\n        \"valueType\": \"string\",\r\n        \"inputType\": \"text\",\r\n        \"fileType\": null,\r\n        \"value\": null,\r\n        \"mandatory\": true\r\n      },\r\n      {\r\n        \"name\": \"message\",\r\n        \"className\": \"java.lang.String\",\r\n        \"description\": \"Email Message\",\r\n        \"example\": \"CSV Message failed\",\r\n        \"displayName\": \"Message\",\r\n        \"valueType\": \"string\",\r\n        \"inputType\": \"textarea\",\r\n        \"fileType\": null,\r\n        \"value\": null,\r\n        \"mandatory\": true\r\n      },\r\n      {\r\n        \"name\": \"subject\",\r\n        \"className\": \"java.lang.String\",\r\n        \"description\": \"subject\",\r\n        \"example\": \"CSV Result\",\r\n        \"displayName\": \"Message\",\r\n        \"valueType\": \"string\",\r\n        \"inputType\": \"textarea\",\r\n        \"fileType\": null,\r\n        \"value\": null,\r\n        \"mandatory\": true\r\n      }\r\n    ]\r\n  },\r\n  \"activityList\": [\r\n    {\r\n      \"id\": \"e87af1e6-05c8-4ed2-8e5c-703dd11ba2b7\",\r\n      \"type\": \"ActivityStart\",\r\n      \"from\": [],\r\n      \"to\": [\r\n        \"ffad5227-199f-4329-acd0-2e9bde8d842a\"\r\n      ],\r\n      \"shapeType\": \"app.FlowchartStart\",\r\n      \"transitionPath\": {},\r\n      \"activityVariables\": []\r\n    },\r\n    {\r\n      \"id\": \"ffad5227-199f-4329-acd0-2e9bde8d842a\",\r\n      \"type\": \"ActivityEmail\",\r\n      \"from\": [\r\n        {\r\n          \"cell\": \"e87af1e6-05c8-4ed2-8e5c-703dd11ba2b7\",\r\n          \"port\": \"88e5a268-236d-429a-a835-8abeb6f1daf9\",\r\n          \"label\": \"\"\r\n        }\r\n      ],\r\n      \"to\": [\r\n        \"26e15858-918c-47cf-89e7-5d03ae732c20\"\r\n      ],\r\n      \"shapeType\": \"app.Message\",\r\n      \"transitionPath\": {\r\n        \"SUCCESS\": \"\",\r\n        \"FAIL\": \"com.vtx.rpa.di.ActivityCSVParser\"\r\n      },\r\n      \"activityVariables\": [\r\n        {\r\n          \"name\": \"fromEmail\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"From Email\",\r\n          \"example\": \"kowshik.ns@ventriks.com\",\r\n          \"displayName\": \"From\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"text\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"toEmail\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"To Email\",\r\n          \"example\": \"kowshik.ns@ventriks.com\",\r\n          \"displayName\": \"To\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"text\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"message\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"Email Message\",\r\n          \"example\": \"CSV Message failed\",\r\n          \"displayName\": \"Message\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"textarea\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"subject\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"subject\",\r\n          \"example\": \"CSV Result\",\r\n          \"displayName\": \"Message\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"textarea\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"id\": \"26e15858-918c-47cf-89e7-5d03ae732c20\",\r\n      \"type\": \"ActivityCSVParser\",\r\n      \"shapeType\": \"app.Message\",\r\n      \"transitionPath\": {\r\n        \"SUCCESS\": \"com.vtx.rpa.di.ActivityEnd\",\r\n        \"FAIL\": \"\"\r\n      },\r\n      \"from\": [\r\n        {\r\n          \"cell\": \"ffad5227-199f-4329-acd0-2e9bde8d842a\",\r\n          \"port\": \"669838f5-fb88-4782-8edb-0c3cde2cce70\",\r\n          \"label\": \"FAIL\"\r\n        }\r\n      ],\r\n      \"to\": [\r\n        \"9dbbe624-6582-40b0-bbae-c0360c22c226\"\r\n      ],\r\n      \"activityVariables\": [\r\n        {\r\n          \"name\": \"dateInFileName\",\r\n          \"className\": \"java.lang.Boolean\",\r\n          \"description\": \"If File Name Contains Date\",\r\n          \"example\": \"true\",\r\n          \"displayName\": \"Date in Filename\",\r\n          \"valueType\": \"boolean\",\r\n          \"inputType\": \"checkbox\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"uploadFile\",\r\n          \"className\": null,\r\n          \"description\": \"Please upload a valid file\",\r\n          \"example\": \"\",\r\n          \"displayName\": \"Upload\",\r\n          \"valueType\": \"binary\",\r\n          \"inputType\": \"file\",\r\n          \"fileType\": \".csv\",\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"dataStartRow\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"The start of actual Data Row\",\r\n          \"example\": \"2\",\r\n          \"displayName\": \"Start Row\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"text\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"headerRow\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"The header row\",\r\n          \"example\": \"1\",\r\n          \"displayName\": \"Header Row\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"text\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"assetColumns\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"The list of Assets to derive from this file\",\r\n          \"example\": \"COL2,COL3,COL4,COL11,COL13\",\r\n          \"displayName\": \"Asset Columns\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"dragDrop\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"dateColumns\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"The dateColumn in the file\",\r\n          \"example\": \"COL1\",\r\n          \"displayName\": \"Date Columns\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"dragDrop\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"valueColumns\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"The list of values to derive from this file\",\r\n          \"example\": \"COL14!SETTLE\",\r\n          \"displayName\": \"Value Columns\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"dragDrop\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": true\r\n        },\r\n        {\r\n          \"name\": \"headerHasAsset\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"Whether the header has asset\",\r\n          \"example\": \"true\",\r\n          \"displayName\": \"Header has asset\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"text\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": false\r\n        },\r\n        {\r\n          \"name\": \"readFullHistory\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"Whether the read the full history\",\r\n          \"example\": \"true\",\r\n          \"displayName\": \"Whether to read the full history\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"text\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": false\r\n        },\r\n        {\r\n          \"name\": \"description\",\r\n          \"className\": \"java.lang.String\",\r\n          \"description\": \"Description of the file that automatically generates the meta data tags\",\r\n          \"example\": \"This is CME File\",\r\n          \"displayName\": \"Description of the file\",\r\n          \"valueType\": \"string\",\r\n          \"inputType\": \"text\",\r\n          \"fileType\": null,\r\n          \"value\": null,\r\n          \"mandatory\": false\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"id\": \"9dbbe624-6582-40b0-bbae-c0360c22c226\",\r\n      \"type\": \"ActivityEnd\",\r\n      \"shapeType\": \"app.FlowchartEnd\",\r\n      \"transitionPath\": {},\r\n      \"from\": [\r\n        {\r\n          \"cell\": \"26e15858-918c-47cf-89e7-5d03ae732c20\",\r\n          \"port\": \"d9c46f00-8bef-4021-9f4a-0c54983623ae\",\r\n          \"label\": \"SUCCESS\"\r\n        }\r\n      ],\r\n      \"to\": [],\r\n      \"activityVariables\": []\r\n    }\r\n  ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/workflow/createWorkflow",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "createWorkflow"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "updateWorkflow",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImYzNWQ1M2M2LTYzZjUtNDk2OC04OWZhLTlkYjhhYjE4OGIwZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyMzAyNzY0LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDIzMDYzNjQsImlhdCI6MTYwMjMwMjc2NCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.cJWU7j2UDGSylNR2fOG4IRPTUarawbyEYIHmDyd1L45xc5OhTow643IeTzJqCxYupSBaucMoH1373f-Gpw047W9gVcuwTjXjh3Wy_Y9sFiI-vG84GycEx7kuzHIcMYowy8VIMfsVLWBqn68PA6NfYHBfVrqzwBOeSYwngM5pLZaw__FnW2xSZTlNFFafdVZ-c9yriKJ57OWyNvET79ag7TpA5NfovphaDf4cc67zIo8AxY4quGUwnUK0LOCemDe1D7reUxfDg4_W9tJVRZL0hxtAWojD99YInZ6_gy4zgQxvotX2o2C685X31RYKAU3PDDA54Gy2sAUgi626-clvJQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n  \"name\" : \"{{wfname}}\",\r\n  \"description\" : \"QA WorkFlow Updated\",\r\n  \"startsWith\" : {\r\n    \"type\" : \"ActivityCSVParser\",\r\n    \"fullName\" : \"com.vtx.rpa.di.ActivityCSVParser\",\r\n    \"shortName\" : \"ActivityCSVParser\",\r\n    \"category\" : \"VENTRIKS\",\r\n    \"transitions\" : [ {\r\n      \"name\" : \"SUCCESS\",\r\n      \"description\" : \"Activity Completed successfully\"\r\n    }, {\r\n      \"name\" : \"FAIL\",\r\n      \"description\" : \"Activity failed\"\r\n    } ],\r\n    \"transitionPath\" : {\r\n      \"OK\" : \"com.vtx.rpa.di.ActivityEmail\",\r\n      \"FAIL\" : \"com.vtx.rpa.di.ActivityEnd\"\r\n    },\r\n    \"activityVariables\" : [ {\r\n      \"name\" : \"dateInFileName\",\r\n      \"className\" : \"java.lang.Boolean\",\r\n      \"description\" : \"If File Name Contains Date\",\r\n      \"example\" : \"true\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"dataStartRow\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The start of actual Data Row\",\r\n      \"example\" : \"2\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"headerRow\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The header row\",\r\n      \"example\" : \"1\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"assetColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The list of Assets to derive from this file\",\r\n      \"example\" : \"COL2,COL3,COL4,COL11,COL13\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"dateColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The dateColumn in the file\",\r\n      \"example\" : \"COL1\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"valueColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The list of values to derive from this file\",\r\n      \"example\" : \"COL14!SETTLE\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    } ]\r\n  },\r\n  \"activityList\" : [ {\r\n    \"type\" : \"ActivityCSVParser\",\r\n    \"fullName\" : \"com.vtx.rpa.di.ActivityCSVParser\",\r\n    \"shortName\" : \"ActivityCSVParser\",\r\n    \"category\" : \"VENTRIKS\",\r\n    \"transitions\" : [ {\r\n      \"name\" : \"SUCCESS\",\r\n      \"description\" : \"Activity Completed successfully\"\r\n    }, {\r\n      \"name\" : \"FAIL\",\r\n      \"description\" : \"Activity failed\"\r\n    } ],\r\n    \"transitionPath\" : {\r\n      \"OK\" : \"com.vtx.rpa.di.ActivityEmail\",\r\n      \"FAIL\" : \"com.vtx.rpa.di.ActivityEnd\"\r\n    },\r\n    \"activityVariables\" : [ {\r\n      \"name\" : \"dateInFileName\",\r\n      \"className\" : \"java.lang.Boolean\",\r\n      \"description\" : \"If File Name Contains Date\",\r\n      \"example\" : \"true\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"dataStartRow\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The start of actual Data Row\",\r\n      \"example\" : \"2\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"headerRow\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The header row\",\r\n      \"example\" : \"1\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"assetColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The list of Assets to derive from this file\",\r\n      \"example\" : \"COL2,COL3,COL4,COL11,COL13\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"dateColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The dateColumn in the file\",\r\n      \"example\" : \"COL1\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"valueColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The list of values to derive from this file\",\r\n      \"example\" : \"COL14!SETTLE\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    } ]\r\n  }, {\r\n    \"type\" : \"ActivityEmail\",\r\n    \"fullName\" : \"com.vtx.rpa.di.ActivityEmail\",\r\n    \"shortName\" : \"ActivityEmail\",\r\n    \"category\" : \"VENTRIKS\",\r\n    \"transitions\" : [ {\r\n      \"name\" : \"SUCCESS\",\r\n      \"description\" : \"Activity Completed successfully\"\r\n    }, {\r\n      \"name\" : \"FAIL\",\r\n      \"description\" : \"Activity failed\"\r\n    } ],\r\n    \"transitionPath\" : {\r\n      \"OK\" : \"com.vtx.rpa.di.ActivityEnd\",\r\n      \"FAIL\" : \"com.vtx.rpa.di.ActivityEnd\"\r\n    },\r\n    \"activityVariables\" : [ {\r\n      \"name\" : \"fromEmail\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"From Email\",\r\n      \"example\" : \"kowshik.ns@ventriks.com\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"toEmail\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"To Email\",\r\n      \"example\" : \"kowshik.ns@ventriks.com\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"message\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"Message\",\r\n      \"example\" : \"kowshik.ns@ventriks.com\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    } ]\r\n  } ],\r\n  \"end\" : false\r\n}\r\n",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/workflow/updateWorkflow?id=5fb33e41bd88364d4b44095d",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "updateWorkflow"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "5fb33e41bd88364d4b44095d"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetWorkflows",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "var jsonData = pm.response.json();\r",
                                        "let wname =  pm.variables.get(\"wname\");\r",
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"var jsonData = pm.response.json();\", function () {\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "    for(let wfname of jsonData.data){\r",
                                        "        if(wfname.name == wname){\r",
                                        "            pm.expect(wfname.name).to.eql(pm.variables.get(\"wname\"));\r",
                                        "        }\r",
                                        "    }\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6Ijc0ZjNmNDA2LWYyYjctNGQ4Zi1iYmI4LTY3MmYwNThjZWFmMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyNTY5NzQ0LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDI1NzMzNDQsImlhdCI6MTYwMjU2OTc0NCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.aI1d2ThQzW0NgaiVAyKjrRSMpp3zsLQSjCkVvD8G-MGgDshlp715qxKRBV32lnbcquBw01suQH-ZMR_w-scHqMStwffUxQhj3Az7ErFwAs4_Pcge1vYpo971zPQqIuwomHWJ5hOc8zQvG6iJTGhTPWSdXEy1PgEbS2saWBf5rFKmqAq1qInuiRV6RsTi6T6ayGOyBcA38bW9C7wAD-NtJAE7WI4WLtOZmpNj-usxsAwacId-lFmngt_nQAE9c0LIW0HzifudGTjgSIc43XbCiib-WFNZT4-_i08XqfaA1yiJRkPA6NcR340L1As7PobogRs-ktDUVkU7izpzULyMmQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/workflow/getWorkflows?skip=0&limit=10",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "getWorkflows"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "10"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetWorkflowById",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImFjZjcyMzkyLTQxZTctNDdjNy05NDRmLTA4MzBjZTZjNzAzZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyNDk0OTI4LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDI0OTg1MjgsImlhdCI6MTYwMjQ5NDkyOCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.P6WyLiT_eQMzgrSuiDou9OxznunKEm6Wzpn-pKuPyE3dr4sNXmlMbfDr6MsVxmbSl_E7qVN7GbtiqG-dbRzSHhHeY7eAJsW5BtkWRBcVULsvNuWt-eRsCrk810cl0lf3HP_US7BFZUd3O073bmKQ0UW9-C28EWwcjmB-nFfFMT2oEEVK7OL31zZ8A4OAEQh-PASLTY2Jr-nelBfeRbEJXqadMJD3dN8nssX1SCXi9Hxqc33s6jFc-QG3L-QlwaQ1Pldj91DistjKgjc7Ns8bEGiKDKey88bdiyQQK3qA00Z01bpZ2WhUkTArSer2TsoeYTgKWkvsQuo2tDiBuosrSg"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/workflow/getWorkFlowById?id=5f9c00b373810c2ef1cb2c8a",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "getWorkFlowById"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "5f9c00b373810c2ef1cb2c8a"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "CreateProcessJob",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);\r",
                                        "var jobname=pm.globals.set(\"jobname\", \"JOB_QA\"+parseInt(Math.random()*10000));"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Rest Api Call successful\", function () { \r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "    pm.expect(jsonData.data.name).to.eql(pm.variables.get(\"jobname\"));\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImQ4Yjc3YWY0LTU3NzAtNGFjZi1hOWFhLWVkMTI3YjBjNzYxOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA0MDM1MzA4LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDQwMzg5MDgsImlhdCI6MTYwNDAzNTMwOCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.QxIHj-Id2i04vgABEpQwMcdj_iPssxmQFYqx6YkemgWQQ0t8pVX8pu2DdJTKGAsY1_mncqPNrzP0Ydyc3bFMl0DLzgkltP2QdRV0Osm8FcV4in8CjAGlBMPuZbXlrUApwcFgx4dWpIgn0w8lOMNFwnceZnpmJDmBH2i6nyo0TpZvXGp0H0gkf0b2R6j-DpFqOdS8YVPbdA3TRWFI1rgJc9CxxISNM-ssSfLVxyldcnOX8iQYX0nOVn3yMp3Qt7sA4vSvkabtRRSX6DdG_PKGzDjfwFlwPh92iUQeZf_Sjt1g_k9ozJN1w8ks5b8oS7wrVjhYAgudYc05r3uyyaYTRA"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": \"{{jobname}}\",\r\n    \"workflow\": {\r\n        \"_id\": \"5f9951c56aea8a5be7539edd\",\r\n        \"name\": \"{{wfname}}\",\r\n        \"startsWith\": {\r\n            \"type\": \"ActivityCSVParser\",\r\n            \"fullName\": \"com.vtx.rpa.di.ActivityCSVParser\",\r\n            \"shortName\": \"ActivityCSVParser\",\r\n            \"category\": \"VENTRIKS\",\r\n            \"activityVariableDefinitions\": [\r\n                {\r\n                    \"name\": \"dateInFileName\",\r\n                    \"className\": \"java.lang.Boolean\",\r\n                    \"description\": \"If File Name Contains Date\",\r\n                    \"example\": \"true\",\r\n                    \"displayName\": \"Date in Filename\",\r\n                    \"valueType\": \"boolean\",\r\n                    \"inputType\": \"checkbox\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"uploadFile\",\r\n                    \"className\": null,\r\n                    \"description\": \"Please upload a valid file\",\r\n                    \"example\": \"\",\r\n                    \"displayName\": \"Upload\",\r\n                    \"valueType\": \"binary\",\r\n                    \"inputType\": \"file\",\r\n                    \"fileType\": \".csv\",\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"dataStartRow\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The start of actual Data Row\",\r\n                    \"example\": \"2\",\r\n                    \"displayName\": \"Start Row\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"text\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"headerRow\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The header row\",\r\n                    \"example\": \"1\",\r\n                    \"displayName\": \"Header Row\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"text\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"assetColumns\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The list of Assets to derive from this file\",\r\n                    \"example\": \"COL2,COL3,COL4,COL11,COL13\",\r\n                    \"displayName\": \"Asset Columns\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"dragDrop\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"dateColumns\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The dateColumn in the file\",\r\n                    \"example\": \"COL1\",\r\n                    \"displayName\": \"Date Columns\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"dragDrop\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"valueColumns\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The list of values to derive from this file\",\r\n                    \"example\": \"COL14!SETTLE\",\r\n                    \"displayName\": \"Value Columns\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"dragDrop\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"headerHasAsset\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"Whether the header has asset\",\r\n                    \"example\": \"true\",\r\n                    \"displayName\": \"Header has asset\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"text\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": false\r\n                },\r\n                {\r\n                    \"name\": \"readFullHistory\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"Whether the read the full history\",\r\n                    \"example\": \"true\",\r\n                    \"displayName\": \"Whether to read the full history\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"text\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": false\r\n                },\r\n                {\r\n                    \"name\": \"assetGroup\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"Asset Group\",\r\n                    \"example\": \"true\",\r\n                    \"displayName\": \"Asset Group\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"text\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"assetSubgroup\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"Asset Sub Group\",\r\n                    \"example\": \"true\",\r\n                    \"displayName\": \"Asset Sub Group\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"text\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": false\r\n                },\r\n                {\r\n                    \"name\": \"description\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"Description of the file that automatically generates the meta data tags\",\r\n                    \"example\": \"This is CME File\",\r\n                    \"displayName\": \"Description of the file\",\r\n                    \"valueType\": \"string\",\r\n                    \"inputType\": \"text\",\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": false\r\n                }\r\n            ],\r\n            \"transitions\": [\r\n                {\r\n                    \"name\": \"SUCCESS\",\r\n                    \"description\": \"Activity Completed successfully\"\r\n                },\r\n                {\r\n                    \"name\": \"FAIL\",\r\n                    \"description\": \"Activity failed\"\r\n                }\r\n            ],\r\n            \"transitionPath\": {\r\n                \"SUCCESS\": \"com.vtx.rpa.di.ActivityEnd\",\r\n                \"FAIL\": null\r\n            },\r\n            \"executionResult\": {\r\n                \"transition\": null,\r\n                \"activityVariableDefinitions\": null\r\n            },\r\n            \"id\": \"c619e19f-6d19-4287-8741-8fca7e8dfb5d\",\r\n            \"from\": [\r\n                {\r\n                    \"cell\": \"543bad60-3442-4a9e-ab15-0d0c1f970571\",\r\n                    \"port\": \"108247c4-9471-4a1c-9454-bc27e8c41ec3\",\r\n                    \"label\": \"\"\r\n                }\r\n            ],\r\n            \"to\": [\r\n                \"8e932786-4a70-4e39-8f6c-057b957d12f9\"\r\n            ],\r\n            \"shapeType\": \"app.Message\",\r\n            \"activityVariables\": [\r\n                {\r\n                    \"name\": \"dateInFileName\",\r\n                    \"className\": \"java.lang.Boolean\",\r\n                    \"description\": \"If File Name Contains Date\",\r\n                    \"example\": \"true\",\r\n                    \"displayName\": null,\r\n                    \"valueType\": null,\r\n                    \"inputType\": null,\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"dataStartRow\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The start of actual Data Row\",\r\n                    \"example\": \"2\",\r\n                    \"displayName\": null,\r\n                    \"valueType\": null,\r\n                    \"inputType\": null,\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"headerRow\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The header row\",\r\n                    \"example\": \"1\",\r\n                    \"displayName\": null,\r\n                    \"valueType\": null,\r\n                    \"inputType\": null,\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"assetColumns\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The list of Assets to derive from this file\",\r\n                    \"example\": \"COL2,COL3,COL4,COL11,COL13\",\r\n                    \"displayName\": null,\r\n                    \"valueType\": null,\r\n                    \"inputType\": null,\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"dateColumns\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The dateColumn in the file\",\r\n                    \"example\": \"COL1\",\r\n                    \"displayName\": null,\r\n                    \"valueType\": null,\r\n                    \"inputType\": null,\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                },\r\n                {\r\n                    \"name\": \"valueColumns\",\r\n                    \"className\": \"java.lang.String\",\r\n                    \"description\": \"The list of values to derive from this file\",\r\n                    \"example\": \"COL14!SETTLE\",\r\n                    \"displayName\": null,\r\n                    \"valueType\": null,\r\n                    \"inputType\": null,\r\n                    \"fileType\": null,\r\n                    \"value\": null,\r\n                    \"mandatory\": true\r\n                }\r\n            ]\r\n        },\r\n        \"activityList\": [\r\n            {\r\n                \"type\": \"ActivityStart\",\r\n                \"fullName\": \"com.vtx.rpa.di.ActivityStart\",\r\n                \"shortName\": \"ActivityStart\",\r\n                \"category\": \"VENTRIKS\",\r\n                \"transitions\": [\r\n                    {\r\n                        \"name\": \"START\",\r\n                        \"description\": \"Start of an Activity\"\r\n                    }\r\n                ],\r\n                \"executionResult\": {\r\n                    \"transition\": null,\r\n                    \"activityVariableDefinitions\": null\r\n                },\r\n                \"id\": \"543bad60-3442-4a9e-ab15-0d0c1f970571\",\r\n                \"to\": [\r\n                    \"c619e19f-6d19-4287-8741-8fca7e8dfb5d\"\r\n                ],\r\n                \"shapeType\": \"app.FlowchartStart\"\r\n            },\r\n            {\r\n                \"type\": \"ActivityCSVParser\",\r\n                \"fullName\": \"com.vtx.rpa.di.ActivityCSVParser\",\r\n                \"shortName\": \"ActivityCSVParser\",\r\n                \"category\": \"VENTRIKS\",\r\n                \"activityVariableDefinitions\": [\r\n                    {\r\n                        \"name\": \"dateInFileName\",\r\n                        \"className\": \"java.lang.Boolean\",\r\n                        \"description\": \"If File Name Contains Date\",\r\n                        \"example\": \"true\",\r\n                        \"displayName\": \"Date in Filename\",\r\n                        \"valueType\": \"boolean\",\r\n                        \"inputType\": \"checkbox\",\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"uploadFile\",\r\n                        \"className\": null,\r\n                        \"description\": \"Please upload a valid file\",\r\n                        \"example\": \"\",\r\n                        \"displayName\": \"Upload\",\r\n                        \"valueType\": \"binary\",\r\n                        \"inputType\": \"file\",\r\n                        \"fileType\": \".csv\",\r\n                        \"value\": null,\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"dataStartRow\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The start of actual Data Row\",\r\n                        \"example\": \"2\",\r\n                        \"displayName\": \"Start Row\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"text\",\r\n                        \"fileType\": null,\r\n                        \"value\": \"2\",\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"headerRow\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The header row\",\r\n                        \"example\": \"1\",\r\n                        \"displayName\": \"Header Row\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"text\",\r\n                        \"fileType\": null,\r\n                        \"value\": \"1\",\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"assetColumns\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The list of Assets to derive from this file\",\r\n                        \"example\": \"COL2,COL3,COL4,COL11,COL13\",\r\n                        \"displayName\": \"Asset Columns\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"dragDrop\",\r\n                        \"fileType\": null,\r\n                        \"value\": \"BMW!COL2\",\r\n                        \"mandatory\": true,\r\n                        \"assetSuggestions\": [],\r\n                        \"assetColumns\": [\r\n                            {\r\n                                \"type\": \"assetColumns\",\r\n                                \"name\": \" USD\",\r\n                                \"value\": \"COL2\"\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        \"name\": \"dateColumns\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The dateColumn in the file\",\r\n                        \"example\": \"COL1\",\r\n                        \"displayName\": \"Date Columns\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"dragDrop\",\r\n                        \"fileType\": null,\r\n                        \"value\": \"BMW!COL1\",\r\n                        \"mandatory\": true,\r\n                        \"dateColumns\": [\r\n                            {\r\n                                \"type\": \"dateColumns\",\r\n                                \"name\": \"Date\",\r\n                                \"value\": \"COL1\"\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        \"name\": \"valueColumns\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The list of values to derive from this file\",\r\n                        \"example\": \"COL14!SETTLE\",\r\n                        \"displayName\": \"Value Columns\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"dragDrop\",\r\n                        \"fileType\": null,\r\n                        \"value\": \"BMW!COL2\",\r\n                        \"mandatory\": true,\r\n                        \"valueColumns\": [\r\n                            {\r\n                                \"type\": \"valueColumns\",\r\n                                \"name\": \" USD\",\r\n                                \"value\": \"COL2\"\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        \"name\": \"headerHasAsset\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"Whether the header has asset\",\r\n                        \"example\": \"true\",\r\n                        \"displayName\": \"Header has asset\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"text\",\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": false\r\n                    },\r\n                    {\r\n                        \"name\": \"readFullHistory\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"Whether the read the full history\",\r\n                        \"example\": \"true\",\r\n                        \"displayName\": \"Whether to read the full history\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"text\",\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": false\r\n                    },\r\n                    {\r\n                        \"name\": \"assetGroup\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"Asset Group\",\r\n                        \"example\": \"true\",\r\n                        \"displayName\": \"Asset Group\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"text\",\r\n                        \"fileType\": null,\r\n                        \"value\": \"BMW\",\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"assetSubgroup\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"Asset Sub Group\",\r\n                        \"example\": \"true\",\r\n                        \"displayName\": \"Asset Sub Group\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"text\",\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": false\r\n                    },\r\n                    {\r\n                        \"name\": \"description\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"Description of the file that automatically generates the meta data tags\",\r\n                        \"example\": \"This is CME File\",\r\n                        \"displayName\": \"Description of the file\",\r\n                        \"valueType\": \"string\",\r\n                        \"inputType\": \"text\",\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": false\r\n                    }\r\n                ],\r\n                \"transitions\": [\r\n                    {\r\n                        \"name\": \"SUCCESS\",\r\n                        \"description\": \"Activity Completed successfully\"\r\n                    },\r\n                    {\r\n                        \"name\": \"FAIL\",\r\n                        \"description\": \"Activity failed\"\r\n                    }\r\n                ],\r\n                \"transitionPath\": {\r\n                    \"SUCCESS\": \"com.vtx.rpa.di.ActivityEnd\",\r\n                    \"FAIL\": null\r\n                },\r\n                \"executionResult\": {\r\n                    \"transition\": null,\r\n                    \"activityVariableDefinitions\": null\r\n                },\r\n                \"id\": \"c619e19f-6d19-4287-8741-8fca7e8dfb5d\",\r\n                \"from\": [\r\n                    {\r\n                        \"cell\": \"543bad60-3442-4a9e-ab15-0d0c1f970571\",\r\n                        \"port\": \"108247c4-9471-4a1c-9454-bc27e8c41ec3\",\r\n                        \"label\": \"\"\r\n                    }\r\n                ],\r\n                \"to\": [\r\n                    \"8e932786-4a70-4e39-8f6c-057b957d12f9\"\r\n                ],\r\n                \"shapeType\": \"app.Message\",\r\n                \"activityVariables\": [\r\n                    {\r\n                        \"name\": \"dateInFileName\",\r\n                        \"className\": \"java.lang.Boolean\",\r\n                        \"description\": \"If File Name Contains Date\",\r\n                        \"example\": \"true\",\r\n                        \"displayName\": null,\r\n                        \"valueType\": null,\r\n                        \"inputType\": null,\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"dataStartRow\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The start of actual Data Row\",\r\n                        \"example\": \"2\",\r\n                        \"displayName\": null,\r\n                        \"valueType\": null,\r\n                        \"inputType\": null,\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"headerRow\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The header row\",\r\n                        \"example\": \"1\",\r\n                        \"displayName\": null,\r\n                        \"valueType\": null,\r\n                        \"inputType\": null,\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"assetColumns\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The list of Assets to derive from this file\",\r\n                        \"example\": \"COL2,COL3,COL4,COL11,COL13\",\r\n                        \"displayName\": null,\r\n                        \"valueType\": null,\r\n                        \"inputType\": null,\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"dateColumns\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The dateColumn in the file\",\r\n                        \"example\": \"COL1\",\r\n                        \"displayName\": null,\r\n                        \"valueType\": null,\r\n                        \"inputType\": null,\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": true\r\n                    },\r\n                    {\r\n                        \"name\": \"valueColumns\",\r\n                        \"className\": \"java.lang.String\",\r\n                        \"description\": \"The list of values to derive from this file\",\r\n                        \"example\": \"COL14!SETTLE\",\r\n                        \"displayName\": null,\r\n                        \"valueType\": null,\r\n                        \"inputType\": null,\r\n                        \"fileType\": null,\r\n                        \"value\": null,\r\n                        \"mandatory\": true\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                \"type\": \"ActivityEnd\",\r\n                \"fullName\": \"com.vtx.rpa.di.ActivityEnd\",\r\n                \"shortName\": \"ActivityEnd\",\r\n                \"category\": \"VENTRIKS\",\r\n                \"transitions\": [\r\n                    {\r\n                        \"name\": \"SUCCESS\",\r\n                        \"description\": \"Activity Completed successfully\"\r\n                    },\r\n                    {\r\n                        \"name\": \"FAIL\",\r\n                        \"description\": \"Activity failed\"\r\n                    }\r\n                ],\r\n                \"executionResult\": {\r\n                    \"transition\": null,\r\n                    \"activityVariableDefinitions\": null\r\n                },\r\n                \"id\": \"8e932786-4a70-4e39-8f6c-057b957d12f9\",\r\n                \"from\": [\r\n                    {\r\n                        \"cell\": \"c619e19f-6d19-4287-8741-8fca7e8dfb5d\",\r\n                        \"port\": \"f2f10f09-b4ed-4293-a061-3b027288e754\",\r\n                        \"label\": \"SUCCESS\"\r\n                    }\r\n                ],\r\n                \"shapeType\": \"app.FlowchartEnd\"\r\n            }\r\n        ],\r\n        \"layout\": \"{\\\"cells\\\":[{\\\"type\\\":\\\"app.FlowchartStart\\\",\\\"size\\\":{\\\"width\\\":48,\\\"height\\\":48},\\\"ports\\\":{\\\"items\\\":[{\\\"group\\\":\\\"out\\\",\\\"id\\\":\\\"108247c4-9471-4a1c-9454-bc27e8c41ec3\\\"}]},\\\"position\\\":{\\\"x\\\":-432,\\\"y\\\":-136},\\\"id\\\":\\\"543bad60-3442-4a9e-ab15-0d0c1f970571\\\",\\\"z\\\":1,\\\"attrs\\\":{\\\"icon\\\":{\\\"xlinkHref\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\"},\\\"label\\\":{\\\"text\\\":\\\"ActivityStart\\\"},\\\"activity\\\":{\\\"type\\\":\\\"ActivityStart\\\",\\\"name\\\":\\\"ActivityStart\\\",\\\"fullName\\\":\\\"com.vtx.rpa.di.ActivityStart\\\",\\\"shortName\\\":\\\"Start\\\",\\\"category\\\":\\\"Utility\\\",\\\"iconUrl\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\",\\\"transitions\\\":[{\\\"name\\\":\\\"START\\\",\\\"description\\\":\\\"Start from this activity\\\"}],\\\"executionResult\\\":{\\\"transition\\\":null,\\\"activityVariableDefinitions\\\":null}}}},{\\\"type\\\":\\\"app.Message\\\",\\\"size\\\":{\\\"width\\\":368,\\\"height\\\":80},\\\"ports\\\":{\\\"items\\\":[{\\\"group\\\":\\\"in\\\",\\\"id\\\":\\\"8fde3f3f-f5cf-4230-aa92-b0964859cad0\\\"},{\\\"group\\\":\\\"out\\\",\\\"attrs\\\":{\\\"portLabel\\\":{\\\"text\\\":\\\"SUCCESS\\\",\\\"label\\\":\\\"SUCCESS\\\"},\\\"portBody\\\":{\\\"fill\\\":\\\"#28a745\\\"}},\\\"id\\\":\\\"f2f10f09-b4ed-4293-a061-3b027288e754\\\"},{\\\"group\\\":\\\"out\\\",\\\"attrs\\\":{\\\"portLabel\\\":{\\\"text\\\":\\\"FAIL\\\",\\\"label\\\":\\\"FAIL\\\"},\\\"portBody\\\":{\\\"fill\\\":\\\"#dc3545\\\"}},\\\"id\\\":\\\"4d5e286a-10d1-4200-b45f-b6c5de4b25b8\\\"}]},\\\"position\\\":{\\\"x\\\":-176,\\\"y\\\":-72},\\\"id\\\":\\\"c619e19f-6d19-4287-8741-8fca7e8dfb5d\\\",\\\"z\\\":2,\\\"attrs\\\":{\\\"body\\\":{\\\"fill\\\":\\\"#FFFFFF\\\",\\\"stroke\\\":\\\"#E8E8E8\\\"},\\\"label\\\":{\\\"text\\\":\\\"ActivityCSVParser\\\"},\\\"icon\\\":{\\\"xlinkHref\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\"},\\\"activity\\\":{\\\"type\\\":\\\"ActivityCSVParser\\\",\\\"name\\\":\\\"ActivityCSVParser\\\",\\\"fullName\\\":\\\"com.vtx.rpa.di.ActivityCSVParser\\\",\\\"shortName\\\":\\\"CSVParser\\\",\\\"category\\\":\\\"VENTRIKS\\\",\\\"iconUrl\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\",\\\"activityVariableDefinitions\\\":[{\\\"name\\\":\\\"dateInFileName\\\",\\\"className\\\":\\\"java.lang.Boolean\\\",\\\"description\\\":\\\"If File Name Contains Date\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":\\\"Date in Filename\\\",\\\"valueType\\\":\\\"boolean\\\",\\\"inputType\\\":\\\"checkbox\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"uploadFile\\\",\\\"className\\\":null,\\\"description\\\":\\\"Please upload a valid file\\\",\\\"example\\\":\\\"\\\",\\\"displayName\\\":\\\"Upload\\\",\\\"valueType\\\":\\\"binary\\\",\\\"inputType\\\":\\\"file\\\",\\\"fileType\\\":\\\".csv\\\",\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"dataStartRow\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The start of actual Data Row\\\",\\\"example\\\":\\\"2\\\",\\\"displayName\\\":\\\"Start Row\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"headerRow\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The header row\\\",\\\"example\\\":\\\"1\\\",\\\"displayName\\\":\\\"Header Row\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"assetColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The list of Assets to derive from this file\\\",\\\"example\\\":\\\"COL2,COL3,COL4,COL11,COL13\\\",\\\"displayName\\\":\\\"Asset Columns\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"dragDrop\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"dateColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The dateColumn in the file\\\",\\\"example\\\":\\\"COL1\\\",\\\"displayName\\\":\\\"Date Columns\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"dragDrop\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"valueColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The list of values to derive from this file\\\",\\\"example\\\":\\\"COL14!SETTLE\\\",\\\"displayName\\\":\\\"Value Columns\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"dragDrop\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"headerHasAsset\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Whether the header has asset\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":\\\"Header has asset\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":false},{\\\"name\\\":\\\"readFullHistory\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Whether the read the full history\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":\\\"Whether to read the full history\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":false},{\\\"name\\\":\\\"assetGroup\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Asset Group\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":\\\"Asset Group\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"assetSubgroup\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Asset Sub Group\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":\\\"Asset Sub Group\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":false},{\\\"name\\\":\\\"description\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"Description of the file that automatically generates the meta data tags\\\",\\\"example\\\":\\\"This is CME File\\\",\\\"displayName\\\":\\\"Description of the file\\\",\\\"valueType\\\":\\\"string\\\",\\\"inputType\\\":\\\"text\\\",\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":false}],\\\"transitions\\\":[{\\\"name\\\":\\\"SUCCESS\\\",\\\"description\\\":\\\"Activity Completed successfully\\\"},{\\\"name\\\":\\\"FAIL\\\",\\\"description\\\":\\\"Activity failed\\\"}],\\\"executionResult\\\":{\\\"transition\\\":null,\\\"activityVariableDefinitions\\\":null},\\\"activityVariables\\\":[{\\\"name\\\":\\\"dateInFileName\\\",\\\"className\\\":\\\"java.lang.Boolean\\\",\\\"description\\\":\\\"If File Name Contains Date\\\",\\\"example\\\":\\\"true\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"dataStartRow\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The start of actual Data Row\\\",\\\"example\\\":\\\"2\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"headerRow\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The header row\\\",\\\"example\\\":\\\"1\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"assetColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The list of Assets to derive from this file\\\",\\\"example\\\":\\\"COL2,COL3,COL4,COL11,COL13\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"dateColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The dateColumn in the file\\\",\\\"example\\\":\\\"COL1\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true},{\\\"name\\\":\\\"valueColumns\\\",\\\"className\\\":\\\"java.lang.String\\\",\\\"description\\\":\\\"The list of values to derive from this file\\\",\\\"example\\\":\\\"COL14!SETTLE\\\",\\\"displayName\\\":null,\\\"valueType\\\":null,\\\"inputType\\\":null,\\\"fileType\\\":null,\\\"value\\\":null,\\\"mandatory\\\":true}]},\\\"portAddButton\\\":{\\\"fill\\\":\\\"#BEBEBE\\\",\\\"cursor\\\":\\\"not-allowed\\\"}}},{\\\"type\\\":\\\"app.Link\\\",\\\"labels\\\":[{\\\"attrs\\\":{\\\"labelText\\\":{\\\"text\\\":\\\"\\\"}},\\\"position\\\":{\\\"distance\\\":0.25}},{\\\"attrs\\\":{\\\"label\\\":{\\\"fill\\\":\\\"#dc3545\\\"},\\\"text\\\":{\\\"text\\\":\\\"START\\\"}}}],\\\"source\\\":{\\\"id\\\":\\\"543bad60-3442-4a9e-ab15-0d0c1f970571\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"108247c4-9471-4a1c-9454-bc27e8c41ec3\\\"},\\\"target\\\":{\\\"id\\\":\\\"c619e19f-6d19-4287-8741-8fca7e8dfb5d\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"8fde3f3f-f5cf-4230-aa92-b0964859cad0\\\"},\\\"id\\\":\\\"4d9af482-43a4-44ee-9f0d-f4b97c9b16ed\\\",\\\"z\\\":3,\\\"attrs\\\":{}},{\\\"type\\\":\\\"app.FlowchartEnd\\\",\\\"size\\\":{\\\"width\\\":48,\\\"height\\\":48},\\\"ports\\\":{\\\"items\\\":[{\\\"group\\\":\\\"in\\\",\\\"id\\\":\\\"dd31f0d2-7b60-4230-97bd-b36bf7b047fa\\\"}]},\\\"position\\\":{\\\"x\\\":-200,\\\"y\\\":72},\\\"id\\\":\\\"8e932786-4a70-4e39-8f6c-057b957d12f9\\\",\\\"z\\\":4,\\\"attrs\\\":{\\\"icon\\\":{\\\"xlinkHref\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\"},\\\"label\\\":{\\\"text\\\":\\\"ActivityEnd\\\"},\\\"activity\\\":{\\\"type\\\":\\\"ActivityEnd\\\",\\\"name\\\":\\\"ActivityEnd\\\",\\\"fullName\\\":\\\"com.vtx.rpa.di.ActivityEnd\\\",\\\"shortName\\\":\\\"End\\\",\\\"category\\\":\\\"Utility\\\",\\\"iconUrl\\\":\\\"data:image/svg+xml;base64, PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+\\\",\\\"executionResult\\\":{\\\"transition\\\":null,\\\"activityVariableDefinitions\\\":null}}}},{\\\"type\\\":\\\"app.Link\\\",\\\"labels\\\":[{\\\"attrs\\\":{\\\"labelText\\\":{\\\"text\\\":\\\"\\\"}},\\\"position\\\":{\\\"distance\\\":0.25}},{\\\"attrs\\\":{\\\"label\\\":{\\\"fill\\\":\\\"#28a745\\\"},\\\"text\\\":{\\\"text\\\":\\\"SUCCESS\\\"}}}],\\\"source\\\":{\\\"id\\\":\\\"c619e19f-6d19-4287-8741-8fca7e8dfb5d\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"f2f10f09-b4ed-4293-a061-3b027288e754\\\"},\\\"target\\\":{\\\"id\\\":\\\"8e932786-4a70-4e39-8f6c-057b957d12f9\\\",\\\"magnet\\\":\\\"portBody\\\",\\\"port\\\":\\\"dd31f0d2-7b60-4230-97bd-b36bf7b047fa\\\"},\\\"id\\\":\\\"8ea1e1dc-dabb-47a8-be40-9a68132ccf2b\\\",\\\"z\\\":5,\\\"attrs\\\":{}}]}\",\r\n        \"tags\": [\r\n            {\r\n                \"name\": \"\",\r\n                \"value\": \"\"\r\n            }\r\n        ],\r\n        \"createdDate\": \"2020-10-28T11:11:01.324Z\"\r\n    }\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/workflow/workflowJob",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "workflowJob"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateProcessJob",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Rest Api Call successful\", function () {\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "    pm.expect(jsonData.data.name).to.eql(pm.variables.get(\"jobname\"));\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImYzNWQ1M2M2LTYzZjUtNDk2OC04OWZhLTlkYjhhYjE4OGIwZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyMzAyNzY0LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDIzMDYzNjQsImlhdCI6MTYwMjMwMjc2NCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.cJWU7j2UDGSylNR2fOG4IRPTUarawbyEYIHmDyd1L45xc5OhTow643IeTzJqCxYupSBaucMoH1373f-Gpw047W9gVcuwTjXjh3Wy_Y9sFiI-vG84GycEx7kuzHIcMYowy8VIMfsVLWBqn68PA6NfYHBfVrqzwBOeSYwngM5pLZaw__FnW2xSZTlNFFafdVZ-c9yriKJ57OWyNvET79ag7TpA5NfovphaDf4cc67zIo8AxY4quGUwnUK0LOCemDe1D7reUxfDg4_W9tJVRZL0hxtAWojD99YInZ6_gy4zgQxvotX2o2C685X31RYKAU3PDDA54Gy2sAUgi626-clvJQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n  \"name\" : \"{{jobname}}\",\r\n  \"description\" : \"\",\r\n  \"startsWith\" : {\r\n    \"type\" : \"ActivityCSVParser\",\r\n    \"fullName\" : \"com.vtx.rpa.di.ActivityCSVParser\",\r\n    \"shortName\" : \"ActivityCSVParser\",\r\n    \"category\" : \"VENTRIKS\",\r\n    \"transitions\" : [ {\r\n      \"name\" : \"SUCCESS\",\r\n      \"description\" : \"Activity Completed successfully\"\r\n    }, {\r\n      \"name\" : \"FAIL\",\r\n      \"description\" : \"Activity failed\"\r\n    } ],\r\n    \"transitionPath\" : {\r\n      \"OK\" : \"com.vtx.rpa.di.ActivityEmail\",\r\n      \"FAIL\" : \"com.vtx.rpa.di.ActivityEnd\"\r\n    },\r\n    \"activityVariables\" : [ {\r\n      \"name\" : \"dateInFileName\",\r\n      \"className\" : \"java.lang.Boolean\",\r\n      \"description\" : \"If File Name Contains Date\",\r\n      \"example\" : \"true\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"dataStartRow\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The start of actual Data Row\",\r\n      \"example\" : \"2\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"headerRow\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The header row\",\r\n      \"example\" : \"1\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"assetColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The list of Assets to derive from this file\",\r\n      \"example\" : \"COL2,COL3,COL4,COL11,COL13\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"dateColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The dateColumn in the file\",\r\n      \"example\" : \"COL1\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"valueColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The list of values to derive from this file\",\r\n      \"example\" : \"COL14!SETTLE\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    } ]\r\n  },\r\n  \"activityList\" : [ {\r\n    \"type\" : \"ActivityCSVParser\",\r\n    \"fullName\" : \"com.vtx.rpa.di.ActivityCSVParser\",\r\n    \"shortName\" : \"ActivityCSVParser\",\r\n    \"category\" : \"VENTRIKS\",\r\n    \"transitions\" : [ {\r\n      \"name\" : \"SUCCESS\",\r\n      \"description\" : \"Activity Completed successfully\"\r\n    }, {\r\n      \"name\" : \"FAIL\",\r\n      \"description\" : \"Activity failed\"\r\n    } ],\r\n    \"transitionPath\" : {\r\n      \"OK\" : \"com.vtx.rpa.di.ActivityEmail\",\r\n      \"FAIL\" : \"com.vtx.rpa.di.ActivityEnd\"\r\n    },\r\n    \"activityVariables\" : [ {\r\n      \"name\" : \"dateInFileName\",\r\n      \"className\" : \"java.lang.Boolean\",\r\n      \"description\" : \"If File Name Contains Date\",\r\n      \"example\" : \"true\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"dataStartRow\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The start of actual Data Row\",\r\n      \"example\" : \"2\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"headerRow\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The header row\",\r\n      \"example\" : \"1\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"assetColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The list of Assets to derive from this file\",\r\n      \"example\" : \"COL2,COL3,COL4,COL11,COL13\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"dateColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The dateColumn in the file\",\r\n      \"example\" : \"COL1\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"valueColumns\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"The list of values to derive from this file\",\r\n      \"example\" : \"COL14!SETTLE\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    } ]\r\n  }, {\r\n    \"type\" : \"ActivityEmail\",\r\n    \"fullName\" : \"com.vtx.rpa.di.ActivityEmail\",\r\n    \"shortName\" : \"ActivityEmail\",\r\n    \"category\" : \"VENTRIKS\",\r\n    \"transitions\" : [ {\r\n      \"name\" : \"SUCCESS\",\r\n      \"description\" : \"Activity Completed successfully\"\r\n    }, {\r\n      \"name\" : \"FAIL\",\r\n      \"description\" : \"Activity failed\"\r\n    } ],\r\n    \"transitionPath\" : {\r\n      \"OK\" : \"com.vtx.rpa.di.ActivityEnd\",\r\n      \"FAIL\" : \"com.vtx.rpa.di.ActivityEnd\"\r\n    },\r\n    \"activityVariables\" : [ {\r\n      \"name\" : \"fromEmail\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"From Email\",\r\n      \"example\" : \"kowshik.ns@ventriks.com\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"toEmail\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"To Email\",\r\n      \"example\" : \"kowshik.ns@ventriks.com\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    }, {\r\n      \"name\" : \"message\",\r\n      \"className\" : \"java.lang.String\",\r\n      \"description\" : \"Message\",\r\n      \"example\" : \"kowshik.ns@ventriks.com\",\r\n      \"displayName\" : null,\r\n      \"valueType\" : null,\r\n      \"inputType\" : null,\r\n      \"fileType\" : null,\r\n      \"mandatory\" : true\r\n    } ]\r\n  } ],\r\n  \"end\" : false\r\n}\r\n",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/workflow/updateWorkflowJob?id=5f7d8fb2ad4fd46466844f57",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "updateWorkflowJob"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "5f7d8fb2ad4fd46466844f57"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetWorkflowJobs",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "var jsonData = pm.response.json();\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjgxNzE0MTdhLWVlMDMtNGU1ZC1iZmZjLWEyZTU4NDYyMmE3NSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAzOTY4MDI4LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDM5NzE2MjgsImlhdCI6MTYwMzk2ODAyOCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.mYMYA5bOUUJEVUZ7gt_HBeOglFPyKL0PQGs6_Y-LpZfSGeyPWvbT7yHdvrjBVrXoL2kYlfUiqC1U_cA0UHKJG8w8-KEr7_upePyGaeRZBo8kpQgiCIv06wv_ti3aEir43tJ3BHfFmAiJ_yaGfRt83UKr6l0rtnybWWetOccuNtYr01QiH7CMD3BEWGkjyZ6lpsTJjODix7O374xD4CIiO3OcaG0eiqZLFxmV6Y5jTHrlZX1ibL2lUOT8XsGqmoTCsK8tzYHEl5puRlg1W6EzL5qviuN9w6y1t8-cPJRMygwSvMEB54n3_BL2tYBJhRChiqVqOs_Y2qu1-Cy_cDGG7A"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/workflow/getWorkflowJobs",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "getWorkflowJobs"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetWorkflowJobsById",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImMyNGFjM2ZmLTdlM2YtNDg1Yi05YmY2LWQ4MDA0NzhhMzRhMiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyNDMwMjIxLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDI0MzM4MjEsImlhdCI6MTYwMjQzMDIyMSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.NkRMIwwk9QRjz_1Xlf8N-p-gQltdmwDloiTEkubq6Cuc0Igf-iIH5GCg-yXgvHhjxu6-XsU8anUT7AYozhBAwdUs0_4xu0_Ea_HJx_aiQd9NqnOkQ4tF2PX4fzKq-cGPinP9otEe8SDqzwF8-DPbFETCTG30_I8QHdAGfVUw465WTk_ljuS5vJvHpimkzMH6iPPlzw_gKI5dDs0yOMMr0oQlEqQJiEPVm9qmkKelr-ZMGJZhL87gQ-5Z-7-2Jx4xLe53og7qmoQ4jcWxaZOFIQnppcCTty5uCK-53qLQI5YRvutYsP27-Pf4W9d2E86_7rn8gS8Okw3dGU2gZUh3NA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/workflow/getWorkFlowJobById?id=5f7de387bb109e16d97f5d86",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "getWorkFlowJobById"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "5f7de387bb109e16d97f5d86"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteWorkflowJob",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImMyNGFjM2ZmLTdlM2YtNDg1Yi05YmY2LWQ4MDA0NzhhMzRhMiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyNDMwMjIxLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDI0MzM4MjEsImlhdCI6MTYwMjQzMDIyMSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.NkRMIwwk9QRjz_1Xlf8N-p-gQltdmwDloiTEkubq6Cuc0Igf-iIH5GCg-yXgvHhjxu6-XsU8anUT7AYozhBAwdUs0_4xu0_Ea_HJx_aiQd9NqnOkQ4tF2PX4fzKq-cGPinP9otEe8SDqzwF8-DPbFETCTG30_I8QHdAGfVUw465WTk_ljuS5vJvHpimkzMH6iPPlzw_gKI5dDs0yOMMr0oQlEqQJiEPVm9qmkKelr-ZMGJZhL87gQ-5Z-7-2Jx4xLe53og7qmoQ4jcWxaZOFIQnppcCTty5uCK-53qLQI5YRvutYsP27-Pf4W9d2E86_7rn8gS8Okw3dGU2gZUh3NA"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/workflow/deleteWorkflowJob?id=5f7de387bb109e16d97f5d86",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "deleteWorkflowJob"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "5f7de387bb109e16d97f5d86"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteWorkflow",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjQyOGNkNjRjLWE0MzItNGZmZS05ZTk2LWVkY2Q4MTE0NjdjYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyNDY2OTI2LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDI0NzA1MjYsImlhdCI6MTYwMjQ2NjkyNywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.SWqCgnskXK5b1Ol3_lJVeFruFT6-bBdj4exnfWGzh71wfAsOSotLIATlK5DByndJIRclXcQ2xshVClDAdhrC1h6TtffH6bmpFFPg375uHCDkeSuDoLrIqcFStDcXSkkUeNthYGMaSqehUvh9L5afmOzsNtsIn1A1R4NV6FjekhoG0tP69_oCFkjHr8n1E00JFKZOVrJwppMdtCmWhpdPruRA-bjsAsgFMBAOCpofnQ0CbTH4BdZwhQSIo9H2-ISROglokQ8jFy4mQknwygGxdjSYwOVbqe1bLbyNMlqBohTDD1C3vuX1KsV5ev47IF42OdCPPisSTkncK7IQt9QBnw"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/workflow/deleteWorkflowJob?id=5fb33e41bd88364d4b44095d",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "deleteWorkflowJob"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "5fb33e41bd88364d4b44095d"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "RunWorkflow",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjkyMjMwNTE4LWZiYmEtNGUzOS1hYmExLTNhNGNmZjc4YmVmYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAxNDc2NTI2LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDE0ODAxMjYsImlhdCI6MTYwMTQ3NjUyNiwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.iP4QMTzSo2uWLeZg2FYDe9SnINo_ykcaOyEmcsddy97h4MMEmcLZjG5600uZuhM3Won6aKhSFgkdZ_LltGMmfZUvn-M7d8qBpSyJikajx8rS3npV0yffdRQwnMGKE2zvtgu-ZFgd7cQ1oFTDfjQe4bAyn2WhGPrDzCn6K5FyF7yQauVmS3UveXmwhnuZ416U5esN4x1NXBd6CK0tEQzsT4ZiPgKO27SWogtr3kF_vsEiJ1NnzAU9YpGkgtCDAMBAfnLjXyaslCaGJUk5qCyT9p9KCPDjG5-ZKmHHQ7BWGXg0X2nUIeJbr_1teBSnSUp4uBADZ_b6-t_m28L7LCYTnA"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/workflow/runWorkflow?jobId=abcd",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "runWorkflow"
                                ],
                                "query": [
                                    {
                                        "key": "jobId",
                                        "value": "abcd"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetActivities",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken=pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Status Check\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});\r",
                                        "\r",
                                        "pm.test(\"Check category \", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.data[0].category).to.eql(\"VENTRIKS\");\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImE4MWUzNzkxLWI4MGUtNGJkMC04MzNkLTBlM2ZmNTYyMWE0MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAxNzk4NzU4LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDE4MDIzNTgsImlhdCI6MTYwMTc5ODc1OCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.DRuEouRM9q2NzdoAhVdAUL2IFJb153O7m0gVhvYLhDwy163I0AzP_9RCXRfzB-vzlIyzA6X_rYK8S61EyUfmT4hi9F9ejQe5sB24Drhy0wZ-ndVOGczVAZ4LV8t3RyNWyA37MX1i0XuR-TFGqwfAazx3YSMP-AMKd6r6nNp0eykdbfMMcoeb3RHeqxDCik9mPQhx07w13gibJVFpqskp9sXVEl3dmXGBIC2MniBNCa2j_FNxad41urHyBmGOts0GIzztY8FdrUf0D5Q0lZ7l-5lz1t0wi3GAxODtK27GZfIeRG-dsI6sMk9OW43T2bugis1EHa70afutB9xjEDFxPg"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/workflow/getAllActivities",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "getAllActivities"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "SearchWorkflow",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code Check\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Response time is less than 200ms\", function () {\r",
                                        "    if (pm.environment.get(\"environment\")==\"Prod\"){\r",
                                        "        pm.expect(pm.response.responseTime).to.be.below(200);\r",
                                        "        \r",
                                        "    }  \r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImRlMjE1MDFiLTYxMjgtNDY4My05YjNhLWEyYzMxMzc1Y2RmYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAzNzg5NzI3LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDM3OTMzMjcsImlhdCI6MTYwMzc4OTcyNywiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.NRZhOCrqY975avuUf4alr6I0vPdO0dyCbw1B-kVNHOqpezwJBvAMd4jh-VmCM_2YUfK-IhmArpp_X_ip8wsi6Hg85tmi7aAgH0tAAYmwJ56YzwnEGH2_GZNKRqRS_1oSHDc-08kRsLu3htjyvJrBryYgbUU8EuKDbAqjlo7zI8j_CFVXfadOxwJrL2g9Ea3zs9lvEwuNznET1DZX95TZ-EgtEVdaEABroYqKjdugGW5Drgw1J4xqllu2uchKYjWA3oU3pxe1XSqwwXrDWB0Li4jnHLehXqySitFwe6FMcM_63GwAIt08Uahh8zWgLNU-c0geVQqfW845LrYMtEpshQ"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"name\": \"W\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/workflow/searchWorkflows?jobId=605235234f143633829490ab",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "workflow",
                                    "searchWorkflows"
                                ],
                                "query": [
                                    {
                                        "key": "jobId",
                                        "value": "605235234f143633829490ab"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ],
                "description": "WorkFlow"
            },
            {
                "name": "Mis",
                "item": [
                    {
                        "name": "GetSignedURL",
                        "request": {
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwZmE2MDFhMS0wYTY3LTQyZDQtYTM5NC0xNjkyOTYzZWIzNjUiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY0NjAyMjEwNiwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMTg3MDdkNTU1NmI2N2Y1MDAxODBkOCIsImV4cCI6MTY0NjAyNTcwNiwiaWF0IjoxNjQ2MDIyMTA2LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIwZTRmZDVjYy1hNTFiLTRmZDQtYTYyMi0xYTJmMzMwNTY5NGYiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnN2dHgzIiwib3JpZ2luX2p0aSI6IjAyNWM4YjA1LTEzZjYtNDdhMy1iNTI1LTMzMjM4MzhmZDhiZSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjU3NTBjNzY0LTIxZjQtNDUxNy1hNGE0LTc2ZjQ1MjYyMjVmYyIsImN1c3RvbTpmaXJzdE5hbWUiOiJLb3dzaGlrIiwidG9rZW5fdXNlIjoiaWQiLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJjdXN0b206Y29tcGFueU5hbWUiOiJ2ZW50cmlrcyIsImZhbWlseV9uYW1lIjoiTlMifQ.CDUj33XNzeueN09Wm3iwKtjTQCDOAJSyl78TVRUZkTrX14_DJgFITJ1PnorHfZYA8PENXkd1auDVnHH8tXmp8bNsFI6qHFILWZ37RGBaXBwmWxLOc54y9e9Y1UpbBlSyhr4r9TyCacw18yF3SbU9KFx2xhvdTWbUy6HjaAqWIXEknSPdOAc3DPstIoPIEaPskVmH-ueeJfrO2i5BMT15YWnr2GU4RedHX43wm3lHjxa8y3qCmf3IyPD7UUT7EWN6lpifQZ6lq9zCJzcKSDuzsdLn9rkBaD6IXZHTcAkqlMBvn_ihlSJdU7xqr_0cQm7lQY652sD2uzH4yURMrZiKVw",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/getSignedUrl?file=rules/619f068b432408104ba5b69d/calculator.zip",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "getSignedUrl"
                                ],
                                "query": [
                                    {
                                        "key": "file",
                                        "value": "rules/619f068b432408104ba5b69d/calculator.zip"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "Rules",
                "item": [
                    {
                        "name": "GetAllRules",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjY3OTUyNSwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjY4MzEyNSwiaWF0IjoxNjUyNjc5NTI1LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI5NjdmYzUxYy1mOTY0LTQxYWUtODY5MS0yNzc2MjVjMzc2YmYiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjM5NWQ1NDQyLTJjYzctNGMzYi1hOGRlLTk4MjczYzkzNjIwMiIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6ImEwZDJiNWU4LWVmZTctNGY3NC1iNTY5LTk0MzNmY2M0OTllZCIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.ILaF2oYxv57mauW-ROqMd4RDYTlss6baAIZs_cf9lp38exWOYBl-gGEzhQdjDK5BdIRCt7bhmfPRNUIY88heQ43S8MvSTrrd7TPG6svVziYyAo51JmPL8XS9b2suYn8fdrYPVrBcg4_L0Vra1Vh-YzdL2xpXL41ev71oMlzFcze9HMgejgM-A0IRlPdz1p82WMKsd1l3BUJUhOTTKPRNiozC0lvR9N8lhfieeirMiK52XYjGoBJnj7w15jTJ30f4Vw9y0IKhrIqi_tTwB5Ld3ha4D5DNhrBhvPSxKAK4zc_BLH9rx-2fElFJWAiCjg6ylIvzPMmfBnphBbw1RnZhUw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"searchTerm\" :\"TwoMonths\"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/rules/getAllRules",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "rules",
                                    "getAllRules"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetRuleResult",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMzk0YjdjNi1kYzJiLTRiMmUtODQ4My01YjZjODQ1YTBmZTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoicmFuaml0aGEubmFnZW5kcmEiLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiJmOTRjYzQ4Yi01NzQ1LTQ4NTYtOWJlNC1hNzEyMTgxNjEzNTUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY0NTE3Nzk1MiwibmFtZSI6IlJhbmppdGhhIiwicGhvbmVfbnVtYmVyIjoiKzkxOTY4NjIwMzg4MyIsImV4cCI6MTY0NTE4MTU1MiwiaWF0IjoxNjQ1MTc3OTUyLCJmYW1pbHlfbmFtZSI6Ik4iLCJlbWFpbCI6InJhbmppdGhhLm5hZ2VuZHJhQHZlbnRyaWtzLmNvbSJ9.gbvWlE1KKgrIhg3oIVSYjRD9yjEoOV9I8U9BNEKFvoP0Wk9pYxKaM8AuTg1aWoC622rnYekGCu7EZj3CpmEbR3GLy-V1K60BOaWCOsLUzXmVQy88S_LOPDUETlLlYnVTgPFbD08kXlZ1GjXhieEwUfujXzuSAJFuLDEGkJ32IlQlM-ktWPd_MzhJtz2xAmcD1i3SWjDExPnzBE9dNl-ECu6vrbYG7Y6kd2JLW5Fpf6Hj-Upf2HsZyHRiqxc18vMgG17ExmepC1OlvP1b3rIaSYhm2FrpYi1A4U-k0KyClkzc9GsgxMK09WY4awVuiDfQHldv-Zv1IXAM2OOAHxJlaw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"latest\": true\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/rules/getRuleTestResults?id=620c939de3d3a444c5006380",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "rules",
                                    "getRuleTestResults"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "620c939de3d3a444c5006380"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetRule",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjY3NTgxNCwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjY3OTQxMywiaWF0IjoxNjUyNjc1ODE0LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIxOTBlMjBkNy00MDkwLTQ0OTItYThiYy0zYTc2YmE4M2E3ZDQiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjAyNjcwYzExLWIyMTUtNDU3MC05NTVmLWNhYmQ4YjcyZTVkNSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjE0ZTRkNjY4LTJhMTItNGM1MS1iMWNiLTA2NThhMjU2YjRlMyIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.cTT0mx8XHZdzJhBn-1wgYjDMdJRI4IJSiKZY6mIQGiCIpGYa-mE5NTzHuUD85F1zxDGYJry4py7r_yHGvMfa9vWTBnO6vlggl2q_v-S-5LS8aL1DgLlucnvNPpuY-giH37VXFT8WSZfrtQlLoq2J-h5ca4zgNfm6MiH2C9c0Q1rJ7tr_VnVvqw9B3NwXKlG9VZT-a8JuA2kVgHR4Odgk8Gtra1YxEQ8pKGEf_nSsSsXQ1Q_t6o5R7MwuyHG4OylCKXZcj9s-zhf3IJibl9tUxYBDQj_QqGuHOo3euFBhnDQJkJ0BoH55vmSZiMpo39l5A0dRSaMoO1_K38NXcKH5vg",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/rules/getRule?id=62736851e26db34e176a5f3b",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "rules",
                                    "getRule"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "62736851e26db34e176a5f3b"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteRule",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMzk0YjdjNi1kYzJiLTRiMmUtODQ4My01YjZjODQ1YTBmZTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9LRzg5dW1GQzciLCJjb2duaXRvOnVzZXJuYW1lIjoicmFuaml0aGEubmFnZW5kcmEiLCJjdXN0b206Y29tcGFueSI6IlZlbnRyaWtzIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6NDUwMTI3Nzg1MzA5OnJvbGVcL1JvbGVDb2duaXRvIl0sImF1ZCI6IjVsaDBuajhzbGUyMTg3NmdibjY3aHQwNzZzIiwiZXZlbnRfaWQiOiIzZjU4ZWRmMC1jMDQzLTRjMmItYmU3OC1lNzA3NjU1M2RmNzYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY0NTE2MzU4OCwibmFtZSI6IlJhbmppdGhhIiwicGhvbmVfbnVtYmVyIjoiKzkxOTY4NjIwMzg4MyIsImV4cCI6MTY0NTE2NzE4OCwiaWF0IjoxNjQ1MTYzNTg4LCJmYW1pbHlfbmFtZSI6Ik4iLCJlbWFpbCI6InJhbmppdGhhLm5hZ2VuZHJhQHZlbnRyaWtzLmNvbSJ9.gAkXZprRSrvcz52OBvVCp9TKE_njsS4MLK_xPl3s671mPFbxD7ajS6OR9CgVvtNgpZ-ItuPAdefMbwMTsWiHkJdiwbbUdTEhA8xHRUhJTYS9XlpZ8Vd3GcQsZalvNTu9LAMAMH4-aDcv4HWW56Ks-RWFqINkyzVfAQfi6jFH0LW8iqkiTPnQlowh4cJPE4l1zILNPGwixIcrHlfwKtJrDoZepOODU67JZ1Utt01sfTgjwrTt54WDm_OfdrUHtu-7qg2xT2Evnrze3WiSNTaLKF6uIC817QmuJjAuFSryEW2dPutw9ycCh0oFUcjVAsE94o53t_u9v_hvJsfaDoZ5QQ",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/rules/deleteRule?id=619f068b432408104ba5b69d",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "rules",
                                    "deleteRule"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "619f068b432408104ba5b69d"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "CreateRule",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjA3NTY1OSwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjA3OTI1OSwiaWF0IjoxNjUyMDc1NjU5LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI5MDNmNTNjMy0wMjQ2LTQ0NGMtYjBkOC1iOWQ5ZTMwNWFiOTAiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjFjYjUwMGMzLTA3OGYtNDg0Zi1iOWQ5LTQ0NmYzODg5NDBiOSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjIyNjU3ZTEzLWU5NGMtNGZlOC04MmJmLTc3ZDUzYjY3Mzc2ZiIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.jyZUQQasGyEuNLpXu_eje-OyOtcNH9LUk9dzq705FlXBzgMVmJr4z50XXVCHm719pSqB6SvgXPB48cXtxv_R6IMzs1gjAepsOLT6SRMp99yP9FBPgKrXJK2TmzkSa6mZYjGuKcirOrv7H4QL_STF5cGOV3hftZJJGHAo6lbQ017SFbWhqVg1q-4ACEt1ZB-rLyrZK0ckAwYXbrC4xveiYP_x1zYLRjL_NdEXxQmdezpWaBXXC8Cbet-XihY4adtJl5M_W4FoMq27ICEUGDQxDLmI8Wi2DMHBeC0UUxin7QEl3mny1Y-4Ve98gud6GYsMUd8QW7NMrSwM2gAq2DUEcg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"_id\": \"6278acdc3358527cb443b76b\",\r\n    \"name\": \"test_Dev\",\r\n    \"owner\": \"naw\",\r\n    \"description\": \"test_Dev\",\r\n    \"category\": \"test\",\r\n    \"ruleScript\": {\r\n\r\n    },\r\n    \"metaData\": [\r\n        {\r\n            \"key\": \"test\",\r\n            \"value\": \"test\"\r\n        }\r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/rules/createRule",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "rules",
                                    "createRule"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "TestRule",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjA3NTY1OSwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjA3OTI1OSwiaWF0IjoxNjUyMDc1NjU5LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI5MDNmNTNjMy0wMjQ2LTQ0NGMtYjBkOC1iOWQ5ZTMwNWFiOTAiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjFjYjUwMGMzLTA3OGYtNDg0Zi1iOWQ5LTQ0NmYzODg5NDBiOSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjIyNjU3ZTEzLWU5NGMtNGZlOC04MmJmLTc3ZDUzYjY3Mzc2ZiIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.jyZUQQasGyEuNLpXu_eje-OyOtcNH9LUk9dzq705FlXBzgMVmJr4z50XXVCHm719pSqB6SvgXPB48cXtxv_R6IMzs1gjAepsOLT6SRMp99yP9FBPgKrXJK2TmzkSa6mZYjGuKcirOrv7H4QL_STF5cGOV3hftZJJGHAo6lbQ017SFbWhqVg1q-4ACEt1ZB-rLyrZK0ckAwYXbrC4xveiYP_x1zYLRjL_NdEXxQmdezpWaBXXC8Cbet-XihY4adtJl5M_W4FoMq27ICEUGDQxDLmI8Wi2DMHBeC0UUxin7QEl3mny1Y-4Ve98gud6GYsMUd8QW7NMrSwM2gAq2DUEcg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n  \"curveDefinition\": {\r\n    \"_id\": \"624d7a0ec62b3c279270d593\",\r\n    \"name\": \"BOVESPA CORN FUTURES CALENDAR SPREAD CURVE\",\r\n    \"description\": \"BOVESPA CORN FUTURES CALENDAR SPREAD CURVE\",\r\n    \"category\": \"AGRICULTURE\",\r\n    \"holidayCalendar\": \"HBR\",\r\n    \"rolloverCalendar\": \"RBOVESPACORN\",\r\n    \"commodity\": \"AGRICULTURE\",\r\n    \"product\": \"CCM\",\r\n    \"location\": \"BR\",\r\n    \"supplier\": \"BOVESPA\",\r\n    \"currency\": \"BRL\",\r\n    \"unit\": \"60KG\",\r\n    \"contractInputType\": \"CONTINUOUS\",\r\n    \"buildType\": \"BOOTSTRAP\",\r\n    \"curveRules\": [\r\n      {\r\n        \"name\": \"FillGaps\",\r\n        \"salience\": 1,\r\n        \"createStatus\": \"DETAILS\",\r\n        \"isBluePrint\": false\r\n      },\r\n      {\r\n        \"name\": \"CalendarSpreads\",\r\n        \"salience\": 2,\r\n        \"createStatus\": \"DETAILS\",\r\n        \"isBluePrint\": false\r\n      }\r\n    ],\r\n    \"profile\": \"SETTLEMENT\",\r\n    \"curveInputs\": [\r\n      {\r\n        \"supplier\": \"BOVESPA\",\r\n        \"commodity\": \"AGRICULTURE\",\r\n        \"product\": \"CCM\",\r\n        \"vtx_product\": null,\r\n        \"location\": \"BR\",\r\n        \"role\": \"PRIMARY\",\r\n        \"profile\": \"SETTLEMENT\",\r\n        \"useLatestData\": false,\r\n        \"priority\": 0,\r\n        \"curveUri\": null,\r\n        \"propertyList\": null\r\n      }\r\n    ]\r\n  },\r\n  \"forwardContractList\": [\r\n    {\r\n      \"supplier\": \"BOVESPA\",\r\n      \"product\": \"CCM\",\r\n      \"commodity\": \"AGRICULTURE\",\r\n      \"location\": \"BR\",\r\n      \"value\": 10.5,\r\n      \"period\": 0,\r\n      \"ondate\": {\r\n        \"ondate\": \"2022-02-25\"\r\n      },\r\n      \"expiry\": {\r\n        \"ondate\": \"2022-02-25\"\r\n      },\r\n      \"periodCode\": {\r\n        \"periodcode_type\": \"MONTHLY\",\r\n        \"period\": 0,\r\n        \"year\": 2022,\r\n        \"month\": 3,\r\n        \"day\": 0,\r\n        \"code\": \"MARCH_2022\",\r\n        \"absolute\": true,\r\n        \"continuous\": false,\r\n        \"type\": \"ABSOLUTE\"\r\n      }\r\n    },\r\n    {\r\n      \"supplier\": \"BOVESPA\",\r\n      \"product\": \"CCM\",\r\n      \"commodity\": \"AGRICULTURE\",\r\n      \"location\": \"BR\",\r\n      \"value\": 13.2,\r\n      \"period\": 0,\r\n      \"ondate\": {\r\n        \"ondate\": \"2022-02-25\"\r\n      },\r\n      \"expiry\": {\r\n        \"ondate\": \"2022-02-25\"\r\n      },\r\n      \"periodCode\": {\r\n        \"periodcode_type\": \"MONTHLY\",\r\n        \"period\": 0,\r\n        \"year\": 2022,\r\n        \"month\": 4,\r\n        \"day\": 0,\r\n        \"code\": \"APRIL_2022\",\r\n        \"absolute\": true,\r\n        \"continuous\": false,\r\n        \"type\": \"ABSOLUTE\"\r\n      }\r\n    }\r\n  ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/rules/testRule?id=621cbeb978f603756bdacf1e&saveResult=false",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "rules",
                                    "testRule"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "621cbeb978f603756bdacf1e"
                                    },
                                    {
                                        "key": "saveResult",
                                        "value": "false"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateRuleV2",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MTgxMzkyOSwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MTgxNzUyOSwiaWF0IjoxNjUxODEzOTI5LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJlMTM1ZWM3NC0yM2Y2LTQ4OTMtYTE1MC0xMjI0OGY1MDkyZWEiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6ImVhMTJjNDVkLWUxYTQtNGFjOS05NGNiLTcxMTJmZTNlYTliOCIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjNjYTEwNWUxLTAzMDAtNGUyOS1hOWFkLTI0ZTQyY2M5YTRiMyIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.NJBD-I4NiKfMS7THvDQzVT8SKvHm_5jlcEYKJHgQown5Vin_woUSsCPvWIDdXZAqbUKTeOcbxnE41iIlUlO4ukpbH1wcQoZEVzoxucBSPrxHP-CSQ1KPesgoAakpaMg_eV9Gre3QeNU02P4I-0hAwN5cLLjTw-sfJIt4DAjoXeMX485px3UM_tBrlKHYR9z8RNdJK1GiLoW1W-P5B_PTLqWiVFSM3xSrrmOs4KIfccdgr7W5W14afYrQJHygGRtkvFjBngTcbhgYIgNCkhSVYayt2274YRsJj9QjTeqsl_BBoUcBQVgfEU8IorHkW1ElRngm6jUHQpbFZl7RAIWq0w",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"ruleScript\": {\r\n        \"language\": \"java11\",\r\n        \"binary\": \"vtx-curve-core-1.32.9-SNAPSHOT-jar-with-dependencies.jar\",\r\n        \"entryPoint\": \"rules.OnlyYear::execute\",\r\n        \"iconUrl\": \"https://vtx-marketplace.s3.eu-west-1.amazonaws.com/integrations/java.png\"\r\n    }\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/rules/updateRuleV2",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "rules",
                                    "updateRuleV2"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "RulesPackages",
                "item": [
                    {
                        "name": "CreateCodePackage",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjA3MTc3MCwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjA3NTM3MCwiaWF0IjoxNjUyMDcxNzcwLCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI0ZWM4ZGI5OC04MGM4LTQyYjktOTY5YS0yNzJjOGZmZjk0NWUiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6Ijk1YWJjYTczLTkxNjEtNDE1OC04NzZlLTMwYjI3MDE4MGI3YiIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6ImE4ZDRjNjRhLTdmYWYtNGU3Yy04Y2ExLTJiNDNiNDU2YjNjYiIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.QtobFdHI7lIRk18hb9jquayVJaOxdV63XT0TuX3soxDiZg7JSqiUN7iiten4eZSzJjiZHg5rrrdyIsS4gXEELuJu4jJfocvZM0h27djbZ8-sOOTA_oyvGYIAN4QClkzxLfH8S-fxWvAoRv3_uzgKbc7m4ko7F68c75AH7KurQfiMcTqdewPu7M2kysITYZ1oxK7uuMAp0LeJnyxjWrl5fUHNxqJOmhoZnI_ZAGPoMMZJdsvTvDFSYMVhEu9IBj4vjKSfoiT0t4OSLtRb53NqMlUMb0KaGTux9p49xCNCAwGyIxUyBxLYS-y-UF1PyjLGH0-KaWceRn0klkC6G6AP4Q",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n \"_id\": \"62663eb7c34966144c03b618\",\r\n        \"name\": \"\",\r\n        \"description\": \"SpreadsTest Upd\",\r\n        \"category\": \"SpreadsTest\",\r\n        \"rules\": {\r\n            \"619f063e432408104ba5b67c\": 1,\r\n            \"619f0643432408104ba5b67d\": 2,\r\n            \"619f0648432408104ba5b67e\": 3\r\n        }\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/createCodePackage?=",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "createCodePackage"
                                ],
                                "query": [
                                    {
                                        "key": "",
                                        "value": ""
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllCodePackages",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjY3OTUyNSwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjY4MzEyNSwiaWF0IjoxNjUyNjc5NTI1LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiI5NjdmYzUxYy1mOTY0LTQxYWUtODY5MS0yNzc2MjVjMzc2YmYiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjM5NWQ1NDQyLTJjYzctNGMzYi1hOGRlLTk4MjczYzkzNjIwMiIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6ImEwZDJiNWU4LWVmZTctNGY3NC1iNTY5LTk0MzNmY2M0OTllZCIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.ILaF2oYxv57mauW-ROqMd4RDYTlss6baAIZs_cf9lp38exWOYBl-gGEzhQdjDK5BdIRCt7bhmfPRNUIY88heQ43S8MvSTrrd7TPG6svVziYyAo51JmPL8XS9b2suYn8fdrYPVrBcg4_L0Vra1Vh-YzdL2xpXL41ev71oMlzFcze9HMgejgM-A0IRlPdz1p82WMKsd1l3BUJUhOTTKPRNiozC0lvR9N8lhfieeirMiK52XYjGoBJnj7w15jTJ30f4Vw9y0IKhrIqi_tTwB5Ld3ha4D5DNhrBhvPSxKAK4zc_BLH9rx-2fElFJWAiCjg6ylIvzPMmfBnphBbw1RnZhUw",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n    \"searchTerm\" :\"Arbitrage \"\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/getAllCodePackages",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "getAllCodePackages"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCodePackage",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjY3NTgxNCwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjY3OTQxMywiaWF0IjoxNjUyNjc1ODE0LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIxOTBlMjBkNy00MDkwLTQ0OTItYThiYy0zYTc2YmE4M2E3ZDQiLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjAyNjcwYzExLWIyMTUtNDU3MC05NTVmLWNhYmQ4YjcyZTVkNSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6IjE0ZTRkNjY4LTJhMTItNGM1MS1iMWNiLTA2NThhMjU2YjRlMyIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.cTT0mx8XHZdzJhBn-1wgYjDMdJRI4IJSiKZY6mIQGiCIpGYa-mE5NTzHuUD85F1zxDGYJry4py7r_yHGvMfa9vWTBnO6vlggl2q_v-S-5LS8aL1DgLlucnvNPpuY-giH37VXFT8WSZfrtQlLoq2J-h5ca4zgNfm6MiH2C9c0Q1rJ7tr_VnVvqw9B3NwXKlG9VZT-a8JuA2kVgHR4Odgk8Gtra1YxEQ8pKGEf_nSsSsXQ1Q_t6o5R7MwuyHG4OylCKXZcj9s-zhf3IJibl9tUxYBDQj_QqGuHOo3euFBhnDQJkJ0BoH55vmSZiMpo39l5A0dRSaMoO1_K38NXcKH5vg",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/rules/getCodePackage?id=6266a5dd424c1f054807e6ba",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "rules",
                                    "getCodePackage"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "6266a5dd424c1f054807e6ba"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateCodePackage",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MDg5MzYwMiwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY1MDg5NzIwMiwiaWF0IjoxNjUwODkzNjAyLCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJhN2QzMzhiYS01N2JjLTQxNDktYTU2ZC04NjgxOTBmM2IyMTciLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiJkYWI2Y2EyYS03NWFmLTQ2ZWMtODZkZi0xOGYzMWU4YjMxNTAiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIyOTcxZTFiNC02MDNjLTRmYmItOGM4Zi01ZTU2YWNlMGJhYzEiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.ubS4XTiGLu_sDzC1lIyx8wIDMft4bPKV0EFpe6oOSbbrcOefnM9eqb5Wc985Y9znOtSKTFINqaEx3eRfdLeHXaJ5JPoEFHVIMUyCTkAYy5D-keXk3LkKJkIFgzse99s938R6YHcQSjyyhWuD27CDgPJrlbBUp93nQ_qYmy5-oLFge7vcZzm8lkfiJ7CTQxT9Xpv4JBQiz-HAcN5Lf01F2f3s7TL357XZXGTb_HX54I0si0j-EmaAM_kwyxhRwexEgtRw4ipT9o6w_-4FjiX13JkbHsql57UJNYxcukZ0FehF_P3edmhVuj7WBOdMIqX9o8f4lrFj8iL3m9xnr8L7PQ",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n \"_id\": \"62663eb7c34966144c03b618\",\r\n        \"name\": \"SpreadsTest\",\r\n        \"description\": \"SpreadsTest Upd\",\r\n        \"category\": \"SpreadsTest\",\r\n        \"rules\": {\r\n            \"619f063e432408104ba5b67c\": 1,\r\n            \"619f0643432408104ba5b67d\": 2,\r\n            \"619f0648432408104ba5b67e\": 3\r\n        }\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/updateCodePackage?id=62663eb7c34966144c03b618",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "updateCodePackage"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "62663eb7c34966144c03b618"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteCodePackage",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MDg5MzYwMiwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY1MDg5NzIwMiwiaWF0IjoxNjUwODkzNjAyLCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJhN2QzMzhiYS01N2JjLTQxNDktYTU2ZC04NjgxOTBmM2IyMTciLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiJkYWI2Y2EyYS03NWFmLTQ2ZWMtODZkZi0xOGYzMWU4YjMxNTAiLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiIyOTcxZTFiNC02MDNjLTRmYmItOGM4Zi01ZTU2YWNlMGJhYzEiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.ubS4XTiGLu_sDzC1lIyx8wIDMft4bPKV0EFpe6oOSbbrcOefnM9eqb5Wc985Y9znOtSKTFINqaEx3eRfdLeHXaJ5JPoEFHVIMUyCTkAYy5D-keXk3LkKJkIFgzse99s938R6YHcQSjyyhWuD27CDgPJrlbBUp93nQ_qYmy5-oLFge7vcZzm8lkfiJ7CTQxT9Xpv4JBQiz-HAcN5Lf01F2f3s7TL357XZXGTb_HX54I0si0j-EmaAM_kwyxhRwexEgtRw4ipT9o6w_-4FjiX13JkbHsql57UJNYxcukZ0FehF_P3edmhVuj7WBOdMIqX9o8f4lrFj8iL3m9xnr8L7PQ",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/deleteCodePackage?id=626665e7310efd0aafba01c7",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "deleteCodePackage"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "626665e7310efd0aafba01c7"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "CurveRules",
                "item": [
                    {
                        "name": "AddCurveRules",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjI3NjA5OCwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjI3OTY5OCwiaWF0IjoxNjUyMjc2MDk4LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIwN2RhYjk1ZS1mY2UzLTQ3NzEtOTM3Yi00Mjg3ODJlNzFkMTciLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjEyNWEwZjU2LTJlOTItNDU2MS1hYTRkLTZhZWNmYzRjNjNiNSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6ImE1MTBmODE5LTllNTMtNDNjYi1iMmI0LTc0ZjYxOTZiZWZjYyIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.zjrbJzqx0mNxB_6yJT7Buph1Q15pmFNC4mEtxYAtx8u-QC8RSnldVmP6CEKylfyqJBvIYfzndYrWz176GTmilnxQSFDWRVEAoHUk08QELeDt6kAxOlGSWOpRyUWr7eHklpc6GbmrfqRY2a3Vrbrrh6VARFdJ49Yk3w-ZnMxi6J3haqu6FGOuokiNNnGt3LNQQtGs31cw_MvpMediTBHCV-aOBEDGD5X0hIGgNdh6h2AJim2VCUW_B5FyzJpi_fYIoO2JOG2C-QiO-Z7q8Q0hdY0AsG9JijHQgbgRH2PkKvzdQ4t4O_D6CK0E8wt7nMP9vMKPgQUzKjGdg0cE_ra7wQ",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "[\r\n  {\r\n    \"sourceId\": \"619f0639432408104ba5b67b\",\r\n    \"sequence\": 2,\r\n    \"type\": \"RULE\"\r\n  },\r\n  {\r\n    \"sourceId\": \"619f0659432408104ba5b682\",\r\n    \"sequence\": 5,\r\n    \"type\": \"RULE\"\r\n  },\r\n  {\r\n    \"sourceId\": \"619f063e432408104ba5b67c\",\r\n    \"sequence\": 11,\r\n    \"type\": \"RULE\"\r\n  },\r\n  {\r\n    \"sourceId\": \"62454f4f70a75b56c7414183\",\r\n    \"sequence\": 222,\r\n    \"type\": \"RULE\"\r\n  }\r\n]\r\n",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/addCurveRules?curveDefinitionId=627bc34ce0912b28e7333264",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "addCurveRules"
                                ],
                                "query": [
                                    {
                                        "key": "curveDefinitionId",
                                        "value": "627bc34ce0912b28e7333264"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "UpdateCurveRules",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MTIzNDI3NCwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY1MTIzNzg3NCwiaWF0IjoxNjUxMjM0Mjc0LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJjZWU5ZWEyOC01ZmJkLTQ4MTItYmQxMC1jYzlhMjdmYTQ5YjgiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiIzNWIxYTNiMi1kN2VjLTRjZWEtOGJkZC03Njg3ZmRjMmYyYjciLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJhZjk0Njk5NC0yZDU0LTQ5N2EtOWM2OC0zMDhiOTllMzNjYjEiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.BHaMnOPsH91j-55PZnWXa0L6yBOpRmbkppnetJWM3pl_qf-QB7auDRYRTbR9EGtYSBLiZgPbes2XB2NBZEYL0huENF5kizO3n3uT579TkqlJe9mFJpO1yydiG20CIYlakqpsAdjx4xvH5156yC7tM4HwFMiwmm-UNChYHGnYAS4qfI1ceVeAy-Frg4hOJsCgxpuvLGJBfja8f4SvemmfUxPPjhnYqpQXx1tCEfZcaei1v5MUJcTNX1qU-WhvT7-xZd3mjwnkHMyWD_5cxjgGmPYF7yacOLOgdZ6rUCy5M9SJXykgKBxeGBrnRZ0SnBmetWxXinHRf6hBkMDh7A4v9A",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "[\r\n  {\r\n    \"sourceId\": \"624571f83b5efe434e7c84fb\",\r\n    \"sequence\": 44,\r\n    \"type\": \"RULE\"\r\n  },\r\n  {\r\n    \"sourceId\": \"624576423b5efe434e7c84fc\",\r\n    \"sequence\": 77,\r\n    \"type\": \"RULE\"\r\n  }\r\n]",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/addCurveRules?curveDefinitionId=62551e46236df71f708a3b7e",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "addCurveRules"
                                ],
                                "query": [
                                    {
                                        "key": "curveDefinitionId",
                                        "value": "62551e46236df71f708a3b7e"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetCurveDefinitionRules",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTNkMjVkNi01NmJlLTQ0YjMtYWJjOC03NzVkZWJlY2NiZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MjI3NjA5OCwiY3VzdG9tOmpvYlRpdGxlIjoiRGV2ZWxvcGVyIiwiY3VzdG9tOl9pZCI6IjYyNWU5MjBkZTk1N2NiNzhiMmQ3MTUzMCIsImV4cCI6MTY1MjI3OTY5OCwiaWF0IjoxNjUyMjc2MDk4LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiIwN2RhYjk1ZS1mY2UzLTQ3NzEtOTM3Yi00Mjg3ODJlNzFkMTciLCJlbWFpbCI6Im5hdmVlbmt1bWFyLmJ2QHZlbnRyaWtzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY3VzdG9tOmxhc3ROYW1lIjoiQlYiLCJjb2duaXRvOnVzZXJuYW1lIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwib3JpZ2luX2p0aSI6IjEyNWEwZjU2LTJlOTItNDU2MS1hYTRkLTZhZWNmYzRjNjNiNSIsImF1ZCI6IjRlNnNncWVrM3M1cXZ0cGI0ampqdWE5Z2xjIiwiY3VzdG9tOmNvdW50cnlDb2RlIjoiOTEiLCJjdXN0b206YWNjb3VudF90eXBlIjoiQlVTSU5FU1MiLCJldmVudF9pZCI6ImE1MTBmODE5LTllNTMtNDNjYi1iMmI0LTc0ZjYxOTZiZWZjYyIsImN1c3RvbTpmaXJzdE5hbWUiOiJOYXZlZW5LdW1hciIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Ik5hdmVlbkt1bWFyIiwicGhvbmVfbnVtYmVyIjoiKzkxOTAzNjUxMzg5NCIsImN1c3RvbTpjb21wYW55TmFtZSI6InZlbnRyaWtzIiwiZmFtaWx5X25hbWUiOiJCViJ9.zjrbJzqx0mNxB_6yJT7Buph1Q15pmFNC4mEtxYAtx8u-QC8RSnldVmP6CEKylfyqJBvIYfzndYrWz176GTmilnxQSFDWRVEAoHUk08QELeDt6kAxOlGSWOpRyUWr7eHklpc6GbmrfqRY2a3Vrbrrh6VARFdJ49Yk3w-ZnMxi6J3haqu6FGOuokiNNnGt3LNQQtGs31cw_MvpMediTBHCV-aOBEDGD5X0hIGgNdh6h2AJim2VCUW_B5FyzJpi_fYIoO2JOG2C-QiO-Z7q8Q0hdY0AsG9JijHQgbgRH2PkKvzdQ4t4O_D6CK0E8wt7nMP9vMKPgQUzKjGdg0cE_ra7wQ",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/curve/getCurveDefinitionRules?id=627bc34ce0912b28e7333264",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getCurveDefinitionRules"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "627bc34ce0912b28e7333264"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "RemoveCurveRules",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzZjMTg2MS0zZTUwLTRlNTktOWQxMy02NmU4MDc2YmU2Y2MiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImN1c3RvbTpkYXRhVXNhZ2VzIjoibnVsbCIsImNvZ25pdG86cHJlZmVycmVkX3JvbGUiOiJhcm46YXdzOmlhbTo6NTkxMzgwNTIzNjY2OnJvbGVcL1JvbGVDb2duaXRvIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRHNVWUtYclVuIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsImNvZ25pdG86cm9sZXMiOlsiYXJuOmF3czppYW06OjU5MTM4MDUyMzY2Njpyb2xlXC9Sb2xlQ29nbml0byJdLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxMCIsImF1dGhfdGltZSI6MTY1MTIzNDI3NCwiY3VzdG9tOmpvYlRpdGxlIjoiQ1RPIiwiY3VzdG9tOl9pZCI6IjYyMzA5MzU4M2VlN2IxNmNmYTI1MmY1NSIsImV4cCI6MTY1MTIzNzg3NCwiaWF0IjoxNjUxMjM0Mjc0LCJjdXN0b206ZW52aXJvbm1lbnQiOiJkZXYiLCJqdGkiOiJjZWU5ZWEyOC01ZmJkLTQ4MTItYmQxMC1jYzlhMjdmYTQ5YjgiLCJlbWFpbCI6Imtvd3NoaWsubnNAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjdXN0b206bGFzdE5hbWUiOiJOUyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrLm5zQHZlbnRyaWtzLmNvbSIsIm9yaWdpbl9qdGkiOiIzNWIxYTNiMi1kN2VjLTRjZWEtOGJkZC03Njg3ZmRjMmYyYjciLCJhdWQiOiI0ZTZzZ3FlazNzNXF2dHBiNGpqanVhOWdsYyIsImN1c3RvbTpjb3VudHJ5Q29kZSI6IjkxIiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IkJVU0lORVNTIiwiZXZlbnRfaWQiOiJhZjk0Njk5NC0yZDU0LTQ5N2EtOWM2OC0zMDhiOTllMzNjYjEiLCJjdXN0b206Zmlyc3ROYW1lIjoiS293c2hpayIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6Iktvd3NoaWsiLCJwaG9uZV9udW1iZXIiOiIrOTE5NTEzMjc5NjY2IiwiY3VzdG9tOmNvbXBhbnlOYW1lIjoidmVudHJpa3MiLCJmYW1pbHlfbmFtZSI6Ik5TIn0.BHaMnOPsH91j-55PZnWXa0L6yBOpRmbkppnetJWM3pl_qf-QB7auDRYRTbR9EGtYSBLiZgPbes2XB2NBZEYL0huENF5kizO3n3uT579TkqlJe9mFJpO1yydiG20CIYlakqpsAdjx4xvH5156yC7tM4HwFMiwmm-UNChYHGnYAS4qfI1ceVeAy-Frg4hOJsCgxpuvLGJBfja8f4SvemmfUxPPjhnYqpQXx1tCEfZcaei1v5MUJcTNX1qU-WhvT7-xZd3mjwnkHMyWD_5cxjgGmPYF7yacOLOgdZ6rUCy5M9SJXykgKBxeGBrnRZ0SnBmetWxXinHRf6hBkMDh7A4v9A",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "[\r\n    \"626bd5fe5e7af662584bda5a\"\r\n    \r\n]",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/removeCurveRules?curveDefinitionId=62551e46236df71f708a3b7e&=",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "removeCurveRules"
                                ],
                                "query": [
                                    {
                                        "key": "curveDefinitionId",
                                        "value": "62551e46236df71f708a3b7e"
                                    },
                                    {
                                        "key": "",
                                        "value": ""
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "BuildVersion",
                "item": [
                    {
                        "name": "GetBuildVersion",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3YWViOTRhYi1mNDMyLTQ5MGUtODkyYi1hNGNmMzBkOGNjMzAiLCJjdXN0b206ZGF0YVVzYWdlcyI6IltcIkNsaWVudCBmYWNpbmcgd2Vic2l0ZSBvciBhcHBcIl0iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9Ec1VZS1hyVW4iLCJjdXN0b206YnVzaW5lc3NTZWN0b3IiOiJFbmVyZ3kgJiBDb21tb2RpdGllcyIsImN1c3RvbTpjb21wYW55IjoidmVudHJpa3MiLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxLTUwIiwiYXV0aF90aW1lIjoxNjUzMzIyNDU5LCJjdXN0b206am9iVGl0bGUiOiJEZXZlbG9wZXIiLCJjdXN0b206X2lkIjoiNjI4YjM3OTgzMWM4NTgwZTkzOGQ4OTFiIiwiZXhwIjoxNjUzMzI2MDU5LCJpYXQiOjE2NTMzMjI0NTksImN1c3RvbTplbnZpcm9ubWVudCI6ImRldiIsImp0aSI6IjczZDU2MjNjLTMxZDUtNGJjOC05YjhmLWM4M2ZiMDcxZjlkOSIsImVtYWlsIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpsYXN0TmFtZSI6IkIgViIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJuYXZlZW5rdW1hci5idkB2ZW50cmlrcy5jb20iLCJvcmlnaW5fanRpIjoiNDc2YjZjNzUtYzcxOS00ZWM3LWFkNGMtOGVkMDc2MzI0ZWNkIiwiYXVkIjoiNGU2c2dxZWszczVxdnRwYjRqamp1YTlnbGMiLCJjdXN0b206Y291bnRyeUNvZGUiOiI5MSIsImN1c3RvbTphY2NvdW50X3R5cGUiOiJCVVNJTkVTUyIsImV2ZW50X2lkIjoiOWE3YTJlNzMtOGVlMS00NjBhLWEyOTItMGMxMDU1MjYzMjMzIiwiY3VzdG9tOmZpcnN0TmFtZSI6Ik5hd2luIiwidG9rZW5fdXNlIjoiaWQiLCJuYW1lIjoiTmF3aW4iLCJwaG9uZV9udW1iZXIiOiIrOTE5MDM2NTEzOTQiLCJjdXN0b206Y29tcGFueU5hbWUiOiJ2ZW50cmlrcyIsImZhbWlseV9uYW1lIjoiQiBWIn0.OBDVClwIPii-xmTnUrHYuESMEn7BLC3RG_bxq4QHfp2NL1fU47295Tfg6W96U6aQfpYbNaEjJC6h0q9GjQLhedLh7B0Io9WVAkHgmzzaTyJf8p1rTIrIpjmotv3Mrw3q45J0fcJ36Ise0Gmy7j8bjRYEs2IqfopHKC59Tl8j-rxausbQBtV_e93UovmwmeZoro_tuiQYp4xmNzT3VuXM-J5vB15icyZUDQ0-GiJVLvSSL3p3ROdvSHIapkDGXRVi2c1yEzjyFo8VVqM8jJK9hE_iMQ8i22pyuya7hvW8SyHlfpFI-OjY15HQQq_JygF3DbN8Sdx0mPBuy4v1sGBnqw",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/common/getBuildVersion",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getBuildVersion"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "GetAllCountries",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJOVHVpYUhuZXdJbWppZUpRYmlBcTNVa0VYVnJ4YWhoY25LTmlsZEQ0N01BPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3YWViOTRhYi1mNDMyLTQ5MGUtODkyYi1hNGNmMzBkOGNjMzAiLCJjdXN0b206ZGF0YVVzYWdlcyI6IltcIkNsaWVudCBmYWNpbmcgd2Vic2l0ZSBvciBhcHBcIl0iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9Ec1VZS1hyVW4iLCJjdXN0b206YnVzaW5lc3NTZWN0b3IiOiJFbmVyZ3kgJiBDb21tb2RpdGllcyIsImN1c3RvbTpjb21wYW55IjoidmVudHJpa3MiLCJjdXN0b206dG90YWxFbXBsb3llZXMiOiIxLTUwIiwiYXV0aF90aW1lIjoxNjUzMzIyNDU5LCJjdXN0b206am9iVGl0bGUiOiJEZXZlbG9wZXIiLCJjdXN0b206X2lkIjoiNjI4YjM3OTgzMWM4NTgwZTkzOGQ4OTFiIiwiZXhwIjoxNjUzMzI2MDU5LCJpYXQiOjE2NTMzMjI0NTksImN1c3RvbTplbnZpcm9ubWVudCI6ImRldiIsImp0aSI6IjczZDU2MjNjLTMxZDUtNGJjOC05YjhmLWM4M2ZiMDcxZjlkOSIsImVtYWlsIjoibmF2ZWVua3VtYXIuYnZAdmVudHJpa3MuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpsYXN0TmFtZSI6IkIgViIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJuYXZlZW5rdW1hci5idkB2ZW50cmlrcy5jb20iLCJvcmlnaW5fanRpIjoiNDc2YjZjNzUtYzcxOS00ZWM3LWFkNGMtOGVkMDc2MzI0ZWNkIiwiYXVkIjoiNGU2c2dxZWszczVxdnRwYjRqamp1YTlnbGMiLCJjdXN0b206Y291bnRyeUNvZGUiOiI5MSIsImN1c3RvbTphY2NvdW50X3R5cGUiOiJCVVNJTkVTUyIsImV2ZW50X2lkIjoiOWE3YTJlNzMtOGVlMS00NjBhLWEyOTItMGMxMDU1MjYzMjMzIiwiY3VzdG9tOmZpcnN0TmFtZSI6Ik5hd2luIiwidG9rZW5fdXNlIjoiaWQiLCJuYW1lIjoiTmF3aW4iLCJwaG9uZV9udW1iZXIiOiIrOTE5MDM2NTEzOTQiLCJjdXN0b206Y29tcGFueU5hbWUiOiJ2ZW50cmlrcyIsImZhbWlseV9uYW1lIjoiQiBWIn0.OBDVClwIPii-xmTnUrHYuESMEn7BLC3RG_bxq4QHfp2NL1fU47295Tfg6W96U6aQfpYbNaEjJC6h0q9GjQLhedLh7B0Io9WVAkHgmzzaTyJf8p1rTIrIpjmotv3Mrw3q45J0fcJ36Ise0Gmy7j8bjRYEs2IqfopHKC59Tl8j-rxausbQBtV_e93UovmwmeZoro_tuiQYp4xmNzT3VuXM-J5vB15icyZUDQ0-GiJVLvSSL3p3ROdvSHIapkDGXRVi2c1yEzjyFo8VVqM8jJK9hE_iMQ8i22pyuya7hvW8SyHlfpFI-OjY15HQQq_JygF3DbN8Sdx0mPBuy4v1sGBnqw",
                                    "type": "text"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/common/getAllCountries",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "common",
                                    "getAllCountries"
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            },
            {
                "name": "ETLGroups",
                "item": [
                    {
                        "name": "GetAllETLGroups",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6IjI0ZmMzZDAxLTAxYWItNGVmOC04ZmFiLTVmZWE2NzQ0Mjg1ZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA0OTg5MzMwLCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDQ5OTI5MzAsImlhdCI6MTYwNDk4OTMzMCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.JiaUMx7zvv3p9ePT4mTvbktlewlZo1GbaT2nDn1LV_7xgvkqHfk9XW0sQ4Xc8AHgjFyBObeNjNjj3DWdtzD7Muv8ycItrZYkAluTmwSnOhJ0Ac37dRFm7USQ9ZmSqw6jtJFzQ8hAQUANmNSFpq011z8UWDDOqyPdbaFmVpCtyKydrKnmfaWUajNWUC7wmKKrn19Uzvn72i4qFpAq-bD6zVspSSlf25s4nVTun-EMNjv2-m94prAwWO5rREjbCX73eaKx0kXcxjNhAJVBz7gur2pUU-gNiRjVVVi9r-Df2dZ7IX9R4hH3y8TKsrpWC_2r1yL-u1GvgmRFpGCxtqrQpw"
                                }
                            ],
                            "url": {
                                "raw": "{{qaurl}}/etl/getAllETLGroups?skip=0&limit=5",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "getAllETLGroups"
                                ],
                                "query": [
                                    {
                                        "key": "skip",
                                        "value": "0"
                                    },
                                    {
                                        "key": "limit",
                                        "value": "5"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "CreateETLGroup",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);\r",
                                        "var name=pm.environment.set(\"name\", \"ETL_GROUP_QA\"+parseInt(Math.random()*10000));\r",
                                        "var test = \"test\";"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        "pm.test(\"Your test name\", function () {\r",
                                        "    var jsonData = pm.response.json();\r",
                                        "    pm.expect(jsonData.status).to.eql(true);\r",
                                        "});"
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImQ2MjhhNmU5LWFmOGUtNDA4Yy05NDMxLTA5OTM2MWU4MzY4ZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA0NDU4MDc5LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDQ0NjE2NzksImlhdCI6MTYwNDQ1ODA3OSwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.mcvZcnu9rJbkXxMplLbFNgwEcnwV4OniG7UVzfZo9MIdM7di_E8N1WoZKTXHEdAqgG-XC8WZXLrRKRQULnliwHC6sCvwhDaF5DqNdKN0MTJxJNdUFPG2u8ZX8dJRwWZOQ4Dz6fbta9d-6fpwLyhAMwQoDswgjJnN36Nz3XkFeCOdkjKKgWT2dHn7p8D6UPSePUm391L6vS_c6Vg57_cXizQfnKPBqpc1f1FpKvraaWZc0k-dnqx25Md4KnLx1roVKScVAbGyM9XIJ6ZQSa9qcT42sB6j4q9gOiPgUZoY6kn89b7xGahsSuhawadowKlH3_Tvf4NiPAQdAd8sX4ZkKA"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\r\n        \"etlNames\": [\r\n        \"EXAA_GREEN_POWER_AT_BLOCKPRODUKTE\",\r\n        \"EXAA_GREEN_POWER_DE_STUNDENPRODUKTE\"\r\n    ]\r\n}",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/createETLGroup",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "createETLGroup"
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "DeleteETLGroup",
                        "event": [
                            {
                                "listen": "prerequest",
                                "script": {
                                    "exec": [
                                        "var idToken = pm.environment.get(idToken);"
                                    ],
                                    "type": "text/javascript"
                                }
                            },
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        "pm.test(\"Status code is 200\", function () {\r",
                                        "    pm.response.to.have.status(200);\r",
                                        "});\r",
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "type": "text",
                                    "value": "eyJraWQiOiJmejRsRE5KdWJLb0tmbFQyUVBZcWhyZTBQQjVSeG9wRG8xN1lIelc2SHNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2MDJmN2UyOC1lMzczLTRkZTYtYjZjMC1jOTUyYzFjNDI4MzEiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjQ1MDEyNzc4NTMwOTpyb2xlXC9Sb2xlQ29nbml0byIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX0tHODl1bUZDNyIsImNvZ25pdG86dXNlcm5hbWUiOiJrb3dzaGlrbnMiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0NTAxMjc3ODUzMDk6cm9sZVwvUm9sZUNvZ25pdG8iXSwiYXVkIjoiNWxoMG5qOHNsZTIxODc2Z2JuNjdodDA3NnMiLCJldmVudF9pZCI6ImQyNjVmZTgzLTBjMzEtNGI4YS05MjA3LTM0MmVkNDI0OWY4OCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA0ODgxNzY0LCJuYW1lIjoiS293c2hpayIsInBob25lX251bWJlciI6Iis5MTk1MTMyNzk2NjYiLCJleHAiOjE2MDQ4ODUzNjQsImlhdCI6MTYwNDg4MTc2NCwiZmFtaWx5X25hbWUiOiJOUyIsImVtYWlsIjoia293c2hpa25zQGdtYWlsLmNvbSJ9.DAeV8i-cS1_80gVEUfAXoRpUZakAwygQU1BtSEvq0r75ej8ipohjXcO2tcu4yrX8eS5wvcjwKn86vZ4KCE-WUi7yek0rR9APgqps2wa16fs3IjKk_iBIOjsmzjVUlwBuyZ7fdx0jh3ZKWyUn8qGh4n69YlcX6wR7yyY7hOR41_y6StNDew3bdWJkRwbS_s2yizTFoAmb-3nfLYsGjyrOmDuigq8nN-uNdJKkWuFD1QudBb2AjYE5gBcBVhX8GlvvhdbmLj6bDBFeqnbRjoIE31JL9tZO8OC6KH2mkQZvuFKgq0sOhqVwSyPvTs1qi9bF_rn7dRXwF0QKDjbln3neTA"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/etl/deleteEtlGroup?groupName=ETLGROUPECB",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "etl",
                                    "deleteEtlGroup"
                                ],
                                "query": [
                                    {
                                        "key": "groupName",
                                        "value": "ETLGROUPECB"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ],
                "auth": {
                    "type": "bearer"
                },
                "event": [
                    {
                        "listen": "prerequest",
                        "script": {
                            "type": "text/javascript",
                            "exec": [
                                ""
                            ]
                        }
                    },
                    {
                        "listen": "test",
                        "script": {
                            "type": "text/javascript",
                            "exec": [
                                ""
                            ]
                        }
                    }
                ]
            },
            {
                "name": "CurveDefinitionVersion",
                "item": [
                    {
                        "name": "GetAllVersions",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJ4SmtCZmt3cEhwMEdia3ZGc1JtbERHVFo5OGJyMnNlNHVvRDB0VXVkZ3RNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxODBlODkxNi00M2I0LTQ1YWQtYjBiYS04YjFmMGUxY2I0MGUiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0ODYxNTE0MTU2MzE6cm9sZVwvYXdzLXNlcnZpY2Utcm9sZVwvb3BzLmFwaWdhdGV3YXkuYW1hem9uYXdzLmNvbVwvQVdTU2VydmljZVJvbGVGb3JBUElHYXRld2F5IiwiY3VzdG9tOmxhc3ROYW1lIjoid2FybWVyIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfZzFTd0VRa0x6IiwiY29nbml0bzp1c2VybmFtZSI6ImplbmtpbnMtd2FybWVyIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsIm9yaWdpbl9qdGkiOiJhNzY5NGFmZi0zODM1LTQ3MDYtYjU3OS0wNWVmM2UyNTViM2EiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0ODYxNTE0MTU2MzE6cm9sZVwvYXdzLXNlcnZpY2Utcm9sZVwvb3BzLmFwaWdhdGV3YXkuYW1hem9uYXdzLmNvbVwvQVdTU2VydmljZVJvbGVGb3JBUElHYXRld2F5Il0sImF1ZCI6IjFqYzkzNTlrbWpmamVoMTFkZm9hb2lsZ3Y5IiwiZXZlbnRfaWQiOiIyNDBhOTk0YS02NWEyLTQ0OGEtYTIxMy1lZmFhM2JhMzYxMDciLCJjdXN0b206Zmlyc3ROYW1lIjoiamVua2lucyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU4MzAxOTQ4LCJuYW1lIjoiamVua2lucyIsImN1c3RvbTpfaWQiOiI2MmNlYTY5ODFkOTE3NDNhYTQzOGYyYjUiLCJleHAiOjE2NTgzMDU1NDgsImlhdCI6MTY1ODMwMTk0OCwiZmFtaWx5X25hbWUiOiJ3YXJtZXIiLCJjdXN0b206ZW52aXJvbm1lbnQiOiJxYSIsImp0aSI6IjQxNDc2N2Q3LTA1NGEtNGRjNC04MmM5LThlN2U3MGJlMmE4OSIsImVtYWlsIjoiamVua2lucy13YXJtZXJAdmVudHJpa3MuY29tIn0.GDoE59rTjRhz4bXvQGLPBTmvYMoGQ-PURqjTkKU-1yQ08WE_G_-WqUKDuIxN_3YgFvCV6TWkpwKkwh0MAILudqJg0OF2DATBCgkZW6RQIvb5cw1DNS5BjSAOUCnmYOVNyst-NfZ5-jMHF2kM8fvao-L86vXJEHZD5M0HRc5jeBKw3tjiuEITwXd_bnzrvQoSFNhgUY4395ofOG7aXGdrcmp7ukFK7IH2nwJG9o_n0eGtfe15_X8TIAXfIrowlLGEfDpsqzrKJTUHgAVaBEyrFZZCJcd1SkMbWQdRWI1nyEzcf-BsaalU4MH5YVEsYlyuNNQ5TeG__8d51hysZIxfZg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/getAllVersions?entityId=xyz&moduleType=CURVE_DEFINITION",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "getAllVersions"
                                ],
                                "query": [
                                    {
                                        "key": "entityId",
                                        "value": "xyz"
                                    },
                                    {
                                        "key": "moduleType",
                                        "value": "CURVE_DEFINITION"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "PromoteCurveDefinition",
                        "event": [
                            {
                                "listen": "test",
                                "script": {
                                    "exec": [
                                        ""
                                    ],
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJ4SmtCZmt3cEhwMEdia3ZGc1JtbERHVFo5OGJyMnNlNHVvRDB0VXVkZ3RNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxODBlODkxNi00M2I0LTQ1YWQtYjBiYS04YjFmMGUxY2I0MGUiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0ODYxNTE0MTU2MzE6cm9sZVwvYXdzLXNlcnZpY2Utcm9sZVwvb3BzLmFwaWdhdGV3YXkuYW1hem9uYXdzLmNvbVwvQVdTU2VydmljZVJvbGVGb3JBUElHYXRld2F5IiwiY3VzdG9tOmxhc3ROYW1lIjoid2FybWVyIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfZzFTd0VRa0x6IiwiY29nbml0bzp1c2VybmFtZSI6ImplbmtpbnMtd2FybWVyIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsIm9yaWdpbl9qdGkiOiJhNzY5NGFmZi0zODM1LTQ3MDYtYjU3OS0wNWVmM2UyNTViM2EiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0ODYxNTE0MTU2MzE6cm9sZVwvYXdzLXNlcnZpY2Utcm9sZVwvb3BzLmFwaWdhdGV3YXkuYW1hem9uYXdzLmNvbVwvQVdTU2VydmljZVJvbGVGb3JBUElHYXRld2F5Il0sImF1ZCI6IjFqYzkzNTlrbWpmamVoMTFkZm9hb2lsZ3Y5IiwiZXZlbnRfaWQiOiIyNDBhOTk0YS02NWEyLTQ0OGEtYTIxMy1lZmFhM2JhMzYxMDciLCJjdXN0b206Zmlyc3ROYW1lIjoiamVua2lucyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU4MzAxOTQ4LCJuYW1lIjoiamVua2lucyIsImN1c3RvbTpfaWQiOiI2MmNlYTY5ODFkOTE3NDNhYTQzOGYyYjUiLCJleHAiOjE2NTgzMDU1NDgsImlhdCI6MTY1ODMwMTk0OCwiZmFtaWx5X25hbWUiOiJ3YXJtZXIiLCJjdXN0b206ZW52aXJvbm1lbnQiOiJxYSIsImp0aSI6IjQxNDc2N2Q3LTA1NGEtNGRjNC04MmM5LThlN2U3MGJlMmE4OSIsImVtYWlsIjoiamVua2lucy13YXJtZXJAdmVudHJpa3MuY29tIn0.GDoE59rTjRhz4bXvQGLPBTmvYMoGQ-PURqjTkKU-1yQ08WE_G_-WqUKDuIxN_3YgFvCV6TWkpwKkwh0MAILudqJg0OF2DATBCgkZW6RQIvb5cw1DNS5BjSAOUCnmYOVNyst-NfZ5-jMHF2kM8fvao-L86vXJEHZD5M0HRc5jeBKw3tjiuEITwXd_bnzrvQoSFNhgUY4395ofOG7aXGdrcmp7ukFK7IH2nwJG9o_n0eGtfe15_X8TIAXfIrowlLGEfDpsqzrKJTUHgAVaBEyrFZZCJcd1SkMbWQdRWI1nyEzcf-BsaalU4MH5YVEsYlyuNNQ5TeG__8d51hysZIxfZg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/promoteCurveDefinition?id=abc&curveDefinitionId=xyz&stage=PRODUCTION",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "promoteCurveDefinition"
                                ],
                                "query": [
                                    {
                                        "key": "id",
                                        "value": "abc"
                                    },
                                    {
                                        "key": "curveDefinitionId",
                                        "value": "xyz"
                                    },
                                    {
                                        "key": "stage",
                                        "value": "PRODUCTION"
                                    }
                                ]
                            }
                        },
                        "response": []
                    },
                    {
                        "name": "ExtractCurveDefinitionStages Copy",
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "auth": {
                                "type": "bearer",
                                "bearer": [
                                    {
                                        "key": "token",
                                        "value": "{{idTokendev}}",
                                        "type": "string"
                                    }
                                ]
                            },
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "eyJraWQiOiJ4SmtCZmt3cEhwMEdia3ZGc1JtbERHVFo5OGJyMnNlNHVvRDB0VXVkZ3RNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxODBlODkxNi00M2I0LTQ1YWQtYjBiYS04YjFmMGUxY2I0MGUiLCJjb2duaXRvOmdyb3VwcyI6WyJ2dHhEZXZlbG9wZXJzIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjo0ODYxNTE0MTU2MzE6cm9sZVwvYXdzLXNlcnZpY2Utcm9sZVwvb3BzLmFwaWdhdGV3YXkuYW1hem9uYXdzLmNvbVwvQVdTU2VydmljZVJvbGVGb3JBUElHYXRld2F5IiwiY3VzdG9tOmxhc3ROYW1lIjoid2FybWVyIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfZzFTd0VRa0x6IiwiY29nbml0bzp1c2VybmFtZSI6ImplbmtpbnMtd2FybWVyIiwiY3VzdG9tOmNvbXBhbnkiOiJ2ZW50cmlrcyIsIm9yaWdpbl9qdGkiOiJhNzY5NGFmZi0zODM1LTQ3MDYtYjU3OS0wNWVmM2UyNTViM2EiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo0ODYxNTE0MTU2MzE6cm9sZVwvYXdzLXNlcnZpY2Utcm9sZVwvb3BzLmFwaWdhdGV3YXkuYW1hem9uYXdzLmNvbVwvQVdTU2VydmljZVJvbGVGb3JBUElHYXRld2F5Il0sImF1ZCI6IjFqYzkzNTlrbWpmamVoMTFkZm9hb2lsZ3Y5IiwiZXZlbnRfaWQiOiIyNDBhOTk0YS02NWEyLTQ0OGEtYTIxMy1lZmFhM2JhMzYxMDciLCJjdXN0b206Zmlyc3ROYW1lIjoiamVua2lucyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU4MzAxOTQ4LCJuYW1lIjoiamVua2lucyIsImN1c3RvbTpfaWQiOiI2MmNlYTY5ODFkOTE3NDNhYTQzOGYyYjUiLCJleHAiOjE2NTgzMDU1NDgsImlhdCI6MTY1ODMwMTk0OCwiZmFtaWx5X25hbWUiOiJ3YXJtZXIiLCJjdXN0b206ZW52aXJvbm1lbnQiOiJxYSIsImp0aSI6IjQxNDc2N2Q3LTA1NGEtNGRjNC04MmM5LThlN2U3MGJlMmE4OSIsImVtYWlsIjoiamVua2lucy13YXJtZXJAdmVudHJpa3MuY29tIn0.GDoE59rTjRhz4bXvQGLPBTmvYMoGQ-PURqjTkKU-1yQ08WE_G_-WqUKDuIxN_3YgFvCV6TWkpwKkwh0MAILudqJg0OF2DATBCgkZW6RQIvb5cw1DNS5BjSAOUCnmYOVNyst-NfZ5-jMHF2kM8fvao-L86vXJEHZD5M0HRc5jeBKw3tjiuEITwXd_bnzrvQoSFNhgUY4395ofOG7aXGdrcmp7ukFK7IH2nwJG9o_n0eGtfe15_X8TIAXfIrowlLGEfDpsqzrKJTUHgAVaBEyrFZZCJcd1SkMbWQdRWI1nyEzcf-BsaalU4MH5YVEsYlyuNNQ5TeG__8d51hysZIxfZg",
                                    "type": "text"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "",
                                "options": {
                                    "raw": {
                                        "language": "json"
                                    }
                                }
                            },
                            "url": {
                                "raw": "{{qaurl}}/curve/extractCurveDefinitionStages?curveDefinitionId=xyz",
                                "host": [
                                    "{{qaurl}}"
                                ],
                                "path": [
                                    "curve",
                                    "extractCurveDefinitionStages"
                                ],
                                "query": [
                                    {
                                        "key": "curveDefinitionId",
                                        "value": "xyz"
                                    }
                                ]
                            }
                        },
                        "response": []
                    }
                ]
            }
        ]
    }