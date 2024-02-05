import {DynamoDBDocument} from '@aws-sdk/lib-dynamodb';
import {
  ConditionalCheckFailedException,
  DynamoDBClient,
  TransactionCanceledException,
} from '@aws-sdk/client-dynamodb';

let document: DynamoDBDocument;
let client: DynamoDBClient;

export function isTransactionCanceledException(
  e?: unknown
): e is TransactionCanceledException {
  return !!(
    e &&
    (e as TransactionCanceledException).name === 'TransactionCanceledException'
  );
}

export function isConditionalCheckFailedException(
  e?: unknown
): e is ConditionalCheckFailedException {
  return !!(
    e &&
    (e as ConditionalCheckFailedException).name ===
      'ConditionalCheckFailedException'
  );
}

export function getDynamoDBClient(): DynamoDBClient {
  if (client === undefined) {
    client = new DynamoDBClient({});
  }
  return client;
}

export function getDynamoDBDocument(): DynamoDBDocument {
  if (document === undefined) {
    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.
      convertEmptyValues: false, // false, by default.
      // Whether to remove undefined values while marshalling.
      removeUndefinedValues: true, // false, by default.
      // Whether to convert typeof object to map attribute.
      convertClassInstanceToMap: false, // false, by default.
    };

    const unmarshallOptions = {
      // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
      wrapNumbers: false, // false, by default.
    };

    const translateConfig = {marshallOptions, unmarshallOptions};
    document = DynamoDBDocument.from(getDynamoDBClient(), translateConfig);
  }
  return document;
}

export interface DynamoDBRepositoryConfig {
  readonly tableName: string;
  readonly client?: DynamoDBClient;
  readonly doc?: DynamoDBDocument;
}

export abstract class DynamoDBRepository {
  readonly client: DynamoDBClient;
  readonly doc: DynamoDBDocument;
  readonly tableName: string;

  protected constructor(config: DynamoDBRepositoryConfig) {
    this.tableName = config.tableName;
    this.client = config.client ?? getDynamoDBClient();
    this.doc = config.doc ?? getDynamoDBDocument();
  }
}
