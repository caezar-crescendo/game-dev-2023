import _ from "lodash";
import Head from "next/head";
import { getEntriesByContentType } from '../../lib/helpers';
import { Container, Grid, Paper } from '@mui/material';
import CategoryQuestionContainer from '../../components/CategoryQuestionContainer';
import ScoreBoardContainer from '../../components/ScoreBoardContainer';

const ProductPage = (props) => {
  const q = props.questions;
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
  const u = {
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
      "id": "4GJgwFttV7hVVMQhFmhjjV",
      "type": "Entry",
      "createdAt": "2023-04-24T12:10:56.724Z",
      "updatedAt": "2023-04-24T12:10:56.724Z",
      "environment": {
        "sys": {
          "id": "master",
          "type": "Link",
          "linkType": "Environment"
        }
      },
      "createdBy": {
        "sys": {
          "type": "Link",
          "linkType": "User",
          "id": "4IrYxPIKZx5N4ei2LRqUWB"
        }
      },
      "updatedBy": {
        "sys": {
          "type": "Link",
          "linkType": "User",
          "id": "4IrYxPIKZx5N4ei2LRqUWB"
        }
      },
      "publishedCounter": 0,
      "version": 1,
      "automationTags": [],
      "contentType": {
        "sys": {
          "type": "Link",
          "linkType": "ContentType",
          "id": "user"
        }
      }
    },
    "fields": {
      "name": {
        "en-US": "MZa"
      },
      "points": {
        "en-US": 0
      },
      "active": {
        "en-US": true
      }
    }
  };

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>

      <div className="pt-5">
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper className="p-5 min-h-[90vh]">
                <CategoryQuestionContainer
                  user={u}
                  questions={q.items || []}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className="p-5 min-h-[90vh]">
                <ScoreBoardContainer users={users.items}/>
              </Paper>
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
