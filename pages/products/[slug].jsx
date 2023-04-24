import _ from "lodash";
import Head from "next/head";
import { getEntriesByContentType } from '../../lib/helpers';
import { Container } from '@mui/material';
import CategoryQuestionContainer from '../../components/CategoryQuestionContainer';

const ProductPage = (props) => {
  const q = props.questions;
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
          <CategoryQuestionContainer
            user={u}
            questions={q.items || []}
          />
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
