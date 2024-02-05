import {
  ConditionalCheckFailedException,
  TransactionCanceledException,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBRepository,
  getDynamoDBClient,
  isConditionalCheckFailedException,
  isTransactionCanceledException,
} from './dynamodb.repository';

test('Test isTransactionCanceledException', () => {
  const err1 = new Error('Transaction Canceled');
  const err2 = new TransactionCanceledException({
    message: 'Transaction Canceled',
    $metadata: {},
  });
  expect(isTransactionCanceledException(err1)).toBeFalsy();
  expect(isTransactionCanceledException(err2)).toBeTruthy();
});

test('Test isConditionalCheckFailedException', () => {
  const err1 = new Error('Conduction Check Failed');
  const err2 = new ConditionalCheckFailedException({
    message: 'Conduction Check Failed',
    $metadata: {},
  });
  expect(isConditionalCheckFailedException(err1)).toBeFalsy();
  expect(isConditionalCheckFailedException(err2)).toBeTruthy();
});

test('Test getDynamoClient', () => {
  const client = getDynamoDBClient();
  expect(client).toBeDefined();
});

test('Test getDynamoDocument', () => {
  const doc = getDynamoDBClient();
  expect(doc).toBeDefined();
});

test('Test DynamoRepository', () => {
  class TestRepository extends DynamoDBRepository {
    constructor() {
      super({tableName: 'test-table'});
    }
  }
  const repo = new TestRepository();
  expect(repo).toBeDefined();
  expect(repo.client).toBeDefined();
  expect(repo.doc).toBeDefined();
  expect(repo.tableName).toBe('test-table');
});
