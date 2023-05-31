import _ from "lodash";
import Head from "next/head";
import { getEntriesByContentType } from '../../lib/helpers';
import { Container, Grid, Paper } from '@mui/material';
import ScoreBoardContainer from '../../components/ScoreBoardContainer';
import BoardGame from '../../components/BoardGame';

const ProductPage = (props) => {
  const users = {
    "items": [
      {
        "metadata": {
          "tags": []
        },
        "sys": {
          "space": {
            "sys": {
              "type": "Link",
              "linkType": "Space",
              "id": "8rty9lj73ta8"
            }
          },
          "type": "Entry",
          "id": "3smBAEwjzSHRDFYlcXdXV0",
          "contentType": {
            "sys": {
              "type": "Link",
              "linkType": "ContentType",
              "id": "user"
            }
          },
          "revision": 2,
          "createdAt": "2023-04-26T04:32:49.530Z",
          "updatedAt": "2023-04-27T13:44:03.336Z",
          "environment": {
            "sys": {
              "id": "master",
              "type": "Link",
              "linkType": "Environment"
            }
          },
          "locale": "en-US"
        },
        "fields": {
          "name": "Caezar",
          "points": 11
        }
      },
      {
        "metadata": {
          "tags": []
        },
        "sys": {
          "space": {
            "sys": {
              "type": "Link",
              "linkType": "Space",
              "id": "8rty9lj73ta8"
            }
          },
          "type": "Entry",
          "id": "7hzQhRf6fXN5jkwNa3AD1k",
          "contentType": {
            "sys": {
              "type": "Link",
              "linkType": "ContentType",
              "id": "user"
            }
          },
          "revision": 2,
          "createdAt": "2023-04-26T04:31:29.053Z",
          "updatedAt": "2023-04-27T13:44:03.302Z",
          "environment": {
            "sys": {
              "id": "master",
              "type": "Link",
              "linkType": "Environment"
            }
          },
          "locale": "en-US"
        },
        "fields": {
          "name": "bibs",
          "points": 8
        }
      },
      {
        "metadata": {
          "tags": []
        },
        "sys": {
          "space": {
            "sys": {
              "type": "Link",
              "linkType": "Space",
              "id": "8rty9lj73ta8"
            }
          },
          "type": "Entry",
          "id": "6rpA0sRf7uZ5tkHVxmDOEg",
          "contentType": {
            "sys": {
              "type": "Link",
              "linkType": "ContentType",
              "id": "user"
            }
          },
          "revision": 2,
          "createdAt": "2023-04-26T04:26:53.170Z",
          "updatedAt": "2023-04-27T13:44:03.362Z",
          "environment": {
            "sys": {
              "id": "master",
              "type": "Link",
              "linkType": "Environment"
            }
          },
          "locale": "en-US"
        },
        "fields": {
          "name": "chia",
          "points": 4
        }
      },
      {
        "metadata": {
          "tags": []
        },
        "sys": {
          "space": {
            "sys": {
              "type": "Link",
              "linkType": "Space",
              "id": "8rty9lj73ta8"
            }
          },
          "type": "Entry",
          "id": "5eXEkpNeKBIu2OHSuvS3vE",
          "contentType": {
            "sys": {
              "type": "Link",
              "linkType": "ContentType",
              "id": "user"
            }
          },
          "revision": 1,
          "createdAt": "2023-04-27T14:02:15.576Z",
          "updatedAt": "2023-04-27T14:02:26.775Z",
          "environment": {
            "sys": {
              "id": "master",
              "type": "Link",
              "linkType": "Environment"
            }
          },
          "locale": "en-US"
        },
        "fields": {
          "name": "Xu Xin",
          "points": 0
        }
      },
      {
        "metadata": {
          "tags": []
        },
        "sys": {
          "space": {
            "sys": {
              "type": "Link",
              "linkType": "Space",
              "id": "8rty9lj73ta8"
            }
          },
          "type": "Entry",
          "id": "5zmUSJJQtj7mtE1cr1KXtE",
          "contentType": {
            "sys": {
              "type": "Link",
              "linkType": "ContentType",
              "id": "user"
            }
          },
          "revision": 1,
          "createdAt": "2023-04-27T13:48:18.084Z",
          "updatedAt": "2023-04-27T13:48:37.242Z",
          "environment": {
            "sys": {
              "id": "master",
              "type": "Link",
              "linkType": "Environment"
            }
          },
          "locale": "en-US"
        },
        "fields": {
          "name": "Ma Long",
          "points": 0
        }
      }
    ]
  };
  const blocks = [
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "10LaxRSnVtb1ZOgKWypoe5",
        "type": "Entry",
        "createdAt": "2023-05-31T16:21:31.907Z",
        "updatedAt": "2023-05-31T16:21:31.907Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "12sDjNwANY1bJkyQWYfGys",
            "type": "Asset",
            "createdAt": "2023-05-31T16:20:09.679Z",
            "updatedAt": "2023-05-31T16:20:09.679Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (8)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/12sDjNwANY1bJkyQWYfGys/3f360f8c5c448fcaf5a28a9adcb3e8d1/avataaars__8_.png",
              "details": {
                "size": 49104,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (8).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "2Az5pMWVqBJdl7SjxtLrxv",
        "type": "Entry",
        "createdAt": "2023-05-31T16:21:12.881Z",
        "updatedAt": "2023-05-31T16:21:12.881Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "1FxvzShIJLFhieiaIPUd7T",
            "type": "Asset",
            "createdAt": "2023-05-31T16:20:09.671Z",
            "updatedAt": "2023-05-31T16:20:09.671Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (6)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/1FxvzShIJLFhieiaIPUd7T/3c90fc10516b9eacdd51c5a1b2246c3c/avataaars__6_.png",
              "details": {
                "size": 38623,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (6).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "4hznJBlqcOUYjOHeJzvSy2",
        "type": "Entry",
        "createdAt": "2023-05-31T16:21:09.162Z",
        "updatedAt": "2023-05-31T16:21:09.162Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "6FeLRICj3jWvKlHpmLeVKf",
            "type": "Asset",
            "createdAt": "2023-05-31T16:20:09.664Z",
            "updatedAt": "2023-05-31T16:20:09.664Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (9)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/6FeLRICj3jWvKlHpmLeVKf/3416e00a3b4ad8fb4eaee42795b69168/avataaars__9_.png",
              "details": {
                "size": 47824,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (9).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "6QCJr7ot3WBjvaoe2bspdB",
        "type": "Entry",
        "createdAt": "2023-05-31T16:20:47.098Z",
        "updatedAt": "2023-05-31T16:20:47.098Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "4NoztPqdlrroV7lauFjm5W",
            "type": "Asset",
            "createdAt": "2023-05-31T16:20:09.658Z",
            "updatedAt": "2023-05-31T16:20:09.658Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (7)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/4NoztPqdlrroV7lauFjm5W/b0c5bc5f2e0b47871919b363906d0ddf/avataaars__7_.png",
              "details": {
                "size": 56659,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (7).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "607tIFlQH8ESzF8z7fwYOR",
        "type": "Entry",
        "createdAt": "2023-05-31T16:19:47.077Z",
        "updatedAt": "2023-05-31T16:19:47.077Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "6byg7QZ3dmjKxA6SVVfEGJ",
            "type": "Asset",
            "createdAt": "2023-05-31T16:20:09.650Z",
            "updatedAt": "2023-05-31T16:20:09.650Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (10)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/6byg7QZ3dmjKxA6SVVfEGJ/fdb09b5dfea44581758ec8352c6c282d/avataaars__10_.png",
              "details": {
                "size": 37763,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (10).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "48IKtQ97F5MG9xRK3me3Mq",
        "type": "Entry",
        "createdAt": "2023-05-31T16:19:22.113Z",
        "updatedAt": "2023-05-31T16:19:22.113Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "5lambWzI77mT8z8UhLH9pD",
            "type": "Asset",
            "createdAt": "2023-05-31T16:20:09.642Z",
            "updatedAt": "2023-05-31T16:20:09.642Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (5)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/5lambWzI77mT8z8UhLH9pD/5acd4c5a77a9a4d73033907e3ed07017/avataaars__5_.png",
              "details": {
                "size": 43223,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (5).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "69WtnSOvDpkowWk7Q4eIst",
        "type": "Entry",
        "createdAt": "2023-05-31T14:36:09.832Z",
        "updatedAt": "2023-05-31T14:36:09.832Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "7CWW35uSA2Xvhlv99NlgvV",
            "type": "Asset",
            "createdAt": "2023-05-31T14:34:37.644Z",
            "updatedAt": "2023-05-31T14:34:37.644Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (2)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/7CWW35uSA2Xvhlv99NlgvV/1cccd0d3b7d98123236bac7fde984a4e/avataaars__2_.png",
              "details": {
                "size": 47843,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (2).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "5tUdarwenRl4DeycFxouSB",
        "type": "Entry",
        "createdAt": "2023-05-31T14:35:32.316Z",
        "updatedAt": "2023-05-31T14:35:32.316Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "3KySdTU54y0yswiiRoEdNl",
            "type": "Asset",
            "createdAt": "2023-05-31T14:34:37.652Z",
            "updatedAt": "2023-05-31T14:34:37.652Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (4)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/3KySdTU54y0yswiiRoEdNl/102a04264a938913deea9453cbb1ff22/avataaars__4_.png",
              "details": {
                "size": 34665,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (4).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "3rcMWX3xiN0RL2uOs8GIgc",
        "type": "Entry",
        "createdAt": "2023-05-31T14:34:51.855Z",
        "updatedAt": "2023-05-31T14:34:51.855Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "4kafToVnWv2y17nEa6Ivez",
            "type": "Asset",
            "createdAt": "2023-05-31T14:34:37.658Z",
            "updatedAt": "2023-05-31T14:34:37.658Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (3)",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/4kafToVnWv2y17nEa6Ivez/95876d20c5956ed65dfeb5e0ab804ee7/avataaars__3_.png",
              "details": {
                "size": 39601,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (3).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "4BcEJEuEkl944EyBYNHjmH",
        "type": "Entry",
        "createdAt": "2023-05-31T14:33:14.198Z",
        "updatedAt": "2023-05-31T14:33:14.198Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "4v9pwwI9S4lTSzEetxeLLN",
            "type": "Asset",
            "createdAt": "2023-05-31T14:26:30.449Z",
            "updatedAt": "2023-05-31T14:26:30.449Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars",
            "description": "",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/4v9pwwI9S4lTSzEetxeLLN/0349f1dc7985fb9721b54a5375103176/avataaars.png",
              "details": {
                "size": 38654,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars.png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    },
    {
      "metadata": {
        "tags": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "8rty9lj73ta8"
          }
        },
        "id": "2xBhkfaBV9gtw6k36fmc3s",
        "type": "Entry",
        "createdAt": "2023-05-31T14:31:36.700Z",
        "updatedAt": "2023-05-31T14:31:36.700Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "block"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "image": {
          "metadata": {
            "tags": []
          },
          "sys": {
            "space": {
              "sys": {
                "type": "Link",
                "linkType": "Space",
                "id": "8rty9lj73ta8"
              }
            },
            "id": "1zmsvxJT1VrvAD9s0KM8gH",
            "type": "Asset",
            "createdAt": "2023-05-31T14:29:56.749Z",
            "updatedAt": "2023-05-31T14:29:56.749Z",
            "environment": {
              "sys": {
                "id": "master",
                "type": "Link",
                "linkType": "Environment"
              }
            },
            "revision": 1,
            "locale": "en-US"
          },
          "fields": {
            "title": "avataaars (1)",
            "description": "",
            "file": {
              "url": "//images.ctfassets.net/8rty9lj73ta8/1zmsvxJT1VrvAD9s0KM8gH/74cf45a6c342765b9e9b6630650b832f/avataaars__1_.png",
              "details": {
                "size": 42452,
                "image": {
                  "width": 528,
                  "height": 560
                }
              },
              "fileName": "avataaars (1).png",
              "contentType": "image/png"
            }
          }
        },
        "isPaired": false,
        "isSelected": false
      }
    }
  ];

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>

      <div className="pt-5">
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Paper className="p-5 min-h-[90vh] shadow-none rounded-none">
                <BoardGame blocks={blocks} />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <ScoreBoardContainer users={users.items}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const productEntries = await getEntriesByContentType("product");

  let paths = [];
  if (productEntries) {
    try {
      paths = productEntries.items.map((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        return { params: { slug: slugVal } };
      });
    } catch (error) {}
  }

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const users = await getEntriesByContentType("user", true);
  const questions = await getEntriesByContentType("question");

  return {
    props: {
      users,
      questions,
    },
  };
}

export default ProductPage;
